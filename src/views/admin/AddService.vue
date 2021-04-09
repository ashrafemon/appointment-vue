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
              <img alt="Avatar" src="https://my.setmore.com/webapp/images/service-icon-big.png">
              <button class="btn uploadBtn" @click="showDialog">
                <i class="fas fa-camera"></i>
              </button>
              <input ref="inputFile" class="d-none" type="file" @change="fileSelect"/>
            </div>
          </b-col>
          <b-col cols="8">
            <b-form-input
                v-model="form.name"
                class="inputBox mb-3"
                placeholder="Enter service name"
            />
            <h6 class="serviceNameHint">Maximum characters allowed <span class="count">250</span></h6>

            <b-form-textarea
                id="textarea"
                v-model="form.desc"
                class="inputBox"
                max-rows="6"
                placeholder="Service Description"
                rows="2"
            ></b-form-textarea>
          </b-col>
        </b-row>

        <b-row align-v="center" class="mb-2">
          <b-col cols="4">
            <h6 class="text-right inputLabel">Service Cost (€)</h6>
          </b-col>
          <b-col cols="8">
            <b-form-input
                v-model="form.cost"
                class="inputBox"
                placeholder="Service Cost"
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mb-2">
          <b-col cols="4">
            <h6 class="text-right inputLabel">Service Time (min)</h6>
          </b-col>
          <b-col cols="8">
            <b-form-input
                v-model="form.time"
                class="inputBox"
                placeholder="Service Time"
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mb-2">
          <b-col cols="4">
            <h6 class="text-right inputLabel">Buffer Time (min)</h6>
          </b-col>
          <b-col cols="8">
            <b-form-input
                v-model="form.buffer_time"
                class="inputBox"
                placeholder="Buffer Time"
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mb-2">
          <b-col cols="4">
            <h6 class="text-right inputLabel">Categories List</h6>
          </b-col>
          <b-col cols="8">
            <b-form-select v-model="form.category_id" class="inputBox">
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
                v-model="form.access"
                size="lg"
                switch
                unchecked-value="inactive"
                value="active"
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
  name: 'AddService',
  components: {
    vueCustomScrollbar
  },
  data() {
    return {
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: true
      },
      form: {
        name: '',
        desc: '',
        cost: '',
        time: '',
        buffer_time: '',
        category_id: '',
        access: 'inactive',
        avatar: null
      }
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categories',
      currentCategory: 'currentCategory',
      validateErrors: 'validateErrors'
    }),
  },
  mounted() {
    this.setCategoryId()
    if (Object.keys(this.currentCategory).length === 0) {
      setTimeout(() => {
        let selected = {}
        let slug = localStorage.getItem('currentCategory')
        this.categories.map(item => {
          if (item.slug === slug) selected = item
        })
        this.setCurrentCategory(selected)
        this.setCategoryId()
      }, 2000)
    }
  },
  methods: {
    ...mapActions({
      createService: 'createService'
    }),
    ...mapMutations({
      setCurrentCategory: 'SET_CURRENT_CATEGORY',
      clearValidateErrors: 'CLEAR_VALIDATE_ERRORS'
    }),
    setCategoryId() {
      this.form.category_id = this.currentCategory.id
    },
    showDialog() {
      this.$refs.inputFile.click()
    },
    fileSelect(e) {
      this.form.avatar = e.target.files[0]
    },
    addService() {
      this.clearValidateErrors()
      this.createService(this.form)
    },
    cancelService() {
      this.clearValidateErrors()
      this.$router.push({name: 'Services', params: {slug: localStorage.getItem('currentCategory')}})
      localStorage.removeItem('currentCategory')
    }
  },
}

</script>

<style lang="scss" scoped>
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
