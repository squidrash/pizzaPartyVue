<template>
  <div>
    <label for="phone-input">Телефон</label>
    <the-mask
      id="phone-input"
      :class="classObj"
      v-model="phone"
      type="tel"
      mask="+7(###)-###-##-##"
      :masked="false"
      autocomplete="off"
      placeholder="Введите номер"
      @blur="v.$touch()"
    ></the-mask>

    <small v-if="v.$error">{{ v.$errors[0].$message }}</small>
  </div>
</template>

<script>
export default {
  name: "InputPhone",
  props: {
    value: {
      type: String,
      default: "",
    },
    v: {
      type: Object,
      required: true,
    },
  },
  computed: {
    phone: {
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

<style lang="scss" scoped></style>
