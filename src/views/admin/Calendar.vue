<template>
  <div class="calendar">
    <AdminNavbar/>
    <vue-scheduler @event-clicked="eventClicked" :event-display="eventDisplay" :events="appointEvents" :initial-view="initialView"/>
    <b-modal
        ref="eventModal"
        centered
        header-bg-variant="secondary"
        header-text-variant="white"
        hide-footer
        no-close-on-backdrop
        title="Event Modal"
    >
      <div class="table-responsive">
        <table class="table table-sm table-borderless">
          <tr>
            <td>Appointed Service: </td>
            <td>
              <h6 class="mb-0">
                Name: {{selectedEvent && selectedEvent.appointedService && selectedEvent.appointedService.name}}
              </h6>
              <p class="mb-0 font-italic">
                Duration <small>(minutes)</small>: {{ selectedEvent && selectedEvent.appointedService && selectedEvent.appointedService.time }}
              </p>
              <p class="mb-0 font-italic">
                Cost: {{ selectedEvent && selectedEvent.appointedService && selectedEvent.appointedService.cost }}
              </p>
            </td>
          </tr>
          <tr>
            <td>Appointed By: </td>
            <td>
              <h6 class="mb-0">{{selectedEvent && selectedEvent.appointedBy && selectedEvent.appointedBy.name}}</h6>
              <p class="mb-1 font-italic">({{selectedEvent && selectedEvent.appointedBy && selectedEvent.appointedBy.email}})</p>
              <button @click="eventUserLink" class="btn checkBtn">View</button>
            </td>
          </tr>
          <tr>
            <td>Appointed To: </td>
            <td>
              <h6 class="mb-0">{{selectedEvent && selectedEvent.appointedTo && selectedEvent.appointedTo.name}}</h6>
              <p class="mb-1 font-italic">({{selectedEvent && selectedEvent.appointedTo && selectedEvent.appointedTo.email}})</p>
              <button @click="eventStaffLink" class="btn checkBtn">View</button>
            </td>
          </tr>
        </table>
      </div>
      
    </b-modal>
  </div>
</template>

<script>
import AdminNavbar from "@/components/shared/AdminNavbar";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Calendar",
  components: {AdminNavbar},
  data() {
    return {
      initialView: 'day',
      selectedEvent: null
    }
  },
  computed: {
    ...mapGetters({
      appoints: 'appoints'
    }),
    appointEvents() {
      let events = []
      this.appoints.map(item => {
        events.push({
          date: new Date(item.appoint_date),
          startTime: item.appoint_start_time,
          endTime: item.appoint_end_time,
          name: 'Appointment',
          appointedBy: item.user,
          appointedTo: item.staff,
          appointedService: item.service,
          desc: `${item.staff.name} (${item.staff.email}) is appointed to ${item.service.name} Service by ${item.user.name} (${item.user.email})`,
        })
      })

      return events
    }
  },
  mounted() {
    this.fetchAppoints()
  },
  methods: {
    ...mapActions({
      fetchAppoints: 'fetchAppoints'
    }),
    eventDisplay(event) {
      return event.name + ' - ' + event.desc;
    },
    eventClicked(event){
      this.selectedEvent = event
      this.$refs['eventModal'].show()
    },
    eventUserLink(){
      this.$router.push({name: 'UserItem', params: {id: this.selectedEvent.appointedBy.id}})
    },
    eventStaffLink(){
      this.$router.push({name: 'StaffItem', params: {id: this.selectedEvent.appointedTo.id}})
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  width: 100%;
}
.checkBtn {
  font-size: 12px;
  background-color: #667eea;
  color: #ffffff;
  border: 0;
  outline: 0;
  padding: 5px 15px;
  border-radius: 5px;
}
</style>

