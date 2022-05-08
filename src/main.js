import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueCompositionAPI from "@vue/composition-api";
import Vuelidate from "@vuelidate/core";

import VueTheMask from "vue-the-mask";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "/src/Style/style.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueCompositionAPI);
Vue.use(Vuelidate);
Vue.use(VueTheMask);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
