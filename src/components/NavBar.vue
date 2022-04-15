<template>
  <div class="navbar__block">
    <div class="navbar__row">
      <router-link to="/menu/current" class="navbar__row_item">
        Меню
      </router-link>
      <router-link to="/offers" class="navbar__row_item">
        Акции
      </router-link>
      <router-link to="/orders" class="navbar__row_item">
        Заказы
      </router-link>
      <router-link to="/customers" class="navbar__row_item">
        Клиенты
      </router-link>
    </div>
  </div>
</template>

<script>
export default { name: "NavBar" };
</script>

<style>
.navbar__block {
}
.navbar__row {
  display: flex;
  width: 100%;
  /* justify-content: space-between; */
  align-content: center;
}
.navbar__row_item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 25%;
  height: 35px;
  border: 1px solid red;
}
.navbar__row_item:hover {
  background-color: green;
}
</style>
