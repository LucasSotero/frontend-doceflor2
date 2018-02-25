export default {
  state: {
    payment: []
  },
  mutations: {
    insert (state, data) {
      state.payment.push(data)
    },
    removeOne (state, data) {
      state.payment.splice(data, 1)
    },
    updateValue (state, data) {
      state.payment[data.key] = data.data
    },
    reset (state, data) {
      state.payment = []
    }
  }
}
