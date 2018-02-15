<template>
  <button :class="'waves-effect waves-light btn-small btn ' + this.name" @click.prevent="action"><i class="material-icons">{{name}}</i></button>
</template>

<script>
export default {
  props: ['name'],
  methods: {
    action () {
      this.$emit('click')
    }
  }
}
</script>


<style>
.btn-small {
    height: 24px;
    line-height: 24px;
    padding: 0 0.5rem;
    color: white;
    margin:2px;
}
.edit {
  background-color: #2196f3 !important;
}
.subject {
  background-color: #4CAF50 !important;
}
.delete {
  background-color: #f44336 !important;
}
.add {
  background-color: #2196f3 !important;
}
</style>