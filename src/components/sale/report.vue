<template>
<v-container fluid>
  <v-card>
    <v-card-title>
  <v-layout >
    <v-spacer></v-spacer>
    <v-flex md1>
          <v-menu
        lazy
        :close-on-content-click="true">
        <v-text-field
          required
          slot="activator"
          label="Data inicial"
          v-model="form.start"
        ></v-text-field>
        <v-date-picker
          locale="pt-br"
          no-title
          v-model="form.start"
        >
        </v-date-picker>
      </v-menu>      
    </v-flex>
    <v-flex></v-flex>
        <v-flex md1>
          <v-menu
        lazy
        :close-on-content-click="true">
        <v-text-field
          required
          slot="activator"
          label="Data Final"
          v-model="form.end"
        ></v-text-field>
        <v-date-picker
          locale="pt-br"
          no-title
          v-model="form.end"
        >
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex md3>
      <v-select
        v-model="select"
        label="Método"
        chips
        tags
        :items="items2"
      ></v-select>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex md3>
      <v-select
        v-model="select"
        label="Produtos"
        chips
        tags
        :items="items"
      ></v-select>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex md2 >
      <v-btn color="success" @click="table()">Buscar</v-btn>
      <v-btn color="primary" v-if="tablet">Excel</v-btn>
    </v-flex>
  </v-layout>
  </v-card-title>
  </v-card>
  <v-layout row wrap v-if="tablet">
    <v-flex md12>
      <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.name }}</td>
    </template>
  </v-data-table>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  export default {
    data: () => ({
      headers: [
        { text: 'Método', align: 'left', value: 'barCode' },
        { text: 'Produto', value: 'name' },
        { text: 'valor', value: 'value' }
      ],
      tablet: false,
      form: {
        start: undefined,
        end: undefined
      },
      select: [],
      methods: [
        'Dinheiro',
        'Cartão',
        'Fiado'
      ]
    }),
    computed: {
      items () {
        return this.$store.product.state.products
      }
    },
    mounted () {
      return this.$store.product.dispatch('getAll')
    },
    methods: {
      table () {
        this.tablet = !this.tablet
        this.$store.sale.dispatch('report', this.form)
      }
    }

  }
</script>
