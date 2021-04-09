<template>
  <div class="wrapper">
    <b-container class="py-4">
      <h2>{{ currentUser && currentUser.name }} Dashboard</h2>
    </b-container>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      currentUser: 'currentUser'
    })
  },
}
</script>