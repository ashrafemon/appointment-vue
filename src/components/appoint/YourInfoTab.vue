<template>
  <div v-show="isPermitUser" id="infoSection">
    <div class="manualForm">
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
                        type="email" @change="manualInputFn('email',$event)"
          />
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

        <button v-show="enableContinueBtn" class="btn continueBtn" @click="selectBookingUser(manualForm)">
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  data() {
    return {
      manualFillUp: true,
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
    }),
    isPermitUser() {
      return this.currentUser && parseInt(this.currentUser.role_id) === 3 || this.manualFillUp
    },
    enableContinueBtn() {
      let enable = false
      enable = this.manualForm.name.length > 3 && this.manualForm.email.length > 9 && this.manualForm.email.includes('@') && this.manualForm.phone.length > 6;
      return enable
    }
  },
  methods: {
    ...mapMutations({
      selectBookingUser: 'SELECT_BOOKING_USER'
    }),
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
    'currentUser': function () {
      if (this.currentUser && Object.keys(this.currentUser).length > 0 && parseInt(this.currentUser.role_id) === 3) {
        this.manualForm.id = this.currentUser && this.currentUser.id || ''
        this.manualForm.name = this.currentUser && this.currentUser.name || ''
        this.manualForm.email = this.currentUser && this.currentUser.email || ''
        this.manualForm.phone = this.currentUser && this.currentUser.phone || ''
        this.manualForm.description = this.currentUser && this.currentUser.description || ''
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