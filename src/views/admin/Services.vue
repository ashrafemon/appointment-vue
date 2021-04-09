<template>
  <vue-custom-scrollbar :settings="settings" class="content">
    <!--    <template v-if="loading">-->
    <!--      <GridLoader class="loader"/>-->
    <!--    </template>-->

    <h4 v-if="Object.keys(currentCategory).length > 0"
        class="d-flex justify-content-between align-items-center title mb-5">
      <span class="text-capitalize">{{ currentCategory.name }}</span>
      <button class="btn shadow-sm" @click="addService">
        <i class="fas fa-plus"></i>
        <span class="ml-2">Add Service</span>
      </button>
    </h4>

    <ul v-if="currentCategory.services && currentCategory.services.length > 0" class="services nav flex-column">
      <li v-for="service in currentCategory.services" :key="service.id" class="serviceItem nav-item">
        <div class="nav-link">
          <div class="serviceItemBar"></div>
          <div class="serviceItemDrag">
            <i class="fas fa-ellipsis-v fa-2x"></i>
          </div>
          <div class="serviceItemAvatar">
            <template v-if="service.avatar">
              <img :alt="service.name" :src="'http://'+service.avatar"/>
            </template>
            <template v-else>
              <img alt="Avatar" src="https://my.setmore.com/webapp/images/service-icon-small.png"/>
            </template>
          </div>
          <div class="serviceItemInfo">
            <h6>{{ service.name }}</h6>
            <ul class="nav">
              <li class="nav-item">{{ service.buffer_time ? service.buffer_time : 'No Buffer' }}</li>
              <li class="nav-item">{{ service.desc ? service.desc : 'No Description' }}</li>
            </ul>
          </div>
          <div class="serviceItemTime">
            <p>{{ service.time }} mins</p>
          </div>
          <div class="serviceItemPayment">
            <p>${{ service.cost }}</p>
          </div>
          <div class="serviceItemPayment">
            <b-button class="staffAddBtn" @click="editServiceItem(service)">
              <i class="fas fa-edit"></i>
            </b-button>
            <b-button class="staffAddBtn" @click="deleteServiceItem(service.slug)">
              <i class="far fa-trash-alt"></i>
            </b-button>
          </div>
        </div>

      </li>
    </ul>

    <h5 v-else>Sorry there are no services...</h5>


  </vue-custom-scrollbar>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  components: {
    vueCustomScrollbar
  },
  data() {
    return {
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false
      },
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categories',
      currentCategory: 'currentCategory'
    }),
  },
  mounted() {
    this.fetchCategory(this.$router.history.current.params.slug)
  },
  methods: {
    ...mapActions({
      fetchCategory: 'fetchCategory',
      deleteService: 'deleteService'
    }),
    ...mapMutations({
      // setCurrentCategory: 'SET_CURRENT_CATEGORY',
      setCurrentService: 'SET_CURRENT_SERVICE'
    }),
    addService() {
      localStorage.setItem('currentCategory', this.$router.history.current.params.slug)
      this.$router.push({name: 'AddService'})
    },
    deleteServiceItem(slug) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        console.log(result)
        if (result.isConfirmed) {
          this.deleteService(slug)
        }
      })
    },
    editServiceItem(service) {
      localStorage.setItem('currentCategory', this.$router.history.current.params.slug)
      localStorage.setItem('currentService', service.slug)
      this.setCurrentService(service)
      this.$router.push({name: 'EditService', params: {slug: service.slug}})
    }
  },
  watch: {
    '$route.params.slug': function (val) {
      this.fetchCategory(val)
    }
  }
}

</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 30px;
}

.loader {
  margin: auto;
}

.title {
  button {
    background-color: #ffffff;
    color: #000000;
    font-size: 14px;
    padding: 5px 8px;
    outline: 0;
    border: 0;
  }
}

.services {
  .serviceItem {
    .nav-link {
      color: #000000;
      padding: 8px 0;
      border-bottom: 1px solid #cccccc;

      display: flex;
      align-items: center;
    }

    &:first-child {
      border-top: 1px solid #cccccc;
    }
  }
}

.serviceItemBar {
  width: 7px;
  height: 50px;
  background-color: #bbe6e1;
  margin-right: 5px;
  border-radius: 3px;
}

.serviceItemDrag {
  color: #cccccc;
  margin-right: 5px;
}

.serviceItemAvatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
  }
}

.serviceItemInfo {
  width: 60%;

  h6 {
    color: #54656e;
    margin-bottom: 5px;
  }

  .nav-item {
    color: #cccccc;
    font-size: 12px;

    &:first-child {
      margin-right: 15px;
    }
  }
}

.serviceItemTime, .serviceItemPayment {
  width: 10%;

  p {
    margin-bottom: 0;
    color: #cccccc;
    font-size: 14px;
  }
}

.staffAddBtn {
  background-color: #ffffff;
  border-color: #d7d7d7;
  color: #000000;
  font-size: 0.7rem;
  margin-right: 5px;

  &:last-child {
    margin-right: 0;
  }
}
</style>
