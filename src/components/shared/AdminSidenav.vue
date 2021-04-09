<template>
  <vue-custom-scrollbar class="sideNavbar" :settings="settings">
    <b-nav vertical>
      <li class="nav-item navItem">
        <span class="nav-link">
          <i class="fas fa-qrcode fa-2x"></i>
        </span>
      </li>
      <li class="nav-item navItem">
        <router-link class="nav-link" :to="{name: 'Calendar'}">
          <i class="far fa-calendar-alt fa-2x"></i>
        </router-link>
      </li>
      <li class="nav-item navItem">
        <router-link class="nav-link" :to="{name: 'Service'}">
          <i class="fas fa-cog fa-2x"></i>
        </router-link>
      </li>
    </b-nav>
  </vue-custom-scrollbar>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'

export default {
  name: "AdminSidenav",
  components: {
    vueCustomScrollbar
  },
  data() {
    return {
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.sideNavbar {
  width: 80px;
  height: 100%;
  position: fixed;
  padding: 0 5px;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background-color: #202a3d;
  z-index: 99;

  .navItem {
    margin-bottom: 10px;
    text-align: center;

    span{
      color: #767c88;
    }

    a {
      color: #767c88;

      &:hover {
        color: #ffffff;
        background-color: #2b3547;
        border-radius: 5px;
      }
    }

    a.active {
      color: #ffffff;
      background-color: #2b3547;
      border-radius: 5px;
    }
  }
}
</style>