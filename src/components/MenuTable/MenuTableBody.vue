<template>
  <div
    class=" flexbox_row menu__row_dishes"
    @mouseover="showRemoveBtn = true"
    @mouseout="showRemoveBtn = false"
  >
    <div class="flexbox_row" style="flex:1 1 auto" @click="editDish">
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
    </div>

    <div v-if="dishOptions === true" class="menu__column menu__column_options">
      <div class="menu__item" v-show="showRemoveBtn">
        <button class=" basic_btn red_btn" @click="removeDish">
          <b-icon icon="trash-fill" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuTableBody",
  props: { dish: Object, dishOptions: { type: Boolean, default: false } },
  data() {
    return {
      showRemoveBtn: false,
    };
  },

  methods: {
    editDish() {
      this.$emit("edit-dish", this.dish);
    },
    removeDish() {
      this.$emit("remove-dish", this.dish.id);
    },
  },
};
</script>

<style></style>
