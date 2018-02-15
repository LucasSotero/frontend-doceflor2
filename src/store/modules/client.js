export default {
  state: {
    clients: [],
    sales: [],
    client: {}
  },
  mutations: {
    insertAll (state, data) {
      state.clients = data
    },
    updateOne (state, data) {
      state.client = data
    },
    insertSales (state, data) {
      state.sales = data
    }
  },
  actions: {
    getAll (context) {
      window.axios.get('/clients').then(Response => {
        Response.data = Response.data.data.map(element => [element._id, element.name])
        context.commit('insertAll', Response.data)
      })
    },
    getOne (context, id) {
      window.axios.get('/clients/' + id).then(Response => {
        let result = {
          id: Response.data.data._id,
          name: Response.data.data.name,
          phones: Response.data.data.phones,
          address: Response.data.data.address,
          complement: Response.data.data.complement
        }
        console.log(result)
        context.commit('updateOne', result)
      })
    },
    post (context, data) {
      window.axios.post('/clients/', data).then(Response => {
        Response.data = Response.data.data.map(element => [element._id, element.name])
        context.commit('insertAll', Response.data)
      })
    },
    delete (context, data) {
      window.axios.delete('/clients/' + data).then(Response => {
        Response.data = Response.data.data.map(element => [element._id, element.name])
        context.commit('insertAll', Response.data)
      })
    },
    put (context, data) {
      window.axios.put('/clients/' + data.id, data).then(Response => {
        Response.data = Response.data.data.map(element => [element._id, element.name])
        context.commit('insertAll', Response.data)
      })
    },
    sales (context, data) {
      window.axios.get('/sales/search/' + data).then(Response => {
        Response.data = Response.data.data.map(element => [element._id, element.data, element.code, element.value])
        context.commit('insertSales', Response.data)
      })
    }

  }
}
