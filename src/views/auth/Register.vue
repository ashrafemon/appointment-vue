<template>
  <div id="register">
    <div class="registerNavWrapper">
      <GuestNavbar/>
    </div>

    <div class="py-3">
      <b-container>
        <b-row align-h="between" align-v="center">
          <b-col class="mb-md-0 mb-5" cols="12" md="5">
            <img alt="Register" class="img-fluid" src="../../assets/images/register.svg"/>

            <div class="text-center mt-3">
              <h5 class="useTitle">3.000 compañías ya usan Sesame</h5>
              <h1 class="trialTitle">Prueba gratis</h1>
              <h4 class="trialDesc">sin necesidad de introducir los datos de pago.</h4>
            </div>
          </b-col>

          <b-col cols="12" md="6">
            <RegisterForm/>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import GuestNavbar from "../../components/shared/GuestNavbar";
import RegisterForm from "../../components/auth/RegisterForm";

export default {
  name: "Register",
  components: {RegisterForm, GuestNavbar},
}
</script>

<style scoped>
.registerNavWrapper {
  background-color: #667eea;
  padding-bottom: 5rem;
}

.useTitle {
  font-size: 22px;
  font-weight: normal;
  color: #000000;
}

.trialTitle {
  font-size: 48px;
  font-weight: bold;
  color: #667eea;
}

.trialDesc {
  color: #000000;
  font-weight: bold;
  font-size: 20px;
}
</style>
