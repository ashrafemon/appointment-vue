<template>
  <div id="confirmSection">
    <h6 class="font-weight-normal mb-4">Confirm Your Information</h6>
    <div class="card">
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
                <!--                <div>Company Time: Tue Jan 26,2021, 3:00pm (CET)</div>-->
              </td>
            </tr>
            <tr>
              <td>Your Info</td>
              <td v-if="bookingEvent && bookingEvent.user">
                <div>{{ bookingEvent.user.name }}</div>
                <div>{{ bookingEvent.user.phone }}</div>
                <div>{{ bookingEvent.user.email }}</div>

                <hr/>
                <b-form-checkbox
                    v-model="reminder"
                    unchecked-value="inactive"
                    value="active"
                >
                  Yes, send me a reminder email
                </b-form-checkbox>

                <button class="btn confirmBtn" @click="confirmAppoint">Confirm my appointment</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  data() {
    return {
      reminder: 'active'
    }
  },
  computed: {
    ...mapGetters({
      bookingEvent: 'bookingEvent'
    }),
    bookingDate() {
      let date = new Date(this.bookingEvent.timing.date)
      let convertDate = date.toString().split(" ")
      let beatifyDate = ''
      convertDate.forEach((item, i) => {
        if (i < 4) {
          beatifyDate += item + ' '
        }
      })
      return beatifyDate
    }
  },
  methods: {
    ...mapMutations({
      selectBookingReminder: 'SELECT_BOOKING_REMINDER'
    }),
    ...mapActions({
      createAppoint: 'createAppoint'
    }),
    confirmAppoint() {
      this.selectBookingReminder(this.reminder)
      let data = {
        service_id: this.bookingEvent.service.id,
        staff_id: this.bookingEvent.staff.id,
        user: {
          name: this.bookingEvent.user.name,
          email: this.bookingEvent.user.email,
          phone: this.bookingEvent.user.phone,
          description: this.bookingEvent.user.description,
          address: this.bookingEvent.user.address
        },
        appoint_date: this.bookingEvent.timing.date,
        appoint_start_time: this.bookingEvent.timing.time,
        appoint_reminder: this.bookingEvent.reminder
      }

      if (data) {
        this.createAppoint(data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#confirmSection {
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

  .confirmBtn {
    background-color: #36CDBE;
    color: #ffffff;
    text-transform: capitalize;
    padding: 0.75rem;
    font-size: 14px;
    margin-top: 1.5rem;
    font-weight: 600;
  }
}
</style>