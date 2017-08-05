<template>
  <div class='tablePacients'>
   <b-table
    :data='tablePacients'
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
        <b-table-column @click="goToPacienteUrl(props.row)" field='nome_paciente' label='Nome do paciente' sortable>
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
        <b-table-column field="area" label="Ações" sortable>
          <div class="columns">
            <div class="column">
              <b-tooltip label="Editar paciente" animated>
                <button class="button is-info" @click="openPacientModal(props.row)">
                  <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU1LjI1IDU1LjI1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NS4yNSA1NS4yNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiPgo8cGF0aCBkPSJNNTIuNjE4LDIuNjMxYy0zLjUxLTMuNTA4LTkuMjE5LTMuNTA4LTEyLjcyOSwwTDMuODI3LDM4LjY5M0MzLjgxLDM4LjcxLDMuOCwzOC43MzEsMy43ODUsMzguNzQ5ICBjLTAuMDIxLDAuMDI0LTAuMDM5LDAuMDUtMC4wNTgsMC4wNzZjLTAuMDUzLDAuMDc0LTAuMDk0LDAuMTUzLTAuMTI1LDAuMjM5Yy0wLjAwOSwwLjAyNi0wLjAyMiwwLjA0OS0wLjAyOSwwLjA3NSAgYy0wLjAwMywwLjAxLTAuMDA5LDAuMDItMC4wMTIsMC4wM2wtMy41MzUsMTQuODVjLTAuMDE2LDAuMDY3LTAuMDIsMC4xMzUtMC4wMjIsMC4yMDJDMC4wMDQsNTQuMjM0LDAsNTQuMjQ2LDAsNTQuMjU5ICBjMC4wMDEsMC4xMTQsMC4wMjYsMC4yMjUsMC4wNjUsMC4zMzJjMC4wMDksMC4wMjUsMC4wMTksMC4wNDcsMC4wMywwLjA3MWMwLjA0OSwwLjEwNywwLjExLDAuMjEsMC4xOTYsMC4yOTYgIGMwLjA5NSwwLjA5NSwwLjIwNywwLjE2OCwwLjMyOCwwLjIxOGMwLjEyMSwwLjA1LDAuMjUsMC4wNzUsMC4zNzksMC4wNzVjMC4wNzcsMCwwLjE1NS0wLjAwOSwwLjIzMS0wLjAyN2wxNC44NS0zLjUzNSAgYzAuMDI3LTAuMDA2LDAuMDUxLTAuMDIxLDAuMDc3LTAuMDNjMC4wMzQtMC4wMTEsMC4wNjYtMC4wMjQsMC4wOTktMC4wMzljMC4wNzItMC4wMzMsMC4xMzktMC4wNzQsMC4yMDEtMC4xMjMgIGMwLjAyNC0wLjAxOSwwLjA0OS0wLjAzMywwLjA3Mi0wLjA1NGMwLjAwOC0wLjAwOCwwLjAxOC0wLjAxMiwwLjAyNi0wLjAybDM2LjA2My0zNi4wNjNDNTYuMTI3LDExLjg1LDU2LjEyNyw2LjE0LDUyLjYxOCwyLjYzMXogICBNNTEuMjA0LDQuMDQ1YzIuNDg4LDIuNDg5LDIuNyw2LjM5NywwLjY1LDkuMTM3bC05Ljc4Ny05Ljc4N0M0NC44MDgsMS4zNDUsNDguNzE2LDEuNTU3LDUxLjIwNCw0LjA0NXogTTQ2LjI1NCwxOC44OTVsLTkuOS05LjkgIGwxLjQxNC0xLjQxNGw5LjksOS45TDQ2LjI1NCwxOC44OTV6IE00Ljk2MSw1MC4yODhjLTAuMzkxLTAuMzkxLTEuMDIzLTAuMzkxLTEuNDE0LDBMMi43OSw1MS4wNDVsMi41NTQtMTAuNzI4bDQuNDIyLTAuNDkxICBsLTAuNTY5LDUuMTIyYy0wLjAwNCwwLjAzOCwwLjAxLDAuMDczLDAuMDEsMC4xMWMwLDAuMDM4LTAuMDE0LDAuMDcyLTAuMDEsMC4xMWMwLjAwNCwwLjAzMywwLjAyMSwwLjA2LDAuMDI4LDAuMDkyICBjMC4wMTIsMC4wNTgsMC4wMjksMC4xMTEsMC4wNSwwLjE2NWMwLjAyNiwwLjA2NSwwLjA1NywwLjEyNCwwLjA5NSwwLjE4MWMwLjAzMSwwLjA0NiwwLjA2MiwwLjA4NywwLjEsMC4xMjcgIGMwLjA0OCwwLjA1MSwwLjEsMC4wOTQsMC4xNTcsMC4xMzRjMC4wNDUsMC4wMzEsMC4wODgsMC4wNiwwLjEzOCwwLjA4NEM5LjgzMSw0NS45ODIsOS45LDQ2LDkuOTcyLDQ2LjAxNyAgYzAuMDM4LDAuMDA5LDAuMDY5LDAuMDMsMC4xMDgsMC4wMzVjMC4wMzYsMC4wMDQsMC4wNzIsMC4wMDYsMC4xMDksMC4wMDZjMCwwLDAuMDAxLDAsMC4wMDEsMGMwLDAsMC4wMDEsMCwwLjAwMSwwaDAuMDAxICBjMCwwLDAuMDAxLDAsMC4wMDEsMGMwLjAzNiwwLDAuMDczLTAuMDAyLDAuMTA5LTAuMDA2bDUuMTIyLTAuNTY5bC0wLjQ5MSw0LjQyMkw0LjIwNCw1Mi40NTlsMC43NTctMC43NTcgIEM1LjM1MSw1MS4zMTIsNS4zNTEsNTAuNjc5LDQuOTYxLDUwLjI4OHogTTE3LjUxMSw0NC44MDlMMzkuODg5LDIyLjQzYzAuMzkxLTAuMzkxLDAuMzkxLTEuMDIzLDAtMS40MTRzLTEuMDIzLTAuMzkxLTEuNDE0LDAgIEwxNi4wOTcsNDMuMzk1bC00Ljc3MywwLjUzbDAuNTMtNC43NzNsMjIuMzgtMjIuMzc4YzAuMzkxLTAuMzkxLDAuMzkxLTEuMDIzLDAtMS40MTRzLTEuMDIzLTAuMzkxLTEuNDE0LDBMMTAuNDQsMzcuNzM4ICBsLTMuMTgzLDAuMzU0TDM0Ljk0LDEwLjQwOWw5LjksOS45TDE3LjE1Nyw0Ny45OTJMMTcuNTExLDQ0LjgwOXogTTQ5LjA4MiwxNi4wNjdsLTkuOS05LjlsMS40MTUtMS40MTVsOS45LDkuOUw0OS4wODIsMTYuMDY3eiIgZmlsbD0iI0ZGRkZGRiIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
                </button>
              </b-tooltip>
            </div>
            <div class="column">
              <b-tooltip label="Excluir paciente" animated>
                <button class="button is-danger" @click="deletePacient(props.row.id)">
                  <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDM1NyAzNTciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM1NyAzNTc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0iY2xlYXIiPgoJCTxwb2x5Z29uIHBvaW50cz0iMzU3LDM1LjcgMzIxLjMsMCAxNzguNSwxNDIuOCAzNS43LDAgMCwzNS43IDE0Mi44LDE3OC41IDAsMzIxLjMgMzUuNywzNTcgMTc4LjUsMjE0LjIgMzIxLjMsMzU3IDM1NywzMjEuMyAgICAgMjE0LjIsMTc4LjUgICAiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
                </button>
              </b-tooltip>
            </div>
            <div class="column">
              <b-tooltip label="Consultar paciente" animated>
                <button class="button is-success" @click="goToPacientUrl(props.row)">
                  <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjkgMTI5IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMjkgMTI5IiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KICA8Zz4KICAgIDxwYXRoIGQ9Im00MC40LDEyMS4zYy0wLjgsMC44LTEuOCwxLjItMi45LDEuMnMtMi4xLTAuNC0yLjktMS4yYy0xLjYtMS42LTEuNi00LjIgMC01LjhsNTEtNTEtNTEtNTFjLTEuNi0xLjYtMS42LTQuMiAwLTUuOCAxLjYtMS42IDQuMi0xLjYgNS44LDBsNTMuOSw1My45YzEuNiwxLjYgMS42LDQuMiAwLDUuOGwtNTMuOSw1My45eiIgZmlsbD0iI0ZGRkZGRiIvPgogIDwvZz4KPC9zdmc+Cg==" />
                </button>
              </b-tooltip>
            </div>
          </div>
        </b-table-column>
    </template>
    </b-table>
    <b-modal :active.sync="isPacientModalActive" :width="650" :onCancel="resetNewPacientFields">
      <NewPacientModal />
    </b-modal>
    <b-loading :active.sync="isLoading"></b-loading>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import NewPacientModal from '@/components/NewPacientModal'
  export default {
    async beforeCreate () {
      try {
        await this.$store.dispatch('setPacients')
      } catch (e) {
        this.$toast.open({
          message: 'Erro ao tentar buscar lista de pacientes, por favor tente recarregar a página',
          type: 'is-danger'
        })
      }
    },
    components: {
      NewPacientModal
    },
    data () {
      return {
        isLoading: false,
        isPacientModalActive: false
      }
    },
    methods: {
      ...mapActions([
        'resetNewPacientFields'
      ]),
      goToPacientUrl (selectedPacient) {
        this.$router.push(`/paciente/${selectedPacient.id}`)
      },
      async deletePacient (pacientId) {
        try {
          this.isLoading = true
          await this.$store.dispatch('deletePacient', pacientId)
          this.isLoading = false
          this.$toast.open({
            message: 'Paciente removido com sucesso!',
            type: 'is-success'
          })
        } catch (e) {
          this.isLoading = false
          this.$toast.open({
            message: 'Erro ao tentar remover o paciente, por favor tente novamente',
            type: 'is-danger'
          })
        }
      },
      openPacientModal (selectedPacient) {
        this.$store.dispatch('addPacientToEdit', selectedPacient)
        this.isPacientModalActive = true
      }
    },
    computed: {
      ...mapGetters([
        'pacientes',
        'tablePacients'
      ])
    }
  }
</script>

<style>

</style>
