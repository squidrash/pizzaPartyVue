import pizzaApi from "@/api/pizzaApi";

const state = () => ({
  allCustomers: [],
  customer: [],
});

const actions = {
  async getAllCustomers({ commit }) {
    const getC = await pizzaApi.customers.getAllCustomers();
    console.log(getC);
    commit("getAllCustomers", getC);
  },
  async getOneCustomer({ commit }, id) {
    const getOC = await pizzaApi.customers.getOneCustomer(id);
    console.log(getOC);
    commit("getOneCustomer", getOC);
  },
  async registrationCustomer({ dispatch }, customer) {
    const registrC = await pizzaApi.customers.registrationCustomer(customer);
    console.log(registrC);
    await dispatch("getAllCustomers");
  },
  async editCustomer({ dispatch }, customer) {
    const editC = await pizzaApi.customers.editCustomer(customer);
    console.log(editC);
    await dispatch("getAllCustomers");
  },
  async removeCustomer({ dispatch }, id) {
    const removeC = await pizzaApi.customers.removeCustomer(id);
    console.log(removeC);
    await dispatch("getAllCustomers");
  },
};

const mutations = {
  getAllCustomers(state, payload) {
    state.allCustomers = payload.data;
  },
  getOneCustomer(state, payload) {
    state.customer = [];
    state.customer.push(payload.data);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
