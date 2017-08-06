<template>
  <div class="pacientes">
    <div class="columns">
      <div class="column is-offset-one-quarter is-half">
        <br>
        <h1 class="title">Medicas</h1>
        <FormAdicionaMedica v-if="idNovaMedica === null" />
        <FormEditaMedica v-else/>
        <TableMedicas />
      </div>
    </div>
  </div>
</template>

<script>
  import TableMedicas from '@/components/TableMedicas'
  import FormAdicionaMedica from '@/components/FormAdicionaMedica'
  import FormEditaMedica from '@/components/FormEditaMedica'
  import { mapGetters } from 'vuex'
  export default {
    beforeMount () {
      !this.logado ? this.$router.push('/') : ''
    },
    components: {
      TableMedicas,
      FormAdicionaMedica,
      FormEditaMedica
    },
    computed: {
      ...mapGetters([
        'idNovaMedica',
        'logado'
      ])
    }
  }
</script>

<style lang="stylus" scoped>

</style>

