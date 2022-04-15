<template>
  <div>
    <div class="flexbox_row stiky_block stiky_block_order">
      <div class="flexbox_row_expanded" style="justify-content: left;">
        <button class="green_btn" @click="$bvModal.show('order-form')">
          новый заказ
        </button>
      </div>
      <button class="purple_btn" v-b-toggle.orders-filter>Фильтры</button>
    </div>
    <OrdersFilter class="side_bar" />

    <OrderForm :menu="menu" />
    <OrdersTable :customerId="$route.params.id" />

    <OrderStatusForm @handle-error="handleError" />
    <AlertErrorModal :message="errorMessage" />
  </div>
</template>

<script>
import { mapState } from "vuex";

import OrdersTable from "./OrdersTable.vue";
import OrderForm from "./OrderForms/OrderForm.vue";

import OrderStatusForm from "./OrderForms/OrderStatusForm.vue";
import OrdersFilter from "./OrderFilters/OrdersFilter";
import AlertErrorModal from "./AlertErrorModal.vue";

export default {
  name: "OrdersTab",
  components: {
    OrdersTable,
    OrderStatusForm,
    OrdersFilter,
    OrderForm,
    AlertErrorModal,
  },
  data() {
    return {
      errorMessage: "",
    };
  },
  computed: {
    ...mapState("menuM", {
      menu: "menu",
    }),
  },
  methods: {
    handleError(message) {
      this.errorMessage = message;
      this.$bvModal.show("alert-modal");
    },
  },
};
</script>
<style>
.stiky_block_order {
  top: 50px;
}
</style>
