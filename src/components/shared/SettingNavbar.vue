<template>
  <vue-custom-scrollbar class="settingNavbar" :settings="settings">
    <b-nav vertical>
      <li class="nav-item settingNavItem">
        <router-link class="nav-link" :to="{name: 'Service'}">
          <i class="fas fa-truck-moving fa-2x"></i>
          <div>Services</div>
        </router-link>
      </li>
      <li class="nav-item settingNavItem">
        <router-link class="nav-link" :to="{name: 'Staff'}">
          <i class="fas fa-user-friends fa-2x"></i>
          <div>Staff</div>
        </router-link>
      </li>
    </b-nav>
  </vue-custom-scrollbar>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'

export default {
  name: "SettingNavbar",
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
.settingNavbar {
  width: 8%;
  min-width: 100px;
  height: 100%;
  background-color: #e1e7eb;

  .settingNavItem {
    text-align: center;

    a {
      padding: 16px 3px;
      font-size: 12px;
      color: #c1c8cd;

      &:hover {
        color: #384355;
        background-color: #f1f5f7;
      }
    }

    a.active{
      color: #384355;
      background-color: #f1f5f7;
    }
  }
}
</style>