<template>
  <div class="card">
    <header @click="opened=!opened" class="card-header">
      <p class="card-header-title">
        {{ observacao.dia_observacao }}/{{ observacao.mes_observacao }}/{{ observacao.ano_observacao }}
      </p>
      <a class="card-header-icon">
      <span class="icon">
        <i class="fa fa-angle-down"></i>
      </span>
    </a>
    </header>
    <transition name="body">
      <div v-if="opened" class="card-body">
        <div class="card-content">
          <div class="content">
            <p>{{ observacao.nm_observacao }}</p>
            <p>Medica: {{observacao.nome_medica}}</p>
          </div>
        </div>
        <footer v-if="observacao.data_observacao == dataAtual" class="card-footer">
          <a class="card-footer-item" @click="deletaObservacao(observacao)">Deletar</a>
        </footer>
      </div>
    </transition>
    <b-loading :active.sync="isLoading"></b-loading>
  </div>
</template>

<script>
  export default {
    props: ['observacao', 'data'],
    data () {
      return {
        opened: false,
        isLoading: false
      }
    },
    methods: {
      async deletaObservacao (observacao) {
        try {
          this.isLoading = true
          await this.$store.dispatch('deletaObservacao', observacao)
          this.isLoading = false
          this.$toast.open({
            message: 'Observação removida com sucesso!',
            type: 'is-success'
          })
        } catch (e) {
          this.isLoading = false
          this.$toast.open({
            message: 'Erro ao tentar remover observação, por favor tente novamente',
            type: 'is-danger'
          })
        }
      }
    },
    computed: {
      dataAtual () {
      /*eslint-disable*/
        let data = new Date()
        let dia_observacao = data.getMonth() <= 9 ? dia_observacao = `${data.getDate()}` : dia_observacao = data.getDate()
        let mes_observacao = data.getMonth() <= 9 ? mes_observacao = `0${data.getMonth() + 1}` : mes_observacao = data.getMonth() + 1
        let ano_observacao = data.getFullYear()
        let data_observacao = `${ano_observacao}${mes_observacao}${dia_observacao}`
        return data_observacao
      /*eslint-enable*/
      }
    }
  }

</script>

<style>
  .card-header {
    cursor:pointer
  }

  .body-enter-active, .body-leave-active {
    transition: opacity .1s ease-out
  }
  .body-enter, .body-leave-to {
    opacity: 0
  }


</style>
