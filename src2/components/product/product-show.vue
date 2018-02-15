<template>
<div class="container">
  <div class="row margin"></div>
    <div class="row">
      <div class="input-field col s4">
        <a class="waves-effect waves-light btn" href="#/products/new">Novo</a>
      </div>
      <div class="input-field right col s4">
        <label for="autocomplete">Buscar</label>
      </div>
    </div>
    <v-table :list="tableProducts" :header="['Código', 'Nome', 'Valor']"></v-table>
</div>
</template>


<script>
import $ from 'jquery'
export default {
  name: 'product-show',
  data () {
    return {
    }
  },
  computed: {
    tableProducts: function () {
      return this.$store.product.state.products
    }
  },
  created () {
  },
  mounted () {
    this.$store.product.dispatch('getAll')
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
    tableSubject: function (id) {
      this.$router.push('/products/details/' + id)
    },
    tableEdit: function (id) {
      this.$router.push('/products/view/' + id)
    },
    tableDelete: function (id) {
      this.$store.product.dispatch('remove', id).then(() => {
      })
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
