<template>
<div>
  <v-tabs
    centered
    slot="extension"
    v-model="model"
  >
    <v-tab
      v-for="(n,i) in headers"
      :key="i"
      :href="`#tab-${i}`"
    >
    {{n}}
    </v-tab>
  </v-tabs>
  <v-tabs-items v-model="model">
    <v-tab-item
      v-for="(n, i) in headers"
      :key="i"
      :id="`tab-${i}`"
    >
    {{i}}
      <v-card flat>
        
  <v-card>
    <v-form ref="form">
      <v-card-title primary-title>
        <div class="headline">Alterar Estoque</div>
      </v-card-title>   
      <v-container grid-list-xl fluid>
        <v-layout wrap justify-space-around>
          <v-flex xs12 sm8>
          <v-menu
        lazy
        :close-on-content-click="true">
        <v-text-field
          required
          slot="activator"
          label="Date"
          ></v-text-field>
        <v-date-picker
          locale="pt-br"
          no-title
        >
        </v-date-picker>
      </v-menu>
          </v-flex>
          <v-flex xs12 sm4>              
              <span >
                Entrada
                <v-btn icon class="mx-0">
                  <v-icon x-large color="blue">keyboard_arrow_down</v-icon>
                </v-btn>                
              </span>
              <span  >
                Saida
                <v-btn icon class="mx-0">
                  <v-icon x-large color="red" >keyboard_arrow_up</v-icon>
                </v-btn>
              </span>
          </v-flex>
          <v-flex xs12 sm6>
                <v-text-field
                  label="Quantidade"
                  :error-messages="errors.collect('barCode')"
                  v-validate="'required'"
                  data-vv-name="amount"
                  required
                ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
                <v-text-field name="value"
                  label="Valor"
                  :error-messages="errors.collect('value')"
                  v-validate="'required'"
                  prefix="$"
                  data-vv-name="value"
                  type="number"
                  required
                ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-btn
          flat
          color="primary"
          type="submit"
          :disabled="!isValid"
        >Salvar</v-btn>
        <v-btn flat >Voltar</v-btn>
        <v-btn flat  color="error">Cancelar</v-btn>
      </v-card-actions>
        <v-spacer></v-spacer>
    </v-form>
  </v-card>
      </v-card>
    </v-tab-item>
  </v-tabs-items>
</div>
</template>

<script>
  export default {
    data () {
      return {
        headers: ['date', 'pay', 'product'],
        model: 'tab-0',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    }
  }
</script>