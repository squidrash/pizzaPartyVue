import pizzaApi from '@/api/pizzaApi'
import { getField, } from 'vuex-map-fields';
//updateField

const state = () => ({
    allCustomers: [],
    customerVX: {
        id: 0,
        name: null,
        lastName: null,
        phone: null,
        discount: 0
    },
    // customerVX: {},
    customer: [],
    customerId: null,
    isEdit: false
})

const actions = {
    editCustomer({ commit }, item) {
        commit('editCustomer', item)
    },
    customerName({ commit }, name) {
        commit('customerName', name)
    },
    customerLastName({ commit }, lastName) {
        commit('customerLastName', lastName)
    },
    customerPhone({ commit }, phone) {
        commit('customerPhone', phone)
    },
    customerDiscount({ commit }, discount) {
        commit('customerDiscount', discount)
    },
    customerIsEdit({ commit }, isEdit) {
        commit('customerIsEdit', isEdit)
    },
    async getAllCustomers({ commit }) {
        const getC = await pizzaApi.customers.getAllCustomers();
        console.log(getC);
        commit('getAllCustomers', getC);

    },
    async getOneCustomer({ commit }, id) {
        const getOC = await pizzaApi.customers.getOneCustomer(id);
        console.log(getOC);
        commit('getOneCustomer', getOC);
    },
    async registrationCustomer({ dispatch }, customer) {
        const registrC = await pizzaApi.customers.registrationCustomer(customer);
        console.log(registrC);
        await dispatch('getAllCustomers');
    },
    async editCustomerDB({ dispatch }, customer) {
        const editC = await pizzaApi.customers.editCustomer(customer);
        console.log(editC);
        await dispatch('getAllCustomers');
    },
    async removeCustomer({ dispatch }, id) {
        const removeC = await pizzaApi.customers.removeCustomer(id);
        console.log(removeC);
        await dispatch('getAllCustomers');
    }
}
const getters = {
    getField
}

const mutations = {
    getAllCustomers(state, payload) {
        state.allCustomers = payload.data
    },
    getOneCustomer(state, payload) {
        state.customer = []
        state.customer.push(payload.data)
    },
    customerName(state, name) {
        state.customerVX.name = name;
    },
    customerLastName(state, lastName) {
        state.customerVX.lastName = lastName
    },
    customerPhone(state, phone) {
        state.customerVX.phone = phone
    },
    customerDiscount(state, discount) {
        state.customerVX.discount = discount
    },
    customerIsEdit(state, isEdit) {
        state.isEdit = isEdit
    },
    editCustomer(state, payload) {
        state.customerVX.id = payload.customer.id;
        state.customerVX.name = payload.customer.name;
        state.customerVX.lastName = payload.customer.lastName;
        state.customerVX.phone = payload.customer.phone;
        state.isEdit = payload.isEdit;
        if (payload.discount !== null) {
            state.customerVX.discount = payload.customer.discount;
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}