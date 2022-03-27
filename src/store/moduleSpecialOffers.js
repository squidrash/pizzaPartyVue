import pizzaApi from "@/api/pizzaApi";

const state = () => ({
  specialOffers: [],
});
const actions = {
  async getSpecialOffers({ commit }) {
    const getOf = await pizzaApi.specialOffers.getSpecialOffers();
    commit("getSpecialOffers", getOf);
  },
};
const mutations = {
  getSpecialOffers(state, payload) {
    state.specialOffers = payload.data;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
