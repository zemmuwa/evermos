export const state = () => ({
  list: [],
  loading: false,
  search: '',
  minPrice: '',
  maxPrice: '',
})

export const getters = {
  getById: (state) => (id) => {
    return state.list.find((v) => v.id === id)
  },
}

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setLoading(state, value) {
    state.loading = value
  },
  setSearch(state, value) {
    state.search = value
  },
  setMinPrice(state, value) {
    state.minPrice = value
  },
  setMaxPrice(state, value) {
    state.maxPrice = value
  },
}

export const actions = {
  async fetch({ commit }) {
    commit('setLoading', true)
    await this.$axios.get('products?limit=100').then((response) => {
      commit('setList', response.data.products)
      commit('setLoading', false)
    })
  },
}
