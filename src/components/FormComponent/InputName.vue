<template>
  <div class="input__name">
    <label for="name-input">{{ labelName }}</label>
    <input
      id="name-input"
      type="text"
      autocomplete="off"
      :class="classObj"
      v-model.trim="name"
      :placeholder="placeholder"
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
    labelName: {
      type: String,
      default: "Название",
    },
    placeholder: { type: String, default: "Введите Название" },
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
    classObj() {
      return {
        form_item__error: this.v.$error,
        offer_input: true,
        offer_input__name: true,
      };
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
