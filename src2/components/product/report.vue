<template>
  <div class="card">
      <div class="container">
          <div class="row">
           <div class="input-field col s12">
                <div class="row">
                    <form class="col s12">
                        <div class="row">
                            <div class="input-field col s2">
                                <input type="date" class="center-align datepicker">
                                <label >Período Inicial</label>
                            </div>
                            <div class="input-field col s2">
                                <input type="date" class="center-align datepicker">
                                <label>Período Final</label>
                            </div>
                            <div class="input-field col s5">
                                <select multiple>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>                   
                                </select>
                                <label>Categorias</label>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
           </div>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  mounted () {
    $(function () {
      $(document).ready(function () {
        $('select').material_select()
      })
      var diaSemana = [ 'Domingo', 'Segunda-Feira', 'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado' ]
      var mesAno = [ 'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ]
      var data = new Date()
      var hoje = diaSemana[data.getDay()] + ', ' + mesAno[data.getMonth()] + ' de ' + data.getFullYear()
      $('#dataPesquisa').attr('value', hoje)
      $('.datepicker').pickadate({
        monthsFull: mesAno,
        monthsShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
        weekdaysFull: diaSemana,
        weekdaysShort: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ],
        weekdaysLetter: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
        selectMonths: true,
        selectYears: true,
        clear: false,
        format: 'dd/mm/yyyy',
        today: 'Hoje',
        close: 'X',
        min: new Date(data.getFullYear() - 1, 0, 1),
        max: new Date(data.getFullYear() + 1, 11, 31),
        closeOnSelect: true
      })
      $('#dataPesquisa').click(function (event) {
        event.stopPropagation()
        $('.datepicker').first().pickadate('picker').open()
      })
    })
  }
}
</script>
