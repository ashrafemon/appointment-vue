<template>
  <div id="home">
    <GuestNavbar/>

    <b-container>
      <HomeBanner/>

      <HomeFeatures/>
    </b-container>

    <HomeIntegration/>

    <HomeQuestions/>
  </div>
</template>

<script>
import GuestNavbar from "@/components/shared/GuestNavbar";
import HomeBanner from "@/components/home/HomeBanner";
import HomeFeatures from "@/components/home/HomeFeatures";
import HomeIntegration from "@/components/home/HomeIntegration";
import HomeQuestions from "@/components/home/HomeQuestions";

export default {
  name: "Home",
  components: {HomeQuestions, HomeIntegration, HomeFeatures, HomeBanner, GuestNavbar}
}
</script>

<style lang="scss" scoped>

</style>
