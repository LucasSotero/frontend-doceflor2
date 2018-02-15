<template>
  <div class="z-depth-1 white">
      <table class="highlight" align="center">
        <thead>
          <tr>
            <th v-for="(head, index) in headers" :key="index">{{head}}</th>
            <th class="center-padding">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in list" :key="data[0]" >
            <td v-for="i in headers.length"  :key="i">{{data[i]}}</td>
            <td class="right">
              <v-button-small v-for="(button, key) in buttons" :key="key" :name="button" @click="action(key, data[0])"></v-button-small>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'table'
    },
    headers: {
    },
    list2: {
    },
    actions: {
      type: Array,
      default: () => []
    },
    buttons: {
      type: Array,
      default: () => []
    }
  },
  created () {
    for (var m in this.$parent) {
      if (typeof this.$parent[m] === 'function' && m.match(this.name)) {
        this.actions.push(m)
        m = m.replace(this.name, '')
        this.buttons.push(m.toLowerCase())
        console.log(this.$parent.list)
      }
    }
  },
  methods: {
    action (key, data) {
      this.$parent[this.actions[key]](data, key)
    }
  },
  computed: {
    list: function () {
      return this.$parent.list
    }
  }
}
</script>

<style>
.center-padding {
  text-align: right;
  padding: 4.5%;
}
</style>
