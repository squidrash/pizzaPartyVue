<template>
  <div class="address_city">
    г.
    <select :class="classObj" v-model="city">
      <option value="" disabled>Выберите город</option>
      <option
        v-for="option in cityOptions"
        :key="option.value"
        :value="option.value"
        >{{ option.value }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectCity",
  props: {
    value: { String },
    v: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cityOptions: [{ value: "Ставрополь" }, { value: "Буденновск" }],
    };
  },
  computed: {
    city: {
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
};
</script>

<style>
.address_city {
  display: flex;
  min-width: 200px;
  flex-grow: 1;
}
</style>
