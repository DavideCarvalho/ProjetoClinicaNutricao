import Vue from 'vue'
import config from '../config'

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
  logar: ({ commit }, usuario) => {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${config.conexao}/back/login.php?login=${usuario.login}&senha=${usuario.senha}`)
      .then(response => response.json())
      .then(
      data => {
        !data.length ? reject(false) : resolve(true)
      },
      error => console.log(JSON.stringify(error))
      )
    })
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
