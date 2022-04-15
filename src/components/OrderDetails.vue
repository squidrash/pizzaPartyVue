<template>
  <div class="order_details">
    <div class="order_details__dishes">
      <div v-for="dish in dishes" :key="dish.id" class="order_details__row">
        <div class="order_details__dish_name">
          {{ dish.productName }}
        </div>

        <div class="order_details__dish_quantity">{{ dish.quantity }} шт.</div>

        <div class="order_details__dish_price">
          {{ dish.price * dish.quantity }} ₽
        </div>
      </div>
    </div>

    <div class="order_details__total">
      <div class="order_details__row" v-if="discountSum > 0">
        <div class="order_details__total_name">
          Сумма скидки
        </div>
        <div class="order_details__total_sum">{{ discountSum }} ₽</div>
      </div>

      <div class="order_details__row">
        <div class="order_details__total_name">
          Итого
        </div>
        <div class="order_details__total_sum">{{ totalSum }} ₽</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderDetails",
  props: ["dishes", "discountSum", "totalSum"],
};
</script>

<style>
.order_details {
  margin: 5px 0;
  /* border: 1px solid #c9c8c8; */
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: right;
}
.order_details__row {
  display: flex;
}
.order_details__dishes {
  padding: 10px;
  border-bottom: 1px solid #c9c8c8;
}
.order_details__dish_name {
  flex: 0 0 55%;
  padding: 0px 10px 5px 5px;
  text-align: left;
}

.order_details__dish_quantity {
  flex: 0 0 20%;
  padding: 0px 10px 5px 0px;
}
.order_details__dish_price {
  flex: 0 0 25%;
  padding: 0px 5px 5px 0px;
}
.order_details__total {
  padding: 10px;
}
.order_details__total_name {
  flex: 0 0 75%;
  padding: 0px 10px 5px 5px;
  text-align: left;
}
.order_details__total_sum {
  flex: 0 0 25%;
  padding: 0px 5px 5px 0px;
}
</style>
