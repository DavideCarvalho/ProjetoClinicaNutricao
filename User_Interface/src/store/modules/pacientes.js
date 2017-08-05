import Vue from 'vue'
import config from '../config'

const state = {
  pacients: [],
  searchPacients: null,
  tablePacients: [],
  newPacient: {
    name: null,
    sex: null,
    birth_day: null,
    birth_month: null,
    birth_year: null
  }
}

const mutations = {
  'SET_INITIAL_PACIENTS' (state, payload) {
    state.pacients = payload
    state.tablePacients = payload
  },
  'SET_SEARCHPACIENTS' (state, payload) {
    return new Promise((resolve, reject) => {
      state.searchPacients = payload
      resolve(state.searchPacients)
    })
  },
  'SET_TABLE_PACIENTS' (state, payload) {
    const regexp = new RegExp(payload.trim(), 'i')
    let allPacients = state.pacients
    state.tablePacients = allPacients.filter(pacient => regexp.test(pacient.nome_paciente))
  },
  'SET_TABLE_PACIENTS_TO_ORIGINAL_STATE' (state) {
    state.tablePacients = state.pacients
  },
  'SET_NEW_PACIENT_FIELD' (state, payload) {
    state.newPacient[payload.field] = payload.value
  }
}

const actions = {
  setPacients: async ({ commit }) => {
    try {
      let pacients = await Vue.http.get(`${config.conexao}/pacientes`)
      pacients = JSON.parse(pacients.bodyText)
      commit('SET_INITIAL_PACIENTS', pacients)
      return Promise.resolve(pacients)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  setSearchPacients: async ({ commit }, payload) => {
    await commit('SET_SEARCHPACIENTS', payload)
    !payload ? commit('SET_TABLE_PACIENTS_TO_ORIGINAL_STATE') : commit('SET_TABLE_PACIENTS', payload)
  },
  setNewPacientField: ({ commit }, payload) => {
    commit('SET_NEW_PACIENT_FIELD', payload)
  }
}

const getters = {
  pacientes: state => state.pacientes,
  searchPacients: state => state.searchPacients,
  tablePacients: state => state.tablePacients,
  newPacientName: state => state.newPacient.name,
  newPacientSex: state => state.newPacient.sex,
  newPacientBirthDay: state => state.newPacient.birth_day,
  newPacientBirthMonth: state => state.newPacient.birth_month,
  newPacientBirthYear: state => state.newPacient.birth_year
}

export default {
  state,
  mutations,
  actions,
  getters
}
