<template>
  <div>
    <h3 class="subtitle-2">Editar Médica</h3>
    <form @submit="editarMedica(nomeNovaMedica, areaNovaMedica, $event)">
      <div class="columns">
        <div class="column is-half">
          <b-field label="Nome">
            <b-input type="text" :value="nomeNovaMedica" @input="setCampoNovaMedica({campo:'nome_medica', valor: $event})"></b-input>
          </b-field>
        </div>
        <div class="column is-half">
          <b-field label="Área">
            <b-input type="text" :value="areaNovaMedica" @input="setCampoNovaMedica({campo:'area_medica', valor: $event})"></b-input>
          </b-field>
        </div>
      </div>
      <div class="column">
        <button type="submit" class="button is-primary is-fullwidth">Editar médica</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions([
      'setCampoNovaMedica'
    ]),
    async editarMedica (nomeMedica, areaMedica, e) {
      e.preventDefault()
      let payload = {
        nome_medica: nomeMedica,
        area_medica: areaMedica,
        id: this.idNovaMedica,
        senha: this.senhaNovaMedica,
        login: this.loginNovaMedica
      }
      await this.$store.dispatch('editaMedicaSelecionada', payload)
    }
  },
  computed: {
    ...mapGetters([
      'nomeNovaMedica',
      'areaNovaMedica',
      'idNovaMedica',
      'loginNovaMedica',
      'senhaNovaMedica'
    ])
  }
}
</script>

<style>

</style>


