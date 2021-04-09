<template>
  <vue-custom-scrollbar :settings="settings" class="content">
    <div class="staffInfoTabs">
      <button v-for="(tab, i) in tabs" :key="i" class="btn staffInfoTabBtn" @click="tabChange(i)">
        {{ tab }}
      </button>
    </div>

    <div class="staffInfoTabContent py-4">
      <DetailsTab v-if="tab === 0"/>
      <ServicesTab v-if="tab === 1"/>
      <WorkingTab v-if="tab === 2"/>
      <BreaksTab v-if="tab === 3"/>
      <TimeOffTab v-if="tab === 4"/>
      <HistoryTab v-if="tab === 5"/>
    </div>

  </vue-custom-scrollbar>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar';
import DetailsTab from "@/components/admin/staff/DetailsTab";
import ServicesTab from "@/components/admin/staff/ServicesTab";
import WorkingTab from "@/components/admin/staff/WorkingTab";
import BreaksTab from "@/components/admin/staff/BreaksTab";
import TimeOffTab from "@/components/admin/staff/TimeOffTab";
import {mapActions, mapGetters} from "vuex";
import HistoryTab from "@/components/admin/staff/HistoryTab";

export default {
  name: "StaffItem",
  components: {
    HistoryTab,
    TimeOffTab,
    BreaksTab,
    WorkingTab,
    ServicesTab,
    DetailsTab,
    vueCustomScrollbar
  },
  data() {
    return {
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false
      },
      tabs: ['Details', 'Services', 'Working Hours', 'Breaks', 'Time Off', 'History'],
      tab: 0
    }
  },
  computed: {
    ...mapGetters({
      staffs: 'staffs',
      currentStaff: 'currentStaff'
    })
  },
  mounted() {
    this.fetchStaff(this.$router.history.current.params.id)
  },
  methods: {
    tabChange(id) {
      this.tab = id
    },
    ...mapActions({
      fetchStaff: 'fetchStaff'
    }),
  },
  watch: {
    '$route.params.id': function (val) {
      this.fetchStaff(val)
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

.staffInfoTabs {
  padding-bottom: 30px;
  border-bottom: 1px solid #cccccc;

  .staffInfoTabBtn {
    background-color: transparent;
    border: none;
    font-size: 16px;
    color: lightslategray;
    padding: 0;
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
