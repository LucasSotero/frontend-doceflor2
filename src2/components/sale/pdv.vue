<template>
<div class="row ">
<div class="row"></div>
<div class="col s12">
        <div class="row z-depth-1">
        <div class="input-field col s3">
          <input id="last_name" placeholder="Código de Barras" type="text" class="validate" @keyup.enter="addProduct" v-model="barcode" v-focus>
        </div>
        <div class="row col s9">
          <div class="input-field col s3 right">
            <div><span class="teal-text text-darken-4 ">Cliente Padrão</span>
              <button class="btn cyan waves-effect btn-small waves-light right"><i class="material-icons">add</i></button>
            </div>
          </div>
        </div>
      </div>
</div>
<div class="row"></div>
<div class="col s12">
  <div class="col s9">
    <div class="row col s12 z-depth-1">
      <div class="col s12">
        <v-table :headers="['Código', 'Nome', 'Valor']" :list="products"></v-table>
      </div>
    </div>
  </div>
  <div class="center">
    <div class="col s3 right">
    <table class="bordered">
      <thead><tr></tr></thead>
      <tbody>
        <tr>
          <td class="red-text center left"><h5>Total: R$ </h5></td>
          <td class="red-text center right"><h5>{{total}}</h5></td>
        </tr>
        <tr>
          <td class="black-text center left"><h5>Desconto: R$ </h5></td>
          <td class="black-text center right"><h5>{{total}}</h5></td>
        </tr>
      </tbody>
    </table>
    <div class="row"></div>
    <button type="submit" class=" modal-action modal-close waves-effect btn col s12 btn-large" @click="payment">Pagamento</button>
  </div>
  </div>
  <div id="payment" class="modal">
    <form class="col s12"  @submit.prevent="createSale">
      <div class="modal-content">
        <div class="row">
          <div class="col s1"></div>
          <div class="input-field col s4">
            <button type="submit" class=" modal-action modal-close waves-effect btn btn-large blue col s12"><i class="material-icons right">attach_money</i>Dinheiro</button>
          </div>
          <div class="col s2"></div>
          <div class="input-field col s4">
            <input type="number" class="validate" v-model="sale.methods.money">
            <label>Dinheiro</label>
          </div>
        </div>
        <div class="row">
          <div class="col s1"></div>
          <div class="input-field col s4">
            <button type="submit" class=" modal-action modal-close waves-effect btn btn-large blue col s12"><i class="material-icons right">credit_card</i>Cartão</button>
          </div>
          <div class="col s2"></div>
          <div class="input-field col s4">
            <input type="number" class="validate" v-model="sale.methods.card">
            <label>Cartão</label>
          </div>
        </div>
        <div class="row">
          <div class="col s1"></div>
          <div class="input-field col s4">
            <button type="submit" class=" modal-action modal-close waves-effect btn btn-large blue col s12"><i class="material-icons right">local_offer</i>Fiado</button>
          </div>
          <div class="col s2"></div>
          <div class="input-field col s4">
            <input type="number" class="validate" v-model="sale.methods.spun">
            <label>Fiado</label>
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
      barcode: null,
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
    delProduct: function (key) {
      this.$store.pdv.commit('removeOne', key)
    },
    discount: function (key) {
      let result = {
        key: key,
        data: 1
      }
      this.$store.pdv.commit('updateValue', result)
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
        sum += element.value
      })
      return sum
    }
  }
}
</script>

<style>
.btn-small {
    height: 24px;
    line-height: 24px;
    padding: 0 0.5rem;
}
.center-padding {
  text-align: right;
  padding: 2.5%;
}
</style>
