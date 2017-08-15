<template>
  <div class='alunos'>
    <div class='columns'>
      <div class='column is-one-quarter lateral'>
        <aside class='menu'>
          <p class='sidebar-title'>{{ paciente.nomePaciente }}</p>
          <div class="columns">
            <div class="column is-half is-offset-one-quarter">
              <figure v-if="file" class="image is-128x128 is-round">
                <img :src="file.base64" class="is-round">
              </figure>
              <figure v-else class="image is-128x128">
                <img :src="paciente.fotoPaciente" class="is-round">
              </figure>
              <div class="file purple-background">
                <label class="file-label">
                  <file-base64 class="file-input" :multiple="true" :done="getFiles" accept="image/*"></file-base64>
                  <span class="file-cta purple-background">
                    <span class="file-icon">
                      <i class="fa fa-upload"></i>
                    </span>
                    <span class="file-label">
                      Mudar foto
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <label class="label">Sexo</label>
              <p class='sidebar-text'>{{ paciente.sexoPaciente }}</p>
            </div>
            <div class="column">
              <label class="label">Data de Nascimento</label>
              <p class='sidebar-text'>{{ new Date(paciente.anoNascimento, paciente.mesNascimento - 1, paciente.diaNascimento).toLocaleDateString() }}</p>
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
              <b-checkbox :value="checkPeso" @change.native="trocarCheckBox({campo:'checkPeso', valor:checkPeso})">Peso</b-checkbox>
              <b-checkbox :value="checkQuadril" @change.native="trocarCheckBox({campo:'checkQuadril', valor:checkQuadril})">Quadril</b-checkbox>
              <b-checkbox :value="checkCintura" @change.native="trocarCheckBox({campo:'checkCintura', valor:checkCintura})">Cintura</b-checkbox>
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
import fileBase64 from 'vue-file-base64'
export default {
  beforeMount () {
    !this.logado ? this.$router.push('/') : ''
  },
  async mounted () {
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
      isLoading: false,
      file: null
    }
  },
  components: {
    CardObservacao,
    fileBase64
  },
  methods: {
    ...mapActions([
      'trocarCheckBox',
      'selecionaObservacao'
    ]),
    async getFiles (files) {
      this.isLoading = true
      let imageType = files[0].type.split('/')
      if (imageType[0] !== 'image') {
        this.$toast.open({
          message: 'Apenas imagens podem ser usados como fotos de perfil',
          type: 'is-danger'
        })
        this.isLoading = false
        return
      }
      const payload = {
        id: this.paciente.id,
        foto: files[0].base64
      }
      try {
        this.isLoading = false
        await this.$store.dispatch('trocarFoto', payload)
        this.$toast.open({
          message: 'Foto trocada com sucesso!',
          type: 'is-success'
        })
      } catch (e) {
        this.isLoading = false
        this.$toast.open({
          message: 'Erro ao tentar trocar de foto, por favor tente novamente',
          type: 'is-danger'
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'paciente',
      'observacoes',
      'valoresGrafico',
      'checkPeso',
      'checkQuadril',
      'checkCintura',
      'observacaoSelecionada',
      'logado'
    ])
  }
}
</script>


<style lang='stylus' scoped>
  .sidebar-title
    font-size: 20px
    color: white
    text-transform: uppercase
  .sidebar-text
    font-size: 18px
    color: white
  .alunos
    min-height: 100vh
  .lateral
    text-align: center
    height: 100%
    background-color: #67AC44
    height: 100vh
    margin-top: 10px
  .is-round
    border-radius: 50%
  .purple-background
    background-color: #7957D5
    border-color: #7957D5
    &:hover
      background-color: #7957D5
</style>
