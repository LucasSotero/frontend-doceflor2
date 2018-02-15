<template>
<div class="container teste">
  <div class="col s12 z-depth-4 card-panel">
      <form class="login-form" @submit.prevent="save()">
        <div class="row">
          <div class="input-field col s12 center">
          <h5 class="center login-form-text">Editar Cliente</h5>
        </div>
        </div>
        <div class="row margin">
          <div class="input-field col s12">
            <input class="active validate" type="text" required v-model="client.name">
            <label>Name*</label>
          </div>
        </div>
        <div class="row margin">
          <div class="input-field col s1">
            <button class="btn waves-effect waves-light left col s12" @click.prevent="phones++"><i class="material-icons">add</i></button>
          </div>
        </div>
        <div class="row margin">
          <div class="input-field col s12">
            <input class="active validate" type="text" v-model="client.address">
            <label>Endereço</label>
          </div>
        </div>
        <div class="row margin">
          <div class="input-field col s12">
            <input class="active validate" type="text" v-model="client.complement">
            <label>Observações</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s4">
            <button class="btn waves-effect waves-light left col s12 blue"  type="submit" >Salvar</button>
          </div>
          <div class="input-field col s4">
            <router-link to="/clients" class="btn waves-effect waves-light left col s12 red">Cancelar</router-link>
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
      client: {},
      phones: 0
    }
  },
  methods: {
    save: function () {
      this.$store.client.dispatch('put', this.client).then(() => {
        this.$router.push('/clients')
      })
    }
  },
  created () {
    this.$store.client.dispatch('getOne', this.$route.params.id)
  },
  computed: {
    client: function () {
      return this.$store.client.state.client
    }
  }
}
</script>
