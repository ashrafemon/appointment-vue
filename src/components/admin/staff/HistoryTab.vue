<template>
  <div id="historyTab">
    <b-row v-show="currentStaff" class="mb-2">
      <b-col cols="2">
        <AvatarUploadBtn/>
      </b-col>
      <b-col cols="10">
        <h5 class="d-flex justify-content-between align-items-center mb-5">
          <span>Working History for {{ currentStaff.name }}:</span>
        </h5>

        <div v-if="currentStaff && currentStaff.workingstatuses.length > 0" class="table-responsive">
          <table class="table table-sm text-center table-bordered">
            <thead>
            <tr>
              <th>No.</th>
              <th>Date</th>
              <th>Day Name</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(workingStatus, i) in currentStaff.workingstatuses" :key="i">
              <td>{{ (i + 1) > 9 ? i + 1 : '0'+(i + 1) }}</td>
              <td>{{ formatDate(workingStatus.today) }}</td>
              <td class="text-capitalize">{{ workingStatus.day_name }}</td>
              <td>{{ workingStatus.start_time }}</td>
              <td>{{ workingStatus.end_time }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <h5 v-else class="text-center">There are no working history...</h5>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import AvatarUploadBtn from "@/components/shared/AvatarUploadBtn";

export default {
  components: {AvatarUploadBtn},
  computed: {
    ...mapGetters({
      currentStaff: 'currentStaff',
    }),
  },
  methods: {
    formatDate(passDate) {
      let passedDate = new Date(passDate)
      return `${passedDate.getDate()}-${(passedDate.getMonth() + 1) > 9 ? passedDate.getMonth() + 1 : "0" + (passedDate.getMonth() + 1)}-${passedDate.getFullYear()}`
    }
  }
}
</script>