// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import $ from 'jquery'

import './components/Global'
require('materialize-css')
require('materialize-css/dist/css/materialize.min.css')

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})
Vue.directive('select', {
  'twoWay': true,
  update: function (el, binding, vnode) {
    if (!vnode.elm.dataset.vueSelectReady) {
      $(el).on('change', function () {
        vnode.context.$set(vnode.context, binding.expression, el.value)
      })
      $(el).material_select()
      vnode.elm.dataset.vueSelectReady = true
    }
  },
  unbind: function (el, binding, vnode) {
    $(el).material_select('destroy')
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
