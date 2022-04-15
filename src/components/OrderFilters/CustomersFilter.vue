<template>
  <div>
    <label for="customer-filter">Клиент</label>
    <select id="customer-filter" v-model="customer">
      <option
        v-for="customer in customerOptions"
        :key="customer.value"
        :value="customer.value"
      >
        {{ customer.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "CustomersFilter",
  props: { value: Boolean },
  data() {
    return {
      customerOptions: [
        {
          value: null,
          text: "Все заказы",
        },
        {
          value: true,
          text: "C клиентом",
        },
        {
          value: false,
          text: "Без клиента",
        },
      ],
    };
  },
  computed: {
    customer: {
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
