import pizzaApi from "@/api/pizzaApi";
import { getField, updateField } from "vuex-map-fields";

const state = () => ({
  menu: [],
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
  async getFilteredMenu({ commit }, filters) {
    const getM = await pizzaApi.menu.getFilteredMenu(filters);
    commit("getMenu", getM);
  },
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
    await dispatch("getFullMenu");
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
