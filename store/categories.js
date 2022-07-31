export const state = () => ({
  list: [],
  loading: false,
  selected: null,
})

// export const getters = {
//   getList(state) {
//     return state.list
//   },
//   getLoading(state) {
//     return state.loading
//   },
// }

export const mutations = {
  setList(state, categories) {
    state.list = categories
  },
  setLoading(state, value) {
    state.loading = value
  },
  setSelected(state, value) {
    state.selected = value
  },
}

export const actions = {
  async fetchCategories({ commit }) {
    commit('setLoading', true)
    await this.$axios.get('products/categories').then((response) => {
      commit('setList', response.data)
      commit('setLoading', false)
    })
  },
}
