<template>
  <div v-show="currentStaff" class="detailTab">
    <b-row class="mb-2">
      <b-col cols="2">
        <AvatarUploadBtn/>
      </b-col>
      <b-col cols="5">
        <b-form-input
            :value="currentStaff && currentStaff.name"
            class="mb-1 inputBox nameBox"
            @input="form.name = $event"
        />

        <b-form-textarea
            id="textarea"
            :value="currentStaff && currentStaff.description"
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
            :value="currentStaff && currentStaff.phone"
            class="inputBox"
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
            :value="currentStaff && currentStaff.email"
            class="inputBox"
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
            :value="currentStaff && currentStaff.cc_email"
            class="inputBox"
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
        <button class="saveBtn" @click="generateBookingLink" v-if="!generateLink">Generate
          Link
        </button>
        <b-form-input
            v-else
            :value="(currentStaff && currentStaff.profile_link) || form.profile_link"
            class="inputBox bookingLink"
            readonly
            @input="form.profile_link = $event"
        />
      </b-col>
    </b-row>

    <hr/>

    <button class="saveBtn" @click="updateStaff">Save</button>
    <hr/>
  </div>
</template>

<script>
import AvatarUploadBtn from "../../shared/AvatarUploadBtn";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {
    AvatarUploadBtn
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        phone: "",
        email: "",
        cc_email: "",
        profile_link: "",
      },
      generateLink: false
    };
  },
  computed: {
    ...mapGetters({
      currentStaff: "currentStaff",
    }),
  },
  mounted() {
    this.generateLink = !(this.currentStaff && !this.currentStaff.profile_link);
  },
  methods: {
    ...mapActions({
      updateStaffDetails: "updateStaffDetails",
    }),
    generateBookingLink() {
      this.generateLink = true
      this.form.profile_link = `${window.location.origin}/appoint`
    },
    updateStaff() {
      this.updateStaffDetails({
        user: this.$router.history.current.params.id,
        form: this.form
      })
      this.form = {
        name: "",
        description: "",
        phone: "",
        email: "",
        cc_email: "",
        profile_link: "",
      };
    },
  },
};
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
