<template>
<div class="container">
  <v-table :list="tableProducts" :headers="header"></v-table>
</div>
</template>

<script>
export default {
  name: 'product-show',
  data () {
    return {
      header: ['Código', 'Descrição', 'Valor']
    }
  },
  computed: {
    tableProducts: function () {
      return this.$store.product.state.products
    }
  },
  mounted () {
    this.$store.product.dispatch('getAll')
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

</style>
