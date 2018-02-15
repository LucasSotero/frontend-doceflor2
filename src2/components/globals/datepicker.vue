<template>
  <input type="date" class="center-algin datepicker" >
</template>

<script>
import $ from 'jquery'
export default {
  props: ['value'],
  data () {
    return {
    }
  },
  mounted () {
    $(function () {
      let diaSemana = [ 'Domingo', 'Segunda-Feira', 'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado' ]
      let mesAno = [ 'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ]
      let data = new Date()
      let hoje = diaSemana[data.getDay()] + ', ' + mesAno[data.getMonth()] + ' de ' + data.getFullYear()
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
    })
  }
}
</script>
