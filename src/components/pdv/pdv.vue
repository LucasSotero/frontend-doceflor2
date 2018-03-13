<template>
<v-container fluid grid-list-md>
<v-layout row wrap>
  <v-flex xs12 sm12>
    <v-card>
      <v-card-title>
        <v-flex sm4 v-if="table">
        <v-text-field
          append-icon="search"
          label="Código de Barras..."
          single-line
          hide-details
          v-model="search"
          @keyup.enter="addProduct"
        ></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
        <v-flex  sm4>
          <v-select
          :items="clients"
          :filter="customFilter"
          v-model="sale.client"
          item-value="id"
          item-text="name"
          label="Cliente"
          autocomplete
            ></v-select>
          </v-flex>
        <v-flex md1>
          <v-btn fab dark small color="teal" @click="RedirectClient">
              <v-icon>add</v-icon>
            </v-btn>
        </v-flex>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex xs6 sm9>
    <v-data-table v-if="table"
      :headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"   >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.value }}</td>
        <td class="text-xs-center">{{ props.item.discount }}</td>
        <td class="right layout px-0">
          <v-btn icon class="mx-0" @click="dicountItem(props.item, props.index)">
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
<v-layout v-else row wrap>
  <v-flex xs12 sm12>
    <v-card>
      <v-container grid-list-xl fluid>
        <v-layout wrap row v-for="(pay, index) in payment" :key="index">
          <v-flex xs12 sm4 >
        <v-select
          v-model="pay.method"
          :items="['Dinheiro', 'Cartão', 'Fiado']"
          :error-messages="errors.collect('method')"
          v-validate="'required'"
          overflow
          label="Método"
          target="#dropdown-example"
        ></v-select>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1 >
            <v-text-field
              v-model="pay.value"
              class="input-group--focused"
              label="Valor"
              prefix="$"
              type="number"
              data-vv-name=""
              required
            ></v-text-field>
          </v-flex>
          <v-flex sm2 v-if="index==0">
            <v-btn fab dark small color="teal" @click="addMethod">
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
          <v-flex sm3 v-else>
            <v-btn fab dark small color="teal" @click="addMethod">
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn fab dark small color="red" @click="delMethod(pay)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      </v-card>
    </v-flex>
</v-layout>
    </v-flex>
    <v-flex xs6 sm3>
      <v-layout row>
        <v-flex>
              <v-card>
          <v-list one-line>
            <template v-for="(item) in items2">
              <v-list-tile :key="item.title">
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
        <v-layout>
        <v-flex sm6 v-if="!table">
        <v-btn block color="success" large dark @click.prevent="paymen">Voltar</v-btn>
         </v-flex>
         <v-spacer></v-spacer>
        <v-flex sm6 v-if="!table">
        <v-btn block color="primary" large dark @click.prevent="save">Finalizar</v-btn>
         </v-flex>
        <v-flex sm12 v-if="table">
            <v-btn block color="primary" large dark @click.prevent="paymen">Pagamento</v-btn>
         </v-flex>
        </v-layout>
    </v-flex>
</v-layout>
<v-layout row justify-center>
    <v-dialog v-model="dialog3" persistent max-width="500">
<v-card>
    <v-form @submit.prevent="submit2" ref="form">
      <v-card-title primary-title>
        <div class="headline">Desconto</div>
        <v-spacer></v-spacer>
        <div>{{productDiscount.name}}</div>
      </v-card-title>   
      <v-container grid-list-xl fluid>
        <v-layout wrap justify-space-around>
          <v-flex xs12 sm3>
                <v-text-field name="value" disabled
                 v-model="productDiscount.value"
                  prefix="$"
                  data-vv-name="value"
                  type="number"
                  required
                >                
                <div slot="label">
                Valor
                </div></v-text-field>
          </v-flex>
          <v-flex xs12 sm3>
                <v-text-field name="value"
                  v-model="productDiscount.percent"
                  :error-messages="errors.collect('value')"
                  suffix="%"
                  data-vv-name="value"
                  type="number"
                  required
                  @input="discountPercent"
                >            
                <div slot="label">
                Valor
                </div></v-text-field>
          </v-flex>
          <v-flex xs12 sm3>
                <v-text-field name="value"
                  v-model="productDiscount.total"
                  :error-messages="errors.collect('value')"
                  prefix="$"
                  data-vv-name="value"
                  type="number"
                  required
                  @input="discountValue"
                >                            
                <div slot="label">
                Valor
                </div></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-btn
          flat
          color="primary"
          type="submit"
        >Salvar</v-btn>
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
  import pay from '@/components/pdv/pay'
  export default {
    components: {pay},
    $_veeValidate: {
      validator: 'new'
    },
    data: () => ({
      customFilter (item, queryText, itemText) {
        const hasValue = val => val != null ? val : ''
        const text = hasValue(item.name)
        const query = hasValue(queryText)
        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },
      sale: {},
      result: [
        {text: 'Total', value: 0},
        {text: 'Desconto', value: 0},
        {text: 'Faltam', value: 0},
        {text: 'Troco', value: 0}
      ],
      item: {
        _id: '',
        name: ''
      },
      table: true,
      productDiscount: {
        name: '',
        value: null,
        percent: null,
        total: null,
        index: null
      },
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
      dictionary: {
        custom: {
          value: {
            required: () => 'O campo método de pagamento não pode estar vazio'
          }
        }
      }
    }),

    computed: {
      items2 () {
        this.result[0].value = 0
        this.result[1].value = 0
        this.result[3].value = 0
        this.$store.pdv.state.products.forEach(element => {
          this.result[1].value += element.discount
          this.result[0].value += element.value
        })
        this.result[2].value = this.result[1].value
        this.$store.pay.state.payment.forEach(element => {
          this.result[2].value -= element.value
        })
        if (this.result[2].value < 0) {
          this.result[3].value = this.result[2].value / -1
          this.result[2].value = 0
        }
        return this.result
      },
      items () {
        return this.$store.pdv.state.products
      },
      productDiscountTotal () {
        return this.productDiscount.value - (this.productDiscount.value * (this.productDiscount.percent / 100))
      },
      payment () {
        return this.$store.pay.state.payment
      },
      clients () {
        return this.$store.client.state.clients
      }
    },

    mounted () {
      this.initialize()
    },

    methods: {
      RedirectClient () {
        this.$router.push({name: 'clients.insert'})
      },
      initialize () {
        this.$store.client.dispatch('getAll')
        this.$store.product.dispatch('getAll')
        if (!this.$store.pay.state.payment.length) {
          this.$store.pay.commit('insert', {method: '', value: 0})
        }
      },

      dicountItem (item, index) {
        this.productDiscount.name = item.name
        this.productDiscount.value = item.value
        this.productDiscount.index = index
        this.dialog3 = true
      },

      deleteItem (item) {
        this.item = item
        this.dialog = true
      },

      confirmDelete () {
        this.$store.pdv.commit('removeOne', this.item)
        this.dialog = false
      },

      cancelDelete () {
        this.dialog3 = false
      },
      discountPercent () {
        this.productDiscount.total = this.productDiscount.value - (this.productDiscount.value * this.productDiscount.percent / 100)
      },

      discountValue () {
        this.productDiscount.percent = (this.productDiscount.total * 100 / this.productDiscount.value) - 100
        if (this.productDiscount.percent < 0) {
          this.productDiscount.percent = this.productDiscount.percent / -1
        }
      },

      submit2 () {
        let data = {
          index: this.productDiscount.index,
          discount: this.productDiscount.total
        }
        this.$store.pdv.commit('addDiscount', data)
        this.dialog3 = false
        this.productDiscount.total = null
        this.productDiscount.percent = null
      },
      clear () {
        this.dialog3 = false
        this.productDiscount.total = null
        this.productDiscount.percent = null
      },
      addProduct: function () {
        this.$store.pdv.dispatch('getOne', this.search)
        this.search = ''
      },
      paymen () {
        this.result[2].value = this.result[1].value
        this.result[3].value = 0
        this.table = !this.table
      },
      addMethod () {
        this.$store.pay.commit('insert', {method: 'Dinheiro', value: 0})
      },
      delMethod (data) {
        this.$store.pay.commit('removeOne', data)
      },
      save () {
        this.sale.products = this.items
        this.sale.pays = this.payment
        console.log(this.sale)
        this.$store.sale.dispatch('postsale', this.sale).then((res) => {
          console.log(res)
          this.sale.pays.forEach(p => {
            if (p.method === 'Fiado') {
              let data = {
                id: this.sale.client,
                client: {
                  io: false,
                  value: p.value,
                  date: '2010-10-10'
                }
              }
              this.$store.client.dispatch('postDetails', data).then((response) => {
                console.log(response)
              })
            }
          })
        })
        this.$validator.validateAll()
        this.$store.pdv.commit('reset')
        this.table = !this.table
        this.$store.pay.commit('reset')
        this.initialize()
      }
    }
  }
</script>