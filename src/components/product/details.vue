<template>
<v-container>
  <div>
    <v-card-title>
      <v-btn color="success" dark slot="activator" class="mb-2"  @click="newItem">Novo</v-btn> 
    </v-card-title>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="450">
  <v-card>
    <v-form @submit.prevent="submit" ref="form">
      <v-card-title primary-title>
        <div class="headline">Alterar Estoque</div>
      </v-card-title>   
      <v-container grid-list-xl fluid>
        <v-layout wrap justify-space-around>
          <v-flex xs12 sm8>
          <v-menu
        lazy
        :close-on-content-click="true">
        <v-text-field
          required
          slot="activator"
          label="Date"
          v-model="form.date"
        ></v-text-field>
        <v-date-picker
          v-model="form.date"
          locale="pt-br"
          no-title
        >
        </v-date-picker>
      </v-menu>
          </v-flex>
          <v-flex xs12 sm4>              
              <span  v-if="form.io">
                Entrada
                <v-btn icon class="mx-0" @click="type">
                  <v-icon x-large color="blue">keyboard_arrow_down</v-icon>
                </v-btn>                
              </span>
              <span  v-if="!form.io">
                Saida
                <v-btn icon class="mx-0" @click="type">
                  <v-icon x-large color="red" >keyboard_arrow_up</v-icon>
                </v-btn>
              </span>
          </v-flex>
          <v-flex xs12 sm6>
                <v-text-field
                  v-model="form.amount"
                  label="Quantidade"
                  :error-messages="errors.collect('barCode')"
                  v-validate="'required'"
                  data-vv-name="amount"
                  required
                ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
                <v-text-field name="value"
                  v-model="form.value"
                  label="Valor"
                  :error-messages="errors.collect('value')"
                  v-validate="'required'"
                  prefix="$"
                  data-vv-name="value"
                  type="number"
                  required
                ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-btn
          flat
          color="primary"
          type="submit"
          :disabled="!isValid"
        >Salvar</v-btn>
        <v-btn flat @click="back">Voltar</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat  @click="clear" color="error">Cancelar</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
    </v-dialog>
  </v-layout>
    <v-data-table
      :headers="headers"
      :items="items.history"
      hide-actions
      class="elevation-1"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td class="text-md-center">{{ props.item.date }}</td>
        <td class="text-xs-center">{{ props.item.amount }}</td>
        <td class="text-xs-center">{{ props.item.value }}</td>
        <td class="text-xs-center">{{ props.item.io }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
      <v-dialog v-model="dialog2" persistent max-width="350">
      <v-card>
        <v-card-title class="headline error white--text" >Excluir</v-card-title>
        <v-card-text class="text-md-center">
            Deseja confirmar esta ação?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="cancelDelete">Cancelar</v-btn>
          <v-btn color="error" flat @click="confirmDelete">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-container>
</template>

<script>
  export default {
    $_veeValidate: {
      validator: 'new'

    },

    data () {
      return {
        form: {
          date: undefined,
          amount: null,
          value: null,
          io: true
        },
        item: undefined,
        dialog: false,
        dialog2: false,
        search: '',
        headers: [
          { text: 'Data', align: 'left', value: 'date' },
          { text: 'Quantidade', value: 'amount' },
          { text: 'Valor', value: 'value' },
          { text: 'Tipo', value: 'io' },
          { text: 'Ações', value: 'actions', sortable: false, align: 'center' }
        ],
        dictionary: {
          custom: {
            name: {
              required: () => 'O campo descrição não pode estar vazio'
            },
            barCode: {
              required: () => 'O campo código de barras não pode estar vazio'
            },
            value: {
              required: () => 'O campo valor de venda não pode estar vazio'
            }
          }
        }
      }
    },

    computed: {
      isValid () {
        return (
          this.form.date &&
          this.form.amount &&
          this.form.value
        )
      },
      items () {
        return this.$store.product.state.product
      }
    },

    mounted () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.$store.product.dispatch('getDetails', this.$route.params.id)
      },

      newItem () {
        this.dialog = true
      },

      viewItem (item) {
        this.$router.push({name: 'products.details', params: {id: item.id}})
      },

      editItem (item) {
        this.$router.push({name: 'products.edit', params: {id: item.id}})
      },

      deleteItem (item) {
        this.item = item
        this.dialog2 = true
      },

      confirmDelete () {
        let data = {
          id: this.$route.params.id,
          product: this.item
        }
        this.$store.product.dispatch('putDetails', data).then(() => {
          this.dialog2 = false
        })
      },

      cancelDelete () {
        this.dialog2 = false
      },

      clear () {
        this.form.date = ''
        this.form.value = ''
        this.form.io = true
        this.form.amount = null
        this.$validator.reset()
      },

      back () {
        this.form.date = ''
        this.form.value = ''
        this.form.io = true
        this.form.amount = null
        this.$validator.reset()
        this.dialog = false
      },

      type () {
        this.form.io = !this.form.io
      },

      submit () {
        this.$validator.validateAll()
        let data = {
          id: this.$route.params.id,
          product: this.form
        }
        this.$store.product.dispatch('postDetails', data).then(() => {
          this.dialog = false
          this.form.date = ''
          this.form.value = ''
          this.form.io = true
          this.form.amount = null
          this.$validator.reset()
        })
      }

    }
  }
</script>