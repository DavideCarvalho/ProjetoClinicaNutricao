import Vue from 'vue'
import config from '../config'

const state = {
  medicas: [],
  idMedicaSelecionadaObservacao: null,
  novaMedica: {
    id: null,
    nome_medica: null,
    area_medica: null,
    login: null,
    senha: null
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
    const novaMedica = {
      id: null,
      nome_medica: null,
      area_medica: null,
      login: null,
      senha: null
    }
    let todasAsMedicas = state.medicas
    todasAsMedicas.push(payload)
    state.medicas = todasAsMedicas
    state.novaMedica.nome = null
    state.novaMedica.area = null
    state.novaMedica = novaMedica
  },
  'DELETA_MEDICA_SELECIONADA' (state, payload) {
    let todasAsMedicas = state.medicas
    todasAsMedicas = todasAsMedicas.filter(medica => medica.id !== payload)
    state.medicas = todasAsMedicas
  },
  'FORM_EDITA_MEDICA_SELECIONADA' (state, payload) {
    state.novaMedica = {...payload}
  },
  'EDITA_MEDICA_SELECIONADA' (state, payload) {
    const novaMedica = {
      id: null,
      nome_medica: null,
      area_medica: null,
      login: null,
      senha: null
    }
    let medicas = state.medicas
    medicas = medicas.filter(medica => medica.id !== payload.id)
    medicas.push(payload)
    state.medicas = medicas
    state.novaMedica = novaMedica
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
      let medicaDeletadaId = await Vue.http.delete(`${config.conexao}/medica/${payload.id}`)
      commit('DELETA_MEDICA_SELECIONADA', payload.id)
      return Promise.resolve(medicaDeletadaId)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  formEditaMedicaSelecionada: ({ commit }, payload) => {
    commit('FORM_EDITA_MEDICA_SELECIONADA', payload)
  },
  editaMedicaSelecionada: async ({ commit }, payload) => {
    try {
      await Vue.http.put(`${config.conexao}/medica/${payload.id}`, payload)
      commit('EDITA_MEDICA_SELECIONADA', payload)
      return Promise.resolve(payload)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

const getters = {
  medicas: state => state.medicas,
  idMedicaSelecionadaObservacao: state => state.idMedicaSelecionadaObservacao,
  areaNovaMedica: state => state.novaMedica.area_medica,
  nomeNovaMedica: state => state.novaMedica.nome_medica,
  idNovaMedica: state => state.novaMedica.id,
  loginNovaMedica: state => state.novaMedica.login,
  senhaNovaMedica: state => state.novaMedica.senha
}

export default {
  state,
  mutations,
  actions,
  getters
}
