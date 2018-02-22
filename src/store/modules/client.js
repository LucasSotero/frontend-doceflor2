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
        Response.data = Response.data.data.map(element => ({ id: element._id, name: element.name }))
        context.commit('insertAll', Response.data)
      })
    },
    getOne (context, id) {
      window.axios.get('/clients/' + id).then(Response => {
        let result = {
          id: Response.data.data._id,
          name: Response.data.data.name,
          phone: Response.data.data.phone,
          address: Response.data.data.address,
          complement: Response.data.data.complement
        }
        console.log(result)
        context.commit('updateOne', result)
      })
    },
    post (context, data) {
      window.axios.post('/clients/', data).then(Response => {
        Response.data = Response.data.data.map(element => ({ id: element._id, name: element.name }))
        context.commit('insertAll', Response.data)
      })
    },
    delete (context, data) {
      window.axios.delete('/clients/' + data).then(Response => {
        Response.data = Response.data.data.map(element => ({ id: element._id, name: element.name }))
        context.commit('insertAll', Response.data)
      })
    },
    put (context, data) {
      window.axios.put('/clients/' + data.id, data).then(Response => {
        Response.data = Response.data.data.map(element => ({ id: element._id, name: element.name }))
        context.commit('insertAll', Response.data)
      })
    },
    sales (context, data) {
      window.axios.get('/sales/search/' + data).then(Response => {
        Response.data = Response.data.data.map(element => ({id: element._id, data: element.data, code: element.code, value: element.value}))
        context.commit('insertSales', Response.data)
      })
    },
    getDetails (context, data) {
      window.axios.get('/clients/details/' + data).then(Response => {
        let result = {
          id: Response.data.data._id,
          credits: Response.data.data.credits
        }
        context.commit('updateOne', result)
      })
    },
    postDetails (context, data) {
      window.axios.post('/clients/details/' + data.id, {credits: data.client}).then(Response => {
        let result = {
          id: Response.data.data._id,
          credits: Response.data.data.credits
        }
        context.commit('updateOne', result)
      })
    },
    putDetails (context, data) {
      window.axios.put('/clients/details/' + data.id, {credits: data.client}).then(Response => {
        let result = {
          id: Response.data.data._id,
          credits: Response.data.data.credits
        }
        context.commit('updateOne', result)
      })
    }

  }
}
