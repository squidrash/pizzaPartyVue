<template>
  <div class="input__offer_promocode">
    <div style="display:flex">
      <label for="promocode-input">Промокод</label>
      <input
        id="promocode-input"
        :class="classObj"
        v-model.trim="promocode"
        @blur="v.$touch()"
        placeholder="Введите код"
        :disabled="!isEdit"
        maxlength="10"
        type="text"
        style="max-width: 110px"
      />
    </div>

    <small v-if="v.$error">{{ v.$errors[0].$message }}</small>
  </div>
</template>

<script>
export default {
  name: "InputOfferPromocode",
  props: {
    value: {
      type: String,
      default: "",
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
    promocode: {
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
        input__offer_promocode: true,
      };
    },
  },
};
</script>

<style>
.input__offer_promocode {
  display: flex;
  flex: 0 0 50%;
  /* flex-direction: column; */
  margin: 0 0 8px 0;
}
</style>
