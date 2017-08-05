<template>
  <div class="pacientes">
    <div class="columns">
      <div class="column is-offset-one-quarter is-half">
        <br>
        <h1 class="title">Pacientes</h1>
        <div class="columns">
          <div class="column is-11">
            <b-field label="Pesquisar paciente">
              <b-input type="text" :value="searchPacients" @input="setSearchPacients($event)"></b-input>
            </b-field>
          </div>
          <div class="column is-1">
            <br />
            <b-tooltip label="Adicionar paciente" animated>
              <button class="button is-primary" @click="isNewPacientModalActive = true">+</button>
              <b-modal :active.sync="isNewPacientModalActive" :width="650">
                <NewPacientModal />
              </b-modal>
            </b-tooltip>
          </div>
        </div>
        <TablePacients />
      </div>
    </div>
  </div>
</template>

<script>
  import TablePacients from '@/components/TablePacients'
  import NewPacientModal from '@/components/NewPacientModal'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        isNewPacientModalActive: false
      }
    },
    components: {
      TablePacients,
      NewPacientModal
    },
    methods: {
      ...mapActions([
        'setSearchPacients'
      ])
    },
    computed: {
      ...mapGetters([
        'searchPacients'
      ])
    }
  }
</script>

<style lang="stylus" scoped>

.button
  margin-top: 9px

</style>
