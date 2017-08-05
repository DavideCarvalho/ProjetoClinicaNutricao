<template>
  <div>
    <nav class="nav has-shadow">
      <div v-if="selectedNavbar === 2" class="nav-left">
        <router-link to="/medicas" class="nav-item is-tab is-hidden-mobile" active-class="is-active" exact>Medicas</router-link>
        <router-link to="/pacientes" class="nav-item is-tab is-hidden-mobile" active-class="is-active">Pacientes</router-link>
      </div>
      <div v-else class="nav-left">
        <router-link to="/pacientes" class="nav-item is-tab is-hidden-mobile">
          <b-icon icon="arrow_back"></b-icon>
          Voltar
        </router-link>
        <a class="nav-item is-tab is-hidden-mobile" @click="isMedidasModalActive = true">Adicionar medidas</a>
        <a class="nav-item is-tab is-hidden-mobile" @click="isObservacaoModalActive = true">Adicionar observacao</a>
        <b-modal :active.sync="isMedidasModalActive" :width="380">
          <ModalMedidas />
        </b-modal>
        <b-modal :active.sync="isObservacaoModalActive" :width="800">
          <ModalObservacao />
        </b-modal>
      </div>
    </nav>
  </div>
</template>


<script>
  import ModalObservacao from './ModalObservacao'
  import ModalMedidas from './ModalMedidas'
  export default {
    data () {
      return {
        isMedidasModalActive: false,
        isObservacaoModalActive: false
      }
    },
    components: {
      ModalObservacao,
      ModalMedidas
    },
    computed: {
      nav () {
        return this.$route.name
      },
      selectedNavbar () {
        if (this.nav === 'Paciente') {
          return 1
        } else {
          return 2
        }
      }
    }
  }

</script>

<style>
.bigger {
  height: 800px!important;
  width: 800px!important;
}
</style>
