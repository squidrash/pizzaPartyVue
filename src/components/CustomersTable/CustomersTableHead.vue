<template>
  <div class="flexbox_row customers_table__row_header ">
    <div
      class="flexbox_column customers_table__header_item customers_table__column_name"
    >
      Имя
    </div>
    <div
      class="flexbox_column customers_table__header_item customers_table__column_phone"
    >
      Телефон
    </div>
    <div
      class="flexbox_column customers_table__header_item customers_table__header_item_orders customers_table__column_orders"
    >
      Заказы
    </div>
  </div>
</template>

<script>
export default { name: "CustomersTableHead" };
</script>

<style>
.customers_table__row_header {
  border-radius: 5px 5px 0 0;
  border-bottom: 1px solid #c9c8c8;
  position: sticky;
  /* top: 100px; */
  top: 0;
  background-color: #ffffff;
  border-top: 1px solid #efefef;
  /* box-shadow: 0 0 5px; */
}
.customers_table__header_item {
  padding: 5px;
  align-items: center;
  justify-content: center;
  height: 40px;
  /* border: 1px solid black; */
}
/* .customers_table__header_item_orders {
    padding-left: 35px;
  } */
</style>
