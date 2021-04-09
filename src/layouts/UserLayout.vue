<template>
  <div class="wrapper">
    <nav class="navbar navbar-light customNav navbar-expand-md">
      <router-link :to="{name: 'UserDashboard'}" class="navbar-brand">Dashboard</router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link :to="{name: 'UserAppoints'}" class="nav-link">Appoints</router-link>
          </li>
          <li class="nav-item">
            <button class="btn nav-link" @click="logout">Logout</button>
          </li>
        </ul>
      </b-collapse>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  mounted() {

  },
  methods: {
    ...mapActions({
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