<template>
  <div>
    <b-modal
      id="order-status-form"
      title="Изменить статус"
      size="sm"
      centered
      hide-footer
      @hidden="resetModal"
    >
      <SelectOrderStatus v-model="selected" />
      <FooterButtons
        @submit="handleSubmit"
        @cancel="$bvModal.hide('order-status-form')"
      >
        <template v-slot:submit>
          Подтвердить
        </template>
      </FooterButtons>
    </b-modal>
  </div>
</template>

<script>
import SelectOrderStatus from "./SelectOrderStatus.vue";
import FooterButtons from "/src/components/Buttons/FooterButtons.vue";
import { mapState, mapActions } from "vuex";

import { createHelpers } from "vuex-map-fields";
const { mapFields } = createHelpers({
  getterType: "ordersM/getField",
  mutationType: "ordersM/updateField",
});

export default {
  components: { SelectOrderStatus, FooterButtons },
  data() {
    return {
      options: [
        {
          value: "New",
          text: "Новый",
        },
        {
          value: "Confirmed",
          text: "Подтвержден",
        },
        {
          value: "Preparing",
          text: "Готовится",
        },
        {
          value: "OnTheWay",
          text: "В пути",
        },
        {
          value: "Delivered",
          text: "Доставлен",
        },
        {
          value: "Cancelled",
          text: "Отменен",
        },
      ],
    };
  },
  computed: {
    ...mapState("ordersM", ["orderId", "orderStatus"]),
    ...mapFields({
      selected: "orderStatus",
    }),
  },
  methods: {
    async handleSubmit() {
      const order = {
        id: this.orderId,
        newStatus: this.orderStatus,
      };
      const result = await this.changeStatus(order);
      if (result.status !== 200) {
        this.$emit("handle-error", result.response.data);
        return;
      }

      this.$nextTick(() => {
        this.$bvModal.hide("order-status-form");
      });
    },
    resetModal() {
      this.changeOrderStatusStorage(null);
      this.setOrderId(null);
    },
    ...mapActions("ordersM", [
      "changeOrderStatusStorage",
      "setOrderId",
      "changeStatus",
    ]),
  },
};
</script>
