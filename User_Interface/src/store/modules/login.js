// import Vue from 'vue'
// import config from '../config'

const state = {
  login: null,
  senha: null,
  logado: false
}

const mutations = {
  'SET_INPUT' (state, payload) {
    state[payload.campo] = payload.valor
  },
  'LOGADO' (state) {
    state.logado = true
    state.login = null
    state.senha = null
  }
}

const actions = {
  setInput: ({ commit }, payload) => {
    commit('SET_INPUT', payload)
  },
  logar: async ({ commit }, usuario) => {
    if (usuario.login === 'admin' && usuario.senha === 'admin') {
      commit('LOGADO')
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  }
}

const getters = {
  login: state => state.login,
  senha: state => state.senha,
  logado: state => state.logado
}

export default {
  state,
  mutations,
  actions,
  getters
}
