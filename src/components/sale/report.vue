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
        v-model="form.methods"
        label="Método"
        chips
        tags
        :items="methods"
      ></v-select>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex md2 >
      <v-btn color="primary" @click="table()">Buscar</v-btn>
      <download-excel v-if="tablet"
        class= "btn success"
        :data="items"
        :fields="{'Método':'method','valor':'value'}"
        :meta="[{'key':'charset', 'value': 'utf-8'}]"
        name="Relatorio.xls"
      >excel
      </download-excel>
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
      <td class="text-md-center">{{ props.item.method }}</td>
      <td class="text-md-center">{{ props.item.value }}</td>
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
        { text: 'Método', align: 'left', value: 'method' },
        { text: 'valor', value: 'value' }
      ],
      tablet: false,
      form: {
        start: undefined,
        end: undefined,
        methods: undefined,
        products: undefined,
        clients: undefined
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
        return this.$store.sale.state.sales
      }
    },
    methods: {
      table () {
        this.tablet = true
        this.$store.sale.dispatch('report', this.form)
      }
    }

  }
</script>
