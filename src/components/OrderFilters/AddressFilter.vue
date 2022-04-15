<template>
  <div>
    <label for="category-input">Адрес</label>
    <select id="category-input" v-model="address">
      <option
        v-for="address in addressOptions"
        :key="address.value"
        :value="address.value"
      >
        {{ address.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "AddressFilter",
  props: { value: Boolean },
  data() {
    return {
      addressOptions: [
        {
          value: null,
          text: "Все заказы",
        },
        {
          value: true,
          text: "C адресом",
        },
        {
          value: false,
          text: "Без адреса",
        },
      ],
    };
  },
  computed: {
    address: {
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
