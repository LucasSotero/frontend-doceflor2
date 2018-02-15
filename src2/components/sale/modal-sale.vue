<template>
<v-div>
    <div>
        <div class=" container  z-depth-1 white  col s8">
            <div class="container">
                <div class="row col s5 right">             
                    <div class="input-field col s12">
                      <input type="number" class="validate col s11">
                      <label>Dinheiro</label>
                      <keyboard></keyboard>
                    </div>      
                </div>
                  <div class="row">
                <div class="col s7 left" v-for="(pay, index) in methodsPayment" :key="index">
                    <div class="input-field col s12 left">
                        <v-button classadd="col s8"><i class="material-icons right">{{iconsPayment[index]}}</i>{{pay}}</v-button>
                    </div>
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
      <div class="row"></div>
      <div class="row">
        <div class="col s8">
          <div>
            <v-table name="pay" :headers="['Tipo', 'Valor']" :list="payment"></v-table>
          </div>     
        </div>
      </div>
    </div>
  </v-div>
</template>

<script>
import keyboard from '@/components/sale/keyboard'
export default {
  components: {keyboard},
  name: 'modal',
  data () {
    return {
      methodsPayment: ['dinheiro', 'cartão', 'fiado'],
      iconsPayment: ['attach_money', 'credit_card', 'local_offer'],
      payment: []
    }
  },
  methods: {
    save () {
      this.$router.push('/sale')
    },
    products () {
      this.$router.push('/sale')
    },
    payDelete () {

    }
  }
}
</script>

<style>
</style>
