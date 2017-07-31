<template>
  <div class="pacientes">
    <div class="columns">
      <div class="column is-offset-one-quarter is-half">
        <br>
        <h1 class="title">Medicas</h1>
        <h3 class="subtitle-2">Adicionar Médica</h3>
        <form @submit="adicionarNovaMedica(nomeNovaMedica, areaNovaMedica, $event)">
          <div class="columns">
            <div class="column is-half">
              <b-field label="Nome">
                <b-input type="text" :value="nomeNovaMedica" @input="setCampoNovaMedica({campo:'nome', valor: $event})"></b-input>
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="Área">
                <b-input type="text" :value="areaNovaMedica" @input="setCampoNovaMedica({campo:'area', valor: $event})"></b-input>
              </b-field>
            </div>
          </div>
          <div class="column">
            <button type="submit" class="button is-primary is-fullwidth">Adicionar nova médica</button>
          </div>
        </form>
        <TableMedicas />
      </div>
    </div>
  </div>
</template>

<script>
  import TableMedicas from '../components/TableMedicas'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    components: {
      TableMedicas
    },
    methods: {
      ...mapActions([
        'setCampoNovaMedica'
      ]),
      adicionarNovaMedica (nomeNovaMedica, areaNovaMedica, e) {
        e.preventDefault()
        const payload = {
          nome_medica: nomeNovaMedica,
          area_medica: areaNovaMedica
        }
        this.$store.dispatch('adicionaNovaMedica', payload)
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

