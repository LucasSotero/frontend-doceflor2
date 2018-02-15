<template>
  <div id="app">
    <nav>
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo right">Logo</router-link>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li><router-link to="/sale">Nova Venda</router-link></li>
        <li><router-link to="/clients">Clientes</router-link></li>
        <li><router-link to="/products">Produtos</router-link></li>
        <li><router-link to="/sales">Vendas</router-link></li>
      </ul>
    </div>
  </nav>
  <div>
    <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>


