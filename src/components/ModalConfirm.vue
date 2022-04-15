<template>
  <div>
    <b-modal
      id="modal-confirm"
      ref="my-modal"
      size="sm"
      hide-footer
      hide-header
      centered
    >
      <div class="d-block text-center" style="margin-bottom:20px">
        <h4>{{ modalTitle }}</h4>
      </div>
      <b-button variant="outline-success" block @click="submitAction"
        >Подтвердить</b-button
      >
      <b-button
        class="mt-3"
        variant="outline-secondary"
        block
        @click="$bvModal.hide('modal-confirm')"
        >Отмена</b-button
      >
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ModalConfirm",
  props: ["modalTitle"],
  methods: {
    submitAction() {
      this.$emit("submit-action");
      this.$bvModal.hide("modal-confirm");
    },
  },
};
</script>
