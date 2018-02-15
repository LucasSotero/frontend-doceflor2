<template>
<div class="row">
  <div class="row"></div>
  <div class="col s12">
    <div class="row z-depth-1 white">
      <div class="input-field col s3">
        <input id="last_name" placeholder="Código de Barras" type="text" @keyup.enter="addProduct" v-model="barcode" v-focus>
      </div>
      <div class="row col s9">
        <div class="input-field col s3 right">
          <div>
            <span class="teal-text text-darken-4 ">Cliente Padrão</span>
            <v-button-small name="add" @click="addClient"></v-button-small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col s12">
    <div class="col s9">
      {{products}}
      <v-table :list2="list" :headers="header" name="product"></v-table>
    </div>
    <div class="center">
      <div class="col s3 right">
        <ul class="collection with-header">
          <li class="collection-item dismissable"><div>Total<a class="secondary-content">{{total}}</a></div></li>
          <li class="collection-item dismissable"><div>Desconto<a class="secondary-content">{{discount2}}</a></div></li>
        </ul>
        <v-button classadd="col s12" @click="payment">pagamento</v-button>
      </div>
    </div>
    <div id="payment" class="modal">  
    <form class="col s12"  @submit.prevent="discount">
      <div class="modal-content container">
        <div class="row">
          <div class="input-field col s12 center">
            <h5 class="center login-form-text">{{productDiscount.data[1]}}</h5>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input type="number" v-model="discountValue">
            <label>Desconto em valor</label>
          </div>
          <div class="col s2"></div>
          <div class="input-field col s6">
            <input type="number" v-model="discountPorcent">
            <label>Desconto em %</label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="submit" class=" modal-action modal-close waves-effect btn">Salvar</button>
      </div>
    </form>
  </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      barcode: undefined,
      sale: {
        methods: [],
        products: []
      },
      header: ['Nome', 'Valor', 'Desconto'],
      productDiscount: {
        key: undefined,
        data: []
      },
      discountValue: undefined,
      discountPorcent: undefined
    }
  },
  methods: {
    addClient () {
      this.$router.push('/sales')
    },
    payment () {
      this.$router.push('/sales/modal')
    },
    addProduct () {
      this.$store.pdv.dispatch('getOne', this.barcode)
      this.barcode = ''
    },
    productEdit (data, key) {
      $('.modal').modal()
      $('#payment').modal('open')
      $('.trigger-modal').modal()
      this.productDiscount.key = key
      this.productDiscount.data = this.products[key]
    },
    productDelete (key, id) {
      this.$store.pdv.commit('removeOne', key)
    },
    discount () {
      this.productDiscount.data[3] = this.productDiscount.data[2] - this.discountValue
      this.$store.pdv.commit('updateValue', this.productDiscount)
      this.productDiscount.key = undefined
      this.productDiscount.data = []
      console.log(this)
    },
    createSale () {
      this.sale.products = this.$store.pdv.state.products
      console.log(this.sale)
      this.$store.sale.dispatch('postsale', this.sale).then((res) => {
        console.log('RES' + res)
      })
    }
  },
  computed: {
    list: function () {
      return this.$store.pdv.state.products
    },
    total: function () {
      let sum = 0
      this.$store.pdv.state.products.forEach(element => {
        sum += element[2]
      })
      return sum
    },
    discount2: function () {
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
