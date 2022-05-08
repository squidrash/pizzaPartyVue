<template>
  <div>
    <div class="flexbox_row stiky_block stiky_block_customer">
      <div class="flexbox_row_expanded" style="justify-content: left;">
        <button class="green_btn" @click="handleAddCustomer">
          <b-icon icon="clipboard-plus" aria-hidden="true"></b-icon> Новый
          пользователь
        </button>
      </div>
    </div>

    <div class="customer_table">
      <CustomersTableHead />
      <div v-for="customer in customers" :key="customer.id">
        <CustomersTableBody
          :customer="customer"
          @edit-customer="handleEdit"
          @get-customer-orders="toCustomerOrders"
          @remove-customer="handleRemove"
        />
      </div>

      <CustomersForm :customerProp="customer" @oks="handleCustomerForm" />
      <ModalConfirm
        modalTitle="Удалить пользователя?"
        @submit-action="removeData"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CustomersTableHead from "@/components/CustomersTable/CustomersTableHead";
import CustomersTableBody from "@/components/CustomersTable/CustomersTableBody";
import CustomersForm from "@/components/CustomerForm.vue";
import ModalConfirm from "@/components/ModalConfirm";

export default {
  name: "CustomersTable",
  components: {
    CustomersTableHead,
    CustomersTableBody,
    CustomersForm,
    ModalConfirm,
  },
  data() {
    return {
      customer: {
        id: 0,
        name: "",
        lastName: "",
        phone: "",
      },
      isEditForm: false,
    };
  },
  computed: {
    ...mapState("customersM", {
      customers: "allCustomers",
    }),
  },
  methods: {
    handleAddCustomer() {
      this.customer.name = "";
      this.customer.lastName = "";
      this.customer.phone = "";
      this.customer.id = 0;

      this.isEditForm = false;
      this.$nextTick(() => {
        this.$bvModal.show("customer-form");
      });
    },
    handleEdit(customer) {
      this.customer.name = customer.name;
      this.customer.lastName = customer.lastName;
      this.customer.phone = customer.phone;
      this.customer.id = customer.id;

      this.isEditForm = true;
      this.$nextTick(() => {
        this.$bvModal.show("customer-form");
      });
    },
    handleRemove(customer) {
      this.customer = customer;
      this.$bvModal.show("modal-confirm");
    },
    handleCustomerForm(customer) {
      if (this.isEditForm === true) {
        this.editCustomer(customer);
      } else {
        this.registrationCustomer(customer);
      }
    },
    removeData() {
      this.removeCustomer(this.customer.id);
    },
    toCustomerOrders(id) {
      this.$router.push({ path: `/orders/customer/${id}` });
    },
    ...mapActions("customersM", [
      "editCustomer",
      "removeCustomer",
      "getAllCustomers",
      "registrationCustomer",
    ]),
  },
  mounted() {
    this.getAllCustomers();
  },
};
</script>
<style>
.stiky_block_customer {
  top: 50px;
  margin-bottom: 5px;
}
.customer_table {
  box-shadow: 0 0 5px;
  border-radius: 5px;
}
.customers_table__column_name {
  flex: 1 0 45%;
}
.customers_table__column_phone {
  flex: 1 0 25%;
}
.customers_table__column_orders {
  flex: 1 0 25%;
  max-width: 160px;
}
.customers_table__column_remove {
  flex: 1 0 auto;
  max-width: 40px;
}
</style>
