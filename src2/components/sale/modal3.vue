<template>
<v-div>
    <div>
        <div class=" container  z-depth-1 white  col s8">
            <div class="container">
                <div class="row">
                    <div class="input-field col s4 left">
                        <v-button><i class="material-icons right">local_offer</i>Fiado</v-button>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s4 left">
                        <v-button><i class="material-icons right">local_offer</i>Fiado</v-button>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s4 left">
                        <v-button><i class="material-icons right">local_offer</i>Fiado</v-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
          <div class="center">
      <div class="col s4 right">
        <ul class="collection with-header">
          <li class="collection-item dismissable"><div>Total<a class="secondary-content">{{total}}</a></div></li>
          <li class="collection-item dismissable"><div>Desconto<a class="secondary-content">{{total}}</a></div></li>
        </ul>
        <div class="row">
          <div class="col s11 S">
            <v-button classadd="col s6 left" @click="products">Voltar</v-button>
          <v-button classadd="col s6 blue right" @click="save">Finalizar</v-button>
          </div>
        </div>          
      </div>
    </div>
  </v-div>
</template>

<script>
export default {
  name: 'modal',
  methods: {
    save () {
      this.$router.push('/sale')
    },
    products () {
      this.$router.push('/sale')
    }
  }
}
</script>

<style>
</style>
