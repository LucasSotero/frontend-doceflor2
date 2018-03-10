export default {
  state: {
    products: [],
    product: {}
  },
  mutations: {
    updateOne (state, data) {
      state.products.push(data)
    },
    removeOne (state, data) {
      state.products.splice(data, 1)
    },
    updateValue (state, data) {
      state.products[data.key] = data.data
    },
    addDiscount (state, data) {
      state.products[data.index].discount = data.discount
    },
    reset (state) {
      state.products = []
    }
  },
  actions: {
    getOne (context, data) {
      window.axios.get('/products/search/' + data).then(Response => {
        Response.data = ({_id: Response.data.data._id, code: Response.data.data.code, name: Response.data.data.name, discount: Response.data.data.value, value: Response.data.data.value})
        context.commit('updateOne', Response.data)
      })
    }
  }
}
