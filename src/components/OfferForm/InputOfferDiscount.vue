<template>
  <div class="input__offer_discount">
    <label for="discount-input"> Размер скидки</label>
    <div class="flexbox_row">
      <input
        :class="classObj"
        id="discount-input"
        :disabled="!isEdit"
        type="text"
        v-model.number="discount"
        @blur="v.$touch"
        maxlength="2"
        style="max-width:30px"
      />
      %
    </div>

    <small v-if="v.$error">{{ v.$errors[0].$message }}</small>
  </div>
</template>

<script>
export default {
  name: "InputOfferDiscount",
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
    discount: {
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
.input__offer_discount {
  display: flex;
  flex-direction: column;
  margin: 0 0 8px 0;
}
</style>
