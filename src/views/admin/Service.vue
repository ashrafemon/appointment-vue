<template>
  <div class="serviceWrapper">
    <ServiceCategoryNavbar/>
    <div class="serviceContent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ServiceCategoryNavbar from "../../components/shared/ServiceCategoryNavbar";

export default {
  name: 'Service',
  components: {ServiceCategoryNavbar},
}
</script>

<style lang="scss" scoped>
.serviceWrapper {
  width: 100%;
  height: 100%;
  display: flex;
}

.serviceContent {
  width: 80%;
  min-width: 500px;
  height: 100%;
}
</style>
