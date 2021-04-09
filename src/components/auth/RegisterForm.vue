<template>
  <div>
    <b-card class="registerCard border-0 shadow-lg p-3">
      <h4 class="text-center registerTitle">Create your Sesame account in 1 minute</h4>

      <b-form-group class="formLabel" label="Email*">
        <b-form-input v-model="form.email" class="inputBox" placeholder="Write your email"></b-form-input>
      </b-form-group>

      <b-row>
        <b-col cols="12" md="6">
          <b-form-group class="formLabel" label="Name*">
            <b-form-input v-model="form.name" class="inputBox" placeholder="Contact person name"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group class="formLabel" label="Surnames*">
            <b-form-input class="inputBox" placeholder="Last name of contact person"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" md="6">
          <b-form-group class="formLabel" label="Password*">
            <b-form-input v-model="form.password" class="inputBox" placeholder="Password"
                          type="password"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group class="formLabel" label="Confirm Password*">
            <b-form-input v-model="form.password_confirmation" class="inputBox" placeholder="Confirmation Password"
                          type="password"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-group class="formLabel" label="Telephone">
        <b-form-input v-model="form.phone" class="inputBox" placeholder="Telephone contact"></b-form-input>
      </b-form-group>

      <b-button block class="registerBtn" @click="register(form)">Create your account!</b-button>
    </b-card>

    <p class="loginLink">
      Do you already have an account?
      <router-link to="/login">Log in</router-link>
    </p>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'form',
  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        phone: null,
      }
    }
  },
  methods: {
    ...mapActions({
      register: 'register'
    })
  }
}
</script>

<style lang="scss" scoped>
.registerCard {
  border-radius: 20px;
  margin-bottom: 20px;

  .registerTitle {
    font-size: 22px;
    color: #1a202c;
    font-weight: normal;
    margin-bottom: 30px;
  }

  .formLabel {
    font-size: 16px;
    color: #000000;
    font-weight: bold;
  }

  .formLabelLgText {
    font-size: 20px;
  }

  .inputBox {
    border-color: #edf2f7;
    border-radius: 30px;
    background-color: #f7f7f7;

    &::placeholder {
      color: #b1bccb;
    }
  }

  .fabBtn {
    height: 35px;
    width: 35px;
    background-color: #667eea;
    color: #ffffff;
    border-color: #667eea;
    border-radius: 50%;
    margin-right: 5px;
    position: relative;

    &:last-child {
      margin-right: 0;
    }

    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .registerBtn {
    background-color: #667eea;
    color: #ffffff;
    border-color: #667eea;
    border-radius: 30px;
    font-size: 1.2rem;
    padding: 12px 5px;
    font-weight: bold;
    margin-top: 25px;
  }
}

.loginLink {
  font-weight: bold;
  font-size: 14px;
  color: #000000;
  text-align: center;

  a {
    color: #5ebea3;
    text-decoration: none;
  }
}
</style>