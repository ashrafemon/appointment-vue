<template>
  <div class="py-4">
    <b-container>
      <b-row class="mb-2">
        <b-col cols="10">
          <h5>{{ currentStaff.name }}'s Working Hours:</h5>

          <div class="workings">

            <div v-for="workHour in currentStaff.workinghours" :key="workHour.id"
                 class="workingItem d-flex align-items-center">
              <div class="workingDay">
                <h6 class="text-capitalize">{{ workHour.day_name }}</h6>
              </div>
              <div class="workingStatus">
                <b-form-checkbox
                    :checked="workHour.status === 'active'"
                    size="lg"
                    switch
                    @change="setWorkingHourStatus({id: workHour.id, value: $event})"
                />
              </div>

              <template v-if="workHour.status === 'active'">
                <div class="workingTime">
                  <b-form-select
                      :value="workHour.start_time"
                      @change="setWorkingHourTime({id: workHour.id, field: 'start_time', value: $event})"
                  >
                    <b-form-select-option
                        v-for="(option, i) in timeOptions"
                        :key="i"
                        :value="option">{{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="workingTo">
                  <span>to</span>
                </div>
                <div class="workingTime">
                  <b-form-select
                      :value="workHour.end_time"
                      @change="setWorkingHourTime({id: workHour.id, field: 'end_time', value: $event})"
                  >
                    <b-form-select-option
                        v-for="(option, i) in timeOptions" :key="i"
                        :value="option">{{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
              </template>
              <template v-else>
                <div class="workingTime">Day off</div>
              </template>
            </div>

          </div>

          <hr/>

          <div class="workingAction">
            <button class="saveBtn" @click="updateSelfStaffWorkingHour">Save</button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import {timeRangesHalf} from "@/utils/times";

export default {
  data() {
    return {
      timeOptions: timeRangesHalf,
      workingHours: {
        monday: {},
        tuesday: {},
        wednesday: {},
        thursday: {},
        friday: {},
        saturday: {},
        sunday: {},
      },
    }
  },
  computed: {
    ...mapGetters({
      currentStaff: 'currentStaff',
    })
  },
  methods: {
    ...mapActions({
      updateSelfStaffWorkingHour: 'updateSelfStaffWorkingHour'
    }),
    ...mapMutations({
      setWorkingHourStatus: 'SET_STAFF_WORKING_HOUR_STATUS',
      setWorkingHourTime: 'SET_STAFF_WORKING_HOUR_TIME'
    }),
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

.workings {
  margin-top: 20px;

  .workingItem {
    margin-bottom: 10px;

    .workingDay {
      width: 15%;

      h6 {
        margin-bottom: 0;
        color: #555e6d;
      }
    }

    .workingStatus {
      width: 15%;
      text-align: center;
    }

    .workingTime {
      width: 15%;
    }

    .workingTo {
      width: 5%;
      text-align: center;
      font-size: 12px;
      color: #6f7e86 !important;
    }

    .workingApply {
      width: 15%;
      text-align: center;

      button {
        background-color: transparent;
        outline: 0;
        border: 0;
        color: #667eea;
        font-weight: bold;
        font-size: 14px;
      }
    }
  }
}

.workingAction {
  .saveBtn {
    font-size: 12px;
    background-color: #667eea;
    color: #ffffff;
    border: 0;
    outline: 0;
    padding: 5px 15px;
    border-radius: 5px;
  }

  .cancelBtn {
    font-size: 13px;
    background-color: transparent;
    color: #555e6d;
    border: 0;
    outline: 0;
    padding: 5px 15px;
    border-radius: 5px;
  }
}
</style>