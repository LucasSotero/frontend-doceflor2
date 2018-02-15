export default {
  state: {
    sales: [],
    sale: {}
  },
  mutations: {
    insertAll (state, data) {
      state.sales = data
    },
    updateOne (state, data) {
      state.sale = data
    }
  },
  actions: {
    remove (context, id) {
      window.axios.delete('/sales/' + id).then(Response => {
        Response.data = Response.data.data.map(element => [element._id, element.code, element.client, element.date, element.value])
        context.commit('insertAll', Response.data)
      })
    },
    getAll (context) {
      window.axios.get('/sales').then(Response => {
        Response.data = Response.data.data.map(element => [element._id, element.code, element.client, element.date, element.value])
        context.commit('insertAll', Response.data)
      })
    },
    getOne (context, data) {
      window.axios.get('/sales/' + data).then(Response => {
        let result = {
          id: Response.data.data._id,
          client: Response.data.data.client,
          data: Response.data.data.data,
          discount: Response.data.data.discount,
          pays: Response.data.data.pays,
          products: Response.data.data.products
        }
        context.commit('updateOne', result)
      })
    },
    postsale (context, data) {
      window.axios.post('/sales/', data).then(Response => {
        context.commit('insertAll', Response.data)
      })
    },
    put (context, data) {
      window.axios.put('/sales/' + data.id, data).then(Response => {
        Response.data = Response.data.data.map(element => [element._id, element.code, element.client, element.date, element.value])
        context.commit('insertAll', Response.data)
      })
    },
    getDetails (context, data) {
      window.axios.get('/sales/details/' + data).then(Response => {
        let result = {
          id: Response.data.data._id,
          history: Response.data.data.history
        }
        context.commit('updateOne', result)
      })
    },
    postDetails (context, data) {
      window.axios.post('/sales/details/' + data.id, {history: data.sale}).then(Response => {
        let result = {
          id: Response.data.data._id,
          history: Response.data.data.history
        }
        context.commit('updateOne', result)
      })
    },
    putDetails (context, data) {
      window.axios.put('/sales/details/' + data.id, {history: data.sale}).then(Response => {
        let result = {
          id: Response.data.data._id,
          history: Response.data.data.history
        }
        context.commit('updateOne', result)
      })
    }
  }
}
