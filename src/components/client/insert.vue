<template>
<v-container>
    <v-layout>
        <v-flex xs12 sm8 offset-sm2>
  <v-card>
    <v-form @submit.prevent="submit" ref="form">
      <v-card-title primary-title>
        <div class="headline">Cadastrar Cliente</div>
      </v-card-title>
      <v-container grid-list-xl fluid>
        <v-layout wrap>
          <v-flex xs12 sm12>
                <v-text-field
                  ref="name"
                  v-model="form.name"
                  label="Nome"
                  :error-messages="errors.collect('name')"
                  v-validate="'required'"
                  data-vv-name="name"
                  required
                ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
                <v-text-field
                  v-model="form.phone[0]"
                  label="Fone 1"
                  :error-messages="errors.collect('phone1')"
                  v-validate="'numeric|min:10'"
                  data-vv-name="phone1"
                  :mask=mask1
                  required
                >
                <div slot="label">
                Fone 1 <small>(opcional)</small>
                </div>
                </v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
                <v-text-field
                  v-model="form.phone[1]"
                  :error-messages="errors.collect('phone2')"
                  v-validate="'numeric|min:10'"
                  data-vv-name="phone2"
                  :mask=mask2
                  required
                >
                <div slot="label">
                Fone 2 <small>(opcional)</small>
                </div>
                </v-text-field>
          </v-flex>
          <v-flex xs12 sm12>
                <v-text-field
                  v-model="form.address"
                  :error-messages="errors.collect('address')"
                  data-vv-name="address"
                  required
                >
                <div slot="label">
                Endereço <small>(opcional)</small>
                </div>
                </v-text-field>
          </v-flex>
          <v-flex xs12 sm12>
                <v-text-field name="value"
                  v-model="form.complement"
                  multi-line
                  :error-messages="errors.collect('comments')"
                  data-vv-name="value"
                  type="text"
                  required
                >
                <div slot="label">
                Observações <small>(opcional)</small>
                </div>
                </v-text-field>
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
              required: () => 'O campo Nome não pode estar vazio'
            },
            phone1: {
              min: 'o número de telefone não é um campo válido'
            },
            phone2: {
              min: 'o número de telefone não é um campo válido'
            }
          }
        }
      }
    },

    computed: {
      isValid () {
        return (
          this.form.name
        )
      },
      mask1 () {
        if (this.form.phone[0].length < 11) {
          return '(##) ####-#####'
        }
        return '(##) # ####-####'
      },

      mask2 () {
        if (this.form.phone[1].length < 11) {
          return '(##) ####-#####'
        }
        return '(##) # ####-####'
      }
    },

    mounted () {
      this.$validator.localize('pt', this.dictionary)
      this.$refs.name.focus()
    },

    methods: {
      back () {
        this.$router.push({name: 'clients.show'})
      },
      submit () {
        this.$validator.validateAll()
        this.$store.client.dispatch('post', this.form).then(() => {
          this.$router.push({name: 'clients.show'})
        })
      },
      clear () {
        this.form.name = ''
        this.form.phone[0] = ''
        this.form.phone[1] = ''
        this.form.address = ''
        this.form.comment = ''
        this.$validator.reset()
      }
    }
  }
</script>
