<template>
<div class="container">
  <div class="row margin"></div>
    <div class="row">
      <div class="input-field col s4">
        <v-a href="#/sales/new">novo</v-a>
      </div>
      <div class="input-field right col s4">
        <label for="autocomplete">Buscar</label>
      </div>
    </div>
    <v-table :list="tableSales" :headers="header"></v-table>
</div>
</template>

<script>
export default {
  name: 'sale-show',
  data () {
    return {
      header: ['Código', 'Descrição', 'Valor']
    }
  },
  computed: {
    tableSales: function () {
      return this.$store.sale.state.sales
    }
  },
  mounted () {
    this.$store.sale.dispatch('getAll')
  },
  methods: {
    tableSubject: function (id) {
      this.$router.push('/sales/details/' + id)
    },
    tableEdit: function (id) {
      this.$router.push('/sales/view/' + id)
    },
    tableDelete: function (id) {
      this.$store.sale.dispatch('remove', id).then(() => {
      })
    }
  }
}
</script>
