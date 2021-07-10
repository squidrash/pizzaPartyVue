import Vue from 'vue'
import Vuex from 'vuex'
import moduleCustomers from './moduleCustomers'
import moduleMenu from './moduleMenu'
import moduleOrders from './moduleOrders'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    menuM: moduleMenu,
    ordersM: moduleOrders,
    customerM: moduleCustomers
  }
})
