<template>
  <div class="wrapper">
    <b-container class="py-4">
      <h2>{{ currentStaff.name }} Dashboard</h2>
      <hr/>

      <div class="table-responsive mb-3" v-show="currentStaff && currentStaff.workinghours && currentStaff.workinghours.length > 0">
        <h4 class="text-center mb-3">Working Hours</h4>
        <table class="table table-sm table-bordered text-center">
          <thead class="thead-dark">
          <tr class="font-weight-bold">
            <td>Day Name</td>
            <td>Start Time</td>
            <td>End Time</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(workingHour, i) in currentStaff.workinghours" :key="i">
            <td class="text-capitalize">{{ workingHour.day_name }}</td>
            <template v-if="workingHour.status === 'active'">
              <td>{{ workingHour.start_time }}</td>
              <td>{{ workingHour.end_time }}</td>
            </template>
            <template v-else>
              <td class="font-weight-bold font-italic" colspan="2">Off Day</td>
            </template>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="table-responsive mb-3" v-show="currentStaff && currentStaff.breakhours && currentStaff.breakhours.length > 0">
        <h4 class="text-center mb-3">Break Hours</h4>
        <table class="table table-sm table-bordered text-center">
          <thead class="thead-dark">
          <tr class="font-weight-bold">
            <td>Day Name</td>
            <td>Start Time</td>
            <td>End Time</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(breakHour, i) in currentStaff.breakhours" :key="i">
            <td class="text-capitalize">{{ breakHour.day_name }}</td>
            <td>{{ breakHour.start_time }}</td>
            <td>{{ breakHour.end_time }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="table-responsive mb-3" v-show="currentStaff && currentStaff.timeoffs && currentStaff.timeoffs.length > 0">
        <h4 class="text-center mb-3">Timeoff Days</h4>
        <table class="table table-sm table-bordered text-center">
          <thead class="thead-dark">
          <tr class="font-weight-bold">
            <td>Description</td>
            <td>Start Date</td>
            <td>End Date</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(timeOff, i) in currentStaff.timeoffs" :key="i">
            <td class="text-capitalize">{{ timeOff.desc }}</td>
            <td>{{ timeOff.start_date }}</td>
            <td>{{ timeOff.end_date }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </b-container>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      currentStaff: 'currentStaff'
    })
  },
}
</script>