import Vue from "vue";
import Vuex from "vuex";
import moduleCustomers from "./moduleCustomers";
import moduleMenu from "./moduleMenu";
import moduleOrders from "./moduleOrders";
import moduleCategories from "./moduleCategories";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    menuM: moduleMenu,
    ordersM: moduleOrders,
    customersM: moduleCustomers,
    categoriesM: moduleCategories,
  },
});
