<template>
<v-container fluid grid-list-md>
<v-layout row wrap>
  <v-flex xs12 sm12>
    <v-card>
      <v-container grid-list-xl fluid>
        <v-layout wrap row v-for="(t, index) in falt" :key="index">
          <v-flex xs12 sm4 >
        <v-select
          v-model="t.text"
          :items="['Dinheiro', 'Cartão', 'Fiado']"
          overflow
          label="Método"
          target="#dropdown-example"
        ></v-select>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1 >
            <v-text-field
              v-model="t.value"
              class="input-group--focused"
              label="Valor"
              :error-messages="errors.collect('teste')"
              v-validate="'numeric'"
              prefix="$"
              type="number"
              data-vv-name=""
              required
              @input="tot"
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
            <v-btn fab dark small color="red" @click="delMethod(t)">
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
      test: 1,
      pay: {text: '', value: 0},
      falt: [{text: '', value: 0}]
    }
  },
  mounted () {
    this.$store.pay.commit('insert', pay)
  },
  computed: {
    total () {
      return this.falt
    }
  },
  methods: {
    addMethod () {
      this.falt.push({text: '', value: 0})
    },
    delMethod (data) {
      this.falt.splice(data, 1)
      this.tot()
    },
    tot () {
      let a = 0
      this.$parent.result[2].value = 0
      this.$parent.result[3].value = 0
      this.falt.forEach(element => {
        a += parseInt(element.value)
      })
      this.$parent.result[2].value = this.$parent.result[1].value - a
      if (this.$parent.result[2].value < 0) {
        this.$parent.result[3].value = this.$parent.result[2].value / -1
        this.$parent.result[2].value = 0
      }
    }
  }
}
</script>
