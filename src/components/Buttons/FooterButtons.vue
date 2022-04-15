<template>
  <div class="footer__btns_block">
    <div style="flex: 1 0 auto">
      <button
        @click="cancel"
        class="footer__btn footer__btn_cancel"
        variant="danger"
      >
        <slot name="cancel">Отмена</slot>
      </button>
    </div>

    <div>
      <button @click="submit" class="footer__btn footer__btn_submit">
        <slot name="submit">ОК</slot>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterButtons",
  methods: {
    submit() {
      this.$emit("submit");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style>
.footer__btns_block {
  display: flex;
  margin-top: 20px;
}
.footer__btn {
  height: 35px;
  min-width: 40px;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  border: 0px;
  transition: 0.15s;
}
/* .footer__btn:hover {
  box-shadow: 0 0 0 0.2em #28a74684;
} */
.footer__btn_cancel {
  background-color: rgba(200, 35, 51);
  /* box-shadow: 0 0 0 0.2em rgba(200, 35, 51, 0.5); */
}
.footer__btn_cancel:hover {
  background-color: rgba(200, 35, 51);
  box-shadow: 0 0 0 0.2em rgba(200, 35, 51, 0.5);
}
.footer__btn_submit {
  background-color: #28a745;
}
.footer__btn_submit:hover {
  box-shadow: 0 0 0 0.2em rgba(40, 167, 70, 0.5);
}
</style>
