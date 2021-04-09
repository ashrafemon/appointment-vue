<template>
  <div>
    <GuestNavbar/>
    <div class="container py-4">
      <div class="row">
        <div class="col-md-3 col-12">
          <div class="card">
            <img alt="Logo" class="card-img-top" src="../assets/images/logo-placeholder.png"/>
            <div class="card-body">
              <nav class="nav flex-column">
                <router-link :to="{name: 'Appoint'}" class="nav-link text-dark">Book Appointment</router-link>
              </nav>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-12 mainContent">
          <div class="card border-0">
            <div class="card-body">
              <h4>Book Appointment</h4>
              <hr/>

              <div v-if="!bookingConfirm && bookingTab !== 'Done'">
                <ul class="nav small mb-2 tabNav">
                  <li
                      v-for="(tab, i) in tabs"
                      :key="i"
                      :class="bookingTab === tab ? 'active': ''"
                      class="nav-item"
                  >
                    {{ tab }}
                  </li>
                </ul>

                <b-progress
                    :max="100"
                    :value="percentCounter"
                    animated
                    style="height: 5px"
                    variant="success"
                />

                <div class="content py-4">
                  <ServiceTab v-if="bookingTab === 'Services'"/>
                  <StaffTab v-if="bookingTab === 'staff'"/>
                  <DateTab v-if="bookingTab === 'Date'"/>
                  <YourInfoTab v-if="bookingTab === 'Your Info'"/>
                  <ConfirmTab v-if="bookingTab === 'Confirm'"/>
                </div>
              </div>

              <div v-else>
                <ConfirmedAppoint
                    :booking-date="bookingDate"
                    :booking-event="bookingEvent"
                    :percent-counter="percentCounter"
                    :resetBookingSystem="resetBookingSystem"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 col-12">
          <div class="card border-0">
            <div class="card-body">
              <h6 class="mb-0">Contact Info</h6>
              <p class="mb-0">655 08 14 77</p>
              <hr/>

              <div>
                <h6>Business Hours (CET)</h6>
                <table class="table table-sm table-borderless small">
                  <tr>
                    <td style="width: 30%;">Mon</td>
                    <td style="width: 70%;">8:30 am - 8:00 pm</td>
                  </tr>
                  <tr>
                    <td>Mon</td>
                    <td>8:30 am - 8:00 pm</td>
                  </tr>
                  <tr>
                    <td>Mon</td>
                    <td>8:30 am - 8:00 pm</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GuestNavbar from "../components/shared/GuestNavbar"
import {mapActions, mapGetters, mapMutations} from "vuex";
import ServiceTab from "@/components/appoint/ServiceTab";
import StaffTab from "@/components/appoint/StaffTab";
import DateTab from "@/components/appoint/DateTab";
import YourInfoTab from "@/components/appoint/YourInfoTab";
import ConfirmTab from "@/components/appoint/ConfirmTab";
import ConfirmedAppoint from "@/components/appoint/ConfirmedAppoint";

export default {
  components: {ConfirmedAppoint, ConfirmTab, YourInfoTab, DateTab, StaffTab, ServiceTab, GuestNavbar},
  data() {
    return {
      currentTab: "staff",
      tabs: ['Services', 'staff', 'Date', 'Your Info', 'Confirm'],
      percent: 0,
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categories',
      busyBox: 'busyBox',
      bookingTab: 'bookingTab',
      bookingEvent: 'bookingEvent',
      currentStaff: 'currentStaff',
      currentService: 'currentService',
      bookingConfirm: 'bookingConfirm'
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
    },
    percentCounter() {
      let percent = 0
      if (this.bookingTab === 'Services') {
        percent = 0
      } else if (this.bookingTab === 'staff') {
        percent = 20
      } else if (this.bookingTab === 'Date') {
        percent = 40
      } else if (this.bookingTab === 'Your Info') {
        percent = 60
      } else if (this.bookingTab === 'Confirm') {
        percent = 80
      } else if (this.bookingTab === 'Done') {
        percent = 100
      }

      return percent
    }
  },
  methods: {
    ...mapActions({
      fetchCategories: 'fetchCategories',
      fetchStaffs: 'fetchStaffs'
    }),
    ...mapMutations({
      selectBookingTab: 'SELECT_BOOKING_TAB',
      resetBookingSystem: 'RESET_BOOKING_SYSTEM'
    })
  },
  mounted() {
    this.fetchCategories()
    this.fetchStaffs()
  },
  destroyed() {
    this.resetBookingSystem()
  }
}
</script>

<style lang="scss" scoped>
.mainContent {
  border-right: 1px solid #ddd;
}

.tabNav {
  li.nav-item {
    padding-right: 1.5rem;
    margin-right: 1rem;
    position: relative;
    cursor: pointer;
    color: #afafaf;
    text-transform: uppercase;
    font-weight: 600;

    &:after {
      content: '>';
      position: absolute;
      top: 0;
      right: 0;
    }

    &:last-child {
      &:after {
        content: ''
      }
    }

    &:last-child {
      padding-right: 0;
      margin-right: 0;
    }
  }

  li.active {
    color: #434343;
  }
}
</style>