<template>
    <div class="settingWrapper">
        <AdminNavbar />
        <div class="settingContent">
            <SettingNavbar/>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import AdminNavbar from '../components/shared/AdminNavbar';
import SettingNavbar from "../components/shared/SettingNavbar";

export default {
    name: "SettingLayout",
    components: {
        SettingNavbar,
        AdminNavbar,
    },
}
</script>

<style lang="scss" scoped>
.settingWrapper {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    box-sizing: border-box;

    .settingContent{
        width: 100%;
        height: 91.31736526946108vh;
        box-sizing: border-box;
        display: flex;
    }
}
</style>
