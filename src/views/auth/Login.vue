<template>
  <div id="login">
    <GuestNavbar/>

    <b-container>
      <b-row align-h="between" align-v="center">
        <b-col class="mb-md-0 mb-5" cols="12" md="7">
          <img alt="Login" class="img-fluid" src="../../assets/images/login.svg"/>
        </b-col>
        <b-col cols="12" md="4">
          <h1 class="title">¡Hola, bienvenido de nuevo!</h1>
          <ul v-if="validateErrors" class="default-nav small text-danger">
            <li v-for="(error, i) in validateErrors" :key="i">{{ error }}</li>
          </ul>
          <LoginForm/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import GuestNavbar from "../../components/shared/GuestNavbar";
import LoginForm from "../../components/auth/LoginForm";
import {mapGetters} from 'vuex';

export default {
  name: "Login",
  components: {GuestNavbar, LoginForm},
  computed: {
    ...mapGetters({
      validateErrors: 'validateErrors'
    })
  },
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 48px;
  font-weight: bold;
  color: #3f3f3f;
  line-height: 1.2;
  margin-bottom: 3rem;
}

@media (max-width: 767px) {
  .title {
    font-size: 38px;
  }
}
</style>
