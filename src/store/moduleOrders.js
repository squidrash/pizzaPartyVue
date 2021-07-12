import pizzaApi from '@/api/pizzaApi'
import { getField, updateField } from 'vuex-map-fields';


const state = () => ({
    orders: [],
    orderStatus: null,
    orderId: null
})

const actions = {
    changeOrderStatus({ commit }, status) {
        commit('changeOrderStatus', status)
    },
    setOrderId({ commit }, id) {
        commit('setOrderId', id)
    },
    async getAllOrders({ commit },) {
        const getO = await pizzaApi.orders.getAllOrders();
        console.log(getO)
        commit('getAllOrders', getO)
    },
    async getFilteredOrders({ commit }, filters) {
        const getO = await pizzaApi.orders.getFilteredOrders(filters);
        console.log(getO)
        commit('getAllOrders', getO)
    },
    async changeStatus({ dispatch }, order) {
        const changeS = await pizzaApi.orders.changeStatus(order.id,
            order.newStatus)
        console.log(changeS)
        await dispatch('getAllOrders')
    }
}

const getters = {
    getField
}

const mutations = {
    updateField,
    getAllOrders(state, payload) {
        state.orders = payload.data
    },
    changeOrderStatus(state, status) {
        state.orderStatus = status
    },
    setOrderId(state, id) {
        state.orderId = id
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}