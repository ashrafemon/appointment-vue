import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";
import VueScheduler from "v-calendar-scheduler";
import VueSweetalert2 from "vue-sweetalert2";
import VCalendar from 'v-calendar';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-custom-scrollbar/dist/vueScrollbar.css";
import "v-calendar-scheduler/lib/main.css";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueScheduler);
Vue.use(VueSweetalert2);
Vue.use(VCalendar, {
    componentPrefix: 'vc',
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
