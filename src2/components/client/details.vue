<template>
   <div class="container">
     <div class="row"></div>
     <div class="row">
       <table>
         <thead>
           <tr>
            <th>Data</th>
            <th>Código</th>
            <th>Valor</th>
            <th>Ações</th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="data in sales">
            <td>{{data[1]}}</td>
            <td>{{data[2]}}</td>
            <td>{{data[3]}}</td>
            <td>
              <a class="waves-effect waves-light btn-small blue btn" @click="details(data[0])"><i class="material-icons">launch</i></a>
            </td>
           </tr>
         </tbody>
       </table>
     </div>
   </div>
</template>


</div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      newclient: {}
    }
  },
  methods: {
    register: function () {
      $('.modal').modal()
      $('#inventoryMovement').modal('open')
      $('.trigger-modal').modal()
    },
    del: function (id) {
      let result = {
        id: this.$route.params.id,
        client: {
          _id: id
        }
      }
      this.$store.client.dispatch('putDetails', result)
    },
    save: function () {
      let result = {
        id: this.$route.params.id,
        client: this.newclient
      }
      this.newclient = {}
      this.$store.client.dispatch('postDetails', result)
    },
    details: function (id) {
      this.$router.push('/sales/details/' + id)
    }
  },
  created () {
    this.$store.client.dispatch('sales', this.$route.params.id)
  },
  computed: {
    sales: function () {
      return this.$store.client.state.sales
    }
  }
}
</script>

<style>
.btn-small {
    height: 24px;
    line-height: 24px;
    padding: 0 0.5rem;
}
.center-padding {
  text-align: right;
  padding: 2.5%;
}
</style>
