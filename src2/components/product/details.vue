<template>
<div class="container">
  <div class="row margin"></div>
    <a class="waves-effect waves-light btn" @click="register()">Novo</a>
  <table>
    <thead>
      <tr>
        <th>Data</th>
        <th>Quantidade</th>
        <th>Valor</th>
        <th>Tipo</th>
        <th class="center-padding">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="line in product.history" :key="line">
        <td>{{line.date}}</td>
        <td>{{line.amount}}</td>
        <td>{{line.value}}</td>
        <td v-if="line.io">Entrada</td>
        <td v-else>Saída</td>
        <td class="right">
          <a class="waves-effect waves-light btn-small red btn" @click="del(line._id)"><i class="material-icons">delete</i></a>
        </td>
      </tr>
    </tbody>
  </table>
  <div id="inventoryMovement" class="modal">
    <form class="col s12"  @submit.prevent="save">
      <div class="modal-content">
        <div class="row">
          <div class="input-field col s3">
            <input type="text" class="validate" v-focus v-model="newProduct.date">
            <label>Data</label>
          </div>
          <div class="input-field col s3">
            <input type="number" class="validate" v-model="newProduct.value">
            <label>Custo</label>
          </div>
          <div class="col s1"></div>
          <div class="input-field col s3">
            <input type="number" class="validate" v-model="newProduct.amount">
            <label>Quantidade</label>
          </div>
          <div class="input-field col s2">
            <a class="waves-effect waves-light red left col s12 btn"><i class="material-icons">delete</i></a>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="submit" class=" modal-action modal-close waves-effect btn">Salvar</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      newProduct: {}
    }
  },
  methods: {
    register: function () {
      $('.modal').modal()
      $('#inventoryMovement').modal('open')
      $('.trigger-modal').modal()
    },
    del: function (id) {
      let result = {
        id: this.$route.params.id,
        product: {
          _id: id
        }
      }
      this.$store.product.dispatch('putDetails', result)
    },
    save: function () {
      let result = {
        id: this.$route.params.id,
        product: this.newProduct
      }
      this.newProduct = {}
      this.$store.product.dispatch('postDetails', result)
    }
  },
  created () {
    this.$store.product.dispatch('getDetails', this.$route.params.id)
  },
  computed: {
    product: function () {
      return this.$store.product.state.product
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
thead {
    height:50px;
    background:#F0F0F0;
    border:1px solid #CCC;
    width:12;
    margin:0px auto;
}
</style>
