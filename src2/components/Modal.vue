<template>
<div>
  <button class="btn" @click="modal">Novo</button>
  <div :id="key1" class="modal modal-fixed-footer">
  <slot>
  </slot>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'v-modal',
  props: ['key1'],
  data () {
    return {
      lucas: {}
    }
  },
  methods: {
    modal: function () {
      $('.modal').modal()
      $('#' + this.key1).modal('open')
      $('.trigger-modal').modal()
      console.log(this.lucas)
    }
  }
}
</script>

