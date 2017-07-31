import Vue from 'vue'
import config from '../config'

const state = {
  medicas: [],
  idMedicaSelecionadaObservacao: null,
  novaMedica: {
    nome: null,
    area: null
  }
}

const mutations = {
  'SET_MEDICAS_INICIAL' (state, payload) {
    state.medicas = payload
    if (payload.length > 0) {
      state.idMedicaSelecionadaObservacao = 1
    }
  },
  'SET_ID_MEDICA_SELECIONADA_OBSERVACAO' (state, payload) {
    state.idMedicaSelecionadaObservacao = payload
  },
  'SET_CAMPO_NOVA_MEDICA' (state, payload) {
    state.novaMedica[payload.campo] = payload.valor
  },
  'ADICIONA_NOVAMEDICA' (state, payload) {
    let todasAsMedicas = state.medicas
    todasAsMedicas.push(payload)
    state.medicas = todasAsMedicas
    state.novaMedica.nome = null
    state.novaMedica.area = null
  },
  'DELETA_MEDICA_SELECIONADA' (state, payload) {
    let todasAsMedicas = state.medicas
    console.log(payload)
    console.log(todasAsMedicas)
    todasAsMedicas = todasAsMedicas.filter(medica => medica.id !== payload)
    console.log(todasAsMedicas)
    state.medicas = todasAsMedicas
  }
}

const actions = {
  setMedicasInicial: async ({ commit }) => {
    try {
      let medicas = await Vue.http.get(`${config.conexao}/medicas`)
      medicas = medicas.body
      commit('SET_MEDICAS_INICIAL', medicas)
      return Promise.resolve(medicas)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  setIdMedicaSelecionadaObservacao: ({ commit }, payload) => {
    commit('SET_ID_MEDICA_SELECIONADA_OBSERVACAO', payload)
  },
  setCampoNovaMedica: ({ commit }, payload) => {
    commit('SET_CAMPO_NOVA_MEDICA', payload)
  },
  adicionaNovaMedica: async ({ commit }, payload) => {
    try {
      let novaMedicaId = await Vue.http.post(`${config.conexao}/medicas`, payload)
      payload.id = parseInt(novaMedicaId.body)
      commit('ADICIONA_NOVAMEDICA', payload)
      return Promise.resolve(payload)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  deletaMedicaSelecionada: async ({ commit }, payload) => {
    try {
      let medicaDeletadaId = await Vue.http.delete(`${config.conexao}/medicas/${payload.id}`)
      commit('DELETA_MEDICA_SELECIONADA', parseInt(medicaDeletadaId.bodyText))
      return Promise.resolve(medicaDeletadaId)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

const getters = {
  medicas: state => state.medicas,
  idMedicaSelecionadaObservacao: state => state.idMedicaSelecionadaObservacao,
  areaNovaMedica: state => state.novaMedica.area,
  nomeNovaMedica: state => state.novaMedica.nome
}

export default {
  state,
  mutations,
  actions,
  getters
}
