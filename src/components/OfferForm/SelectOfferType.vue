<template>
  <div class="select__offer_type">
    <label for="type-input"> Тип</label>
    <div v-if="isEdit === true" class="select__offer_type_item">
      <select
        id="type-input"
        v-model="typeOffer"
        :disabled="!isEdit"
        @change="resetType"
        @blur="v.$touch"
        style="max-width: 150px"
      >
        <option
          v-for="type in typeOptions"
          :key="type.value"
          :value="type.value"
          :disabled="type.disabled"
          >{{ type.text }}</option
        >
      </select>
      <small v-if="v.$error">{{ v.$errors[0].$message }}</small>
    </div>

    <div v-else class=" select__offer_type_disabled">
      {{ typeOffer | typeOfferFilter }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectOfferType",
  props: {
    value: {
      type: String,
      default: null,
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
  data() {
    return {
      typeOptions: [
        {
          value: null,
          text: "Выберите тип",
          disabled: true,
        },
        {
          value: "GeneralDiscount",
          text: "Общая скидка",
          disabled: false,
        },
        {
          value: "ExtraDish",
          text: "Доп блюдо",
          disabled: false,
        },
        {
          value: "ThreeForPriceTwo",
          text: "1+1=3",
          disabled: false,
        },
      ],
    };
  },
  computed: {
    typeOffer: {
      get() {
        return this.value;
      },
      set(value) {
        this.v.$touch();
        this.$emit("input", value);
      },
    },
  },
  filters: {
    typeOfferFilter(value) {
      if (!value) return "";
      switch (value) {
        case "GeneralDiscount":
          return "Общая скидка";

        case "ExtraDish":
          return "Доп блюдо";

        case "ThreeForPriceTwo":
          return "1+1=3";
      }
    },
  },
  methods: {
    resetType() {
      this.$emit("resetType");
    },
  },
};
</script>

<style>
.select__offer_type {
  display: flex;
  /* flex-direction: column; */
  margin: 0 0 8px 0;
}
.select__offer_type_item {
  display: flex;
  flex-direction: column;
}
.select__offer_type_disabled {
  border: 1px solid #ffffff;
  padding: 0 0 0 3px;
  width: 129px;
  height: 27px;
  color: #495057;
  /* padding: 6px 28px 6px 12px; */
  /* outline-color: rgb(111, 164, 31); */
  /* margin: 18px 0 10px 0; */
}
</style>
