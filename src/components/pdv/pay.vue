<template>
<v-container fluid grid-list-md>
<v-layout row wrap>
  <v-flex xs12 sm12>
    <v-card>
      <v-container grid-list-xl fluid>
        <v-layout wrap>
          <v-flex xs12 sm3 >
        <v-select
          :items="['Dinheiro', 'Cartão', 'Fiado']"
          overflow
          label="Select"
          target="#dropdown-example"
        ></v-select>
          </v-flex>
          <v-flex xs12 sm3 offset-sm1 >
            <v-text-field
              class="input-group--focused"
              label="Valor"
              :error-messages="errors.collect('teste')"
              type="number"
              data-vv-name=""
              required
            ></v-text-field>
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
  components: {keyboard}
}
</script>
