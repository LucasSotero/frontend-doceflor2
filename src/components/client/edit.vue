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
                  class="input-group--focused"
                  v-model="form.name"
                  label="Nome"
                  :error-messages="errors.collect('name')"
                  v-validate="'required'"
                  data-vv-name="name"
                  required
                ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6  v-for="(index, teste) in form.phone" :key="index">
                <v-text-field
                  v-model="form.phone[teste]"
                  :label="'Fone ' + index"
                  :error-messages="errors.collect('phone1')"
                  v-validate="'numeric|min:10'"
                  :data-vv-name="'phone' + teste"
                  :mask="mask[teste]"
                  required
                >
                <div slot="label">
                Fone 1 <small>(opcional)</small>
                </div>
                </v-text-field>
          </v-flex>
          <v-flex xs12 sm12>
                <v-text-field
                  v-model="form.address"
                  :error-messages="errors.collect('adress')"
                  data-vv-name="adress"
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
        mask: ['', ''],
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
          this.form.name &&
          this.form.barCode &&
          this.form.value
        )
      },
      form () {
        return this.$store.client.state.client
      }
    },
    created () {
      this.$store.client.dispatch('getOne', this.$route.params.id)
    },
    mounted () {
      this.$validator.localize('pt', this.dictionary)
      console.log(this.form)
    },
    methods: {
      back () {
        this.$router.push({name: 'clients.show'})
      },
      submit () {
        this.$validator.validateAll()
        this.$store.client.dispatch('put', this.form).then(() => {
          this.$router.push({name: 'clients.show'})
        })
      },
      clear () {
        this.form.name = ''
        this.form.phone[0] = ''
        this.form.phone[1] = ''
        this.form.address = ''
        this.form.complement = ''
        this.$validator.reset()
      }
    }
  }
</script>
