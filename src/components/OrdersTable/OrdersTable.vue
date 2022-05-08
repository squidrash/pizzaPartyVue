<template>
  <div>
    <button v-show="visible" @click="resetCustomer" class="purple_btn">
      Сброс пользователя
    </button>
    <PerPageOptions v-model="perPage" />

    <PaginationNav v-model="page" :pages="pages" />

    <div class="orders_table">
      <OrdersTableHead />

      <OrdersTableBody
        class="order__card"
        v-for="order in displayedOrders"
        :key="order.id"
        :order="order"
        @edit-status="editStatus"
      />
    </div>
    <div v-show="perPage !== 5">
      <PaginationNav v-model="page" :pages="pages" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PerPageOptions from "@/components/PerPageOptions.vue";
import PaginationNav from "@/components/PaginationNav.vue";
import OrdersTableHead from "./OrdersTableHead.vue";
import OrdersTableBody from "./OrdersTableBody.vue";

export default {
  name: "OrdersTable",
  components: {
    PerPageOptions,
    PaginationNav,
    OrdersTableHead,
    OrdersTableBody,
  },
  props: { customerId: Number },

  data() {
    return {
      orderDetails: {},
      showDetails: false,
      visible: false,

      page: 1,
      perPage: 10,
      perPageOptions: [5, 10, 20, 40],
      pages: [],
    };
  },
  computed: {
    ...mapState("ordersM", {
      orders: "orders",
    }),
    displayedOrders() {
      return this.paginate(this.orders);
    },
  },
  watch: {
    orders() {
      this.setPages();
    },
    perPage() {
      this.setPages();
    },
  },
  methods: {
    setPages() {
      this.page = 1;
      this.pages = [];
      let numberOfPages = Math.ceil(this.orders.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    setPerPage(option) {
      this.perPage = option;
      this.page = 1;
      this.pages = [];
      this.setPages();
    },
    paginate(orders) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return orders.slice(from, to);
    },

    resetCustomer() {
      this.visible = false;
      this.getAllOrders();
      this.$router.push({ path: `/orders` });
    },
    editStatus(order) {
      this.changeOrderStatusStorage(order.status);
      this.setOrderId(order.id);
      this.$nextTick(function() {
        this.$bvModal.show("order-status-form");
      });
    },
    ...mapActions("ordersM", [
      "changeOrderStatusStorage",
      "setOrderId",
      "getAllOrders",
      "getCustomerOrders",
    ]),
  },
  mounted() {
    if (this.customerId === undefined || this.customerId === null) {
      this.getAllOrders();
    } else {
      this.visible = true;
      this.getCustomerOrders(this.customerId);
    }
  },
};
</script>

<style>
.orders_table {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0 0 5px;
  font-size: 14px;
  line-height: 1.3;
  margin-bottom: 15px;
}
.order__card {
  margin-bottom: 5px;
  box-shadow: 0 0 5px;
}
.orders_table__row {
  display: flex;
  border-bottom: 1px solid #c9c8c8;
  padding: 2px 5px;
  align-items: center;
}

.orders_table__column {
  display: flex;
  flex-direction: column;
  padding: 3px;
  justify-content: center;
}
.orders_table__column_time {
  flex: 0 1 10%;
  min-width: 105px;
}
.orders_table__column_address {
  flex: 1 1 30%;
  min-width: 130px;
}
.orders_table__row_dishes {
  margin-right: 2px;
  align-items: center;
  align-content: center;
}

.orders_table__column_customer {
  flex: 1 1 25%;
  min-width: 125px;
}
.orders_table__column_status {
  flex: 1 1 20%;
}
.orders__status_btn {
  height: 26px;
  width: 26px;
  background-color: #ffffff;
  border: 0;
  border-radius: 5px;
  transition: 0.5s;
}
.orders__status_btn:hover {
  background-color: #cbc8c8;
  background-color: #282;
  color: #fff;
}
</style>
