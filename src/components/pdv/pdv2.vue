<template>
<v-container fluid grid-list-md>
<v-layout row wrap>
  <v-flex xs12 sm12>
    <v-card>
      <v-card-title>
        <v-text-field
          append-icon="search"
          label="Código de Barras..."
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
        <v-spacer></v-spacer>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex xs6 sm9>
          <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"   >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.value }}</td>
        <td class="text-xs-center">{{ props.item.discount }}</td>
        <td class="right layout px-0">
          <v-btn icon class="mx-0" @click="dicountItem(props.item)">
            <v-icon color="blue">loyalty</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
        <td></td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    </v-flex>
    <v-flex xs6 sm3>
      <v-layout row>
        <v-flex>
              <v-card>
          <v-list one-line>
            <template v-for="(item) in items2">
              <v-list-tile :key="item.title">
                <v-list-tile-content>
                  <v-list v-html="item.title"></v-list>
                </v-list-tile-content>
                <v-spacer></v-spacer>
                <v-list-tile-content>
                  <v-list v-html="item.total"></v-list>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
        </v-flex>
        </v-layout>
         <v-btn block color="primary" large dark>PAGAMENTO</v-btn>
    </v-flex>
</v-layout>
<v-layout row justify-center>
    <v-dialog v-model="dialog3" persistent max-width="500">
<v-card>
    <v-form @submit.prevent="submit" ref="form">
      <v-card-title primary-title>
        <div class="headline">Desconto</div>
        <v-spacer></v-spacer>
              <v-flex xs12 sm5>
        <v-select
          v-model="typediscount"
          :items="teste"
          label="Select"
          overflow
          target="#dropdown-example"
        ></v-select>
      </v-flex>
      </v-card-title>   
      <v-container grid-list-xl fluid>
        <v-layout wrap justify-space-around>
          <v-flex xs12 sm3>
                <v-text-field name="value"
                  label="Valor"
                  :error-messages="errors.collect('value')"
                  v-validate="'required'"
                  prefix="$"
                  data-vv-name="value"
                  type="number"
                  required
                ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3>
                <v-text-field name="value"
                  label="Valor"
                  :error-messages="errors.collect('value')"
                  v-validate="'required'"
                  prefix="$"
                  data-vv-name="value"
                  type="number"
                  required
                ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3>
                <v-text-field name="value"
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
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card>
        <v-card-title class="headline error white--text" >Excluir</v-card-title>
        <v-card-text class="text-md-center">
            Deseja excluir o produto <b>{{item.name}}</b> ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="cancelDelete">Cancelar</v-btn>
          <v-btn color="error" flat @click="confirmDelete">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</v-container>
</template>


<script>
  export default {
    data: () => ({
      teste: ['Porcentagem', 'Valor'],
      item: {
        id: '',
        name: ''
      },
      typediscount: 'Porcentagem',
      dialog3: false,
      dialog: false,
      search: '',
      headers: [
        { text: 'Nome', align: 'left', value: 'name', sortable: false },
        { text: 'Valor', value: 'value', sortable: false, align: 'center' },
        { text: 'Desconto', value: 'Discount', sortable: false, align: 'center' },
        { text: 'Ações', value: 'actions', sortable: false, align: 'right' },
        { text: '', value: '', sortable: false, align: 'right' }
      ],
      items2: [
        {title: 'Total'},
        {title: 'Desconto'}
      ]
    }),

    computed: {
      items () {
        return this.$store.product.state.products
      },
      total: function () {
        let sum = 0
        this.$store.pdv.state.products.forEach(element => {
          sum += element[2]
        })
        return sum
      },
      discount: function () {
        let sum = 0
        this.$store.pdv.state.products.forEach(element => {
          sum += element[3]
        })
        return sum
      }
    },

    mounted () {
      this.initialize()
    },

    methods: {
      initialize () {
        return this.$store.product.dispatch('getAll')
      },

      newItem () {
        this.$router.push({name: 'clients.insert'})
      },

      dicountItem (item) {
        this.dialog3 = true
      },

      editItem (item) {
        this.$router.push({name: 'clients.edit', params: {id: item.id}})
      },

      deleteItem (item) {
        this.item = item
        this.dialog = true
      },

      confirmDelete () {
        this.$store.client.dispatch('delete', this.item.id).then(() => {
          this.dialog = false
        })
      },

      cancelDelete () {
        this.dialog = false
      }

    }
  }
</script>
