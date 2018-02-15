<template>
<div class="container">
  <div class="col s12 z-depth-4 card-panel">
      <form class="login-form" @submit.prevent="save()">
        <div class="row">
          <div class="input-field col s12 center">
          <h5 class="center login-form-text">Venda {{sale.code}}</h5>
        </div>
        </div>
        <div class="row margin">
          <div class="input-field col s8">
            <input type="text"  class="validate" required id="prodcutName" v-focus>
            <label class="active">Cliente</label>
          </div>
          <div class="input-field col s4">
            <input type="text"  class="validate" required id="prodcutName" v-focus>
            <label class="active">Data</label>
          </div>
        </div>
        <div>
          <table>
            <thead>
                <tr>
                  <th>Produto</th>
                  <th>valor</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="line in sale.products">
                <td>{{line.name}}</td>
                <td>{{line.value}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="row">
          <div class="input-field col s4">
            <button class="btn waves-effect waves-light left col s12 blue"  type="submit" >Salvar</button>
          </div>
          <div class="input-field col s4">
            <router-link to="/sales" class="btn waves-effect waves-light left col s12 red">Cancelar</router-link>
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
      this.$store.sale.dispatch('put', this.sale).then(() => {
        this.$router.push('/sales')
      })
    }
  },
  created () {
    this.$store.sale.dispatch('getAll', this.$route.params.id)
  },
  computed: {
    sale: function () {
      return this.$store.sale.state.sale
    }
  }
}
</script>