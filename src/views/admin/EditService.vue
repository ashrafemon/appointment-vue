<template>
  <vue-custom-scrollbar :settings="settings" class="content">
    <button class="btn saveBtn" @click="addService">Save</button>
    <button class="btn cancelBtn" @click="cancelService">Cancel</button>

    <hr/>

    <ul v-if="validateErrors" class="default-nav small text-danger font-weight-bold">
      <li v-for="(error, i) in validateErrors" :key="i">{{ error }}</li>
    </ul>

    <b-row>
      <b-col md="7" sm="12">
        <b-row class="mb-2">

          <b-col cols="4">
            <div class="avatarWrapper">
              <img
                  v-if="currentService.avatar"
                  :src="'https://'+currentService.avatar"
                  alt="Avatar"
              />
              <img
                  v-else
                  alt="Avatar"
                  src="https://my.setmore.com/webapp/images/service-icon-big.png"
              />
              <button class="btn uploadBtn" @click="showDialog">
                <i class="fas fa-camera"></i>
              </button>
              <input ref="inputFile" class="d-none" type="file" @change="fileSelect"/>
            </div>
          </b-col>

          <b-col cols="8">
            <b-form-input
                :value="currentService.name"
                class="inputBox mb-3"
                placeholder="Enter service name"
                @change="form.name = $event"
            />
            <h6 class="serviceNameHint">Maximum characters allowed <span class="count">250</span></h6>

            <b-form-textarea
                :value="currentService.desc"
                class="inputBox"
                max-rows="6"
                placeholder="Service Description"
                rows="2"
                @change="form.desc = $event"
            ></b-form-textarea>
          </b-col>
        </b-row>

        <b-row align-v="center" class="mb-2">
          <b-col cols="4">
            <h6 class="text-right inputLabel">Service Cost (€)</h6>
          </b-col>
          <b-col cols="8">
            <b-form-input
                :value="currentService.cost"
                class="inputBox"
                @change="form.cost = $event"
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mb-2">
          <b-col cols="4">
            <h6 class="text-right inputLabel">Service Time (min)</h6>
          </b-col>
          <b-col cols="8">
            <b-form-input
                :value="currentService.time"
                class="inputBox"
                @change="form.time = $event"
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mb-2">
          <b-col cols="4">
            <h6 class="text-right inputLabel">Buffer Time (min)</h6>
          </b-col>
          <b-col cols="8">
            <b-form-input
                :value="currentService.buffer_time"
                class="inputBox"
                @change="form.buffer_time = $event"
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mb-2">
          <b-col cols="4">
            <h6 class="text-right inputLabel">Categories List</h6>
          </b-col>
          <b-col cols="8">
            <b-form-select
                :value="currentService.category_id"
                class="inputBox"
                @change="form.category_id = $event"
            >
              <b-form-select-option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
              >
                {{ category.name }}
              </b-form-select-option>
            </b-form-select>
          </b-col>
        </b-row>

        <b-row align-v="center" class="mb-2">
          <b-col cols="4">
            <h6 class="text-right inputLabel">Private Service</h6>
          </b-col>
          <b-col cols="8">
            <b-form-checkbox
                :value="currentService.access || 'active'"
                size="lg"
                switch
                unchecked-value="inactive"
                @change="form.access = $event"
            />
          </b-col>
        </b-row>
      </b-col>
    </b-row>

  </vue-custom-scrollbar>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import {mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  name: 'EditServiceContent',
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
      form: {
        name: '',
        desc: '',
        cost: '',
        time: '',
        buffer_time: '',
        category_id: '',
        access: false,
        avatar: null
      }
    }
  },
  mounted() {
    this.formGen()
    if (Object.keys(this.currentService).length === 0) {
      setTimeout(() => {
        let selected = {}
        let slug = localStorage.getItem('currentCategory')
        let serviceSlug = localStorage.getItem('currentService')
        this.categories.map(item => {
          if (item.slug === slug) {
            item.services.map(innerItem => {
              if (innerItem.slug === serviceSlug) selected = innerItem
            })
          }
        })
        this.setCurrentService(selected)
        this.formGen()
      }, 2000)
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categories',
      currentService: 'currentService',
      validateErrors: 'validateErrors'
    }),
  },
  methods: {
    ...mapActions({
      updateService: 'updateService',
    }),
    ...mapMutations({
      setCurrentService: 'SET_CURRENT_SERVICE',
      clearValidateErrors: 'CLEAR_VALIDATE_ERRORS'
    }),
    showDialog() {
      this.$refs.inputFile.click()
    },
    fileSelect(e) {
      this.form.avatar = e.target.files[0]
    },
    formGen() {
      this.form = {
        name: this.currentService.name || '',
        desc: this.currentService.desc || '',
        cost: this.currentService.cost || '',
        time: this.currentService.time || '',
        buffer_time: this.currentService.buffer_time ? this.currentService.buffer_time : '',
        category_id: this.currentService.category_id,
        access: this.currentService.access,
      }
    },
    addService() {
      this.clearValidateErrors()
      this.updateService({form: this.form, slug: this.$router.history.current.params.slug})
    },
    cancelService() {
      this.clearValidateErrors()
      this.$router.push({name: 'Services', params: {slug: localStorage.getItem('currentCategory')}})
      localStorage.removeItem('currentCategory')
    },
  },
}

</script>

<style lang="scss" scoped>
.loader {
  margin: auto;
}

.content {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 30px;
}

.saveBtn {
  background-color: #667eea;
  color: #ffffff;
  padding: 6px 25px;
  margin-right: 10px;
}

.cancelBtn {
  background-color: #f1f5f7;
  color: #000000;
  padding: 6px 25px;
  border: 1px solid #d7d7d7;
}

.inputLabel {
  font-size: 14px;
  margin-bottom: 0;
  color: #999999;
}

.inputBox {
  background-color: #f1f5f7;
  border: 0;
  color: #000000;
}

.serviceNameHint {
  font-size: 12px;
  color: #a7a7a7;

  .count {
    color: #ff0000;
  }
}

.avatarWrapper {
  width: 95%;
  border-radius: 50%;
  overflow: hidden;
  margin: auto;
  position: relative;

  &:hover {
    .uploadBtn {
      visibility: visible;
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .uploadBtn {
    width: 65%;
    height: 65%;
    position: absolute;
    visibility: hidden;
    opacity: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 42px;
    background-color: #e4e6e5;
    color: #595a5a;
    border-radius: 50%;
    transition-property: opacity;
    transition-duration: .5s;

    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
