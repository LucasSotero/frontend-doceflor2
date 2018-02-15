<template>
<v-div>
  <h1>teste</h1>  
   <div id="payment" class="modal">
     
    <form class="col s12"  @submit.prevent="createSale">
      <div class="modal-content">
        <div class="row">
          <div class="col s1"></div>
          <div class="input-field col s4">
            <button type="submit" class=" modal-action modal-close waves-effect btn btn-large blue col s12"><i class="material-icons right">attach_money</i>Dinheiro</button>
          </div>
          <div class="col s2"></div>
          <div class="input-field col s4">
            <input type="number" class="validate" v-model="sale.methods.money">
            <label>Dinheiro</label>
          </div>
        </div>
        <div class="row">
          <div class="col s1"></div>
          <div class="input-field col s4">
            <button type="submit" class=" modal-action modal-close waves-effect btn btn-large blue col s12"><i class="material-icons right">credit_card</i>Cartão</button>
          </div>
          <div class="col s2"></div>
          <div class="input-field col s4">
            <input type="number" class="validate" v-model="sale.methods.card">
            <label>Cartão</label>
          </div>
        </div>
        <div class="row">
          <div class="col s1"></div>
          <div class="input-field col s4">
            <button type="submit" class=" modal-action modal-close waves-effect btn btn-large blue col s12"><i class="material-icons right">local_offer</i>Fiado</button>
          </div>
          <div class="col s2"></div>
          <div class="input-field col s4">
            <input type="number" class="validate" v-model="sale.methods.spun">
            <label>Fiado</label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="submit" class=" modal-action modal-close waves-effect btn">Salvar</button>
      </div>
    </form>
  </div>
  </v-div>
</template>

<script>
export default {
  name: 'modal'
}
</script>
