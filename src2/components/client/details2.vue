<template>
   <div class="container">
     <div class="row"></div>
     <div class="row">
       <table>
         <thead>
           <tr>
            <th>Data</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Método</th>
            <th>Ações</th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="data in tst">
            <td>{{data.date}}</td>
            <td>{{data.value}}</td>
            <td>{{data.status}}</td>
            <td>{{data.pay}}</td>
            <td>
              <a class="waves-effect waves-light btn-small blue btn" @click="details(client[0])"><i class="material-icons">launch</i></a>
            </td>
           </tr>
         </tbody>
       </table>
     </div>
   </div>
</template>

<script>
export default {
  data () {
    return {
      tst: [
        {
          date: '2017',
          value: 50,
          status: true,
          pay: 'Diner'
        }
      ]
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