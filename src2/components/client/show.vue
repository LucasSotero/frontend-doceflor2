<template>
<div class="container">
  <div class="row margin"></div>
    <div class="row">
      <div class="input-field col s4">
        <v-a href="#/clients/new">novo</v-a>
      </div>
      <div class="input-field right col s4">
        <label for="autocomplete">Buscar</label>
      </div>
    </div>
    <v-table :list="tableClients" :headers="header"></v-table>
</div>
</template>

<script>
export default {
  name: 'client-show',
  data () {
    return {
      header: ['Nome']
    }
  },
  computed: {
    tableClients: function () {
      return this.$store.client.state.clients
    }
  },
  mounted () {
    this.$store.client.dispatch('getAll')
  },
  methods: {
    tableSubject: function (id) {
      this.$router.push('/clients/details/' + id)
    },
    tableEdit: function (id) {
      this.$router.push('/clients/view/' + id)
    },
    tableDelete: function (id) {
      this.$store.client.dispatch('remove', id)
    }
  }
}
</script>
