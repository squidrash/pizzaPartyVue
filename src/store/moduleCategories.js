import pizzaApi from "@/api/pizzaApi";

const state = () => ({
  categories: [],
});
const actions = {
  async getCategories({ commit }) {
    const getCat = await pizzaApi.categories.getCategories();
    commit("getCategories", getCat);
  },
};
const mutations = {
  getCategories(state, payload) {
    state.categories = payload.data;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
