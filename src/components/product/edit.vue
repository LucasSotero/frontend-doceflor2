<template>
<v-container>
    <v-layout>
        <v-flex xs12 sm8 offset-sm2>
  <v-card>
    <v-form @submit.prevent="submit" ref="form">
      <v-card-title primary-title>
        <div class="headline">Editar Produto</div>
      </v-card-title>   
      <v-container grid-list-xl fluid>
        <v-layout wrap>
          <v-flex xs12 sm12>
                <v-text-field
                  ref="name"
                  v-model="form.name"
                  label="Descrição"
                  :error-messages="errors.collect('name')"
                  v-validate="'required'"
                  data-vv-name="name"
                  required
                ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
                <v-text-field name="value"
                  v-model="form.value"
                  label="Valor de Venda"
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
        <v-btn flat @click="back">Voltar</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat  @click="clear" color="error">Cancelar</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
  </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
  export default {
    $_veeValidate: {
      validator: 'new'

    },

    data () {
      return {
        dictionary: {
          custom: {
            name: {
              required: () => 'O campo descrição não pode estar vazio'
            },
            barCode: {
              required: () => 'O campo código de barras não pode estar vazio'
            },
            value: {
              required: () => 'O campo valor de venda não pode estar vazio'
            }
          }
        }
      }
    },

    computed: {
      isValid () {
        return (
          this.form.name &&
          this.form.barCode &&
          this.form.value
        )
      },
      form () {
        return this.$store.product.state.product
      }
    },

    created () {
      this.$store.product.dispatch('getOne', this.$route.params.id)
    },

    mounted () {
      this.$validator.localize('pt', this.dictionary)
      this.$refs.name.focus()
    },

    methods: {
      back () {
        this.$router.push({name: 'products.show'})
      },
      submit () {
        this.$validator.validateAll()
        this.$store.product.dispatch('put', this.form).then(() => {
          this.$router.push({name: 'products.show'})
        })
      },
      clear () {
        this.form.name = ''
        this.form.barCode = ''
        this.form.value = null
        this.$validator.reset()
      }
    }
  }
</script>