<template>
  <vue-custom-scrollbar :settings="settings" class="serviceCategoryNavbar">
    <div class="d-flex justify-content-between align-items-center serviceCategoryTitle">
      <h5>Categories ({{ categories.length }})</h5>
      <div>
        <b-button class="addBtn" @click="showCategoryModal">
          <i class="fas fa-plus"></i>
        </b-button>

        <b-card v-if="categoryModal" class="addServiceCategoryModal">
          <h6>Add New Category</h6>
          <b-form-input
              v-model="form.name"
              class="inputBox"
              placeholder="Category name"
              size="sm"
          />
          <div class="d-flex justify-content-between mt-2">
            <button class="btn saveBtn btn-sm" @click="addCategory">Add Category</button>
            <button class="btn cancelBtn btn-sm" @click="hideCategoryModal">Cancel</button>
          </div>
        </b-card>
      </div>
    </div>

    <b-nav vertical>
      <!--      <li class="nav-item serviceCategoryNavItem">-->
      <!--        <router-link :to="{name: 'Services', params: {slug: 'all'}}" class="nav-link">-->
      <!--          <div class="d-flex align-items-center">-->
      <!--            <i class="fas fa-book"></i>-->
      <!--            <span class="ml-2">All Services</span>-->
      <!--          </div>-->
      <!--        </router-link>-->
      <!--      </li>-->
      <li v-for="category in categories"
          :key="category.id" class="nav-item serviceCategoryNavItem"
      >
        <router-link :to="{name: 'Services', params: {slug: category.slug}}" class="nav-link"
        >
          <div class="d-flex align-items-center position-relative justify-content-between w-100">
            <div>
              <i class="fas fa-book"></i>
              <span class="ml-2">{{ category.name }}</span>
            </div>

            <div>
              <b-button class="addBtn" @click="deleteSingleCategory(category.slug)">
                <i class="far fa-trash-alt"></i>
              </b-button>
            </div>
          </div>
        </router-link>
      </li>
    </b-nav>
  </vue-custom-scrollbar>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: 'ServiceCategoryNavbar',
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
      categoryModal: false,
      form: {
        name: ''
      },
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categories',
    })
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    ...mapActions({
      fetchCategories: 'fetchCategories',
      createCategory: 'createCategory',
      deleteCategory: 'deleteCategory'
    }),
    ...mapMutations({
      // setCurrentCategory: 'SET_CURRENT_CATEGORY'
    }),
    showCategoryModal() {
      this.categoryModal = true
    },
    hideCategoryModal() {
      this.categoryModal = false
      this.form.name = ''
    },
    addCategory() {
      this.createCategory(this.form)
      this.hideCategoryModal()
    },
    deleteSingleCategory(slug) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({name: 'Service'})
          this.deleteCategory(slug)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.serviceCategoryNavbar {
  width: 20%;
  min-width: 220px;
  height: 100%;
  background-color: #f1f5f7;
  padding: 30px 15px;
  box-sizing: border-box;

  .serviceCategoryTitle {
    margin-bottom: 20px;
    position: relative;

    h5 {
      font-size: 23px;
      font-weight: normal;
      color: #455862;
      margin-bottom: 0;
    }
  }

  .serviceCategoryNavItem {
    .nav-link {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      cursor: pointer;

      padding: 10px 8px;
      font-size: 14px;
      color: #c1c8cd;
      border-radius: 5px;

      .deleteUserBtn {
        background-color: #ffffff;
        border-color: #d7d7d7;
        color: #000000;
        font-size: 0.7rem;
      }

      &:hover {
        color: #384355;
        background-color: #e1e7eb;
      }
    }

    .nav-link.active {
      color: #384355;
      background-color: #e1e7eb;
    }
  }
}

.addBtn {
  background-color: #ffffff;
  border-color: #d7d7d7;
  color: #000000;
  font-size: 0.7rem;
}

.addServiceCategoryModal {
  position: absolute;
  width: 200px;
  top: 35px;
  right: 0;
  z-index: 9999;

  .inputBox {
    font-size: 12px;
  }

  h6 {
    font-size: 13px;
    margin-bottom: 15px;
  }

  .saveBtn {
    background-color: #667eea;
    color: #ffffff;
    font-size: 0.7rem;
    margin-right: 10px;
  }

  .cancelBtn {
    background-color: #ffffff;
    border-color: #d7d7d7;
    color: #000000;
    font-size: 0.7rem;
  }
}
</style>
