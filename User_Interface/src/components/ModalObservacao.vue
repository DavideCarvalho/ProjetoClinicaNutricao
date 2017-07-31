<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Nova observação</p>
      <p class="control" style="margin-right: 10%;">
        Médica responsável
        <span class="select">
          <select @change="setIdMedicaSelecionadaObservacao($event.target.value)" :value="idMedicaSelecionadaObservacao">
            <option v-for="medica in medicas" :key="medica.id" :value="medica.id">{{ medica.nome_medica }}</option>
          </select>
        </span>
    </p>
    </header>
    <section class="modal-card-body">
      <div class="columns is-multiline">
        <div class="column is-12">
          <b-field>
            <b-input :value="novaObservacao" @input="setState({campo:'novaObservacao', valor:$event})" class="text" type="textarea">
            </b-input>
          </b-field>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" @click="adicionaObservacao" :disabled="isDisabled">Salvar</button>
      <a class="button" @click="fechaModalObservacao">Cancelar</a>
    </footer>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    beforeCreate () {
      this.$store.dispatch('setMedicasInicial')
    },
    methods: {
      ...mapActions([
        'setState',
        'setIdMedicaSelecionadaObservacao'
      ]),
      fechaModalObservacao () {
        this.$modal.hide('modal_observacao')
      },
      async adicionaObservacao () {
        let data = new Date()
        let dia = data.getMonth() < 9 ? dia = `${data.getDate()}` : dia = data.getDate()
        let mes = data.getMonth() < 9 ? mes = `0${data.getMonth() + 1}` : mes = data.getMonth() + 1
        let ano = data.getFullYear()
        const dataCompleta = `${ano}${mes}${dia}`
        const payload = {
          dia_observacao: dia,
          mes_observacao: mes,
          ano_observacao: ano,
          data_observacao: dataCompleta,
          nm_observacao: this.novaObservacao,
          id_paciente: this.pacienteId,
          id_medica: this.idMedicaSelecionadaObservacao
        }
        try {
          await this.$store.dispatch('adicionarObservacao', payload)
          this.$toast.open({
            message: 'Observação adicionada com sucesso!',
            type: 'is-success'
          })
        } catch (e) {
          this.$toast.open({
            message: 'Erro ao tentar adicionar a observação, por favor tente novamente',
            type: 'is-danger'
          })
        }
      }
    },
    computed: {
      ...mapGetters([
        'novaObservacao',
        'pacienteId',
        'medicas',
        'idMedicaSelecionadaObservacao'
      ]),
      isDisabled () {
        if (!this.novaObservacao || !this.idMedicaSelecionadaObservacao) {
          return true
        } else {
          return false
        }
      }
    }
  }

</script>

<style scoped>
  .modal-card {
    height: 100%;
  }

  .modal-card-head {
    background-color: #67AC44
  }

  .modal-card-foot {
    background-color: #67AC44
  }

  .modal-card-head p {
    color: white;
  }

  .text {
    width: 95%;
  }
</style>
