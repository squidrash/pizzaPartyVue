<template>
  <div>
    <MenuTableHead />

    <div
      v-for="category in menu"
      :key="category.categoryId"
      class="menu__category_block"
    >
      <div class="menu__category_name">{{ category.categoryName }}</div>

      <div v-for="dish in category.dishes" :key="dish.id">
        <div
          class="menu__row menu__row_dishes"
          @mouseover="showDishSlot = dish.id"
          @mouseleave="showDishSlot = null"
        >
          <div class="menu__column menu__column_image">
            <div class="menu__item">
              <b-img
                rounded
                :src="
                  dish.image !== ''
                    ? `https://localhost:5001/api/DishImage/getDishImage?name=${dish.image}`
                    : `https://localhost:5001/api/DishImage/getDishImage?name=default.jpeg`
                "
                alt=""
                width="100px"
              />
            </div>
          </div>
          <div class="menu__column menu__column_name">
            <div class="menu__item">{{ dish.productName }}</div>
          </div>

          <div class="menu__column menu__column_price">
            <div class="menu__item">
              {{ dish.price }}
            </div>
          </div>

          <div class="menu__column menu__column_description">
            <div v-if="dish.description !== undefined" class="menu__item">
              {{ dish.description }}
            </div>
            <div v-else>-----------</div>
          </div>

          <div class="menu__column menu__column_slot">
            <div class="menu__item" v-show="showDishSlot === dish.id">
              <slot
                name="column_options"
                :dish="dish"
                :categoryId="category.categoryId"
              ></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuTableHead from "@/components/MenuTable/MenuTableHead.vue";
export default {
  name: "MenuTable2",
  components: { MenuTableHead },
  props: ["menu"],
  data() {
    return {
      showDishSlot: null,
    };
  },
};
</script>

<style>
.menu__category_block {
  /* border: 2px solid red; */
  margin-bottom: 5px;
  box-shadow: 0 0 5px;
  padding: 10px;
}
.menu__category_block:last-child {
  margin-bottom: 30px;
}
.menu__category_name {
  text-align: left;
  padding: 10px;
  padding-left: 40px;
  font-weight: bold;
}
.menu__row {
  display: flex;
  justify-content: center;
  /* height: 52px; */
  /* background-color: aquamarine; */
  /* border: 2px solid black; */
}
.menu__row_dishes {
  min-height: 31px;
  /* background-color: aquamarine; */
  /* border: 2px solid black; */
  margin-bottom: 10px;
}
.menu__column {
  padding-right: 20px;
  /* border: 2px solid green; */
  /* padding-left: 40px; */
  /* text-align: left; */
  flex: 1 1 200px;
}
.menu__column_image {
  flex: 1 1 7%;
  padding-left: 40px;
}
.menu__column_name {
  flex: 1 1 20%;
  padding-left: 0px;
  text-align: left;
  max-width: 250px;
  min-width: 150px;
}
.menu__column_price {
  /* flex: 0 1 85px; */
  flex: 1 1 7%;
  text-align: right;
  max-width: 85px;
}
.menu__column_description {
  flex: 1 1 40%;
  padding-right: 0px;
}
.menu__column_slot {
  flex: 0 0 100px;
  padding-left: 20px;
  padding-right: 0px;
}
</style>
