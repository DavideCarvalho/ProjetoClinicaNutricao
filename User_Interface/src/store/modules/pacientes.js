import Vue from 'vue'
import config from '../config'

const state = {
  pacients: [],
  searchPacients: null,
  tablePacients: [],
  newPacient: {
    id: null,
    name: null,
    sex: 'Masculino',
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
  },
  'ADD_NEW_PACIENT' (state, payload) {
    let allPacients = state.pacients
    allPacients.push(payload)
    state.pacients = allPacients
    state.tablePacients = allPacients
  },
  'RESET_NEW_PACIENT_FIELDS' (state) {
    const newPacient = {
      id: null,
      name: null,
      sex: 'Masculino',
      birth_day: null,
      birth_month: null,
      birth_year: null
    }
    state.newPacient = newPacient
  },
  'DELETE_PACIENT' (state, payload) {
    let allPacients = state.pacients
    allPacients = allPacients.filter(pacient => pacient.id !== payload)
    state.pacients = allPacients
    state.tablePacients = allPacients
  },
  'ADD_PACIENT_TO_EDIT' (state, payload) {
    state.newPacient.id = payload.id
    state.newPacient.name = payload.nome_paciente
    state.newPacient.sex = payload.sexo_paciente
    state.newPacient.birth_day = payload.dia_nascimento
    state.newPacient.birth_month = payload.mes_nascimento
    state.newPacient.birth_year = payload.ano_nascimento
  },
  'EDIT_PACIENT' (state, payload) {
    let allPacients = state.pacients
    allPacients = allPacients.filter(pacient => pacient.id !== payload.id)
    allPacients.push(payload)
    state.pacients = allPacients
    state.tablePacients = allPacients
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
  },
  addNewPacient: async ({ commit }, payload) => {
    try {
      const newPacientId = await Vue.http.post(`${config.conexao}/pacientes`, payload)
      payload.id = newPacientId.body
      let newPayload = {
        id: newPacientId.body,
        nome_paciente: payload.newPacientName,
        sexo_paciente: payload.newPacientSex,
        dia_nascimento: payload.newPacientBirthDay,
        mes_nascimento: payload.newPacientBirthMonth,
        ano_nascimento: payload.newPacientBirthYear
      }
      commit('ADD_NEW_PACIENT', newPayload)
      return Promise.resolve(newPayload)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  resetNewPacientFields: ({ commit }) => {
    commit('RESET_NEW_PACIENT_FIELDS')
  },
  deletePacient: async ({ commit }, payload) => {
    try {
      let deleted = await Vue.http.delete(`${config.conexao}/paciente/${payload}`)
      commit('DELETE_PACIENT', payload)
      return Promise.resolve(deleted)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  addPacientToEdit: ({ commit }, payload) => {
    commit('ADD_PACIENT_TO_EDIT', payload)
  },
  editPacient: async ({ commit }, payload) => {
    try {
      let updated = await Vue.http.put(`${config.conexao}/paciente/${payload.newPacientId}`, payload)
      let newPayload = {
        id: payload.newPacientId,
        nome_paciente: payload.newPacientName,
        sexo_paciente: payload.newPacientSex,
        dia_nascimento: payload.newPacientBirthDay,
        mes_nascimento: payload.newPacientBirthMonth,
        ano_nascimento: payload.newPacientBirthYear
      }
      commit('EDIT_PACIENT', newPayload)
      return Promise.resolve(updated)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

const getters = {
  pacientes: state => state.pacientes,
  searchPacients: state => state.searchPacients,
  tablePacients: state => state.tablePacients,
  newPacientId: state => state.newPacient.id,
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
