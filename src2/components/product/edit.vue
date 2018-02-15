<template>
<div class="container">
  <div class="col s12 z-depth-4 card-panel">
      <form class="login-form" @submit.prevent="save()">
        <div class="row">
          <div class="input-field col s12 center">
          <h5 class="center login-form-text">Editar Produto</h5>
        </div>
        </div>
        <div class="row margin">
          <div class="input-field col s12">
            <input type="text"  class="validate" required id="prodcutName" v-focus v-model="product.name">
            <label class="active">Descrição*</label>
          </div>
        </div>
        <div class="row margin">
          <div class="input-field col s5">
            <input type="text"  class="validate" required v-model="product.barCode">
            <label class="active">Código de Barras</label>
          </div>
          <div class="input-field col s3">
          </div>
          <div class="input-field col s4">
            <input type="number"  class="validate" required v-model="product.value">
            <label class="active">Valor</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s4">
            <button class="btn waves-effect waves-light left col s12 blue"  type="submit" >Salvar</button>
          </div>
          <div class="input-field col s4">
            <router-link to="/products" class="btn waves-effect waves-light left col s12 red">Cancelar</router-link>
          </div>
        </div>
      </form>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    save: function () {
      this.$store.product.dispatch('put', this.product).then(() => {
        this.$router.push('/products')
      })
    }
  },
  created () {
    this.$store.product.dispatch('getOne', this.$route.params.id)
  },
  computed: {
    product: function () {
      return this.$store.product.state.product
    }
  }
}
</script>
