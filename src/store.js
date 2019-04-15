import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    firstName: '',
    lastName: '',
    email: '',
    username: ''
  },
  mutations: {
    addToken (state, token) { state.token = token },
    setFirstName (state, firstName) { state.firstName = firstName },
    setLastName (state, lastName) { state.lastName = lastName },
    setEmail (state, email) { state.email = email },
    setUsername (state, username) { state.username = username },
  },
  actions: {
    addToken({commit}, token) { commit('addToken', token) },
    setName({commit}, name) {
      commit('setFirstName', name.firstName)
      commit('setLastName', name.lastName)
     },
    setEmail({commit}, email) { commit('setEmail', email) },
    setUsername({commit}, username) { commit('setUsername', username) },
  },
  getters: {
    fullName: (state) => `${state.firstName} ${state.lastName}`
  }
})
