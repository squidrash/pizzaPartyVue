<template>
  <div>
    <b-sidebar class="side_bar" id="customer-search" title="Поиск" right shadow>
      <div class="px-3 py-2">
        <label for="">Имя</label>
        <input type="text" v-model="filters.name" autocomplete="off" />
        <label for="">Фамилия</label>
        <input type="text" v-model="filters.lastName" autocomplete="off" />
        <label for="">Телефон</label>
        <the-mask
          id="phone-input"
          v-model="filters.phone"
          type="tel"
          mask="+7(###)-###-##-##"
          :masked="false"
          autocomplete="off"
          placeholder="+7(***)-***-**-**"
        ></the-mask>
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

export default {
  name: "CUstomerFilter",
  data() {
    return {
      filters: {
        name: "",
        lastName: "",
        phone: "",
      },
    };
  },
  methods: {
    ...mapActions("customersM", ["getAllCustomers"]),

    filterOut() {
      this.getAllCustomers(this.filters);
    },
    resetFilters() {
      this.filters.name = "";
      this.filters.lastName = "";
      this.filters.phone = "";
      this.getAllCustomers();
    },
  },
};
</script>
