<template>
  <div class="select__offer_dishes">
    <div v-if="isEdit === true">
      <select :class="classObj" style="max-width:200px;" v-model="selectDish">
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

      <small v-if="v.$error">{{ v.$errors[0].$message }}</small>
    </div>
    <div v-else class="input__offer_select_dish">
      {{ selectDish.productName }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectOfferDish",
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
    isEdit: {
      type: Boolean,
      reqiured: true,
    },
    mainDish: {
      type: Object,
      default: null,
    },
  },
  computed: {
    selectDish: {
      get() {
        return this.value;
      },
      set(value) {
        this.v.$touch();
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
.input__offer_dishes {
  display: flex;
  flex-direction: column;
  margin: 0 0 10px 0;
}
.input__offer_select_dish {
  border: 0px;
  border-bottom: 1px solid #ffffff;
  padding: 1px 0 0 4px;
  margin: 0 0 5px 0;
  width: 200px;
  height: 27px;
  color: #495057;
  /* padding: 6px 28px 6px 12px; */
  /* outline-color: rgb(111, 164, 31); */
  /* margin: 18px 0 10px 0; */
}
</style>
