<template>
  <div>
    <label>Фильтры</label>

    <b-button variant="primary" size="sm" @click="visible = !visible">{{
      visible ? "Скрыть" : "Отобразить"
    }}</b-button>
    <b-form-group v-show="visible" label-cols-lg="2">
      Категории<br />
      <b-form-select v-model="filters.category">
        <b-form-select-option :value="null">
          Все категории
        </b-form-select-option>

        <b-form-select-option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </b-form-select-option> </b-form-select
      ><br />

      <b-button variant="success" size="sm" @click="filterOut"
        >Применить</b-button
      >
      <b-button variant="danger" size="sm" @click="resetFilters"
        >Сбросить</b-button
      >
    </b-form-group>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "MenuFilters",
  props: ["categoriesProp", "dishStatusProp"],
  data() {
    return {
      visible: false,
      filters: {
        category: null,
        isActive: this.dishStatusProp,
      },
    };
  },
  computed: {
    ...mapState("categoriesM", {
      categories: "categories",
    }),
  },
  methods: {
    ...mapActions("menuM", ["getFullMenu", "getFilteredMenu"]),
    filterOut() {
      this.getFilteredMenu(this.filters);
    },
    resetFilters() {
      // this.filters.isActive = null;
      this.filters.isActive === true
        ? (this.filters.isActive = true)
        : (this.filters.isActive = false);
      this.filters.category = null;
      this.getFullMenu();
    },
  },
};
</script>
