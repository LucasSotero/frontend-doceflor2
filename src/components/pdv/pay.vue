<template>
<v-container fluid grid-list-md>
<v-layout row wrap>
  <v-flex xs12 sm12>
    <v-card>
      <v-container grid-list-xl fluid>
        <v-layout wrap row v-for="t in test" :key="t">
          <v-flex xs12 sm4 >
        <v-select
          :items="['Dinheiro', 'Cartão', 'Fiado']"
          overflow
          label="Select"
          target="#dropdown-example"
        ></v-select>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1 >
            <v-text-field
              class="input-group--focused"
              label="Valor"
              :error-messages="errors.collect('teste')"
              prefix="$"
              type="number"
              data-vv-name=""
              required
            ></v-text-field>
          </v-flex>
          <v-flex sm2 v-if="t<2">
            <v-btn fab dark small color="teal" @click="addMethod">
              <v-icon dark>add</v-icon>
            </v-btn>
          </v-flex>
          <v-flex sm3 v-if="t>1">
            <v-btn fab dark small color="teal" @click="addMethod">
              <v-icon dark>add</v-icon>
            </v-btn>
            <v-btn fab dark small color="red" @click="delMethod">
              <v-icon dark>delete</v-icon>
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
      test: 1
    }
  },
  methods: {
    addMethod () {
      this.test += 1
    },
    delMethod () {
      this.test -= 1
    }
  }
}
</script>
