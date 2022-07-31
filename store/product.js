export const state = () => ({
    data: null,
    loading: false,
  })

  export const mutations = {
    setProduct(state, product) {
      state.data = product
    },
    setLoading(state, value) {
      state.loading = value
    },
  }

  export const actions = {
    async fetch({ commit },id) {
      commit('setLoading', true)
      await this.$axios.get(`products/${id}`).then((response) => {
        commit('setProduct', response.data)
        commit('setLoading', false)
      })
    },
  }