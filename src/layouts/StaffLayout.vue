<template>
  <div class="wrapper">
    <nav class="navbar navbar-light customNav navbar-expand-md">
      <div class="container">
        <router-link :to="{name: 'StaffDashboard'}" class="navbar-brand font-weight-bold">Dashboard</router-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <ul class="navbar-nav ml-auto">
            <!--          <li class="nav-item">-->
            <!--            <router-link :to="{name: 'StaffDetails'}" class="nav-link">Details</router-link>-->
            <!--          </li>-->
            <!--          <li class="nav-item">-->
            <!--            <router-link :to="{name: 'StaffWorkingHour'}" class="nav-link">Working Hour</router-link>-->
            <!--          </li>-->
            <!--          <li class="nav-item">-->
            <!--            <router-link :to="{name: 'StaffServices'}" class="nav-link">Services</router-link>-->
            <!--          </li>-->
            <!--          <li class="nav-item">-->
            <!--            <router-link :to="{name: 'StaffBreakHour'}" class="nav-link">Break Hour</router-link>-->
            <!--          </li>-->
            <!--          <li class="nav-item">-->
            <!--            <router-link :to="{name: 'StaffTimeoff'}" class="nav-link">Time Off</router-link>-->
            <!--          </li>-->
            <li class="nav-item">
              <router-link :to="{name: 'StaffAttendance'}" class="nav-link">Attendance</router-link>
            </li>
            <li class="nav-item">
              <button class="btn nav-link" @click="logout">Logout</button>
            </li>
          </ul>
        </b-collapse>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  mounted() {
    this.fetchSelfStaff()
    this.fetchServices()
  },
  methods: {
    ...mapActions({
      fetchSelfStaff: 'fetchSelfStaff',
      fetchServices: 'fetchServices',
      logout: 'logout'
    })
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  //min-height: 100vh;
  background-color: #f1f5f7;
}

.customNav {
  background-color: #5ebea3;
}
</style>