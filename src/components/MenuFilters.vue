<template>
  <div>
    <label>Фильтры</label>

    <b-button variant="primary" size="sm" @click="visible = !visible">{{
      visible ? "Скрыть" : "Отобразить"
    }}</b-button>
    <b-form-group v-show="visible" label-cols-lg="2">
      Статус блюд<br />
      <b-form-select
        v-model="filters.isActive.value"
        :options="filters.isActive.options"
      ></b-form-select
      ><br />
      Категории<br />
      <b-form-select v-model="filters.category">
        <b-form-select-option :value="null">
          Все категории
        </b-form-select-option>

        <b-form-select-option
          v-for="category in categoriesProp"
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
import { mapActions } from "vuex";
export default {
  name: "MenuFilters",
  props: ["categoriesProp"],
  data() {
    return {
      visible: false,
      filters: {
        isActive: {
          value: true,
          options: [
            {
              value: "true",
              text: "Активные",
            },
            {
              value: "false",
              text: "Не активные",
            },
            {
              value: null,
              text: "Все блюда",
            },
          ],
        },
        category: null,
      },
    };
  },
  methods: {
    ...mapActions("menuM", ["getFullMenu", "getFilteredMenu"]),
    filterOut() {
      this.getFilteredMenu(this.filters);
    },
    resetFilters() {
      this.filters.isActive.value = true;
      this.filters.category = null;
      this.getFullMenu();
    },
  },
};
</script>
