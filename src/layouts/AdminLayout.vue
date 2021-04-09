<template>
    <div class="wrapper">
        <AdminSidenav/>
        <router-view></router-view>
    </div>
</template>

<script>
import AdminSidenav from "./../components/shared/AdminSidenav";

export default {
    name: 'AdminLayout',
    components: {AdminSidenav},
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding-left: 80px;
    box-sizing: border-box;
    position: relative;
}
</style>
