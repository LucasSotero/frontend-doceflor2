<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      clipped
      v-model="drawer"
      class="pink lighten-4"
      app
      dark
    >
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.text" @click="redirect(item.action)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="red lighten-1"
      dark
      dense
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">DoceFlor</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer color="#bababa" :fixed="fixed" app>
      <span>&copy; 2018 Lucas Sotero</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      fixed: false,
      items: [
        { icon: 'shopping_cart', title: 'Vendas', action: 'sales.show' },
        { icon: 'person', title: 'Clientes', action: 'clients.show' },
        { icon: 'shopping_basket', title: 'Produtos', action: 'products.show' },
        { icon: 'pie_chart', title: 'Relatórios', action: 'reports.show' }
      ]}),
    props: {
      source: String
    },
    methods: {
      redirect (action) {
        this.$router.push({name: action})
      }
    }
  }
</script>