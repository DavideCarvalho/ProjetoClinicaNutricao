// import Vue from 'vue'
// import config from '../config'

const state = {
  login: null,
  senha: null
}

const mutations = {
  'SET_INPUT' (state, payload) {
    state[payload.campo] = payload.valor
  }
}

const actions = {
  setInput: ({ commit }, payload) => {
    commit('SET_INPUT', payload)
  },
  logar: async ({ commit }, usuario) => {
    if (usuario.login === 'admin' && usuario.senha === 'admin') {
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  }
}

const getters = {
  login: state => state.login,
  senha: state => state.senha
}

export default {
  state,
  mutations,
  actions,
  getters
}
