<template>
  <div>
    <select :class="classObj" style="width:250px" v-model="selectDish">
      <option value="null" disabled>Выберите блюдо</option>
      <optgroup
        v-for="category in menu"
        :key="category.categoryId"
        :label="category.categoryName"
      >
        <option
          v-for="dish in category.dishes"
          :key="dish.id"
          :value="dish"
          :disabled="disableExtraDish(dish.id)"
          >{{ dish.productName }}</option
        >
      </optgroup>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectDish",
  props: {
    value: {
      type: Object,
    },
    v: {
      type: Object,
      reqiured: true,
    },
    menu: {
      type: Array,
      reqiured: true,
    },
    mainDish: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  computed: {
    selectDish: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    classObj() {
      return {
        form_item__error: this.v.$error,
      };
    },
  },
  methods: {
    disableExtraDish(dishId) {
      if (this.mainDish !== null) {
        return this.mainDish.id === dishId;
      }
      return false;
    },
  },
};
</script>

<style>
/* .input__offer_dishes {
  display: flex;
  flex-direction: column;
  margin: 0 0 10px 0;
} */
</style>
