<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      clipped
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.text" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
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
        { icon: 'shopping_cart', text: 'Vendas' },
        { icon: 'person', text: 'Clientes' },
        { icon: 'shopping_basket', text: 'Produtos' },
        { icon: 'pie_chart', text: 'Relatórios' }
      ]}),
    props: {
      source: String
    }
  }
</script>