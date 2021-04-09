<template>
  <div class="py-4">
    <b-container>
      <b-row class="mb-2">
        <b-col cols="10">
          <h5 class="d-flex justify-content-between align-items-center title mb-5">
            <span>Time Off for {{ currentStaff.name }}:</span>
            <button class="shadow-sm" @click="showModal">
              <i class="fas fa-plus"></i>
            </button>
          </h5>

          <template v-if="currentStaff && currentStaff.timeoffs &&  currentStaff.timeoffs.length > 0">
            <b-nav class="services" vertical>
              <b-nav-item v-for="timeoff in currentStaff.timeoffs" :key="timeoff.id" class="serviceItem">
                <div class="serviceItemAvatar" @click="showUpdateModal(timeoff.id)">
                  <i class="fas fa-calendar fa-2x"></i>
                </div>
                <div class="serviceItemInfo" @click="showUpdateModal(timeoff.id)">
                  <h6>{{ timeoff.start_date }} to {{ timeoff.end_date }}</h6>
                  <ul class="nav">
                    <li class="nav-item">{{ timeoff.desc ? timeoff.desc : 'No Description' }}</li>
                  </ul>
                </div>
                <div class="serviceAction">
                  <button :ref="'delete'+timeoff.id" class="btn btn-light"
                          @click="deleteTimeOff(timeoff.id)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>

                <b-modal
                    :id="'updateModal'+timeoff.id"
                    centered
                    header-bg-variant="secondary"
                    header-text-variant="white"
                    hide-footer
                    no-close-on-backdrop
                    title="Update Time Off"
                >
                  <b-row align-v="center" class="mb-2">
                    <b-col cols="3">
                      <h6 class="mb-0 text-right">Description</h6>
                    </b-col>
                    <b-col cols="8">
                      <b-form-input :value="timeoff.desc" placeholder="Time off Description"
                                    @change="updateTimeOffDesc($event)"></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row align-v="center" class="mb-2">
                    <b-col cols="3">
                      <h6 class="mb-0 text-right">Start Date</h6>
                    </b-col>
                    <b-col cols="8">
                      <b-form-datepicker :value="timeoff.start_date"
                                         @context="updateTimeOffStart($event)"></b-form-datepicker>
                    </b-col>
                  </b-row>

                  <b-row align-v="center" class="mb-2">
                    <b-col cols="3">
                      <h6 class="mb-0 text-right">End Date</h6>
                    </b-col>
                    <b-col cols="8">
                      <b-form-datepicker :value="timeoff.end_date"
                                         @context="updateTimeOffEnd($event)"></b-form-datepicker>
                    </b-col>
                  </b-row>

                  <hr/>

                  <div class="text-center">
                    <button class="btn saveChangeBtn" @click="updateTimeOff(timeoff.id)">Update
                      Changes
                    </button>
                  </div>

                </b-modal>
              </b-nav-item>
            </b-nav>


          </template>
          <template v-else>
            <b-card class="text-center">
              <h6 class="mb-3">Add time off by clicking the button below.</h6>
              <button class="btn btn-outline-dark" @click="showModal">
                <i class="fas fa-plus"></i>
                <span class="ml-2">Add Time Off</span>
              </button>
            </b-card>
          </template>


          <b-modal
              ref="addModal"
              centered
              header-bg-variant="secondary"
              header-text-variant="white"
              hide-footer
              no-close-on-backdrop
              title="Add New Time Off"
          >
            <b-row align-v="center" class="mb-2">
              <b-col cols="3">
                <h6 class="mb-0 text-right">Description</h6>
              </b-col>
              <b-col cols="8">
                <b-form-input v-model="form.desc"
                              placeholder="Time off Description"></b-form-input>
              </b-col>
            </b-row>

            <b-row align-v="center" class="mb-2">
              <b-col cols="3">
                <h6 class="mb-0 text-right">Start Date</h6>
              </b-col>
              <b-col cols="8">
                <b-form-datepicker v-model="form.start_date"></b-form-datepicker>
              </b-col>
            </b-row>

            <b-row align-v="center" class="mb-2">
              <b-col cols="3">
                <h6 class="mb-0 text-right">End Date</h6>
              </b-col>
              <b-col cols="8">
                <b-form-datepicker v-model="form.end_date"></b-form-datepicker>
              </b-col>
            </b-row>

            <hr/>

            <div class="text-center">
              <button class="btn saveChangeBtn" @click="addStaffTimeOff">Save Changes</button>
            </div>

          </b-modal>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      form: {
        desc: "",
        start_date: "",
        end_date: "",
        all_day: 0
      },
      updateForm: {
        desc: "",
        start_date: "",
        end_date: "",
        all_day: 0
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
      createSelfStaffTimeoff: 'createSelfStaffTimeoff',
      updateSelfStaffTimeoff: 'updateSelfStaffTimeoff',
      deleteSelfStaffTimeoff: 'deleteSelfStaffTimeoff',
    }),
    showModal() {
      this.$refs['addModal'].show()
    },
    showUpdateModal(id) {
      this.$root.$emit('bv::show::modal', `updateModal${id}`, `#delete${id}`)
    },
    hideUpdateModal(id) {
      this.$root.$emit('bv::hide::modal', `updateModal${id}`)
    },
    addStaffTimeOff() {
      this.createSelfStaffTimeoff(this.form)
      this.$refs['addModal'].hide()
      this.form = {
        desc: "",
        start_date: "",
        end_date: "",
        all_day: 0
      }
    },
    deleteTimeOff(timeOff_id) {
      this.deleteSelfStaffTimeoff(timeOff_id)
    },
    updateTimeOffDesc(e) {
      this.updateForm.desc = e
    },
    updateTimeOffStart(e) {
      this.updateForm.start_date = e.selectedYMD
    },
    updateTimeOffEnd(e) {
      this.updateForm.end_date = e.selectedYMD
    },
    updateTimeOff(id) {
      this.updateSelfStaffTimeoff({
        id: id,
        form: this.updateForm
      })
      this.hideUpdateModal(id)
      this.updateForm = {
        desc: "",
        start_date: "",
        end_date: "",
        all_day: 0
      }
    }
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

.title {
  button {
    background-color: #ffffff;
    color: #000000;
    font-size: 14px;
    padding: 5px 8px;
    outline: 0;
    border: 0;
  }
}

.timeOffWrapper {
  background-color: #fdffe5;
  border: 1px solid #e9edab;

  p {
    font-size: 12px;
    color: #000000;
  }
}

.saveChangeBtn {
  background-color: #667eea;
  color: #ffffff;
  margin: auto;
  font-size: 17px;
}


.services {
  .serviceItem {
    a {
      color: #000000;
      padding: 8px 0;
      border-bottom: 1px solid #cccccc;

      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &:first-child {
      border-top: 1px solid #cccccc;
    }
  }
}

.serviceItemBar {
  width: 7px;
  height: 50px;
  background-color: #bbe6e1;
  margin-right: 5px;
  border-radius: 3px;
}

.serviceItemDrag {
  color: #cccccc;
  margin-right: 5px;
}

.serviceItemAvatar {
  // width: 50px;
  // height: 50px;
  // border-radius: 50%;
  // overflow: hidden;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
  }
}

.serviceItemInfo {
  width: 60%;

  h6 {
    color: #54656e;
    margin-bottom: 5px;
  }

  .nav-item {
    color: #cccccc;
    font-size: 12px;

    &:first-child {
      margin-right: 15px;
    }
  }
}

.serviceItemTime, .serviceItemPayment {
  width: 10%;

  p {
    margin-bottom: 0;
    color: #cccccc;
    font-size: 14px;
  }
}
</style>