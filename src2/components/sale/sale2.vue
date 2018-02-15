<template>
<v-div>
  <div class="col s12">
    <div class="row z-depth-1 white">
      <div class="input-field col s3">
        <input id="last_name" placeholder="Código de Barras" type="text" @keyup.enter="addProduct" v-model="barcode" v-focus>
      </div>
      <div class="row col s9">
        <div class="input-field col s3 right">
          <div>
            <span class="teal-text text-darken-4 ">Cliente Padrão</span>
            <v-button-small name="add" @click="add"></v-button-small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col s12">
    <div class="col s9">
      <v-table :headers="['Código', 'Nome', 'Valor']" :list="products"></v-table>
    </div>
    <div class="center">
      <div class="col s3 right">
        <ul class="collection with-header">
          <li class="collection-item dismissable"><div>Total<a class="secondary-content">{{total}}</a></div></li>
          <li class="collection-item dismissable"><div>Desconto<a class="secondary-content">{{total}}</a></div></li>
        </ul>
        <v-button @click="payment">pagamento</v-button>
      </div>
    </div>
    <modal></modal>
  </div>
</v-div>
</template>

<script>
import modal from '@/components/sale/modal-sale'
import $ from 'jquery'
export default {
  components: {modal: modal},
  data () {
    return {
      barcode: undefined,
      sale: {
        methods: [],
        products: []
      }
    }
  },
  methods: {
    payment: function () {
      $('.modal').modal()
      $('#payment').modal('open')
      $('.trigger-modal').modal()
    },
    addProduct: function () {
      this.$store.pdv.dispatch('getOne', this.barcode)
      this.barcode = ''
    },
    tableDelete: function (key) {
      this.$store.pdv.commit('removeOne', key)
    },
    createSale: function () {
      this.sale.products = this.$store.pdv.state.products
      console.log(this.sale)
      this.$store.sale.dispatch('postsale', this.sale).then((res) => {
        console.log('RES' + res)
      })
    }
  },
  computed: {
    products: function () {
      return this.$store.pdv.state.products
    },
    total: function () {
      let sum = 0
      this.$store.pdv.state.products.forEach(element => {
        sum += element[3]
      })
      return sum
    }
  }
}
</script>

<style>
body {
  background-color: #fafafa;
}
</style>
