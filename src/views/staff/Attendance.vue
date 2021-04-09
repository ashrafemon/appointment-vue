<template>
  <div class="wrapper">
    <b-container class="py-4">
      <h2>{{ currentStaff.name }} Attendance</h2>
      <hr/>

      <div v-if="Object.keys(todayWorkingHour).length > 0" class="row align-items-center">
        <div class="col-md-6 col-12 mb-md-0 mb-3">
          <div class="table-responsive">
            <table class="table table-borderless table-sm">
              <tr>
                <td class="font-weight-bold">Today</td>
                <td class="text-capitalize">{{ todayWorkingHour.day_name }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">Working Hours</td>
                <td>{{ todayWorkingHour.start_time }} to {{ todayWorkingHour.end_time }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">Action</td>
                <ul class="nav">
                  <li v-if="!isWorking" class="nav-item mr-1">
<!--                    <button :disabled="!canWork" class="btn actionBtn" @click="startWork">-->
                    <button :disabled="!canWorking" class="btn actionBtn" @click="startWork">
                      <i class="fas fa-play mr-1"></i>
                      Start Working
                    </button>
                  </li>
                  <li v-else class="nav-item">
                    <button class="btn actionBtn" @click="stopWork">
                      <i class="fas fa-stop mr-1"></i>
                      Stop Working
                    </button>
                  </li>
                </ul>
              </tr>
            </table>
          </div>
        </div>
        <div class="col-md-6 col-12">
          <img v-if="isWorking" alt="Working" class="img-fluid" src="./../../assets/images/isWorkingSingle.gif"/>
          <img v-else alt="Not Working" class="img-fluid" src="./../../assets/images/isNotWorking.svg"/>
        </div>
      </div>

      <div v-else class="text-center">
        <h6 class="font-italic mb-3">Enjoy Your Off Day!!!</h6>
        <img alt="Off Day" class="offDayImage" src="./../../assets/images/offDay.svg"/>
      </div>


      <!--      <pre>{{ latestWorkingStatus }}</pre>-->
      <!--      <pre>{{ isWorking }}</pre>-->
      <!--      <pre>{{ todayWorkingHour }}</pre>-->
      <!--      <pre>{{ todayBreakHour }}</pre>-->
      <!--      <pre>{{ canWork }}</pre>-->
    </b-container>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {generateTimes, generateTimesByArgs} from "@/utils/times";
import {days} from "@/utils/days";

export default {
  computed: {
    ...mapGetters({
      currentStaff: 'currentStaff',
      latestWorkingStatus: 'latestWorkingStatus'
    }),
    todayWorkingHour() {
      let today = new Date();
      let todayNumber = today.getDay()
      let todayName = ''
      days.map((item, i) => {
        if (i === todayNumber) todayName = item
      })
      let workingHour = {}
      this.currentStaff && this.currentStaff.workinghours && this.currentStaff.workinghours.map(item => {
        if (item.day_name === todayName.toLowerCase() && item.status === 'active') workingHour = item
      })
      return workingHour
    },
    todayBreakHour() {
      let today = new Date();
      let todayNumber = today.getDay()
      let todayName = ''
      days.map((item, i) => {
        if (i === todayNumber) todayName = item
      })
      let breakHour = {}
      this.currentStaff && this.currentStaff.breakhours && this.currentStaff.breakhours.map(item => {
        if (item.day_name.toLowerCase() === todayName.toLowerCase() && item.status === 'active') breakHour = item
      })
      return breakHour
    },
    canWork() {
      if (Object.keys(this.todayWorkingHour).length > 0) {
        let startTime = generateTimesByArgs(this.todayWorkingHour.start_time)
        let endTime = generateTimesByArgs(this.todayWorkingHour.end_time)

        let startingTimeObj = new Date()
        let endingTimeObj = new Date()
        let currentTimeObj = new Date()
        startingTimeObj.setHours(startTime.currentHour, startTime.currentMinutes)
        endingTimeObj.setHours(endTime.currentHour, endTime.currentMinutes)

        return startingTimeObj < currentTimeObj && !(endingTimeObj > currentTimeObj);
      }

      return false
    },
    canWorking(){
      return Object.keys(this.todayWorkingHour).length > 0;
    },
    isWorking() {
      return Object.keys(this.latestWorkingStatus).length > 0
    }
  },
  mounted() {
    this.fetchSelfStaffLatestWorkingStatus()
  },
  methods: {
    ...mapActions({
      fetchSelfStaffLatestWorkingStatus: 'fetchSelfStaffLatestWorkingStatus',
      createSelfStaffWorkingStatus: 'createSelfStaffWorkingStatus',
      updateSelfStaffWorkingStatus: 'updateSelfStaffWorkingStatus',
    }),
    startWork() {
      let generate = generateTimes()

      this.createSelfStaffWorkingStatus({
        day_name: this.todayWorkingHour.day_name,
        today: generate.today,
        start_time: generate.formatTime,
      })
    },
    stopWork() {
      let generate = generateTimes()

      this.updateSelfStaffWorkingStatus({
        id: this.latestWorkingStatus.id,
        form: {
          day_name: this.todayWorkingHour.day_name,
          today: generate.today,
          end_time: generate.formatTime,
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.actionBtn {
  font-size: 12px;
  background-color: #667eea;
  color: #ffffff;
  border: 0;
  outline: 0;
  padding: 5px 15px;
  border-radius: 5px;
}

.offDayImage {
  width: 100%;
  height: 400px;
  object-fit: contain;
}
</style>