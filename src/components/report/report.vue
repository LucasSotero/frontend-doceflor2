<template>
  <v-tabs fixed-tabs>
    <v-tab v-for="n in header" :key="n">
      {{n}}
    </v-tab>
    <v-tab-item>
      
    </v-tab-item>
    <v-tab-item>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Pesquise..."
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="sales"
        hide-actions
        class="elevation-1"
        :search="search"
      >
        <template slot="items" slot-scope="props">
          <td class="text-md-center">{{ props.item.barCode }}</td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.value }}</td>
        </template>
        <template slot="no-data">
          <v-btn color="primary"></v-btn>
        </template>
      </v-data-table>
    </v-tab-item>
    <v-tab-item>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Pesquise..."
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="products"
        hide-actions
        class="elevation-1"
        :search="search"
      >
        <template slot="items" slot-scope="props">
          <td class="text-md-center">{{ props.item.barCode }}</td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.value }}</td>
        </template>
        <template slot="no-data">
          <v-btn color="primary"></v-btn>
        </template>
      </v-data-table>
    </v-tab-item>
    <v-tab-item>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Pesquise..."
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="clients"
        hide-actions
        class="elevation-1"
        :search="search"
      >
        <template slot="items" slot-scope="props">
          <td class="text-md-center">{{ props.item.barCode }}</td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.value }}</td>
        </template>
        <template slot="no-data">
          <v-btn color="primary"></v-btn>
        </template>
      </v-data-table>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      headers: [
        { text: 'Código', align: 'left', value: 'barCode' },
        { text: 'Descrição', value: 'name' },
        { text: 'Valor', value: 'value' }
      ],
      header: ['Vendas', 'Produtos', 'Clientes']
    }
  },
  computed: {
    products () {
      return this.$store.product.state.products
    },
    clients () {
      return this.$store.client.state.clients
    },
    sales () {
      return this.$store.sale.state.sales
    }
  },
  mounted () {
    this.$store.product.dispatch('getAll')
  },

  methods: {
    initialize () {
      return this.$store.product.dispatch('getAll')
    }
  }
}
</script>

