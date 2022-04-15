<template>
  <div>
    <b-sidebar id="menu-filters" title="Фильтры" right shadow>
      <div class="px-3 py-2">
        <DishCategoryFilter v-model="filters.categoryId" />
      </div>
      <b-button variant="success" size="sm" @click="filterOut"
        >Применить</b-button
      >
      <b-button variant="danger" size="sm" @click="resetFilters"
        >Сбросить</b-button
      >
    </b-sidebar>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import DishCategoryFilter from "./CategoryFilter.vue";
export default {
  name: "MenuFilters",
  components: { DishCategoryFilter },
  props: { dishStatusProp: Boolean },
  data() {
    return {
      filters: {
        categoryId: null,
        isActive: this.dishStatusProp,
      },
    };
  },
  methods: {
    ...mapActions("menuM", ["getFullMenu", "getFilteredMenu"]),
    filterOut() {
      this.getFilteredMenu(this.filters);
    },
    resetFilters() {
      console.log(this.filters);
      this.filters.categoryId = null;
      // this.getFullMenu();
      this.getFilteredMenu(this.filters);
    },
  },
};
</script>

<style lang="scss" scoped></style>
