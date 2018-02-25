<template>
<v-container fluid grid-list-md>
<v-layout row wrap>
  <v-flex xs12 sm12>
    <v-card>
      <v-container grid-list-xl fluid>
        <v-layout wrap row v-for="(pay, index) in payment" :key="index">
          <v-flex xs12 sm4 >
        <v-select
          v-model="pay.text"
          :items="['Dinheiro', 'Cartão', 'Fiado']"
          overflow
          label="Método"
          target="#dropdown-example"
        ></v-select>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1 >
            <v-text-field
              v-model="pay.value"
              class="input-group--focused"
              label="Valor"
              :error-messages="errors.collect('teste')"
              v-validate="'numeric'"
              prefix="$"
              type="number"
              data-vv-name=""
              required
            ></v-text-field>
          </v-flex>
          <v-flex sm2 v-if="index==0">
            <v-btn fab dark small color="teal" @click="addMethod">
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
          <v-flex sm3 v-else>
            <v-btn fab dark small color="teal" @click="addMethod">
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn fab dark small color="red" @click="delMethod(pay)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      </v-card>
    </v-flex>
</v-layout>
</v-container>
</template>



<script>
import keyboard from '@/components/pdv/keyboard'
export default {
  components: {keyboard},
  data () {
    return {
    }
  },
  created () {
    if (!this.$store.pay.state.payment.length) {
      this.$store.pay.commit('insert', {text: '', value: 0})
    }
  },
  computed: {
    payment () {
      return this.$store.pay.state.payment
    }
  },
  methods: {
    addMethod () {
      this.$store.pay.commit('insert', {text: '', value: 0})
    },
    delMethod (data) {
      this.$store.pay.commit('removeOne', data)
    }
  }
}
</script>
