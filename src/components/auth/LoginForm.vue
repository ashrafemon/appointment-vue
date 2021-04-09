<template>
  <div>
    <b-form-group v-if="!setEmail" class="position-relative">
      <b-form-input
          v-model="form.email"
          class="inputBox"
          placeholder="Email"
          type="email"
          @keydown="passNext"
      />
    </b-form-group>

    <b-form-group v-else class="position-relative">
      <b-form-input
          v-model="form.password"
          :type="!passwordShow ? 'password': 'text'"
          class="inputBox"
          placeholder="Password"
          @keydown="passNext"
      />
      <button class="btn eyeBtn" @click="passwordShow = !passwordShow">
        <i v-if="!passwordShow" class="far fa-eye"></i>
        <i v-else class="far fa-eye-slash"></i>
      </button>
    </b-form-group>


    <div class="text-right">
      <button class="btn forgetLink text-right mb-3 p-0" @click="showModal">
        ¿Has olvidado tucontraseña?
      </button>
    </div>

    <template v-if="!setEmail">
      <b-button block class="loginBtn" @click="checkEmail">Siguente</b-button>
    </template>
    <template v-else>
      <b-button block class="loginBtn" @click="login(form)">Login</b-button>
    </template>

    <p class="registerLink">
      ¿No tienes una cuenta?
      <router-link :to="{name: 'Register'}" class="forgetLink">Crea una empresa</router-link>
    </p>

    <b-modal
        ref="forgetModal"
        centered
        header-bg-variant="info"
        header-text-variant="white"
        hide-footer
        no-close-on-backdrop
        title="Forget Password"
    >
      <ForgetForm :forget="forget"/>
    </b-modal>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import ForgetForm from "@/components/auth/ForgetForm";

export default {
  components: {ForgetForm},
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      setEmail: false,
      passwordShow: false
    }
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
      login: 'login',
      forgetPassword: 'forgetPassword'
    }),
    checkEmail() {
      if (this.form.email !== '' && this.form.email.includes('@') && this.form.password) {
        this.login(this.form)
      } else if (this.form.email !== '' && this.form.email.includes('@')) {
        this.setEmail = true
      }
    },
    passNext(e) {
      if (e.keyCode === 13) {
        this.checkEmail()
      }
    },
    showModal() {
      this.$refs['forgetModal'].show()
    },
    hideModal() {
      this.$refs['forgetModal'].hide()
    },
    forget(obj) {
      this.hideModal()
      this.forgetPassword(obj)
    }
  }
}
</script>

<style lang="scss" scoped>
.eyeBtn {
  position: absolute;
  top: 0;
  right: 0;
}

.inputBox {
  border: 0;
  border-bottom: 1px solid #efefef;

  &::placeholder {
    color: #b8c2d0;
  }

  &:focus {
    box-shadow: none;
  }
}

.forgetLink {
  color: #6bd8ba;
  font-weight: bold;
  font-size: 14px;
  text-decoration: none !important;
}

.registerLink {
  color: #b5b5b5;
  font-size: 14px;
  margin-bottom: 20px;

  a {
    display: inline-block;
    margin-bottom: 0;
  }
}

.loginBtn {
  background-color: #5ebea3;
  border-color: #5ebea3;
  color: #ffffff;
  font-weight: bold;
  border-radius: 30px;
  margin-bottom: 20px;
}
</style>