<template>
  <div class="staffWrapper">
    <StaffNavbar/>
    <div class="staffContent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import StaffNavbar from "../../components/shared/StaffNavbar";

export default {
  components: {StaffNavbar}
}
</script>

<style lang="scss" scoped>
.staffWrapper {
  width: 100%;
  height: 100%;
  display: flex;
}

.staffContent {
  width: 80%;
  min-width: 500px;
  height: 100%;
}
</style>