<template>
  <div>
    <select v-model="selected">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        >{{ option.text }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectOrderStatus",
  props: { value: String },
  data() {
    return {
      options: [
        {
          value: "New",
          text: "Новый",
        },
        {
          value: "Confirmed",
          text: "Подтвержден",
        },
        {
          value: "Preparing",
          text: "Готовится",
        },
        {
          value: "OnTheWay",
          text: "В пути",
        },
        {
          value: "Delivered",
          text: "Доставлен",
        },
        {
          value: "Canceled",
          text: "Отменен",
        },
      ],
    };
  },
  computed: {
    selected: {
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
