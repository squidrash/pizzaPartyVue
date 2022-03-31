<template>
  <div class="input__offer_amount">
    <label for="amount-input">Минимальная сумма заказ</label>
    <input
      id="amount-input"
      class="offer_input"
      :disabled="!isEdit"
      type="text"
      v-model.number="minOrderAmount"
      @blur="v.$touch"
      placeholder="Введите сумму"
      min="0"
      style="max-width:125px"
      maxlength="8"
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
    minOrderAmount: {
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
.input__offer_amount {
  display: flex;
  flex-direction: column;
  margin: 0 0 8px 0;
}
</style>
