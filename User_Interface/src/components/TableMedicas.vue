<template>
  <div class='tablePacientes'>
   <b-table
    :data='medicas'
    :bordered='false'
    :striped='false'
    :narrowed='false'
    :checkable='false'
    :mobile-cards='false'
    :paginated='true'
    :per-page='7'
    :pagination-simple='true'
    default-sort='nome_paciente'>
       <template scope="props">
        <b-table-column field='nome_medica' label='Nome' sortable>
            {{ props.row.nome_medica }}
        </b-table-column>
        <b-table-column field="area_medica" label="Area" sortable>
            {{ props.row.area_medica }}
        </b-table-column>
        <b-table-column field="area" label="Ações" sortable>
          <button class="button is-info" @click="editaMedica(props.row)">Editar</button>
          <button class="button is-danger" @click="deletaMedica(props.row)">Deletar</button>
        </b-table-column>
    </template>
    </b-table>
    <b-loading :active.sync="isLoading"></b-loading>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    async mounted () {
      if (!this.medicas.length) {
        try {
          this.isLoading = true
          await this.$store.dispatch('setMedicasInicial')
          this.isLoading = false
        } catch (e) {
          this.isLoading = false
          this.$toast.open({
            message: 'Erro ao tentar buscar lista com as médicas, por favor tente novamente',
            type: 'is-danger'
          })
        }
      }
    },
    data () {
      return {
        isLoading: false
      }
    },
    methods: {
      editaMedica (medicaSelecionada) {
        this.$store.dispatch('formEditaMedicaSelecionada', medicaSelecionada)
      },
      async deletaMedica (medicaSelecionada) {
        try {
          this.isLoading = true
          await this.$store.dispatch('deletaMedicaSelecionada', medicaSelecionada)
          this.isLoading = false
          this.$toast.open({
            message: 'Medica removida com sucesso!',
            type: 'is-success'
          })
        } catch (e) {
          this.isLoading = false
          this.$toast.open({
            message: 'Erro ao tentar remover médica, por favor tente novamente',
            type: 'is-danger'
          })
        }
      }
    },
    computed: {
      ...mapGetters([
        'medicas'
      ])
    }
  }
</script>

<style>

</style>
