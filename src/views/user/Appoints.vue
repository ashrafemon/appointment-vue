<template>
  <div class="wrapper">
    <b-container class="py-4">
      <h2 class="mb-4">{{ currentUser && currentUser.name }} Appoints</h2>

      <div v-if="appoints && appoints.length > 0" class="card border-0 shadow-lg">
        <div class="card-body">
          <div v-for="appoint in appoints" :key="appoint.id" class="card border-0 shadow mb-3">
            <div class="card-body">
              <h4>
                Appoint Service: {{ appoint.service.name }}, {{ appoint.service.time }} minutes,
                ${{ appoint.service.cost }}
              </h4>
              <b-row align-v="center">
                <b-col class="mb-md-0 mb-3" cols="12" md="8">
                  <h6>Appoint ID: {{ appoint.appoint_id }}</h6>
                  <h6>Appoint Date: {{ beautifyDate(appoint.appoint_date) }}</h6>
                  <h6>Appoint Start Time: {{ appoint.appoint_start_time }}</h6>
                  <h6>Appoint End Time: {{ appoint.appoint_end_time }}</h6>
                </b-col>
                <b-col cols="12" md="4">
                  <div class="text-center">
                    <img
                        v-if="appoint && appoint.staff && appoint.staff.avatar"
                        :src="'https://'+ appoint.staff.avatar"
                        alt="Avatar"
                        class="rounded-circle mb-2"
                        style="width: 60px"
                    />
                    <img
                        v-else alt="Avatar"
                        class="rounded-circle mb-2"
                        src="https://my.setmore.com/webapp/images/service-icon-big.png"
                        style="width: 60px"
                    />

                    <h6>{{ appoint.staff.name }}</h6>
                    <h6>{{ appoint.staff.email }}</h6>
                  </div>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </div>

    </b-container>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      appoints: 'appoints'
    }),
  },
  mounted() {
    this.fetchUserAppoints()
  },
  methods: {
    ...mapActions({
      fetchUserAppoints: 'fetchUserAppoints'
    }),
    beautifyDate(myDate) {
      let date = new Date(myDate)
      let convertDate = date.toString().split(" ")
      let beatifyDate = ''
      convertDate.forEach((item, i) => {
        if (i < 4) {
          beatifyDate += item + ' '
        }
      })
      return beatifyDate
    }
  }
}
</script>