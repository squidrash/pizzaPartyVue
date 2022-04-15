<template>
  <div>
    <b-sidebar class="side_bar" id="orders-filter" title="Фильтры" right shadow>
      <div class="px-3 py-2">
        <StatusFilter v-model="filters.status" />
        <AddressFilter v-model="filters.address" />
        <CustomersFilter v-model="filters.customers" />
      </div>
      <b-button variant="success" size="sm" @click="filterOut"
        >Применить</b-button
      >
      <b-button variant="danger" size="sm" @click="resetFilters"
        >Сбросить</b-button
      >
    </b-sidebar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import StatusFilter from "./StatusFilter.vue";
import AddressFilter from "./AddressFilter.vue";
import CustomersFilter from "./CustomersFilter.vue";

export default {
  name: "OrdersFilter",
  components: { StatusFilter, AddressFilter, CustomersFilter },
  data() {
    return {
      filters: {
        status: null,
        address: null,
        customers: null,
      },
    };
  },
  methods: {
    filterOut() {
      this.getFilteredOrders(this.filters);
    },
    resetFilters() {
      this.filters.status = null;
      this.filters.address = null;
      this.filters.customers = null;
      this.getAllOrders();
    },
    ...mapActions("ordersM", ["getAllOrders", "getFilteredOrders"]),
  },
};
</script>
