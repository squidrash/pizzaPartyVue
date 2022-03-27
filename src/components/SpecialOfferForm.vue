<template>
  <div class="special_offer__form">
    <b-modal
      id="special-offer-form"
      ref="offer-form-modal"
      title="Форма акции"
      hide-header
      @hidden="resetModal"
      @ok="handleOk"
    >
      <input
        type="text"
        class="input"
        v-model="specialOffer.name"
        @blur="$v.specialOffer.name.$touch"
      />
      <div v-if="$v.specialOffer.name.$error">
        ошибка в имени
      </div>
      <div v-if="specialOffer.typeOffer === 'ExtraDish'">
        <input type="text" class="input" v-model="specialOffer.mainDish" />
      </div>
      <div v-if="specialOffer.typeOffer === 'GeneralDiscount'">
        <input type="text" class="input" v-model="specialOffer.discount" />
      </div>

      <div v-if="$v.specialOffer.$error">
        Name field has an error.
        <p v-for="error of $v.$errors" :key="error.$uid">
          <strong>{{ error.$validator }}</strong>
          <small> on property</small>
          <strong>{{ error.$property }}</strong>
          <small> says:</small>
          <strong>{{ error.$message }}</strong>
        </p>
      </div>
      <div></div>
      <button @click="testFromValidate">вся форма</button>
      <button @click="testVueLidate">test</button>
      <button @click="isDisabled = !isDisabled">кнопка</button>

      <form ref="offerForm" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Название"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <input
            id="name-input"
            class="offer_input offer_input__name"
            v-model="specialOffer.name"
            placeholder="Введите название акции"
            required
            :disabled="isDisabled"
            type="text"
          />
        </b-form-group>

        <b-form-group
          label="Описание"
          label-for="description-input"
          invalid-feedback="description is required"
        >
          <textarea
            id="description-input"
            class=" offer_input offer_input__description"
            v-model="specialOffer.description"
            placeholder="Введите описание"
            required
            rows="3"
            cols="30"
            maxlength="200"
            max-rows="6"
          ></textarea>
        </b-form-group>

        <div class="offer_inline_info">
          <b-form-group
            label="Промокод"
            label-for="promocode-input"
            invalid-feedback="Name is required"
            :state="promoCodeState"
          >
            <input
              id="promocode-input"
              class="offer_input offer_input__promocode"
              v-model="specialOffer.promoCode"
              placeholder="Введите промокод"
              required
              :disabled="isDisabled"
              type="text"
            />
          </b-form-group>

          <b-form-group label="Тип" label-for="type-input">
            <div v-if="isDisabled === false">
              <select
                id="type-input"
                v-model="specialOffer.typeOffer"
                class="offer_input"
                required
                @change="resetOfferType"
              >
                <option
                  v-for="type in typeOptions"
                  :key="type.value"
                  :value="type.value"
                  :disabled="type.disabled"
                  >{{ type.text }}</option
                >
              </select>
            </div>

            <div v-else class="offer_input__type">
              {{ specialOffer.typeOffer | typeOffer }}
            </div>
          </b-form-group>
        </div>

        <div v-if="specialOffer.typeOffer === 'GeneralDiscount'">
          <div class="offer_inline_info">
            <b-form-group
              label="Необходимая сумма заказа"
              label-for="amount-input"
              invalid-feedback="Price is required"
              :state="orderAmountState"
            >
              <b-form-input
                id="amount-input"
                v-model.number="specialOffer.minOrderAmount"
                placeholder="Введите сумму"
                required
              >
              </b-form-input>
              <input
                id="amount-input"
                class="offer_input"
                type="number"
                v-model.number="specialOffer.minOrderAmount"
                placeholder="Введите сумму"
                required
                min="0"
              />
            </b-form-group>

            <b-form-group
              label="Размер скидки"
              label-for="discount-input"
              invalid-feedback="Price is required"
              :state="discountState"
            >
              <b-form-input
                id="discount-input"
                v-model.number="specialOffer.discount"
                placeholder="Введите % скидки"
                required
              >
              </b-form-input>
              <input
                id="discount-input"
                class="offer_input"
                type="number"
                v-model.number="specialOffer.discount"
                placeholder="Введите % скидки"
                required
                maxlength="2"
                max="20"
                min="0"
              />
              <input
                type="range"
                id="discount-input"
                v-model.number="specialOffer.discount"
                min="0"
                max="20"
                step="1"
              />
            </b-form-group>
          </div>
        </div>

        <div
          v-if="
            specialOffer.typeOffer === 'ExtraDish' ||
              specialOffer.typeOffer === 'ThreeForPriceTwo'
          "
        >
          <b-form-group
            label="Основное блюдо"
            label-for="main-dish-input"
            invalid-feedback="maindish is required"
            :state="mainDishState"
          >
            <select
              id="main-dish-input"
              v-model="specialOffer.mainDish"
              required
            >
              <option value="null" disabled>Выберите блюдо</option>
              <optgroup
                v-for="category in menu"
                :key="category.categoryId"
                :label="category.categoryName"
              >
                <option
                  v-for="dish in category.dishes"
                  :key="dish.id"
                  :value="dish"
                  >{{ dish.productName }}</option
                >
              </optgroup>
            </select>

            <input
              type="number"
              min="1"
              required
              id="main-dish-input"
              v-model="specialOffer.requiredNumberOfDish"
            />
          </b-form-group>

          <b-form-group
            label="Доп блюдо"
            label-for="extra-dish-input"
            invalid-feedback="extradish is required"
            :state="extraDishState"
          >
            <div v-if="specialOffer.typeOffer === 'ExtraDish'">
              <select
                id="extra-dish-input"
                v-model="specialOffer.extraDish"
                required
              >
                <option value="null" disabled>Выберите блюдо</option>
                <optgroup
                  v-for="category in menu"
                  :key="category.categoryId"
                  :label="category.categoryName"
                >
                  <option
                    v-for="dish in category.dishes"
                    :key="dish.id"
                    :value="dish"
                    :disabled="disableExtraDish(dish.id)"
                    >{{ dish.productName }}</option
                  >
                </optgroup>
              </select>
            </div>

            <input
              type="number"
              min="1"
              required
              id="extra-dish-input"
              v-model="specialOffer.numberOfExtraDish"
            />
          </b-form-group>
        </div>

        <div v-if="specialOffer.typeOffer === 'ExtraDish'">
          доп блюдо
        </div>

        <div v-if="specialOffer.typeOffer === 'ThreeForPriceTwo'">
          1+1=3
        </div>

        <b-form-group label="Фоновое изображение" label-for="offer-img">
          <b-overlay :show="showOverlay" rounded="sm">
            <b-img
              rounded
              width="260px"
              id="offer-img"
              :src="imagePath"
            ></b-img>
          </b-overlay>

          <b-form-file
            accept="image/*"
            v-model="file"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            @input="setImage"
          ></b-form-file>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
// import { helpers } from "@vuelidate/validators";

// const discount = (value) => !helpers.req(value) || value >= 0;
const discount = (value) => value > 0 && value <= 20;

// const main_dish = (value) => !helpers.req(value) || value.typeOf(Object);

// const main_dish = (value) => {
//   if (value.typeOf(Object)) {
//     console.log(value);
//     return true;
//   }
//   if (!helpers.req(value)) {
//     console.log(value);
//     return true;
//   }
//   return false;
// };

// const main_dish = (param) = (value) => !helpers.req(value) || value.Length > 1;
// const main_dish = (param) => (value) => {
//   if (!helpers.req(value)) return true;
//   if (param === "ExtraDish") {
//     return value !== null;
//   }
//   return false;
// };
// const main_dish = (param) =>
//   helpers.withParams({ type: "main_dish", value: param }, (value) => {
//     if (!helpers.req(value)) return true;
//     if (param === "ExtraDish") {
//       return value !== null;
//     }
//     return false;
//   });

export default {
  name: "SpecialOfferForm",
  props: { specialOfferProp: Object, menuProp: Array },
  setup: () => ({ $v: useVuelidate() }),
  data() {
    return {
      specialOffer: this.specialOfferProp,
      menu: this.menuProp,

      nameState: null,
      promoCodeState: null,
      orderAmountState: null,
      discountState: null,
      mainDishState: null,
      extraDishState: null,
      isDisabled: false,

      testVuelid: "jkjkjk",

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
      imagePath:
        "https://localhost:5001/api/DishImage/getOfferImage?name=default.png",
      showOverlay: true,
      file: null,
    };
  },
  computed: {
    validRules() {
      let result = new Object();
      result.name = { required };
      result.promoCode = { required };
      result.description = { required };
      result.typeOffer = { required };

      if (this.specialOffer.typeOffer === "GeneralDiscount") {
        // return { discount: { required, discount } };
        result.discount = { required, discount };
        result.minOrderAmount = { required };
      }
      if (
        this.specialOffer.typeOffer === "ExtraDish" ||
        this.specialOffer.typeOffer === "ThreeForPriceTwo"
      ) {
        // return { mainDish: { required } };
        result.mainDish = { required };
        result.requiredNumberOfDish = { required };
        result.numberOfExtraDish = { required };
        result.extraDish = { required };
      }
      // return { name: { required } };
      return result;
    },
  },
  // validations: {
  //   specialOffer: {
  //     name: { required },
  //     mainDish: { required },
  //     discount: { required },
  //   },
  // },
  validations() {
    return {
      specialOffer: this.validRules,
    };
  },
  filters: {
    typeOffer(value) {
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
    async testFromValidate() {
      const isFormCorrect = await this.$v.$validate();
      // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
      if (this.$v.specialOffer.$error) return alert("Error");
      // to form submit after this
      alert("Form submitted");
      if (!isFormCorrect) return;
    },
    testVueLidate() {
      // const isFormCorrect = await this.$v.$validate();
      this.$v.specialOffer.$touch();
      // console.log(this.$v.specialOffer.name);
      console.log(this.$v.specialOffer);
      // console.log(this.$v);
      if (this.$v.specialOffer.$error) return alert("Error");
      // to form submit after this
      alert("Form submitted");
    },

    disableExtraDish(dishId) {
      if (this.specialOffer.mainDish !== null) {
        return this.specialOffer.mainDish.id === dishId;
      }
      return false;
    },
    test() {
      console.log("specialOffer");
      console.log(this.specialOffer);
      console.log(`specialOfferProp`);
      console.log(this.specialOfferProp);
      // this.specialOffer = this.specialOfferProp;
    },
    getImage() {
      if (this.imagePathProp !== "") {
        this.imagePath = this.imagePathProp;
      }
      this.showOverlay = false;
    },
    setImage() {
      this.imagePath = `https://localhost:5001/api/DishImage/getOfferImage?name=${this.file.name}`;
    },
    async resetOfferType() {
      console.log("resetOfferType");
      this.specialOffer.mainDish = null;
      this.specialOffer.requiredNumberOfDish = 0;
      this.specialOffer.extraDish = null;
      this.specialOffer.numberOfExtraDish = 0;
      this.specialOffer.minOrderAmount = 0;
      this.specialOffer.discount = 0;
      await this.$v.$reset();
    },
    checkFormValidity() {
      const valid = this.$refs.offerForm.checkValidity();
      this.nameState = valid;
      this.promoCodeState = valid;
      this.orderAmountState = valid;
      this.discountState = valid;
      this.mainDishState = valid;
      this.extraDishState = valid;

      return valid;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }

      this.specialOffer;
      console.log(this.specialOffer);
      // this.$emit("submit-dish", this.dish);
      this.$nextTick(() => {
        this.$bvModal.hide("special-offer-form");
      });
    },
    resetModal() {
      this.nameState = null;
      this.promoCodeState = null;
      this.orderAmountState = null;
      this.discountState = null;
      this.mainDishState = null;
      this.extraDishState = null;
      this.imagePath =
        "https://localhost:5001/api/DishImage/getOfferImage?name=default.png";
      this.showOverlay = true;
      this.file = null;
    },
  },
};
</script>

<style>
.special_offer__form {
  color: #495057;
}
.offer_inline_info {
  display: flex;
  justify-content: space-between;
}
.offer_input {
  margin: 10px 0 10px 0;
  border: 0px;
  border-bottom: 1px solid #28a;
  border-radius: 0px;
  width: 100%;
  color: #495057;
}
.offer_input:disabled {
  border: 0px;
  border-bottom: 1px solid #ffffff;
  /* color: black; */

  background-color: #ffff;
}
.offer_input:focus {
  /* outline-color: #007bff; */
  box-shadow: 0 0 100px #5515d7;
}

.offer_input__promocode {
  max-width: 120px;
}
.offer_input__type {
  border: 1px solid #ffffff;
  width: 151px;
  height: 38px;
  padding: 6px 28px 6px 12px;
  outline-color: rgb(111, 164, 31);
  margin: 18px 0 10px 0;
}
.offer_input__description {
  resize: none;
  /* overflow-y: scroll; */
  width: 100%;
  /* height: 86px; */
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  /* color: #495057; */
}
input[type="range"] {
  background-color: green;
}
</style>
