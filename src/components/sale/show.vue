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
        <td class="text-md-center">{{ props.item.date }}</td>
        <td class="text-md-center">{{ props.item.code }}</td>
        <td class="text-xs-center" v-if="props.item.client">{{ props.item.client }}</td>
        <td class="text-xs-center" v-if="!props.item.client">-</td>
        <td class="text-xs-center">{{ props.item.value }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="viewItem(props.item)">
            <v-icon color="blue">subject</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
      <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card>
        <v-card-title class="headline error white--text" >Excluir</v-card-title>
        <v-card-text class="text-md-center">
            Deseja excluir a venda <b>{{item.code}}</b> ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="cancelDelete">Cancelar</v-btn>
          <v-btn color="error" flat @click="confirmDelete">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
</v-container>
</template>

<script>
  export default {
    data: () => ({
      item: {
        id: '',
        name: ''
      },
      dialog: false,
      search: '',
      headers: [
        { text: 'Data', align: 'left', value: 'date' },
        { text: 'Código', value: 'code' },
        { text: 'cliente', value: 'client' },
        { text: 'Valor', value: 'value' },
        { text: 'Ações', value: 'actions', sortable: false, align: 'center' }
      ]
    }),

    computed: {
      items () {
        return this.$store.sale.state.sales
      }
    },

    mounted () {
      this.initialize()
    },

    methods: {
      initialize () {
        return this.$store.sale.dispatch('getAll')
      },

      newItem () {
        this.$router.push({name: 'pdv'})
      },

      viewItem (item) {
        this.$router.push({name: 'sales.details', params: {id: item.id}})
      },

      editItem (item) {
        this.$router.push({name: 'sales.details', params: {id: item.id}})
      },

      deleteItem (item) {
        this.item = item
        this.dialog = true
      },

      confirmDelete () {
        this.$store.sale.dispatch('remove', this.item.id).then(() => {
          this.dialog = false
        })
      },

      cancelDelete () {
        this.dialog = false
      }

    }
  }
</script>