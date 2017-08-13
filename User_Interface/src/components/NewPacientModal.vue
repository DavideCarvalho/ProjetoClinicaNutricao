<template>
  <div class="modal-card">
    <form @submit="submitPacient($event, newPacientId, newPacientName, newPacientSex, newPacientBirthDay, newPacientBirthMonth, newPacientBirthYear)">
      <header class="modal-card-head">
        <p v-if="newPacientId === null" class="modal-card-title">Novo Paciente</p>
        <p v-else class="modal-card-title">Editar Paciente</p>
      </header>
      <section class="modal-card-body">
          <div class="columns is-multiline">
            <div class="column is-half">
              <b-field label="Nome">
                <b-input type="text" :value="newPacientName" @input="setNewPacientField({field: 'name', value:$event})" required/>
              </b-field>
            </div>
            <div class="column is-half">
              <label class="label">Sexo</label>
              <b-field>
                <b-radio-button :value="newPacientSex"
                    native-value="Masculino"
                    @change.native="setNewPacientField({field: 'sex', value:$event.target.value})">
                    <span>Masculino</span>
                </b-radio-button>
                <b-radio-button :value="newPacientSex"
                    native-value="Feminino"
                    @change.native="setNewPacientField({field: 'sex', value:$event.target.value})">
                    <span>Feminino</span>
                </b-radio-button>
              </b-field>
            </div>
            <div class="column is-one-third">
              <b-field label="Dia">
                <b-input type="number" min="1" max="31" :value="newPacientBirthDay" @input="setNewPacientField({field: 'birth_day', value:$event})" required />
              </b-field>
            </div>
            <div class="column is-one-third">
              <b-field label="Mês">
                <b-input type="number" min="1" max="12" :value="newPacientBirthMonth" @input="setNewPacientField({field: 'birth_month', value:$event})" required />
              </b-field>
            </div>
            <div class="column is-one-third">
              <b-field label="Ano">
                <b-input type="number" :value="newPacientBirthYear" @input="setNewPacientField({field: 'birth_year', value:$event})" required />
              </b-field>
            </div>
          </div>
      </section>
      <footer class="modal-card-foot">
        <div>
          <button v-if="newPacientId === null" :disabled="isDisabled" class="button is-primary" type="submit">Adicionar</button>
          <button v-else :disabled="isDisabled" class="button is-primary" type="submit">Editar</button>
        </div>
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
      'setNewPacientField'
    ]),
    async submitPacient (event, newPacientId, newPacientName, newPacientSex, newPacientBirthDay, newPacientBirthMonth, newPacientBirthYear) {
      event.preventDefault()
      if (newPacientId) {
        const payload = {
          newPacientId,
          newPacientName,
          newPacientSex,
          newPacientBirthDay,
          newPacientBirthMonth,
          newPacientBirthYear
        }
        this.editPacient(payload)
      } else {
        const payload = {
          newPacientName,
          newPacientSex,
          newPacientBirthDay,
          newPacientBirthMonth,
          newPacientBirthYear
        }
        this.addNewPacient(payload)
      }
    },
    async addNewPacient (payload) {
      try {
        this.isLoading = true
        await this.$store.dispatch('addNewPacient', payload)
        this.isLoading = false
        this.$toast.open({
          message: 'Paciente adicionado com sucesso!',
          type: 'is-success'
        })
      } catch (e) {
        this.isLoading = false
        this.$toast.open({
          message: 'Erro ao tentar adicionar o paciente, por favor tente novamente',
          type: 'is-danger'
        })
      }
    },
    async editPacient (payload) {
      try {
        this.isLoading = true
        await this.$store.dispatch('editPacient', payload)
        this.isLoading = false
        this.$toast.open({
          message: 'Paciente alterado com sucesso!',
          type: 'is-success'
        })
      } catch (e) {
        this.isLoading = false
        this.$toast.open({
          message: 'Erro ao tentar alterar o paciente, por favor tente novamente',
          type: 'is-danger'
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'newPacientId',
      'newPacientName',
      'newPacientSex',
      'newPacientBirthDay',
      'newPacientBirthMonth',
      'newPacientBirthYear'
    ]),
    isDisabled () {
      if (!this.newPacientName || !this.newPacientSex || !this.newPacientBirthDay || !this.newPacientBirthMonth || !this.newPacientBirthYear) {
        return true
      } else {
        if (this.newPacientBirthDay > 31 || this.newPacientBirthDay < 1 || this.newPacientBirthMonth > 12 || this.newPacientBirthMonth < 1) {
          return true
        } else {
          return false
        }
      }
    }
  }
}
</script>

<style lang="stylus">

</style>
