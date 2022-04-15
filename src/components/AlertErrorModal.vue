<template>
  <div>
    <b-modal
      id="alert-modal"
      title="Ошибка"
      header-bg-variant="warning"
      hide-footer
    >
      <div>{{ message }}</div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "AlertModal",
  props: {
    message: { String },
  },
};
</script>

<style lang="scss" scoped></style>
