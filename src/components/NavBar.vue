<template>
  <div class="navbar__block">
    <div class="navbar__row">
      <router-link to="/home" class="navbar__row_item row_item__icon">
        Pizza Party
      </router-link>
      <router-link to="/menu" class="navbar__row_item">
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
  align-items: center;
  display: flex;
  height: 50px;
  margin-bottom: 30px;

  position: stiky;
  top: 0;
}
.navbar__row {
  display: flex;
  min-height: 50px;
  width: 100%;
  /* justify-content: space-between; */
  align-content: center;
}
.navbar__row_item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 22.5%;
  /* height: 35px; */
  color: #000;

  border: 1px solid #efefef;
}

.navbar__row_item:hover {
  background-color: #efefef;
  text-decoration: none;
}

.row_item__icon {
  flex: 1 0 10%;
}
</style>
