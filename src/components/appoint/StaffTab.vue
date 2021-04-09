<template>
  <div id="staffSection">
    <h5 class="mb-4 font-weight-normal">Choose Staff</h5>

    <div v-if="staffs.length > 0" class="staffNavContainer">
      <ul class="nav flex-column staffNav">
        <li v-for="staff in staffs" :key="staff.id" class="nav-item shadow-sm" @click="selectBookingStaff(staff)">
          <template v-if="staff && staff.avatar">
            <img :src="'https://'+staff.avatar" alt="Avatar"/>
          </template>
          <template v-else>
            <img alt="Avatar" src="https://my.setmore.com/webapp/images/service-icon-big.png"/>
          </template>
          {{ staff.name }}
        </li>
      </ul>
    </div>
    <div v-else class="font-weight-bold small">No staff found...</div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  computed: {
    ...mapGetters({
      staffs: 'staffs',
      busyBox: 'busyBox',
      currentStaff: 'currentStaff'
    }),
  },
  methods: {
    ...mapMutations({
      selectBookingStaff: 'SELECT_BOOKING_STAFF'
    })
  }
}
</script>

<style lang="scss" scoped>
#staffSection {
  .staffNavContainer {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0
    }

    .staffNav {
      width: 100%;

      li.nav-item {
        width: 100%;
        display: flex;
        align-items: center;
        background-color: #ffffff;
        margin-bottom: 5px;
        padding: 10px;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 13px;
        color: #1a93d0;
        gap: 10px;

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        &:hover {
          border: 1px solid #CCCCCC;
          box-shadow: none;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>