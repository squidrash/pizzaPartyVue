<template>
  <div class="input__offer_number_of_dish">
    <div class="inline_block  ">
      <input
        type="text"
        :class="classObj"
        :disabled="!isEdit"
        min="1"
        id="offer-dish-number-input"
        v-model.number="NumberOfDish"
        maxlength="2"
        @blur="v.$touch"
      />
      шт
    </div>

    <small v-if="v.$error">{{ v.$errors[0].$message }}</small>
  </div>
</template>

<script>
export default {
  name: "InputOfferNumberOfDish",
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
    NumberOfDish: {
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
        input__offer_quantity: true,
      };
    },
  },
};
</script>

<style>
.input__offer_number_of_dish {
  display: flex;
  flex-direction: column;
  margin: 0 0 8px 0;
}
.inline_block {
  display: inline-block;
}
.input__offer_quantity {
  max-width: 30px;
  text-align: left;
}
</style>
