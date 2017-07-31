import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import pacientes from './modules/pacientes'
import paciente from './modules/paciente'
import medica from './modules/medica'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    medica,
    paciente,
    pacientes
  }
})
