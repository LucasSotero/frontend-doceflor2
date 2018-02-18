<template>
<v-container>
  <div>
    <v-card-title>
      <v-btn color="success" dark slot="activator" class="mb-2"  @click="newItem">Novo</v-btn> 
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
      :items="items"
      hide-actions
      class="elevation-1"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td class="text-md-center">{{ props.item.barCode }}</td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.value }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0">
            <v-icon color="teal" @click="tableSubject">subject</v-icon>
          </v-btn>
          <v-btn icon class="mx-0">
            <v-icon color="light-blue" @click="tableEdit">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0">
            <v-icon color="pink" @click="tableDelete">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</v-container>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      search: '',
      headers: [
        { text: 'Código', align: 'left', value: 'barCode' },
        { text: 'Descrição', value: 'name' },
        { text: 'Valor', value: 'value' },
        { text: 'Ações', value: 'name', sortable: false, align: 'center' }
      ]
    }),

    computed: {
      items () {
        return this.$store.product.state.products
      }
    },

    mounted () {
      this.initialize()
    },

    methods: {
      initialize () {
        return this.$store.product.dispatch('getAll')
      },

      newItem () {
        this.$router.push({name: 'products.insert'})
      },

      tableSubject () {
        alert('test')
        this.$router.push({name: 'products.details'})
      },
      tableEdit () {
        this.$router.push('/products/view/' + 1)
      },
      tableDelete () {
        this.$store.product.dispatch('remove', 1).then(() => {
        })
      }
    }
  }
</script>