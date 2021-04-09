<template>
  <div id="app">
    <router-view/>
    <div v-show="busyBox" class="busyBox">
      <GridLoader/>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import GridLoader from 'vue-spinner/src/GridLoader.vue'

export default {
  components: {
    GridLoader
  },
  computed: {
    ...mapGetters({
      message: 'message',
      busyBox: 'busyBox',
    })
  },
  methods: {
    ...mapMutations({
      clearMessage: 'CLEAR_MESSAGE'
    })
  },
  watch: {
    'message': function (val) {
      if (Object.keys(val).length > 0) {
        this.$swal({
          icon: this.message.type,
          title: this.message.text
        }).then(res => {
          if (res.isConfirmed) {
            this.clearMessage()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin-top: 0;
  margin-bottom: 0;
}

button:focus,
.btn:focus {
  box-shadow: none !important;
}

.busyBox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}
</style>
