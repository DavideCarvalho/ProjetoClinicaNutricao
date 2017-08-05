<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Novo Paciente</p>
    </header>
    <section class="modal-card-body">
      <div class="columns is-multiline">
        <div class="column is-half">
          <b-field label="Nome">
            <b-input type="text" required />
          </b-field>
        </div>
        <div class="column is-half">
          <b-field label="Sexo">
            <b-radio-group :value="newPacientSex" @change="setNewPacientField({field: 'sex', value:$event})">
              <b-radio value="Masculino">Masculino</b-radio>
              <b-radio value="Feminino">Feminino</b-radio>
            </b-radio-group>
          </b-field>
        </div>
        <div class="column is-one-third">
          <b-field label="Ano">
            <b-input type="number" required />
          </b-field>
        </div>
        <div class="column is-one-third">
          <b-field label="Mês">
            <b-input type="number" required />
          </b-field>
        </div>
        <div class="column is-one-third">
          <b-field label="Dia">
            <b-input type="number" required />
          </b-field>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions([
      'setNewPacientField'
    ])
  },
  computed: {
    ...mapGetters([
      'newPacientSex'
    ])
  }
}
</script>

<style lang="stylus">

</style>
