<template>
  <div>
    <label for="">Доставка</label>

    <b-form-group>
      <b-form-radio-group id="radio-group-2" v-model="isDelivery">
        <b-form-radio value="pickup">
          Ресторан
        </b-form-radio>
        <b-form-radio value="delivery">
          По адресу
        </b-form-radio>
      </b-form-radio-group>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "RadioBtnDelivery",
  props: { value: String },
  computed: {
    isDelivery: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
