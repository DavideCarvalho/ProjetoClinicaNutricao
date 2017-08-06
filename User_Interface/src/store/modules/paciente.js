import Vue from 'vue'
import config from '../config'

const state = {
  paciente: {
    nomePaciente: null,
    id: null
  },
  pesoGrafico: {
    name: 'Peso',
    data: []
  },
  quadrilGrafico: {
    name: 'Quadril',
    data: []
  },
  cinturaGrafico: {
    name: 'Cintura',
    data: []
  },
  valoresGrafico: [],
  checkPeso: true,
  checkQuadril: true,
  checkCintura: true,
  observacoes: [],
  novaMedida: {
    peso: null,
    cintura: null,
    quadril: null
  },
  novaObservacao: null
}

const mutations = {
  'RESETAR_CAMPOS_PACIENTE' (state) {
    state.paciente.nomePaciente = null
    state.paciente.id = null
    state.pesoGrafico.data = []
    state.quadrilGrafico.data = []
    state.cinturaGrafico.data = []
    state.valoresGrafico = []
    state.checkPeso = true
    state.checkQuadril = true
    state.checkCinture = true
    state.observacoes = []
    state.novaMedida.peso = null
    state.novaMedida.cinture = null
    state.novaMedida.quadril = null
    state.novaObservacao = null
  },
  'SET_PACIENTE_INICIAL' (state, payload) {
    state.paciente.nomePaciente = payload.nomePaciente
    state.paciente.id = payload.id
    state.observacoes = payload.observacoes
    let quadrilPaciente = {}
    quadrilPaciente.data = []
    quadrilPaciente.name = 'Quadril'
    let quadriis = payload.quadril
    let novoQuadril = {}
    quadriis.map(quadril => {
      if (quadril.mes < 9) {
        quadril.mes = '0' + quadril.mes
      }
      if (quadril.dia < 9) {
        quadril.dia = '0' + quadril.dia
      }
      novoQuadril = {
        0: quadril.ano + '-' + quadril.mes + '-' + quadril.dia,
        1: quadril.medida_quadril
      }
      quadrilPaciente.data.push(novoQuadril)
    })
    state.quadrilGrafico = quadrilPaciente
    state.valoresGrafico.push(quadrilPaciente)

    let pesosPaciente = {}
    pesosPaciente.data = []
    pesosPaciente.name = 'Peso'
    let pesos = payload.peso
    let novoPeso = {}
    pesos.map(peso => {
      if (peso.mes < 9) {
        peso.mes = '0' + peso.mes
      }
      if (peso.dia < 9) {
        peso.dia = '0' + peso.dia
      }
      novoPeso = {
        0: peso.ano + '-' + peso.mes + '-' + peso.dia,
        1: peso.medida_peso
      }
      pesosPaciente.data.push(novoPeso)
    })
    state.pesoGrafico = pesosPaciente
    state.valoresGrafico.push(pesosPaciente)

    let cinturasPaciente = {}
    cinturasPaciente.data = []
    cinturasPaciente.name = 'Cintura'
    let cinturas = payload.cintura
    let novaCintura = {}
    cinturas.map(cintura => {
      if (cintura.mes < 9) {
        cintura.mes = '0' + cintura.mes
      }
      if (cintura.dia < 9) {
        cintura.dia = '0' + cintura.dia
      }
      novaCintura = {
        0: cintura.ano + '-' + cintura.mes + '-' + cintura.dia,
        1: cintura.medida_cintura
      }
      cinturasPaciente.data.push(novaCintura)
    })
    state.cinturaGrafico = cinturasPaciente
    state.valoresGrafico.push(cinturasPaciente)
  },
  'TROCA_CHECKBOX' (state, payload) {
    state[payload.campo] = !state[payload.campo]
    let valoresGrafico = []
    switch (payload.campo) {
      case 'checkPeso':
        if (!state[payload.campo]) {
          for (let contador = 0; contador < state.valoresGrafico.length; contador++) {
            if (state.valoresGrafico[contador].name.toLowerCase() !== 'peso') {
              valoresGrafico.push(state.valoresGrafico[contador])
            }
          }
        } else {
          valoresGrafico = state.valoresGrafico
          valoresGrafico.push(state.pesoGrafico)
        }
        break
      case 'checkQuadril':
        if (!state[payload.campo]) {
          for (let contador = 0; contador < state.valoresGrafico.length; contador++) {
            if (state.valoresGrafico[contador].name.toLowerCase() !== 'quadril') {
              valoresGrafico.push(state.valoresGrafico[contador])
            }
          }
        } else {
          valoresGrafico = state.valoresGrafico
          valoresGrafico.push(state.quadrilGrafico)
        }
        break
      case 'checkCintura':
        if (!state[payload.campo]) {
          for (let contador = 0; contador < state.valoresGrafico.length; contador++) {
            if (state.valoresGrafico[contador].name.toLowerCase() !== 'cintura') {
              valoresGrafico.push(state.valoresGrafico[contador])
            }
          }
        } else {
          valoresGrafico = state.valoresGrafico
          valoresGrafico.push(state.cinturaGrafico)
        }
        break
    }
    state.valoresGrafico = valoresGrafico
  },
  'SET_STATE_NOVAMEDIDA' (state, payload) {
    state.novaMedida[payload.campo] = payload.value
  },
  'SET_STATE' (state, payload) {
    state[payload.campo] = payload.valor
  },
  'ADICIONA_NOVAMEDIDA' (state, payload) {
    let pesoGrafico = state.pesoGrafico
    let cinturaGrafico = state.cinturaGrafico
    let quadrilGrafico = state.quadrilGrafico
    let novoPeso = {
      0: payload.ano + '-' + payload.mes + '-' + payload.dia,
      1: payload.peso
    }
    let novoQuadril = {
      0: payload.ano + '-' + payload.mes + '-' + payload.dia,
      1: payload.quadril
    }
    let novaCintura = {
      0: payload.ano + '-' + payload.mes + '-' + payload.dia,
      1: payload.cintura
    }
    pesoGrafico.data.push(novoPeso)
    quadrilGrafico.data.push(novoQuadril)
    cinturaGrafico.data.push(novaCintura)
    state.pesoGrafico = pesoGrafico
    state.cinturaGrafico = cinturaGrafico
    state.quadrilGrafico = quadrilGrafico
    let valoresGrafico = []
    valoresGrafico.push(pesoGrafico)
    valoresGrafico.push(cinturaGrafico)
    valoresGrafico.push(quadrilGrafico)
    state.valoresGrafico = valoresGrafico
    state.novaMedida.peso = null
    state.novaMedida.cintura = null
    state.novaMedida.quadril = null
  },
  'ADICIONA_NOVAOBSERVACAO' (state, payload) {
    let observacoes = state.observacoes
    let novaObservacao = payload
    observacoes.unshift(novaObservacao)
    state.observacoes = observacoes
    state.novaObservacao = null
  },
  'DELETA_OBSERVACAO' (state, payload) {
    let observacoes = state.observacoes
    let index = observacoes.indexOf(payload)
    observacoes.splice(index, 1)
    state.observacoes = observacoes
  }
}

const actions = {
  resetaPaciente: ({ commit }) => {
    commit('RESETAR_CAMPOS_PACIENTE')
  },
  setPaciente: async ({ commit }, id) => {
    try {
      let paciente = await Vue.http.get(`${config.conexao}/paciente/${id}`)
      paciente = paciente.data
      paciente.nomePaciente = paciente[0].nome_paciente
      paciente.id = paciente[0].id
      delete paciente[0]
      commit('SET_PACIENTE_INICIAL', paciente)
      return Promise.resolve(paciente)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  trocarCheckBox: ({ commit }, payload) => {
    commit('TROCA_CHECKBOX', payload)
  },
  adicionarMedida: async ({ commit }, payload) => {
    try {
      let paciente = await Vue.http.post(`${config.conexao}/paciente/${payload.id}/medida`, payload)
      payload.idMedida = paciente.body
      commit('ADICIONA_NOVAMEDIDA', payload)
      return Promise.resolve(paciente.body)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  setStateNovaMedida: ({ commit }, payload) => {
    commit('SET_STATE_NOVAMEDIDA', payload)
  },
  setState: ({ commit }, payload) => {
    commit('SET_STATE', payload)
  },
  adicionarObservacao: async ({ commit }, payload) => {
    try {
      let observacao = await Vue.http.post(`${config.conexao}/paciente/${payload.id_paciente}/observacao`, payload)
      observacao = JSON.parse(observacao.bodyText)
      commit('ADICIONA_NOVAOBSERVACAO', observacao[0])
      return Promise.resolve(observacao[0])
    } catch (e) {
      return Promise.reject(e)
    }
  },
  deletaObservacao: async ({ commit }, payload) => {
    try {
      await Vue.http.delete(`${config.conexao}/observacao/${payload.id}`)
      commit('DELETA_OBSERVACAO', payload)
      return Promise.resolve(payload)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

const getters = {
  paciente: state => state.paciente,
  pacienteId: state => state.paciente.id,
  observacoes: state => state.observacoes,
  valoresGrafico: state => state.valoresGrafico,
  checkPeso: state => state.checkPeso,
  checkQuadril: state => state.checkQuadril,
  checkCintura: state => state.checkCintura,
  novoPeso: state => state.novaMedida.peso,
  novoQuadril: state => state.novaMedida.quadril,
  novaCintura: state => state.novaMedida.cintura,
  novaObservacao: state => state.novaObservacao,
  novaMedida: state => state.novaMedida
}

export default {
  state,
  mutations,
  actions,
  getters
}
