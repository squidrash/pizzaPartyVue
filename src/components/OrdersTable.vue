<template>
  <div>
    <b-button
      size="sm"
      v-show="this.visible"
      @click="resetCustomer"
      class="mr-2"
    >
      Сброс пользователя
    </b-button>
    <b-table small hover :items="items" :fields="fields">
      <template #cell(status)="data">
        {{ data.item.status }}<br />
        <b-button
          size="sm"
          v-b-modal.order-status-form
          variant="primary"
          @click="editStatus(data.item.id, data.item.status)"
          ><b-icon icon="pencil-square" aria-hidden="true"></b-icon>
          Изменить</b-button
        >
      </template>

      <template #cell(client)="data">
        <template v-if="data.item.client != null">
          {{ data.item.client.name }} {{ data.item.client.lastName }}<br />
          Телефон: {{ data.item.client.phone }}
        </template>
        <template v-else>
          Неизвестно
        </template>
      </template>

      <template #cell(address)="data">
        <template v-if="data.item.address != null">
          г. {{ data.item.address.city }}, ул. {{ data.item.address.street }},
          строение {{ data.item.address.numberOfBuild }}, подъезд
          {{ data.item.address.numberOfEntrance }}
        </template>
        <template v-else>
          Неизвестно
        </template>
      </template>

      <template #cell(dishes)="row">
        <template v-if="row.item.dishes.length === 0">
          Блюдо(а) было(и) удалено(ы)
        </template>
        <template v-else-if="row.item.dishes.length === 1">
          {{ row.item.dishes[0].productName }}<br />
        </template>
        <template v-else>
          {{ row.item.dishes[0].productName }},
          {{ row.item.dishes[1].productName }}, ...<br />
        </template>
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? "Скрыть" : "Показать" }} детали
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <template v-for="dish in row.item.dishes">
            <b-row class="mb-2" :key="dish.id">
              <b-col class="text-sm-right"><b>Название:</b></b-col>
              <b-col>{{ dish.productName }}</b-col>
              <b-col class="text-sm-right"><b>Цена:</b></b-col>
              <b-col>{{ dish.price }}</b-col>
              <b-col class="text-sm-right"><b>Количество:</b></b-col>
              <b-col>{{ dish.quantity }}</b-col>
            </b-row>
          </template>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "OrdersTable",
  props: ["customerId"],
  data() {
    return {
      fields: [
        {
          key: "id",
          label: "Id заказа",
          sortable: true,
        },
        {
          key: "status",
          label: "Статус",
          sortable: true,
        },
        {
          key: "creatTime",
          label: "Дата создания",
          sortable: true,
        },
        {
          key: "client",
          label: "ФИО",
          sortable: true,
        },
        {
          key: "address",
          label: "Адрес доставки",
          sortable: true,
        },
        {
          key: "dishes",
          label: "Блюда",
          sortable: true,
        },
      ],
      visible: false,
    };
  },
  computed: {
    ...mapState("ordersM", {
      items: "orders",
    }),
  },
  methods: {
    resetCustomer() {
      this.visible = false;
      this.getAllOrders();
      this.$router.push({ path: `/orders` });
    },
    editStatus(orderId, orderStatus) {
      this.changeOrderStatus(orderStatus);
      this.setOrderId(orderId);
    },
    ...mapActions("ordersM", [
      "changeOrderStatus",
      "setOrderId",
      "getAllOrders",
      "getCustomerOrders",
    ]),
  },
  mounted() {
    if (this.customerId === undefined || this.customerId === null) {
      console.log("If");
      this.getAllOrders();
    } else {
      console.log("else");
      this.visible = true;
      this.getCustomerOrders(this.customerId);
    }
  },
};
</script>
