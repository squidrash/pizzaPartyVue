<template>
  <div>
    <b-modal
      id="customer-form"
      title="Форма пользователя"
      @hidden="resetModal"
      hide-header
      hide-footer
    >
      <InputName
        labelName="Имя"
        placeholder="Введите имя"
        v-model="customer.name"
        :v="$v.customer.name"
        :isEdit="true"
      />
      <InputName
        labelName="Фамилия"
        placeholder="Введите фамилию"
        v-model="customer.lastName"
        :v="$v.customer.lastName"
        :isEdit="true"
      />
      <InputPhone v-model="customer.phone" :v="$v.customer.phone" />
      <FooterButtons @submit="handleOk" @cancel="$bvModal.hide('customer-form')"
        ><template v-slot:submit>Подтвердить</template></FooterButtons
      >
    </b-modal>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { customerValidRules } from "@/Validators/CustomerValidRules";

import InputName from "@/components/FormComponent/InputName";
import InputPhone from "@/components/FormComponent/InputPhone";
import FooterButtons from "@/components/Buttons/FooterButtons";
export default {
  props: { customerProp: Object },
  components: { InputName, InputPhone, FooterButtons },
  setup: () => ({ $v: useVuelidate() }),
  data() {
    return { customer: this.customerProp };
  },
  validations() {
    return {
      customer: customerValidRules(),
    };
  },
  methods: {
    handleOk() {
      this.$v.customer.$touch();

      if (this.$v.customer.$error) return;
      this.$emit("oks", this.customer);
      this.$bvModal.hide("customer-form");
    },
    resetModal() {
      this.$v.$reset();
    },
  },
};
</script>
