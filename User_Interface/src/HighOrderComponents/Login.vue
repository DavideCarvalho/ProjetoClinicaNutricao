<template>
  <div class="login-wrapper columns">
    <div class="column is-8 is-hidden-mobile hero-banner">
      <section class="hero is-fullheight is-dark">
        <div class="hero-body">
          <div class="container section">
            <div class="has-text-right">
              <h1 class="title is-1">Nutrição</h1>
              <br>
              <p class="title is-3">Sistema de Controle de Pacientes</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="column is-4">
      <section class="hero is-fullheight">
        <div class="hero-heading">
          <div class="section has-text-centered">
            <img src="http://www.crossfitbauru.com.br/wp-content/uploads/2013/12/nutri-e-saude.jpg" alt="Bulma logo" width="150px">
          </div>
        </div>
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-8 is-offset-2">
                <div class="login-form">
                  <p class="control has-icon has-icon-right">
                    <input class="input email-input" :value="login" :class="{'is-danger':loginDanger, 'is-success':!loginDanger}" @input="setInput({campo: 'login', valor: $event.target.value})" type="text" placeholder="Login">
                    <span class="icon user">
                      <i class="fa fa-user"></i>
                    </span>
                  </p>
                  <br>
                  <p class="control has-icon has-icon-right">
                    <input class="input password-input" :value="senha" :class="{'is-danger':senhaDanger, 'is-success':!senhaDanger}" @input="setInput({campo: 'senha', valor: $event.target.value})" type="password" placeholder="●●●●●●●">
                    <span class="icon user">
                      <i class="fa fa-lock"></i>
                    </span>
                  </p>
                  <p class="control login">
                    <button :disabled="disableButton" :class="{'is-danger':disableButton}" class="button is-success is-outlined is-large is-fullwidth" @click="logar(login, senha)">Login</button>
                  </p>
                </div>
                <div class="section forgot-password">
                  <p class="has-text-centered">
                    <a href="#">Esqueceu a senha?</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      loginDanger: null,
      senhaDanger: null,
      disableButton: true
    }
  },
  methods: {
    ...mapActions([
      'setInput'
    ]),
    async logar (login, senha) {
      let usuario = {}
      usuario.login = login
      usuario.senha = senha
      try {
        await this.$store.dispatch('logar', usuario)
        this.$router.push(`/pacientes`)
      } catch (e) {
        this.$toast.open({
          message: `Login ou senha inválidos`,
          type: 'is-danger'
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'login',
      'senha'
    ])
  },
  watch: {
    login: function () {
      if (!this.login) {
        this.loginDanger = true
        this.disableButton = true
      } else {
        this.loginDanger = false
        if (this.senhaDanger === false) {
          this.disableButton = false
        }
      }
    },
    senha: function () {
      if (!this.senha) {
        this.senhaDanger = true
        this.disableButton = true
      } else {
        this.senhaDanger = false
        if (this.loginDanger === false) {
          this.disableButton = false
        }
      }
    }
  }
}
</script>

<style scoped>
.email-input,
.password-input {
  border-radius: 40px;
  font-size: 20px;
  padding-left: 15px;
  color: #95A5A6;
}

.icon.user,
.icon.password {
  margin: 5px 10px 0 0;
}

.avatar img {
  border-radius: 100px;
  padding: 5px;
  border: 1px solid #dbdbdb;
}

.forgot-password a {
  color: #95A5A6;
  font-weight: bold;
  padding-right: 20px;
}

.login {
  padding-top: 20px;
}

.login button {
  border-radius: 40px;
  font-weight: bold;
}

.hero-body .container {
  margin-top: -100px;
}

.hero.is-dark .section {
  background-color: transparent;
}

.login-wrapper {
  margin: -0.75rem;
  overflow-y: hidden;
}

.hero-banner .hero {
  background: url('../assets/login.jpg');
  background-position: center;
  background-size: cover;
  background-blend-mode: screen;
}

.hero-banner .title {
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 5px;
}
</style>
