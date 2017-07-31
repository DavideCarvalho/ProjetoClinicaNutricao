import Vue from 'vue'
import config from '../config'

const state = {
  pacientes: [],
  pesquisarPacientes: null,
  tabelaPacientes: []
}

const mutations = {
  'SET_PACIENTES_INICIAL' (state, payload) {
    state.pacientes = payload
    state.tabelaPacientes = payload
  },
  'SET_PESQUISARPACIENTES' (state, payload) {
    return new Promise((resolve, reject) => {
      state.pesquisarPacientes = payload
      resolve(state.pesquisarPacientes)
    })
  },
  'SET_TABELA_PACIENTES' (state, payload) {
    const regexp = new RegExp(payload.trim(), 'i')
    let todosPacientes = state.pacientes
    state.tabelaPacientes = todosPacientes.filter(paciente => regexp.test(paciente.nome_paciente))
  },
  'SET_TABELA_PACIENTES_TO_ORIGINAL_STATE' (state) {
    state.tabelaPacientes = state.pacientes
  }
}

const actions = {
  setPacientes: async ({ commit }) => {
    try {
      let pacientes = await Vue.http.get(`${config.conexao}/pacientes`)
      pacientes = JSON.parse(pacientes.bodyText)
      commit('SET_PACIENTES_INICIAL', pacientes)
      return Promise.resolve(pacientes)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  setPesquisarPacientes: async ({ commit }, payload) => {
    await commit('SET_PESQUISARPACIENTES', payload)
    !payload ? commit('SET_TABELA_PACIENTES_TO_ORIGINAL_STATE') : commit('SET_TABELA_PACIENTES', payload)
  }
}

const getters = {
  pacientes: state => state.pacientes,
  pesquisarPacientes: state => state.pesquisarPacientes,
  tabelaPacientes: state => state.tabelaPacientes
}

export default {
  state,
  mutations,
  actions,
  getters
}
