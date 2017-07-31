<template>
  <div class="pacientes">
    <div class="columns">
      <div class="column is-offset-one-quarter is-half">
        <br>
        <h1 class="title">Pacientes</h1>
        <b-field label="Pesquisar paciente">
          <b-input type="text" :value="pesquisarPacientes" @input="setPesquisarPacientes($event)"></b-input>
        </b-field>
        <TablePacientes />
      </div>
    </div>
  </div>
</template>

<script>
  import TablePacientes from '../components/TablePacientes'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    components: {
      TablePacientes
    },
    methods: {
      ...mapActions([
        'setPesquisarPacientes'
      ])
    },
    computed: {
      ...mapGetters([
        'pesquisarPacientes'
      ])
    }
  }
</script>

<style>

</style>
