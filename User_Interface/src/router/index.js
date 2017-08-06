import Vue from 'vue'
import Router from 'vue-router'
import Paciente from '@/HighOrderComponents/Paciente'
import Pacientes from '@/HighOrderComponents/Pacientes'
import Medicas from '@/HighOrderComponents/Medicas'
import Login from '@/HighOrderComponents/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/pacientes',
      name: 'Pacientes',
      component: Pacientes
    },
    {
      path: '/paciente/:id',
      name: 'Paciente',
      component: Paciente
    },
    {
      path: '/medicas',
      name: 'Medicas',
      component: Medicas
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
