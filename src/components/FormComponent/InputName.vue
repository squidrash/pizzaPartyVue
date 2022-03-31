<template>
  <div class="input__name">
    <label for="name-input">Название</label>
    <input
      id="name-input"
      type="text"
      autocomplete="off"
      class="offer_input offer_input__name"
      v-model.trim="name"
      placeholder="Введите название"
      :disabled="!isEdit"
      @blur="v.$touch()"
    />
    <small v-if="v.$error">{{ v.$errors[0].$message }}</small>
  </div>
</template>

<script>
export default {
  name: "InputName",
  props: {
    value: {
      type: String,
      default: "",
    },
    v: {
      type: Object,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    name: {
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
.input__name {
  display: flex;
  flex-direction: column;
  margin: 0 0 8px 0;
}
</style>
