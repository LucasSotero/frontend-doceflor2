<template>
<div class="container">
  <div class="row margin"></div>
    <div class="row">
      <div class="input-field col s4">
        <a class="waves-effect waves-light btn" href="#/products/new">Novo</a>
      </div>
      <div class="input-field right col s4">
        <input type="text" id="autocomplete" class="autocomplete">
        <label for="autocomplete">Buscar</label>
      </div>
    </div>
  <table>
    <thead>
      <tr>
        <th>Código de barras</th>
        <th>Descrição</th>
        <th>Valor</th>
        <th class="center-padding">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="sale in sales" :key="sale[0]">
        <td>{{sale[1]}}</td>
        <td>{{sale[2]}}</td>
        <td>{{sale[3]}}</td>
        <td class="right">
          <a class="waves-effect waves-light btn-small green btn" @click="stock(sale[0])"><i class="material-icons">subject</i></a>
          <a class="waves-effect waves-light btn-small blue btn" @click="details(sale[0])"><i class="material-icons">edit</i></a>
          <a class="waves-effect waves-light btn-small red btn" @click="del(sale[0])"><i class="material-icons">delete</i></a>
        </td>
      </tr>
    </tbody>
  </table>
  <a class="waves-effect waves-light btn-small red btn" @click="testo()"><i class="material-icons">delete</i></a>
  <v-table :list="list" :testes="del()"></v-table>
</div>
</template>


<script>
import $ from 'jquery'
export default {
  name: 'sale-show',
  data () {
    return {
      list: [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
      ]
    }
  },
  computed: {
    sales: function () {
      return this.$store.sale.state.sales
    }
  },
  mounted () {
    this.$store.sale.dispatch('getAll').then(() => {
      var teste = this.$store.sale.state.sales
      teste.forEach(element => {
        console.log(element)
      })
    })
    var teste = {
      'Apple': null,
      'Microsoft': null,
      'Google': 'https://placehold.it/250x250'
    }
    $(function () {
      $('input.autocomplete').autocomplete({
        data: teste,
        limit: 20
      })
    })
  },
  methods: {
    testo () {
      console.log('teste')
    },
    del: function (id) {
      this.$store.sale.dispatch('remove', id).then(() => {
      })
    },
    details: function (id) {
      this.$router.push('/sales/view/' + id)
    },
    inventoryMovement: function (id) {
      $('.modal').modal()
      $('#inventoryMovement').modal('open')
      $('.trigger-modal').modal()
    },
    saveInventoryMovement: function () {
      alert('123')
    },
    stock: function (id) {
      this.$router.push('/sales/details/' + id)
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
