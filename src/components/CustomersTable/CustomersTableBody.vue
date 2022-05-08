<template>
  <div
    class="flexbox_row customers_table__body"
    @mouseover="showRemoveBtn = true"
    @mouseout="showRemoveBtn = false"
  >
    <div
      class="flexbox_row customers_table__body_item customers_table__column_name"
      @click="editCustomer"
    >
      {{ fullName }}
    </div>
    <div
      class="flexbox_column customers_table__body_item customers_table__column_phone"
      @click="editCustomer"
    >
      {{ customer.phone }}
    </div>
    <div
      class="flexbox_row  customers_table__body_item customers_table__column_orders"
    >
      <div class="flexbox_row_expanded">
        <button class="purple_btn" @click="getInfo">подробнее</button>
      </div>
      <div v-show="showRemoveBtn">
        <button class=" basic_btn red_btn" @click="removeCustomer">
          <b-icon icon="trash-fill" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomersTableBody",
  props: { customer: Object },
  data() {
    return {
      showRemoveBtn: false,
    };
  },
  computed: {
    fullName() {
      return this.customer.name + " " + this.customer.lastName;
    },
  },
  methods: {
    editCustomer() {
      this.$emit("edit-customer", this.customer);
    },
    getInfo() {
      this.$emit("get-customer-orders", this.customer.id);
    },
    removeCustomer() {
      this.$emit("remove-customer", this.customer);
    },
  },
};
</script>

<style>
.customers_table__body {
  border-bottom: 1px solid #c9c8c8;
}
.customers_table__body:hover {
  background-color: #efefef;
}
.customers_table__body_item {
  padding: 5px;
  height: 40px;
  /* border: 1px solid black; */
}
</style>
