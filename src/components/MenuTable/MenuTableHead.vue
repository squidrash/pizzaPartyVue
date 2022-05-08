<template>
  <div class="menu_row">
    <div class="menu__column menu__column_image">
      Изображение
    </div>
    <div class="menu__column menu__column_name">
      Название
    </div>
    <div class="menu__column menu__column_price">
      Цена
    </div>
    <div class="menu__column menu__column_description">
      Описание
    </div>
  </div>
</template>

<script>
export default { name: "MenuTableHead" };
</script>

<style>
.menu_row {
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 10px;
}
</style>
