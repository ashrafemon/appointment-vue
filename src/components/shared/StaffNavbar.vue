<template>
  <vue-custom-scrollbar :settings="settings" class="staffNavbar">
    <div class="d-flex justify-content-between align-items-center staffTitle">
      <h5>Staff ({{ staffs.length }})</h5>

      <div>
        <b-button class="addBtn" @click="showStaffModal">
          <i class="fas fa-plus"></i>
        </b-button>

        <b-card v-if="staffModal" class="addStaffModal">
          <h6>Add New Staff</h6>
          <b-form-input
              v-model="form.name"
              class="staffInput"
              placeholder="Staff Name"
              size="sm"
          />

          <b-form-input
              v-model="form.email"
              class="staffInput"
              placeholder="Staff Email"
              size="sm"
          />

          <div class="d-flex justify-content-between mt-2">
            <button v-if="buttonState" class="btn saveBtn btn-sm" @click="addStaff">Add Staff</button>
            <button v-else class="btn saveBtn btn-sm">Add Staff</button>
            <button class="btn cancelBtn btn-sm" @click="hideStaffModal">Cancel</button>
          </div>
        </b-card>
      </div>

    </div>

    <ul class="nav flex-column">
      <li
          v-for="staff in staffs"
          :key="staff.id"
          class="staffNavItem nav-item"
      >
        <router-link :to="{name: 'StaffItem', params: {id: staff.id}}" class="nav-link">
          <div class="d-flex align-items-center">
            <i class="far fa-user-circle fa-2x"></i>
            <span class="ml-2">{{ staff.name }}</span>
          </div>
          <b-button class="deleteUserBtn" @click="deleteStaffItem(staff.id)">
            <i class="far fa-trash-alt 2x"></i>
          </b-button>
        </router-link>
      </li>
    </ul>

  </vue-custom-scrollbar>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'StaffNavbar',
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
      staffModal: false,
      form: {
        name: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      staffs: 'staffs',
      services: 'services'
    }),
    buttonState() {
      let state = false
      if (this.form.name.length > 3 && this.form.email.length > 6 && this.form.email.includes('@')) {
        state = true
      }
      return state
    }
  },
  mounted() {
    this.fetchStaffs()
    this.fetchServices()
  },
  methods: {
    ...mapActions({
      fetchStaffs: 'fetchStaffs',
      fetchServices: 'fetchServices',
      createStaff: 'createStaff',
      deleteStaff: 'deleteStaff',
    }),
    showStaffModal() {
      this.staffModal = true
    },
    hideStaffModal() {
      this.staffModal = false
      this.form.name = ''
      this.form.email = ''
    },
    addStaff() {
      this.createStaff(this.form)
      this.hideStaffModal()
    },
    deleteStaffItem(id) {
      // console.log(id)
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
          this.deleteStaff(id)
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.staffNavbar {
  width: 20%;
  min-width: 220px;
  height: 100%;
  background-color: #f1f5f7;
  padding: 30px 15px;
  box-sizing: border-box;

  .staffTitle {
    margin-bottom: 20px;
    position: relative;

    h5 {
      font-size: 23px;
      font-weight: normal;
      color: #455862;
      margin-bottom: 0;
    }

    .addBtn {
      background-color: #ffffff;
      border-color: #d7d7d7;
      color: #000000;
      font-size: 0.7rem;
    }

    .addStaffModal {
      position: absolute;
      width: 200px;
      top: 35px;
      right: 0;
      z-index: 9999;

      .staffInput {
        font-size: 12px;
        margin-bottom: 5px;
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
  }

  .staffNavItem {
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
  }
}
</style>
