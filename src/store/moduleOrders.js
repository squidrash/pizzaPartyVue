import pizzaApi from "@/api/pizzaApi";
import { getField, updateField } from "vuex-map-fields";

const state = () => ({
  orders: [],
  orderStatus: null,
  orderId: null,
});

const actions = {
  changeOrderStatusStorage({ commit }, status) {
    commit("changeOrderStatusStorage", status);
  },
  setOrderId({ commit }, id) {
    commit("setOrderId", id);
  },
  async getAllOrders({ commit }) {
    const getO = await pizzaApi.orders.getAllOrders();
    commit("getOrders", getO);
  },
  async getCustomerOrders({ commit }, id) {
    const getO = await pizzaApi.orders.getCustomerOrders(id);
    commit("getOrders", getO);
  },
  async getFilteredOrders({ commit }, filters) {
    const getO = await pizzaApi.orders.getFilteredOrders(filters);
    commit("getOrders", getO);
  },
  async postNewOrder({ dispatch }, order) {
    const postO = await pizzaApi.orders.postNewOrder(
      order.dishes,
      order.addressId
    );
    console.log(postO);
    await dispatch("getAllOrders");
  },
  async changeStatus({ dispatch }, order) {
    const changeS = await pizzaApi.orders.changeStatus(
      order.id,
      order.newStatus
    );

    if (changeS.status === 200) {
      await dispatch("getAllOrders");
    }
    return changeS;
  },
};

const getters = {
  getField,
};

const mutations = {
  updateField,
  getOrders(state, payload) {
    state.orders = payload.data;
  },
  changeOrderStatusStorage(state, status) {
    state.orderStatus = status;
  },
  setOrderId(state, id) {
    state.orderId = id;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
