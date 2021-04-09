<template>
  <div id="serviceSection">
    <h5 class="mb-4 font-weight-normal">Choose Services</h5>

    <div v-if="categories.length > 0">
      <div v-for="category in categories" :key="category.id" class="serviceNavContainer">
        <div v-show="category && category.services.length > 0">
          <h6 class="serviceNavTitle">{{ category.name }}</h6>
          <ul v-if="category && category.services" class="nav flex-column serviceNav">
            <li v-for="service in category.services" :key="service.id" class="nav-item shadow-sm"
                @click="selectBookingService(service)">
              <span class="serviceName">{{ service.name }}</span>
              <span class="serviceTime">{{ service.time }} mins</span>
              <span class="serviceCost">{{ service.cost }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else class="font-weight-bold small">No service found...</div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  computed: {
    ...mapGetters({
      categories: 'categories',
      busyBox: 'busyBox',
      currentService: 'currentService'
    }),
  },
  methods: {
    ...mapMutations({
      selectBookingService: 'SELECT_BOOKING_SERVICE'
    })
  }
}
</script>

<style lang="scss" scoped>
#serviceSection {
  .serviceNavContainer {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    .serviceNavTitle {
      color: #7E7777;
      font-size: 13px;
    }

    .serviceNav {
      width: 100%;

      li.nav-item {
        width: 100%;
        background-color: #ffffff;
        margin-bottom: 10px;
        padding: 10px;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 13px;
        color: #1a93d0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;

        .serviceName {
          flex: 1;
        }

        .serviceTime, .serviceCost {
          color: #333333;
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