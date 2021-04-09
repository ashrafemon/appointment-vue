<template>
  <div>
    <h6>Appointment Confirmed</h6>
    <b-progress
        :max="100"
        :value="percentCounter"
        animated
        style="height: 5px"
        variant="success"
    />

    <div class="card my-4">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-borderless table-sm confirmTable">
            <tr>
              <td>Services</td>
              <td v-if="bookingEvent && bookingEvent.service">
                {{ bookingEvent.service.name }} - {{ bookingEvent.service.time }} minutes
              </td>
            </tr>
            <tr>
              <td>Staff</td>
              <td v-if="bookingEvent && bookingEvent.staff">
                {{ bookingEvent.staff.name }}
              </td>
            </tr>
            <tr>
              <td>Date & Time</td>
              <td>
                <div v-if="bookingEvent && bookingEvent.timing">
                  Your Time: {{ bookingDate }}, {{ bookingEvent.timing.time }} (BDT)
                </div>
              </td>
            </tr>
            <tr>
              <td>Your Info</td>
              <td v-if="bookingEvent && bookingEvent.user">
                <div>{{ bookingEvent.user.name }}</div>
                <div>{{ bookingEvent.user.phone }}</div>
                <div>{{ bookingEvent.user.email }}</div>
              </td>
            </tr>
            <tr>
              <td>Appoint ID</td>
              <td v-if="confirmAppoint">
                <div>{{ confirmAppoint.appoint_id }}</div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="text-center">
      <button class="btn btn-link text-dark font-weight-bold btn-sm" @click="resetBookingSystem">
        Book Another Appointment
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: ['percentCounter', 'bookingEvent', 'resetBookingSystem', 'bookingDate'],
  computed: {
    ...mapGetters({
      confirmAppoint: 'confirmAppoint'
    })
  },
}
</script>

<style lang="scss" scoped>
.confirmTable {
  tr {
    font-size: 14px;

    td {
      width: 70%;
      color: #000000;

      div {
        margin-bottom: 3px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      &:first-child {
        color: #B3BDCC;
        font-weight: 600;
        width: 30%;
      }
    }
  }
}
</style>