<template>
  <div class="input__price">
    <label for="price-input">Цена</label>
    <input
      id="price-input"
      class="offer_input"
      :disabled="!isEdit"
      type="text"
      v-model.number="price"
      @blur="v.$touch"
      placeholder="Введите сумму"
      min="0"
      style="max-width:120px"
      maxlength="6"
    />
    <small v-if="v.$error">{{ v.$errors[0].$message }}</small>
  </div>
</template>

<script>
export default {
  name: "InputOfferAmount",
  props: {
    value: {
      default: 0,
    },
    v: {
      type: Object,
      reqiured: true,
    },
    isEdit: {
      type: Boolean,
      reqiured: true,
    },
  },
  computed: {
    price: {
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
.input__price {
  display: flex;
  flex-direction: column;
  margin: 0 0 8px 0;
}
</style>
