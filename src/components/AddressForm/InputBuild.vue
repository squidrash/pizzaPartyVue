<template>
  <div class="flexbox_column">
    <input
      :class="[{ form_item__error: v.$error }, addressBuild]"
      type="text"
      v-model.number="build"
    />
  </div>
</template>

<script>
export default {
  name: "InputStreet",
  props: {
    value: { String },
    v: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { addressBuild: "address_build" };
  },
  computed: {
    build: {
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
.address_build {
  max-width: 70px;
  /* text-align: right; */
}
</style>
