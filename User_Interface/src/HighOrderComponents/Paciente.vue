<template>
  <div class='alunos'>
    <div class='columns'>
      <div class='column is-one-quarter lateral'>
        <aside class='menu'>
          <p class='menu-label'>{{ paciente.nomePaciente }}</p>
          <div class="columns">
            <div class="column is-half is-offset-one-quarter">
              <figure style="margin-left:10px;" class="image is-128x128">
                <img style="border-radius:50%" src="http://bulma.io/images/placeholders/128x128.png">
              </figure>
            </div>
          </div>
        </aside>
      </div>
      <div class='column'>
        <div class='columns is-multiline'>
          <div class='column is-12'>
            <div>
              <line-chart :data="valoresGrafico" download="boom"></line-chart>
            </div>
          </div>
          <div class="column is-half is-offset-4">
            <div class="block">
              <b-checkbox :value="checkPeso" @change="trocarCheckBox({campo:'checkPeso', valor:checkPeso})">Peso</b-checkbox>
              <b-checkbox :value="checkQuadril" @change="trocarCheckBox({campo:'checkQuadril', valor:checkQuadril})">Quadril</b-checkbox>
              <b-checkbox :value="checkCintura" @change="trocarCheckBox({campo:'checkCintura', valor:checkCintura})">Cintura</b-checkbox>
            </div>
          </div>
          <div class="column is-2"></div>
          <div v-for="observacao in observacoes" class="column is-3" :key="observacao.id">
            <CardObservacao :observacao="observacao" />
          </div>
        </div>
      </div>
    </div>
    <b-loading :active.sync="isLoading"></b-loading>
  </div>

</template>

<script>
import CardObservacao from '@/components/CardObservacao'
import { mapGetters, mapActions } from 'vuex'
export default {
  async beforeCreate () {
    try {
      this.isLoading = true
      await this.$store.dispatch('setPaciente', this.$route.params.id)
      this.isLoading = false
    } catch (e) {
      this.isLoading = false
      this.$toast.open({
        message: 'Erro ao tentar buscar informações do paciente, por favor recarregue a página',
        type: 'is-danger'
      })
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    CardObservacao
  },
  methods: {
    ...mapActions([
      'trocarCheckBox',
      'selecionaObservacao'
    ])
  },
  computed: {
    ...mapGetters([
      'paciente',
      'observacoes',
      'valoresGrafico',
      'checkPeso',
      'checkQuadril',
      'checkCintura',
      'observacaoSelecionada'
    ])
  }
}
</script>


<style lang='stylus' scoped>
  .menu-label
    font-size: 20px
  .alunos
    min-height: 100vh
  .lateral
    text-align: center
    height: 100%
    background-color: #67AC44
    height: 100vh
    margin-top: 10px
</style>
