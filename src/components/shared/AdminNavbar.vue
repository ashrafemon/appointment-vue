<template>
  <b-navbar class="shadow-sm headerNav" type="light" variant="white">
    <b-navbar-brand class="font-weight-bold text-capitalize">{{ name }}</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <ul class="navbar-nav ml-auto small">
<!--        <li class="nav-item">-->
<!--          <div class="nav-link">+1-800-716-9964</div>-->
<!--        </li>-->
        <li class="nav-item" @click="logout">
          <div class="nav-link logout">
            <i class="fas fa-user mr-1"></i>
            Logout
          </div>
        </li>
      </ul>
    </b-collapse>
  </b-navbar>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  computed: {
    name() {
      return this.$router.history.current.name;
    }
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    })
  },
}
</script>

<style lang="scss" scoped>
.headerNav {
  height: 8.682634730538922vh;
}

.logout {
  cursor: pointer;
}
</style>