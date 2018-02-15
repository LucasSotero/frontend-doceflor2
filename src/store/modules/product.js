export default {
  state: {
    products: [],
    product: {}
  },
  mutations: {
    insertAll (state, data) {
      state.products = data
    },
    updateOne (state, data) {
      state.product = data
    }
  },
  actions: {
    remove (context, id) {
      window.axios.delete('/products/' + id).then(Response => {
        Response.data = Response.data.data.map(element => [element._id, element.barCode, element.name, element.value])
        context.commit('insertAll', Response.data)
      })
    },
    getAll (context) {
      window.axios.get('/products').then(Response => {
        Response.data = Response.data.data.map(element => [element._id, element.barCode, element.name, element.value])
        context.commit('insertAll', Response.data)
      })
    },
    getOne (context, data) {
      window.axios.get('/products/' + data).then(Response => {
        let result = {
          id: Response.data.data._id,
          barCode: Response.data.data.barCode,
          name: Response.data.data.name,
          value: Response.data.data.value
        }
        context.commit('updateOne', result)
      })
    },
    post (context, data) {
      window.axios.post('/products/', data).then(Response => {
        Response.data = Response.data.data.map(element => [element._id, element.barCode, element.name, element.value])
        context.commit('insertAll', Response.data)
      })
    },
    put (context, data) {
      window.axios.put('/products/' + data.id, data).then(Response => {
        Response.data = Response.data.data.map(element => [element._id, element.barCode, element.name, element.value])
        context.commit('insertAll', Response.data)
      })
    },
    getDetails (context, data) {
      window.axios.get('/products/details/' + data).then(Response => {
        let result = {
          id: Response.data.data._id,
          history: Response.data.data.history
        }
        context.commit('updateOne', result)
      })
    },
    postDetails (context, data) {
      window.axios.post('/products/details/' + data.id, {history: data.product}).then(Response => {
        let result = {
          id: Response.data.data._id,
          history: Response.data.data.history
        }
        context.commit('updateOne', result)
      })
    },
    putDetails (context, data) {
      window.axios.put('/products/details/' + data.id, {history: data.product}).then(Response => {
        let result = {
          id: Response.data.data._id,
          history: Response.data.data.history
        }
        context.commit('updateOne', result)
      })
    }
  }
}
