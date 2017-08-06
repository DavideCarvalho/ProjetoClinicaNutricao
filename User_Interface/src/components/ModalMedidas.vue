<template>
  <div class="modal-card">
    <form novalidate @submit="enviarMedidas">
      <header class="modal-card-head">
          <p class="modal-card-title">Medidas</p>
      </header>
      <section class="modal-card-body">
          <b-field label="Peso">
            <b-input
                type="text"
                placeholder="184"
                :value="novoPeso"
                @input="setStateNovaMedida({campo:'peso', value:$event})"
                required>
            </b-input>
          </b-field>

          <b-field label="Cintura">
            <b-input
                type="text"
                placeholder="150"
                :value="novaCintura"
                @input="setStateNovaMedida({campo:'cintura', value:$event})"
                required>
            </b-input>
          </b-field>

          <b-field label="Quadril">
            <b-input
                type="text"
                placeholder="120"
                :value="novoQuadril"
                @input="setStateNovaMedida({campo:'quadril', value:$event})"
                required>
            </b-input>
          </b-field>
      </section>
      <footer class="modal-card-foot">
          <button :disabled="isDisabled" type="submit" class="button is-primary">Salvar</button>
          <button class="button" type="button" @click="$parent.close()">Fechar</button>
      </footer>
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
      'setStateNovaMedida'
    ]),
    async enviarMedidas (e) {
      e.preventDefault()
      const novoPeso = this.novoPeso
      const novoQuadril = this.novoQuadril
      const novaCintura = this.novaCintura
      const pacienteId = this.pacienteId
      const hoje = new Date()
      const dia = hoje.getDate()
      const mes = hoje.getMonth() + 1
      const ano = hoje.getFullYear()
      const payload = {
        peso: novoPeso,
        quadril: novoQuadril,
        cintura: novaCintura,
        id: pacienteId,
        dia: dia,
        mes: mes,
        ano: ano
      }
      try {
        this.isLoading = true
        await this.$store.dispatch('adicionarMedida', payload)
        this.isLoading = false
        this.$toast.open({
          message: 'Medidas adicionadas com sucesso!',
          type: 'is-success'
        })
      } catch (e) {
        this.isLoading = false
        this.$toast.open({
          message: 'Erro ao tentar adicionar as medidas, por favor tente novamente',
          type: 'is-danger'
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'novoPeso',
      'novoQuadril',
      'novaCintura',
      'pacienteId'
    ]),
    isDisabled () {
      if (!this.novoPeso || !this.novoQuadril || !this.novaCintura) {
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
        margin: 0 auto;
        width: auto;
    }

    .modal-card-head {
        background-color: #67ac44;
    }

    .modal-card-foot {
        background-color: #67ac44;
    }
</style>
