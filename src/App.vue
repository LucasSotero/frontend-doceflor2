<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      clipped
      v-model="drawer"
      app
    >
      <v-list>
             <v-list-group
              v-model="item.active"
              v-for="item in items"
              :key="item.title"
              :prepend-icon="item.action"
              no-action
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="redirect(subItem.router)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>{{ subItem.action }}</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
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
    <v-content color="#bababa" >
      <router-view/>
    </v-content>
    <v-footer height="auto">
    <v-card
      flat
      tile
      class="red lighten-3 white--text text-xs-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          icon
          class="mx-3 white--text"
        >
          <v-icon size="24px">fa-facebook</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>
      <v-card-text class="white--text">
        &copy;2018 — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      fixed: false,
      items: [
        {
          action: 'shopping_cart',
          title: 'Vendas',
          items: [
            { title: 'Nova Venda', router: 'sales.insert' },
            { title: 'Vendas', router: 'sales.show' },
            { title: 'Relatórios', router: 'sales.report' }
          ]
        },
        {
          action: 'person',
          title: 'Clientes',
          items: [
            { title: 'Novo cliente', router: 'clients.insert' },
            { title: 'Clientes', router: 'clients.show' },
            { title: 'Relatórios', router: 'clients.report' }
          ]
        },
        {
          action: 'shopping_basket',
          title: 'Produtos',
          items: [
            { title: 'Novo Produto', router: 'products.insert' },
            { title: 'Produtos', router: 'products.show' },
            { title: 'Relatórios', router: 'products.report' }
          ]
        }
      ],
      icons: ['fa-facebook', 'fa-twitter', 'fa-google-plus', 'fa-linkedin', 'fa-instagram']
    }),
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