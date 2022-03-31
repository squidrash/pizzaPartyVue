<template>
  <div class="select__dish_category">
    <label for="category-input">Категория</label>
    <select id="category-input" v-model="categoryId">
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
export default {
  name: "SelectDishCategory",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    v: {
      type: Object,
      // required: true,
    },
    categories: { type: Array },
  },
  computed: {
    categoryId: {
      get() {
        return this.value;
      },
      set(value) {
        //   this.v.$touch();
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style>
.select__dish_category {
  display: flex;
  flex-direction: column;
  margin: 0 0 8px 0;
}
</style>
