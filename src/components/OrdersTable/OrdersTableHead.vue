<template>
  <div class="orders_table__row orders_table__row_header">
    <div class="orders_table__column orders_table__column_time">
      <div class="orders_table__column_item">Дата создания</div>
    </div>

    <div class="orders_table__column orders_table__column_status">
      <div class="orders_table__column_item">Статус</div>
    </div>

    <div class="orders_table__column orders_table__column_address">
      <div class="orders_table__column_item">Адрес</div>
    </div>

    <div class="orders_table__column orders_table__column_customer">
      <div class="orders_table__column_item">Клиент</div>
    </div>
  </div>
</template>

<script>
export default { name: "OrdersTableHead" };
</script>

<style>
.orders_table__row_header {
  border-radius: 5px 5px 0 0;
  border-bottom: 1px solid #c9c8c8;
  position: sticky;
  top: 100px;
  background-color: #ffffff;
  border-top: 1px solid #efefef;
}
</style>
