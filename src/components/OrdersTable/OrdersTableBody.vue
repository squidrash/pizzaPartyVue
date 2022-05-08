<template>
  <div>
    <div class="orders_table__row">
      <div class="orders_table__column orders_table__column_time">
        <div class="orders_table__column_item">
          {{ order.createTime | orderTime }}
        </div>
      </div>
      <div class="orders_table__column orders_table__column_status">
        <div class="orders_table__column_item">
          {{ order.status | status }}
          <button
            class="orders__status_btn"
            v-b-modal.order-status-form
            @click="editStatus()"
          >
            <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
          </button>
        </div>
      </div>

      <div class="orders_table__column orders_table__column_address">
        <div class="orders_table__column_item">
          <div v-if="order.address != null">
            г. {{ order.address.city }}, ул. {{ order.address.street }}, д.
            {{ order.address.numberOfBuild }}
            <template v-if="order.address.numberOfEntrance !== undefined">
              , п. {{ order.address.numberOfEntrance }}, кв.
              {{ order.address.apartment }}
            </template>
          </div>
          <div v-else>
            Ресторан
          </div>
        </div>
      </div>

      <div class="orders_table__column orders_table__column_customer">
        <div class="orders_table__column_item">
          <template v-if="order.client != null">
            {{ order.client.name }} {{ order.client.lastName }}<br />
            {{ order.client.phone }}
          </template>
          <template v-else>
            Неизвестно
          </template>
        </div>
      </div>
    </div>
    <div class="orders_table__row">
      <div class="flexbox_row_expanded" style="align-items: center;">
        <div>Список блюд:</div>
        <div class="flexbox_row " style="max-width:450px; flex-wrap:wrap">
          <div
            class="dishes_list_item"
            v-for="dish in order.dishes"
            :key="dish.id"
          >
            {{ dish.productName }}
          </div>
        </div>
      </div>

      <div v-if="showDetails === false">
        <ButtonInfo @click.native="showDetails = !showDetails" />
      </div>
      <div v-else>
        <button class="btn_hide" @click="showDetails = !showDetails">
          скрыть
        </button>
      </div>
    </div>
    <div v-if="showDetails === true">
      <OrderDetails
        :dishes="order.dishes"
        :discountSum="order.discountSum"
        :totalSum="order.totalSum"
      />
    </div>
  </div>
</template>

<script>
import OrderDetails from "../OrderDetails.vue";
import ButtonInfo from "../Buttons/ButtonInfo.vue";

export default {
  name: "OrdersTableBody",
  components: { OrderDetails, ButtonInfo },
  props: { order: Object },
  data() {
    return {
      showDetails: false,
    };
  },
  filters: {
    status(value) {
      switch (value) {
        case "New":
          return "Новый";
        case "Confirmed":
          return "Подтвержден";
        case "Preparing":
          return "Готовится";
        case "OnTheWay":
          return "В пути";
        case "Delivered":
          return "Доставлен";
        case "Canceled":
          return "Отменен";
        default:
          return "";
      }
    },
    orderTime(value) {
      if (!value) return "";
      var date = new Date(value);

      var options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timezone: "UTC",
      };

      return date.toLocaleString("ru", options);
    },
  },
  methods: {
    editStatus() {
      this.$emit("edit-status", this.order);
    },
  },
};
</script>

<style>
.dishes_list {
}
.dishes_list_item {
  margin: 0 5px 0 0;
  padding: 2px;
}
ul.dishes_list {
  margin: 0;
  padding: 4px;
}

ul.dishes_list li {
  display: inline;
  margin-right: 5px;
  padding: 3px;
  list-style-type: none;
}
</style>
