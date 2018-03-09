<template>
<v-container>
  <div>
    <v-card-title>
      <div class="headline">Venda {{sale.date}}</div>
      <v-spacer></v-spacer>
      <div class="headline">Cliente: {{sale.client}}</div>
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
        <v-btn flat  @click="clear" color="error">Cancelar</v-btn>
      </v-card-actions>
        <v-spacer></v-spacer>
    </v-form>
  </v-card>
    </v-dialog>
  </v-layout>
  <v-container fluid grid-list-md>
      <v-layout row wrap >
          <v-flex xs12 sm12>
    <v-data-table
      :headers="headersProduct"
      :items="sale.products"
      hide-actions
      class="elevation-1"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td class="text-md-center">{{ props.item._id.barCode }}</td>
        <td class="text-md-center">{{props.item._id.name}}</td>
        <td class="text-xs-center">{{ props.item.value }}</td>
        <td class="text-xs-center">{{ props.item.discount }}</td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    </v-flex>
    <v-flex xs12 sm6>
        <v-data-table
      :headers="headersPay"
      :items="sale.pays"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td class="text-md-center">{{ props.item.method }}</td>
        <td class="text-md-center">{{props.item.value}}</td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    </v-flex>
    <v-flex xs12 sm6>
        <v-card>
          <v-list one-line>
            <template v-for="(item) in item2">
              <v-list-tile :key="item.text">
              <v-list-tile-content>
                <v-list-tile-title v-html="item.text"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-title v-html="item.value"></v-list-tile-title>
              </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
    </v-flex>
        </v-layout>
    </v-container>
  </div>
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
        item2: [
          {text: 'Valor', value: undefined},
          {text: 'Desconto', value: undefined}
        ],
        item: undefined,
        dialog: false,
        dialog2: false,
        search: '',
        headersProduct: [
          { text: 'Código', align: 'left', value: 'code' },
          { text: 'Nome', value: 'name' },
          { text: 'Valor', value: 'value' },
          { text: 'Desconto', value: 'discount' }
        ],
        headersPay: [
          {text: 'Método', value: 'method'},
          {text: 'Valor', value: 'value'}
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
      sale () {
        return this.$store.sale.state.sale
      }
    },

    mounted () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.$store.sale.dispatch('getOne', this.$route.params.id)
      },

      newItem () {
        this.dialog = true
      },

      viewItem (item) {
        this.$router.push({name: 'sales.details', params: {id: item.id}})
      },

      editItem (item) {
        this.$router.push({name: 'sales.edit', params: {id: item.id}})
      },

      deleteItem (item) {
        this.item = item
        this.dialog2 = true
      },

      confirmDelete () {
        let data = {
          id: this.$route.params.id,
          sale: this.item
        }
        this.$store.sale.dispatch('putDetails', data).then(() => {
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
          sale: this.form
        }
        this.$store.sale.dispatch('postDetails', data).then(() => {
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