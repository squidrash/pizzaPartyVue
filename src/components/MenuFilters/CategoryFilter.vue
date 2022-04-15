<template>
  <div>
    <label for="category-input">Категории</label>
    <select id="category-input" v-model="categoryId">
      <option :value="null">Все категории</option>
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DishCategoryFilter",
  props: {
    value: Number,
  },
  computed: {
    ...mapState("categoriesM", {
      categories: "categories",
    }),
    categoryId: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
