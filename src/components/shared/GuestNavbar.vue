<template>
  <b-navbar class="py-4" toggleable="md" type="light">
    <b-container>
      <router-link class="navbar-brand" to="/appoint">
        <h5 class="brandTitle">appointment</h5>
      </router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <template v-if="!isAuthenticate && !currentUser">
          <b-navbar-nav class="ml-auto">
            <li class="nav-item navItem">
              <router-link :to="{name: 'Login'}" class="nav-link">To access</router-link>
            </li>
            <li class="nav-item navItem">
              <router-link :to="{name: 'Register'}" class="nav-link">Registry</router-link>
            </li>
          </b-navbar-nav>
        </template>
        <template v-else>
          <b-navbar-nav class="ml-auto">
            <li class="nav-item navItem">
              <button class="btn nav-link" @click="logout">Logout</button>
            </li>
          </b-navbar-nav>
        </template>

      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'GuestNavbar',
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      isAuthenticate: 'isAuthenticate'
    })
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    })
  }
}
</script>

<style lang="scss" scoped>
.brandTitle {
  color: #5ebea3;
  font-weight: bold;
  font-size: 32px;
}

.navItem {
  background-color: #5ebea3;
  font-weight: bold;
  padding: 0 15px;
  border-radius: 28px;
  margin-right: 5px;
  text-align: center;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: #9ed8c8;
  }

  .nav-link {
    display: block;
    font-weight: bold;
    color: #ffffff !important;
  }
}

@media (max-width: 767px) {
  .navItem {
    margin-right: 0;
    margin-bottom: 5px;
  }
}
</style>
