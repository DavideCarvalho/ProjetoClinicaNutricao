<template>
  <div class='tablePacientes'>
   <b-table
    :data='tabelaPacientes'
    :bordered='false'
    :striped='false'
    :narrowed='false'
    :checkable='false'
    :mobile-cards='false'
    :paginated='true'
    :per-page='7'
    :pagination-simple='true'
    default-sort='nome_paciente'
    selectable
    @select="goToPacientUrl"
    :selected.sync='selectedPacient'
    :checked-rows.sync='checkedRows'>
       <template scope="props">
        <b-table-column field='nome_paciente' label='Nome do paciente' @click="goToPacienteUrl(props.row)" sortable>
            {{ props.row.nome_paciente }}
        </b-table-column>
        <b-table-column field="date" label="Data de nascimento" sortable>
            <span class="tag is-success">
                {{ new Date(props.row.ano_nascimento, props.row.mes_nascimento - 1, props.row.dia_nascimento).toLocaleDateString() }}
            </span>
        </b-table-column>
        <b-table-column field="gender" label="Sexo">
          <img v-if="props.row.sexo_paciente === 'Feminino'" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0MTcuNjA2IDQxNy42MDYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQxNy42MDYgNDE3LjYwNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGMDUyMjg7IiBkPSJNMjUxLjkwNiwzMzEuNDFjLTkxLjM3OSwwLTE2NS43MDktNzQuMzM4LTE2NS43MDktMTY1LjcwNWMwLTkxLjM3MSw3NC4zMzQtMTY1LjcwNSwxNjUuNzA5LTE2NS43MDUgICBjOTEuMzY2LDAsMTY1LjcsNzQuMzM0LDE2NS43LDE2NS43MDVDNDE3LjYwNiwyNTcuMDcyLDM0My4yNzIsMzMxLjQxLDI1MS45MDYsMzMxLjQxeiBNMjUxLjkwNiw2MS45NzUgICBjLTU3LjIwMywwLTEwMy43MzUsNDYuNTMyLTEwMy43MzUsMTAzLjczNWMwLDU3LjE5NSw0Ni41MzIsMTAzLjczNSwxMDMuNzM1LDEwMy43MzVjNTcuMTk5LDAsMTAzLjczNS00Ni41MzcsMTAzLjczNS0xMDMuNzM1ICAgQzM1NS42MzcsMTA4LjUwNywzMDkuMTA1LDYxLjk3NSwyNTEuOTA2LDYxLjk3NXoiLz4KCQoJCTxyZWN0IHg9IjU4LjMxNCIgeT0iMjMzLjA3OCIgdHJhbnNmb3JtPSJtYXRyaXgoLTAuNzA3MSAtMC43MDcxIDAuNzA3MSAtMC43MDcxIC03OS43Mjg0IDYyMy42NSkiIHN0eWxlPSJmaWxsOiNGMDUyMjg7IiB3aWR0aD0iNjEuOTY4IiBoZWlnaHQ9IjE5MC41MTgiLz4KCQoJCTxyZWN0IHg9Ii01Ljk5MSIgeT0iMjk3LjMyOSIgdHJhbnNmb3JtPSJtYXRyaXgoLTAuNzA3MSAtMC43MDcxIDAuNzA3MSAtMC43MDcxIC03OS43NjQgNjIzLjU4ODEpIiBzdHlsZT0iZmlsbDojRjA1MjI4OyIgd2lkdGg9IjE5MC41MTgiIGhlaWdodD0iNjEuOTY4Ii8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
          <img v-else src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0MjYuNjY3IDQyNi42NjciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQyNi42NjcgNDI2LjY2NzsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM1MEM4RUY7IiBkPSJNMTY1LjcwNSw0MjYuNjY3Qzc0LjMzNCw0MjYuNjY3LDAsMzUyLjMzMywwLDI2MC45NjJjMC05MS4zNjYsNzQuMzM0LTE2NS43LDE2NS43MDUtMTY1LjcgICBjOTEuMzY2LDAsMTY1LjcsNzQuMzM0LDE2NS43LDE2NS43QzMzMS40MDUsMzUyLjMzMywyNTcuMDcxLDQyNi42NjcsMTY1LjcwNSw0MjYuNjY3eiBNMTY1LjcwNSwxNTcuMjM1ICAgYy01Ny4xOTksMC0xMDMuNzM1LDQ2LjUzMi0xMDMuNzM1LDEwMy43MzFzNDYuNTMyLDEwMy43MzUsMTAzLjczNSwxMDMuNzM1YzU3LjE5NSwwLDEwMy43MzUtNDYuNTMyLDEwMy43MzUtMTAzLjczNSAgIEMyNjkuNDM2LDIwMy43NjcsMjIyLjg5OSwxNTcuMjM1LDE2NS43MDUsMTU3LjIzNXoiLz4KCTxwb2x5Z29uIHN0eWxlPSJmaWxsOiM1MEM4RUY7IiBwb2ludHM9IjQyNi42NjcsMTY1LjcwNSAzNjQuNjk4LDE2NS43MDUgMzY0LjY5OCw2MS45NjkgMjYwLjk2Miw2MS45NjkgMjYwLjk2MiwwIDQyNi42NjcsMCAgIi8+CgkKCQk8cmVjdCB4PSIyOTcuMzI1IiB5PSIzLjA5MiIgdHJhbnNmb3JtPSJtYXRyaXgoLTAuNzA3MSAtMC43MDcxIDAuNzA3MSAtMC43MDcxIDQ5MC45MTQgNDAwLjA0NTcpIiBzdHlsZT0iZmlsbDojNTBDOEVGOyIgd2lkdGg9IjYxLjk2OCIgaGVpZ2h0PSIxOTAuNTE4Ii8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
          {{ props.row.sexo_paciente }}
        </b-table-column>
    </template>
    </b-table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    async beforeCreate () {
      try {
        await this.$store.dispatch('setPacientes')
      } catch (e) {
        this.$toast.open({
          message: 'Erro ao tentar buscar lista de pacientes, por favor tente recarregar a página',
          type: 'is-danger'
        })
      }
    },
    data () {
      return {
        checkedRows: [],
        selectedPacient: {}
      }
    },
    methods: {
      clearSelected () {
        this.selected = {}
      },
      clearCheckedRows () {
        this.checkedRows = []
      },
      goToPacientUrl (selectedPacient) {
        this.$router.push(`/paciente/${selectedPacient.id}`)
      }
    },
    computed: {
      ...mapGetters([
        'pacientes',
        'tabelaPacientes'
      ])
    }
  }
</script>

<style>

</style>
