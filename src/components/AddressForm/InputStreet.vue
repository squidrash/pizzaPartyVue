<template>
  <div class="address_street">
    ул.
    <input
      :class="{ form_item__error: v.$error }"
      type="text"
      placeholder="Введите название улицы"
      v-model="street"
    />
  </div>
</template>

<script>
export default {
  name: "InputStreet",
  props: {
    value: { String },
    v: {
      type: Object,
      required: true,
    },
  },
  computed: {
    street: {
      get() {
        return this.value;
      },
      set(value) {
        this.v.$touch();
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style>
.address_street {
  display: flex;
  min-width: 200px;
  flex-grow: 1;
}
</style>
