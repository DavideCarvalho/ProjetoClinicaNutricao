<template>
  <div>
    <h3 class="subtitle-2">Adicionar Médica</h3>
    <form @submit="adicionarNovaMedica(nomeNovaMedica, areaNovaMedica, $event)">
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
        <button type="submit" class="button is-primary is-fullwidth">Adicionar nova médica</button>
      </div>
    </form>
    <b-loading :active.sync="isLoading"></b-loading>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    ...mapActions([
      'setCampoNovaMedica'
    ]),
    async adicionarNovaMedica (nomeNovaMedica, areaNovaMedica, e) {
      e.preventDefault()
      const payload = {
        nome_medica: nomeNovaMedica,
        area_medica: areaNovaMedica
      }
      try {
        this.isLoading = true
        await this.$store.dispatch('adicionaNovaMedica', payload)
        this.isLoading = false
        this.$toast.open({
          message: 'Medica adicionada com sucesso!',
          type: 'is-success'
        })
      } catch (e) {
        this.isLoading = false
        this.$toast.open({
          message: 'Erro ao tentar adicionar a médica, por favor tente novamente',
          type: 'is-danger'
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'nomeNovaMedica',
      'areaNovaMedica'
    ])
  }
}
</script>

<style lang="stylus" scoped>

</style>
