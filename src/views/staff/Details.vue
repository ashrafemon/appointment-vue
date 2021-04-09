<template>
  <div class="detailTab py-4">
    <b-container>
      <b-row class="mb-2">
        <b-col cols="5" offset="2">
          <b-form-input
              :value="currentStaff.name"
              class="mb-1 inputBox nameBox"
              type="text"
              @input="form.name = $event"
          />

          <b-form-textarea
              id="textarea"
              :value="currentStaff.description"
              class="inputBox"
              max-rows="6"
              placeholder="Enter something..."
              rows="3"
              @input="form.description = $event"
          ></b-form-textarea>
        </b-col>
      </b-row>
      <b-row align-v="center" class="mb-2">
        <b-col cols="2">
          <h6 class="text-right inputLabel">Mobile</h6>
        </b-col>
        <b-col cols="5">
          <b-form-input
              :value="currentStaff.phone"
              class="inputBox"
              type="text"
              @input="form.phone = $event"
          />
        </b-col>
      </b-row>

      <b-row align-v="center" class="mb-2">
        <b-col cols="2">
          <h6 class="text-right inputLabel">Email</h6>
        </b-col>
        <b-col cols="5">
          <b-form-input
              :value="currentStaff.email"
              class="inputBox"
              type="email"
              @input="form.email = $event"
          />
        </b-col>
      </b-row>

      <b-row align-v="center" class="mb-2">
        <b-col cols="2">
          <h6 class="text-right inputLabel">CC Emails To</h6>
        </b-col>
        <b-col cols="5">
          <b-form-input
              :value="currentStaff.cc_email"
              class="inputBox"
              type="email"
              @input="form.cc_email = $event"
          />
        </b-col>
      </b-row>

      <hr/>

      <b-row align-v="center" class="mb-1">
        <b-col cols="2">
          <h6 class="text-right inputLabel">Staff Booking Page</h6>
        </b-col>
        <b-col cols="5">
          <b-form-input
              :value="currentStaff.profile_link"
              class="inputBox bookingLink"
              type="text"
              @input="form.profile_link = $event"
          />
        </b-col>
      </b-row>

      <hr/>

      <button class="saveBtn" @click="updateStaff">Save</button>
      <hr/>

    </b-container>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      form: {
        name: '',
        description: '',
        phone: '',
        email: '',
        cc_email: '',
        profile_link: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      currentStaff: 'currentStaff',
    })
  },
  methods: {
    ...mapActions({
      updateSelfStaffDetails: 'updateSelfStaffDetails'
    }),
    updateStaff() {
      this.updateSelfStaffDetails(this.form)
      this.form = {
        name: '',
        description: '',
        phone: '',
        email: '',
        cc_email: '',
        profile_link: ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.loader {
  margin: auto;
}

.avatarBtn {
  background-color: transparent;
  border: 0;
  color: #000000;
}

.inputLabel {
  font-size: 14px;
  margin-bottom: 0;
}

.nameBox {
  font-size: 24px;
}

.bookingLink {
  font-size: 14px;
  color: #667eea !important;
}

.inputBox {
  background-color: #f1f5f7;
  border: 0;
  color: #000000;
  box-shadow: inset 1px 1px 5px lightblue;
}

.saveBtn {
  font-size: 12px;
  background-color: #667eea;
  color: #ffffff;
  border: 0;
  outline: 0;
  padding: 5px 15px;
  border-radius: 5px;
}
</style>
