import pizzaApi from "@/api/pizzaApi";

const state = () => ({
  specialOffers: [],
});
const actions = {
  async getSpecialOffers({ commit }) {
    const getOf = await pizzaApi.specialOffers.getSpecialOffers();
    commit("getSpecialOffers", getOf);
  },
  async addOffer({ dispatch }, offer) {
    const addO = await pizzaApi.specialOffers.addNewOffer(offer);
    console.log(addO);
    await dispatch("getSpecialOffers");
  },
  async editOffer({ dispatch }, offer) {
    const editO = await pizzaApi.specialOffers.editOffer(offer);
    console.log(editO);
    await dispatch("getSpecialOffers");
  },
  async removeOffer({ dispatch }, offerId) {
    const removeO = await pizzaApi.specialOffers.removeOffer(offerId);
    console.log(removeO);
    await dispatch("getSpecialOffers");
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
