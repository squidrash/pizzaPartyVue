<template>
  <div class="special_offer__form">
    <b-modal
      id="special-offer-form"
      ref="offer-form-modal"
      title="Форма акции"
      hide-header
      @show="overlayOff"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <button @click="testFromValidate">вся форма</button>
      <button @click="testVueLidate">test</button>
      <button @click="isDisabled = !isDisabled">активно/неактивно</button>

      <form ref="offerForm" @submit.stop.prevent="handleSubmit" novalidate>
        <div class="offer_column">
          <label for="name-input">Название</label>
          <input
            id="name-input"
            type="text"
            class="offer_input offer_input__name"
            v-model.trim="specialOffer.name"
            placeholder="Введите название акции"
            :disabled="!isEdit"
            @blur="$v.specialOffer.name.$touch"
          />
          <div v-if="$v.specialOffer.name.$error">
            <small>{{ $v.specialOffer.name.$errors[0].$message }}</small>
          </div>
        </div>

        <div class="offer_column">
          <label for="description-input"> Описание</label>
          <textarea
            id="description-input"
            class=" offer_input offer_input__description"
            :disabled="isDisabled"
            v-model.trim="specialOffer.description"
            @blur="$v.specialOffer.description.$touch"
            placeholder="Введите описание"
            rows="3"
            cols="30"
            maxlength="200"
            max-rows="6"
          ></textarea>
          <div v-if="$v.specialOffer.description.$error">
            <small>{{ $v.specialOffer.description.$errors[0].$message }}</small>
          </div>
        </div>

        <div class="offer_row">
          <div class="offer_column">
            <label for="promocode-input">Промокод</label>
            <input
              id="promocode-input"
              class="offer_input offer_input__promocode"
              v-model.trim="specialOffer.promoCode"
              @blur="$v.specialOffer.promoCode.$touch"
              placeholder="Введите промокод"
              :disabled="isDisabled"
              type="text"
            />
            <div v-if="$v.specialOffer.promoCode.$error">
              <small>{{ $v.specialOffer.promoCode.$errors[0].$message }}</small>
            </div>
          </div>

          <div class="offer_column">
            <label for="type-input"> Тип</label>
            <div v-if="isDisabled === false">
              <select
                id="type-input"
                v-model="specialOffer.typeOffer"
                class="offer_input"
                :disabled="isDisabled"
                @change="resetOfferType"
                @blur="$v.specialOffer.typeOffer.$touch"
              >
                <option
                  v-for="type in typeOptions"
                  :key="type.value"
                  :value="type.value"
                  :disabled="type.disabled"
                  >{{ type.text }}</option
                >
              </select>
              <div v-if="$v.specialOffer.typeOffer.$error">
                <small>{{
                  $v.specialOffer.typeOffer.$errors[0].$message
                }}</small>
              </div>
            </div>

            <div v-else class="offer_input offer_input__type">
              {{ specialOffer.typeOffer | typeOffer }}
            </div>
          </div>
        </div>

        <div v-if="specialOffer.typeOffer === 'GeneralDiscount'">
          <div class="offer_row">
            <div class="offer_column">
              <label for="offer_input">Минимальная сумма заказ</label>
              <input
                id="amount-input"
                class="offer_input"
                :disabled="isDisabled"
                type="text"
                v-model.number="specialOffer.minOrderAmount"
                @blur="$v.specialOffer.minOrderAmount.$touch"
                placeholder="Введите сумму"
                min="0"
              />
              <div v-if="$v.specialOffer.minOrderAmount.$error">
                <small>{{
                  $v.specialOffer.minOrderAmount.$errors[0].$message
                }}</small>
              </div>
            </div>

            <div class="offer_column">
              <label for="discount-input"> Размер скидки</label>
              <input
                id="discount-input"
                class="offer_input"
                :disabled="isDisabled"
                type="text"
                v-model.number="specialOffer.discount"
                @blur="$v.specialOffer.discount.$touch"
                placeholder="Введите % скидки"
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
              <div v-if="$v.specialOffer.discount.$error">
                <small>{{
                  $v.specialOffer.discount.$errors[0].$message
                }}</small>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="
            specialOffer.typeOffer === 'ExtraDish' ||
              specialOffer.typeOffer === 'ThreeForPriceTwo'
          "
        >
          <div class="offer_column">
            <label for="main-dish-input"> Основное блюдо</label>
            <div class="offer_row">
              <div class="offer_column">
                <div v-if="isDisabled === false">
                  <select
                    id="main-dish-input"
                    class="offer_input"
                    :disabled="isDisabled"
                    v-model="specialOffer.mainDish"
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

                  <div v-if="$v.specialOffer.mainDish.$error">
                    <small>{{
                      $v.specialOffer.mainDish.$errors[0].$message
                    }}</small>
                  </div>
                </div>
                <div v-else class="offer_input offer_input__select_dish">
                  {{ specialOffer.mainDish.productName }}
                </div>
              </div>

              <div class="offer_column">
                <div>
                  <input
                    type="text"
                    class="offer_input offer_input__quantity"
                    :disabled="isDisabled"
                    min="1"
                    id="main-dish-number-input"
                    v-model.number="specialOffer.requiredNumberOfDish"
                    @blur="$v.specialOffer.requiredNumberOfDish.$touch"
                  />
                  <label for="main-dish-number-input">шт</label>
                </div>

                <div v-if="$v.specialOffer.requiredNumberOfDish.$error">
                  <small>{{
                    $v.specialOffer.requiredNumberOfDish.$errors[0].$message
                  }}</small>
                </div>
              </div>
            </div>
          </div>

          <div class="offer_column">
            <label for="extra-dish-input">Доп блюдо</label>
            <div class="offer_row">
              <div
                class="offer_column"
                v-if="specialOffer.typeOffer === 'ExtraDish'"
              >
                <div v-if="isDisabled === false">
                  <select
                    id="extra-dish-input"
                    class="offer_input"
                    :disabled="isDisabled"
                    v-model="specialOffer.extraDish"
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
                  <div v-if="$v.specialOffer.extraDish.$error">
                    <small>{{
                      $v.specialOffer.extraDish.$errors[0].$message
                    }}</small>
                  </div>
                </div>
                <div v-else class="offer_input offer_input__select_dish">
                  {{ specialOffer.extraDish.productName }}
                </div>
              </div>

              <div class="offer_column">
                <div>
                  <input
                    type="text"
                    class="offer_input offer_input__quantity"
                    :disabled="isDisabled"
                    min="1"
                    id="extra-dish-number-input"
                    v-model.number="specialOffer.numberOfExtraDish"
                    @blur="$v.specialOffer.numberOfExtraDish.$touch"
                  />
                  <label for="extra-dish-number-input">шт</label>
                </div>

                <div v-if="$v.specialOffer.numberOfExtraDish.$error">
                  <small>{{
                    $v.specialOffer.numberOfExtraDish.$errors[0].$message
                  }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label for="offer-img"> Изображение</label>
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
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  helpers,
  required,
  numeric,
  minValue,
  maxValue,
  integer,
  alphaNum,
} from "@vuelidate/validators";
// import { helpers } from "@vuelidate/validators";

// const discount = (value) => !helpers.req(value) || value >= 0;
// const discount = (value) => value > 0 && value <= 20;
// const quantity = (value) => value > 0 && value <= 10;
// const minOrderAmount = value;

export default {
  name: "SpecialOfferForm",
  props: { specialOfferProp: Object, menuProp: Array, isEditProp: Boolean },
  setup: () => ({ $v: useVuelidate() }),
  data() {
    return {
      specialOffer: this.specialOfferProp,
      menu: this.menuProp,

      isEdit: this.isEditProp,
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
      result.name = {
        required: helpers.withMessage("Введите название", required),
      };
      result.promoCode = {
        required: helpers.withMessage("Введите промокод", required),
        alphaNum: helpers.withMessage(
          "промокод не должен содержать знаки",
          alphaNum
        ),
      };
      result.description = {
        required: helpers.withMessage("Введите описание", required),
      };
      result.typeOffer = {
        required: helpers.withMessage("Выберите тип акции", required),
      };

      if (this.specialOffer.typeOffer === "GeneralDiscount") {
        result.discount = {
          required: helpers.withMessage("Введите размер скидки", required),
          numeric: helpers.withMessage("Введите число", numeric),
          minValue: helpers.withMessage(
            () => "Минимальное значение 1",
            minValue(1)
          ),
          maxValue: helpers.withMessage(
            () => "максимальное значение 20",
            maxValue(20)
          ),
        };
        result.minOrderAmount = {
          required: helpers.withMessage(
            "Введите минимальную сумму заказа",
            required
          ),
          numeric: helpers.withMessage("Введите число", numeric),
          minValue: helpers.withMessage(
            () => "Минимальное значение 1",
            minValue(1)
          ),
        };
      }
      if (
        this.specialOffer.typeOffer === "ExtraDish" ||
        this.specialOffer.typeOffer === "ThreeForPriceTwo"
      ) {
        // return { mainDish: { required } };
        result.mainDish = {
          required: helpers.withMessage("Выберите блюдо", required),
        };
        result.requiredNumberOfDish = {
          required: helpers.withMessage("Введите количество блюд", required),
          numeric: helpers.withMessage("Введите число", numeric),
          minValue: helpers.withMessage(
            () => "Минимальное значение 1",
            minValue(1)
          ),
          integer: helpers.withMessage("Число должно быть целым", integer),
        };
        result.numberOfExtraDish = {
          required: helpers.withMessage("Введите количество блюд", required),
          numeric: helpers.withMessage("Введите число", numeric),
          minValue: helpers.withMessage(
            () => "Минимальное значение 1",
            minValue(1)
          ),
          integer: helpers.withMessage("Число должно быть целым", integer),
        };
        result.extraDish = {
          required: helpers.withMessage("Выберите блюдо", required),
        };
      }
      return result;
    },
  },
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
    overlayOff() {
      this.showOverlay = false;
      this.isEdit = this.isEditProp;
      console.log("что пришло в пропс");
      console.log(this.isEditProp);
      console.log("после присвоения");
      console.log(this.isEdit);
    },
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
p {
  margin: 0px;
}
small {
  color: red;
}
/* input[type="text"] {
  margin: 0 0 10px 0;
} */
/* select {
  margin: 0 0 10px 0;
} */
.special_offer__form {
  color: #495057;
}

.offer_row {
  display: flex;
  /* justify-content: space-between; */
}
.offer_column {
  display: flex;
  margin: 0 0 10px 0;
  flex-direction: column;
  flex: 0 0 50%;
  /* margin-right: 30px; */
}
.offer_input {
  /* padding: 0px; */
  height: 27px;
  margin: 0 0 5px 0;
  border: 0px;
  border-bottom: 1px solid #28a745;
  border-radius: 0px;
  width: 100%;
  color: #495057;
}
.offer_input:disabled {
  border: 0px;
  border-bottom: 1px solid #ffffff;
  color: #495057;
  /* color: black; */

  background-color: #ffff;
}
.offer_input:focus {
  outline-color: #00ff51;
  box-shadow: 0 0 100px #5515d7;
}
.offer_input__quantity {
  width: 50px;
  text-align: left;
}

.offer_input__promocode {
  max-width: 120px;
}
.offer_input__type {
  border: 1px solid #ffffff;
  padding: 0 0 0 3px;
  width: 129px;
  height: 27px;
  /* padding: 6px 28px 6px 12px; */
  /* outline-color: rgb(111, 164, 31); */
  /* margin: 18px 0 10px 0; */
}
.offer_input__select_dish {
  border: 1px solid #ffffff;
  padding: 0 0 0 3px;
  width: 129px;
  height: 27px;
  /* padding: 6px 28px 6px 12px; */
  /* outline-color: rgb(111, 164, 31); */
  /* margin: 18px 0 10px 0; */
}
.offer_input__description {
  resize: none;
  /* overflow-y: scroll; */
  width: 100%;
  /* min-height: 50px; */
  overflow: hidden;
  min-height: 110px;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #28a745;
  /* color: #495057; */
}
.offer_input__description:disabled {
  border: 1px solid #fff;
}
input[type="range"] {
  background-color: green;
}
</style>
