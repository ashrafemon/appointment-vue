<template>
  <b-row v-show="currentStaff" class="mb-2">
    <b-col cols="2">
      <AvatarUploadBtn/>
    </b-col>
    <b-col cols="10">
      <h5>Services {{ currentStaff.name }} Provides ({{ staffActiveService }})</h5>

      <div class="services">
        <div v-for="service in services" :key="service.id"
             :class="activeServices.includes(service.name) && 'active'"
             class="d-flex serviceItem"
        >
          <input v-model="form.services" :value="service.name"
                 class="service_check" type="checkbox"
                 @change="handleChange"
          />
          <div class="serviceTitle">
            <h6>
              <i class="fas fa-plus"></i>
              <span class="ml-1">{{ service.name }}</span>
            </h6>
          </div>
          <div class="serviceTime">
            <span>{{ service.time }} mins</span>
          </div>
          <div class="servicePayment">
            <span>${{ service.cost }}</span>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import AvatarUploadBtn from "../../shared/AvatarUploadBtn";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ServicesTab",
  components: {
    AvatarUploadBtn
  },
  data() {
    return {
      form: {
        services: []
      }
    }
  },
  computed: {
    ...mapGetters({
      services: 'services',
      currentStaff: 'currentStaff',
    }),
    staffActiveService() {
      return this.currentStaff.userservices.services.length || 0
    },
    activeServices() {
      let services = []
      services = this.currentStaff.userservices.services
      return services
    }
  },
  mounted() {
    this.formGen()
  },
  methods: {
    ...mapActions({
      createStaffService: 'createStaffService'
    }),
    formGen() {
      this.form.services = this.currentStaff.userservices.services
    },
    handleChange() {
      this.createStaffService({
        user: this.$router.history.current.params.id || localStorage.getItem('user_id'),
        services: this.form
      })
    }
  },
  watch: {
    '$route.params.id': function () {
      this.formGen()
    },
  }
}
</script>

<style lang="scss" scoped>
.loader {
  margin: auto;
}

.avatarBtn {
  background-color: transparent;
  border: 0;
  color: #000000;
}

.services {
  margin-top: 15px;

  .serviceItem {
    margin-bottom: 5px;
    cursor: pointer;
    position: relative;

    .service_check {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      //visibility: hidden;
      appearance: none;
      -webkit-appearance: none;
      outline: 0;
    }

    .serviceTitle, .serviceTime, .servicePayment {
      color: #c1c8cd;
      width: 60%;
    }

    .serviceTitle {
      h6 {
        display: inline-block;
        font-size: 14px;
        margin-bottom: 0;
        padding: 5px 10px;
      }
    }

    .serviceTime, .servicePayment {
      width: 20%;

      span {
        font-size: 12px;
      }
    }
  }

  .serviceItem.active {
    .serviceTitle {
      h6 {
        background-color: #6285ff;
        color: #ffffff;
        border-radius: 30px;
      }
    }

    .serviceTime, .servicePayment {
      span {
        color: #9ca6ab;
      }
    }
  }
}


</style>
