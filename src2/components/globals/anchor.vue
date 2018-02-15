<template>
  <a class="waves-effect waves-light btn" :href="href"><slot></slot></a>
</template>

<script>
export default {
  props: ['href']
}
</script>