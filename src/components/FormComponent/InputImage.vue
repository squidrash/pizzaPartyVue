<template>
  <div class="input__image">
    <label for="offer-img"> Изображение</label>
    <transition name="fade">
      <div v-if="isEdit === true" style="margin: 0 0 10px 0">
        <b-form-file
          accept="image/*"
          v-model="file"
          placeholder="Выберите файл или перетащите сюда"
          browse-text="Обзор"
          drop-placeholder="Перетащите сюда"
          @input="setImage"
        ></b-form-file>
      </div>
    </transition>

    <b-img center rounded width="260px" id="offer-img" :src="imagePath"></b-img>
  </div>
</template>

<script>
export default {
  name: "InputImage",
  props: {
    value: {
      type: File,
    },
    imagePath: {
      type: String,
    },
    isEdit: {
      type: Boolean,
      reqiured: true,
    },
  },
  computed: {
    file: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    setImage() {
      this.$emit("setImage");
    },
  },
};
</script>

<style>
.input__image {
  display: flex;
  flex-direction: column;
  margin: 0 0 8px 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
