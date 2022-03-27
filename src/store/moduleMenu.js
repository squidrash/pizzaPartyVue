import pizzaApi from "@/api/pizzaApi";
import { getField, updateField } from "vuex-map-fields";

const state = () => ({
  menu: [],
  archiveMenu: [],
  dishVX: {
    id: 0,
    name: "",
    price: null,
  },
  isEdit: false,
});
const actions = {
  editDish({ commit }, dish) {
    commit("editDish", dish);
  },
  async getFullMenu({ commit }) {
    const getM = await pizzaApi.menu.getMenu();
    commit("getMenu", getM);
  },
  async getArchiveMenu({ commit }) {
    const getM = await pizzaApi.menu.getArchiveMenu();
    commit("getArchiveMenu", getM);
  },
  // async getFilteredCurrentMenu({ commit }, filters){
  //   let isActive = true;
  //   const getM = await pizzaApi.menu.getFilteredMenu(isActive,filters);
  //   commit("getMenu", getM);
  // },
  // async getFilteredCurrentMenu({ commit }, filters){
  //   let isActive = false;
  //   const getM = await pizzaApi.menu.getFilteredMenu(isActive,filters);
  //   commit("getArchiveMenu", getM);
  // },
  async getFilteredMenu({ commit }, filters) {
    const getM = await pizzaApi.menu.getFilteredMenu(filters);
    if (filters.isActive === true) {
      commit("getMenu", getM);
    }
    if (filters.isActive === false) {
      commit("getArchiveMenu", getM);
    }
  },
  // async getFilteredMenu({ commit }, filters) {
  //   const getM = await pizzaApi.menu.getFilteredMenu(filters);
  //   commit("getMenu", getM);
  // },
  async addToMenu({ dispatch }, dish) {
    const addTM = await pizzaApi.menu.addToMenu(dish);
    console.log(addTM);
    await dispatch("getFullMenu");
  },
  async editMenu({ dispatch }, dish) {
    const editM = await pizzaApi.menu.editMenu(dish);
    console.log(editM);
    await dispatch("getFullMenu");
  },
  async removeDish({ dispatch }, id) {
    const removeD = await pizzaApi.menu.removeDish(id);
    console.log(removeD);
    dispatch("getFullMenu");
    dispatch("getArchiveMenu");
  },
};
const getters = {
  getField,
};
const mutations = {
  updateField,
  getMenu(state, payload) {
    state.menu = payload.data;
  },
  getArchiveMenu(state, payload) {
    state.archiveMenu = payload.data;
  },
  editDish(state, dish) {
    state.isEdit = dish.isEdit;
    state.dishVX.name = dish.name;
    state.dishVX.price = dish.price;
    state.dishVX.id = dish.id;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
