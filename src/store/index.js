import Vue from 'vue'
import Vuex from 'vuex'
import moduleMenu from './moduleMenu'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    menuM: moduleMenu
  }
})
