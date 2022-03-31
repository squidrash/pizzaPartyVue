<template>
  <div class="textarea__description">
    <label for="description-input"> Описание</label>
    <textarea
      id="description-input"
      class=" offer_input__description"
      :disabled="!isEdit"
      v-model.trim="description"
      @blur="v.$touch"
      placeholder="Введите описание"
      rows="3"
      cols="30"
      maxlength="300"
      max-rows="6"
    />
    <small v-if="v.$error">{{ v.$errors[0].$message }}</small>
  </div>
</template>

<script>
export default {
  name: "TextareaDescription",
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
    description: {
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
.textarea__description {
  display: flex;
  flex-direction: column;
  margin: 0 0 8px 0;
}
/* .offer_input__description {
  border: 0px;
  border: 1px solid #28a745;
  resize: none;
  overflow-y: scroll;
  width: 100%;
  min-height: 110px;
  line-height: 1.2;
  padding: 6px 12px;
  border-radius: 4px;
}
.offer_input__description:disabled {
  border: 1px solid rgb(187, 185, 185);
}
.offer_input__description:focus {
  outline-color: #28a745;
} */
</style>
