<template>
  <button type="submit" :class="'waves-effect waves-light btn btn-large ' + classadd" @click="action"><slot></slot></button>
</template>

<script>
export default {
  props: ['name', 'classadd'],
  methods: {
    action () {
      this.$emit('click')
    }
  }
}
</script>


