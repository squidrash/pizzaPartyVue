<template>
  <div>
    <div
      id="menu-slider"
      class="flexbox_row menu_slider"
      style="margin-bottom: 5px;"
    >
      <router-link
        class="slide_btn slide_btn__left"
        id="CurrentMenuLink"
        to="current"
      >
        Основное меню</router-link
      >

      <router-link
        class="slide_btn slide_btn__right"
        id="ArchiveMenuLink"
        to="archive"
        >Архив блюд</router-link
      >
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "Menu",
};
</script>
<style>
#menu-slider a {
  text-decoration: none;
}
#menu-slider .router-link-exact-active {
  background-color: #28a745;
  color: #fff;
  /* text-decoration: none; */
  font-weight: 400;
  transition: 0.5s;
}
.menu_slider {
  justify-content: center;
}
.slide_btn {
  width: 135px;
  color: #000;
  font-weight: 400;
  border: 1px solid #dedcec;
  height: 35px;
  padding: 5px;
}
.slide_btn:hover {
  color: #000;
  background-color: #efefef;
}
.slide_btn__left {
  border-right-width: 0.5px;
  border-radius: 5px 0 0 5px;
}
.slide_btn__right {
  border-left-width: 0.5px;
  /* border: 1px solid; */
  border-radius: 0 5px 5px 0;
}
</style>
