<template>
  <div id="infoSection">

    <div v-if="!isPermitUser && hasAccount && !forgetPassword" class="authForm">
      <h5 class="authFormTitle">Sign In</h5>

      <ul v-if="validateErrors.length > 0" class="default-nav small text-danger text-left">
        <li v-for="(item, i) in validateErrors" :key="i" class="nav-item">{{ item }}</li>
      </ul>

      <b-form-group>
        <b-form-input v-model="loginForm.email" class="inputBox" placeholder="Email" type="email"/>
      </b-form-group>
      <b-form-group>
        <b-form-input v-model="loginForm.password" class="inputBox" placeholder="Password" type="password"/>
      </b-form-group>

      <button class="btn authBtn" @click="login(loginForm)">Sign In</button>
      <button class="btn forgetBtn" @click="forgetBox">Forget Password?</button>
      <hr/>
      <button class="btn btn-block newBtn" @click="registerBox">Not Account Yet?</button>
      <button class="btn btn-block newBtn" @click="manualBox">Skip Login Process >></button>
    </div>

    <div v-if="!isPermitUser && !hasAccount && !forgetPassword" class="authForm">
      <h5 class="authFormTitle">New Profile</h5>
      <p class="authFormSubTitle">Create your customer profile for easy online booking</p>

      <ul v-if="validateErrors.length > 0" class="default-nav small text-danger text-left">
        <li v-for="(item, i) in validateErrors" :key="i" class="nav-item">{{ item }}</li>
      </ul>

      <b-form-group>
        <b-form-input v-model="registerForm.name" class="inputBox" placeholder="Name" type="text"/>
      </b-form-group>
      <b-form-group>
        <b-form-input v-model="registerForm.email" class="inputBox" placeholder="Email" type="email"/>
      </b-form-group>
      <b-form-group>
        <b-form-input v-model="registerForm.password" class="inputBox" placeholder="Password"
                      type="password" @input="confirmPasswordGen"/>
      </b-form-group>

      <button class="btn authBtn registerBtn" @click="registerAction">Create my profile!</button>
      <button class="btn newBtn" @click="loginBox"><i class="fas fa-long-arrow-alt-left"></i> Back to Sign In</button>
    </div>

    <div v-if="!isPermitUser && hasAccount && forgetPassword" class="authForm">
      <h5 class="authFormTitle">Forgot your password?</h5>
      <p class="authFormSubTitle">Please enter your email below to reset your password.</p>
      <b-form-group>
        <b-form-input v-model="forgetForm.email" class="inputBox" placeholder="Email" type="email"/>
      </b-form-group>
      <button class="btn authBtn" @click="forget(forgetForm)">Submit</button>
      <button class="btn newBtn" @click="loginBox"><i class="fas fa-long-arrow-alt-left"></i> Back to Sign In</button>
    </div>

    <div v-if="isPermitUser" class="manualForm">
      <h6 class="font-weight-normal mb-5">Enter Your Information</h6>

      <div class="manualFormContent">
        <b-form-group
            class="manualFormGroup"
            content-cols-md="9"
            label="Name*"
            label-cols-md="3"
        >
          <b-form-input :value="currentUser && currentUser.name" class="inputBox" placeholder="Name"
                        type="text" @change="manualInputFn('name',$event)"/>
        </b-form-group>
        <b-form-group
            class="manualFormGroup"
            content-cols-md="9"
            label="Email*"
            label-cols-md="3"
        >
          <b-form-input :value="currentUser && currentUser.email" class="inputBox" placeholder="Email"
                        type="email" @change="manualInputFn('email',$event)"/>
        </b-form-group>
        <b-form-group
            class="manualFormGroup"
            content-cols-md="9"
            label="Mobile*"
            label-cols-md="3"
        >
          <b-form-input :value="currentUser && currentUser.phone" class="inputBox" placeholder="Mobile"
                        type="text" @change="manualInputFn('phone',$event)"/>
        </b-form-group>
        <b-form-group
            class="manualFormGroup"
            content-cols-md="9"
            label="Address"
            label-cols-md="3"
        >
          <b-form-input class="inputBox" placeholder="Address" type="text" @change="manualInputFn('address',$event)"/>
        </b-form-group>
        <b-form-group
            class="manualFormGroup"
            content-cols-md="9"
            label="Comments"
            label-cols-md="3"
        >
          <b-form-textarea
              :value="currentUser && currentUser.description"
              class="textareaBox"
              max-rows="6"
              placeholder="(Optional)"
              rows="3"
              @change="manualInputFn('description',$event)"
          ></b-form-textarea>
        </b-form-group>

        <button class="btn continueBtn" @click="selectBookingUser(manualForm)">Continue</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  data() {
    return {
      hasAccount: true,
      forgetPassword: false,
      manualFillUp: false,
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      forgetForm: {
        email: ''
      },
      manualForm: {
        name: '',
        email: '',
        phone: '',
        description: '',
        address: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticate: 'isAuthenticate',
      currentUser: 'currentUser',
      validateErrors: 'validateErrors'
    }),
    isPermitUser() {
      return this.currentUser && parseInt(this.currentUser.role_id) === 3 || this.manualFillUp
    },
  },
  methods: {
    ...mapActions({
      login: 'login',
      register: 'register',
      forget: 'forgetPassword'
    }),
    ...mapMutations({
      clearValidateErrors: 'CLEAR_VALIDATE_ERRORS',
      selectBookingUser: 'SELECT_BOOKING_USER'
    }),
    registerBox() {
      this.hasAccount = false
    },
    loginBox() {
      this.forgetPassword = false
      this.hasAccount = true
    },
    forgetBox() {
      this.forgetPassword = true
    },
    manualBox() {
      this.manualFillUp = true
    },
    confirmPasswordGen() {
      this.registerForm.password_confirmation = this.registerForm.password
    },
    registerAction() {
      this.register(this.registerForm)
      this.registerForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    },
    manualInputFn(field, value) {
      this.manualForm[field] = value
    }
  },
  mounted() {
    if (this.currentUser && Object.keys(this.currentUser).length > 0 && parseInt(this.currentUser.role_id) === 3) {
      this.manualForm.id = this.currentUser && this.currentUser.id || ''
      this.manualForm.name = this.currentUser && this.currentUser.name || ''
      this.manualForm.email = this.currentUser && this.currentUser.email || ''
      this.manualForm.phone = this.currentUser && this.currentUser.phone || ''
      this.manualForm.description = this.currentUser && this.currentUser.description || ''
    }
  },
  watch: {
    'validateErrors': function () {
      if (this.validateErrors.length > 0) {
        setTimeout(() => {
          this.clearValidateErrors()
        }, 3000)
      }
    },
    'currentUser': function () {
      if (this.currentUser && Object.keys(this.currentUser).length > 0 && parseInt(this.currentUser.role_id) === 3) {
        this.manualForm.id = this.currentUser && this.currentUser.id || ''
        this.manualForm.name = this.currentUser && this.currentUser.name || ''
        this.manualForm.email = this.currentUser && this.currentUser.email || ''
        this.manualForm.phone = this.currentUser && this.currentUser.phone || ''
        this.manualForm.description = this.currentUser && this.currentUser.description || ''

        this.manualFillUp = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#infoSection {
  .authForm {
    width: 60%;
    margin: auto;
    text-align: center;

    .authFormTitle {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #586976;
    }

    .authFormSubTitle {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #586976;
      font-size: 13px;
    }

    .inputBox {
      font-size: 13px;
      box-shadow: none;
      padding: 1.5rem 0.75rem;
      font-weight: 600;

      &::placeholder {
        font-weight: 400;
        font-size: 12px;
      }
    }

    .authBtn {
      background-color: #36CDBE;
      color: #ffffff;
      display: block;
      width: 100%;
      padding: 0.75rem;
      font-size: 14px;
      margin-bottom: 10px;
    }

    .registerBtn {
      background-color: #ED6E6E;
    }

    .forgetBtn {
      font-size: 13px;
      color: #8599a6;
      padding: 0;
    }

    .newBtn {
      font-size: 13px;
      color: #36CDBE;
      font-weight: 600;
      padding: 0;
    }
  }

  .manualForm {
    text-align: center;

    .manualFormContent {
      width: 80%;
      margin: auto;

      .manualFormGroup {
        font-size: 13px;
        color: #a0a2aa;
      }


      .inputBox {
        font-size: 13px;
        box-shadow: none;
        padding: 1.5rem 0.75rem;
        font-weight: 600;

        &::placeholder {
          font-weight: 400;
          font-size: 12px;
        }

        &:focus {
          border-color: #52CFC9;
        }
      }

      .textareaBox {
        font-size: 13px;
        box-shadow: none;
        font-weight: 600;

        &::placeholder {
          font-weight: 400;
          font-size: 12px;
        }

        &:focus {
          border-color: #52CFC9;
        }
      }

      .continueBtn {
        background-color: #36CDBE;
        color: #ffffff;
        min-width: 150px;
        padding: 0.75rem;
        font-size: 16px;
        margin-top: 1.5rem;
      }
    }
  }
}
</style>