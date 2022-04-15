<template>
  <div>
    <label for="status-filter">Статус</label>
    <select id="status-filter" v-model="status">
      <option
        v-for="status in statusOptions"
        :key="status.value"
        :value="status.value"
      >
        {{ status.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "StatusFilter",
  props: { value: String },
  data() {
    return {
      statusOptions: [
        {
          value: null,
          text: "Все заказы",
        },
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
    status: {
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
