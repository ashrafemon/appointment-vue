<template>
  <div id="dateSection">
    <!--    <h6 class="mb-4 small font-weight-normal timezoneTitle">Your Timezone:-->
    <!--      <span>(GMT +06:00) Bangladesh Time - Dhaka</span>-->
    <!--    </h6>-->

    <vc-date-picker
        v-model="calendarDate"
        class="mb-3"
        color="blue"
        is-expanded
    />

    <template v-if="getWorkingHours.length > 0">
      <table class="table table-sm table-borderless small font-weight-bold text-center">
        <tr>
          <td>Morning</td>
          <td>Afternoon</td>
          <td>Evening</td>
        </tr>
        <tr>
          <td>
            <div v-for="(item, i) in renderWorkingHourToButton.morning" :key="i" class="hourBtnItem">
              <button class="btn hourBtn btn-sm" @click="selectTiming(item)">{{ item }}</button>
            </div>
          </td>
          <td>
            <div v-for="(item, i) in renderWorkingHourToButton.afternoon" :key="i" class="hourBtnItem">
              <button class="btn hourBtn btn-sm" @click="selectTiming(item)">{{ item }}</button>
            </div>
          </td>
          <td>
            <div v-for="(item, i) in renderWorkingHourToButton.evening" :key="i" class="hourBtnItem">
              <button class="btn hourBtn btn-sm" @click="selectTiming(item)">{{ item }}</button>
            </div>
          </td>
        </tr>
      </table>
    </template>
    <template v-else>
      <div class="font-weight-bold text-center">No Slots Available</div>
    </template>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {timeRangesQuarter} from "@/utils/times";

export default {
  data() {
    return {
      calendarDate: new Date(),
      weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  },
  computed: {
    ...mapGetters({
      staffs: 'staffs',
      bookingEvent: 'bookingEvent',
      currentStaff: 'currentStaff'
    }),
    computedDate() {
      let day = this.calendarDate.getDay()
      let day_name = ''
      this.weekDays.map((item, i) => {
        if (i === day) day_name = item
      })
      return day_name.toLowerCase()
    },
    getWorkingDay() {
      let day = {}
      this.bookingEvent.staff && this.bookingEvent.staff.workinghours.map(item => {
        if (item.day_name === this.computedDate && item.status === 'active') day = item
      })
      return day
    },
    getWorkingHours() {
      let start = this.getWorkingDay.start_time
      let end = this.getWorkingDay.end_time

      let times = [];
      let startCount = 0;
      let endCount = 0;
      timeRangesQuarter.map((item, i) => {
        if (item.indexOf(start) !== -1) {
          startCount = i;
        }
        if (item.indexOf(end) !== -1) {
          endCount = i;
        }
      });
      if (startCount !== 0 && endCount !== 0) times = timeRangesQuarter.slice(startCount, endCount + 1);
      return times;
    },
    getBreakHours() {
      let times = []
      this.bookingEvent.staff && this.bookingEvent.staff.breakhours.map(item => {
        if (item.day_name.toLowerCase() === this.computedDate) {
          times.push(item.start_time)
          times.push(item.end_time)
        }
      })
      return times
    },
    splitHours() {
      let times = this.getWorkingHours
      let breakHours = this.getBreakHours

      let positions = []
      breakHours.map(item => {
        positions.push(times.indexOf(item))
      })

      for (let i = 0; i < positions.length / 2; i++) {
        times.splice(positions[i], positions[i + 1] - positions[i])
      }

      return times
    },
    renderWorkingHourToButton() {
      let morning = []
      let afternoon = []
      let evening = []

      let pos = 1

      this.splitHours.map(item => {
        pos = item.endsWith('pm') ? item.startsWith('12') || item.startsWith('01') || item.startsWith('02') || item.startsWith('03') ? 2 : 3 : 1

        if (pos === 1) {
          morning.push(item)
        } else if (pos === 2) {
          afternoon.push(item)
        } else if (pos === 3) {
          evening.push(item)
        }
      })

      return {morning, afternoon, evening}
    }
  },
  methods: {
    ...mapMutations({
      selectBookingDate: 'SELECT_BOOKING_DATE'
    }),
    selectTiming(time) {
      this.selectBookingDate({time: time, date: this.calendarDate})
    }
  }
}
</script>

<style lang="scss" scoped>
#dateSection {
  .timezoneTitle {
    text-align: right;

    span {
      color: #1a93d0;
      cursor: pointer;
    }
  }


  .hourBtnItem {
    margin-bottom: 5px;

    &:last-child {
      margin-bottom: 0;
    }

    .hourBtn {
      background-color: #ffffff;
      border: 1px solid #BBBBBB;
      color: #1A93D0;
      font-size: 12px;
      font-weight: bold;
    }
  }

}
</style>