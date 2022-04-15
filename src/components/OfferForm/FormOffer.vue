<template>
  <div class="special_offer__form">
    <b-modal
      id="special-offer-form"
      ref="offer-form-modal"
      title="Форма акции"
      hide-header
      hide-footer
      @show="overlayOff"
      @hidden="resetModal"
    >
      <form novalidate>
        <InputOfferName
          v-model="specialOffer.name"
          :v="$v.specialOffer.name"
          :isEdit="isEdit"
        />

        <TextareaOfferDescription
          v-model="specialOffer.description"
          :v="$v.specialOffer.description"
          :isEdit="isEdit"
        />

        <div class="offer_row">
          <InputOfferPromocode
            class="offer_column"
            v-model="specialOffer.promoCode"
            :v="$v.specialOffer.promoCode"
            :isEdit="isEdit"
          />

          <SelectOfferType
            v-model="specialOffer.typeOffer"
            :v="$v.specialOffer.typeOffer"
            :isEdit="isNewOfferProp"
            @resetType="resetOfferType"
          />
        </div>

        <div v-if="specialOffer.typeOffer === 'GeneralDiscount'">
          <div class="offer_row">
            <InputOfferAmount
              class="offer_column"
              v-model="specialOffer.minOrderAmount"
              :v="$v.specialOffer.minOrderAmount"
              :isEdit="isEdit"
            />
            <InputOfferDiscount
              class="offer_column"
              v-model="specialOffer.discount"
              :v="$v.specialOffer.discount"
              :isEdit="isEdit"
            />
          </div>
        </div>

        <div
          v-if="
            specialOffer.typeOffer === 'ExtraDish' ||
              specialOffer.typeOffer === 'ThreeForPriceTwo'
          "
        >
          <div>
            <label for="main-dish-input"> Основное блюдо</label>
            <div class="offer_row" id="main-dish-input">
              <SelectOfferDish
                class="offer_column offer__select_dish"
                v-model="specialOffer.mainDish"
                :menu="menu"
                :v="$v.specialOffer.mainDish"
                :isEdit="isEdit"
              />

              <InputOfferNumberOfDish
                v-model="specialOffer.requiredNumberOfDish"
                :v="$v.specialOffer.requiredNumberOfDish"
                :isEdit="isEdit"
              />
            </div>
          </div>

          <div>
            <label for="extra-dish-input">Доп блюдо</label>
            <div class="offer_row" id="extra-dish-input">
              <div
                class="offer_column"
                v-if="specialOffer.typeOffer === 'ExtraDish'"
              >
                <SelectOfferDish
                  class="offer_column offer__select_dish"
                  v-model="specialOffer.extraDish"
                  :menu="menu"
                  :v="$v.specialOffer.extraDish"
                  :isEdit="isEdit"
                  :mainDish="specialOffer.mainDish"
                />
              </div>
              <InputOfferNumberOfDish
                v-model="specialOffer.numberOfExtraDish"
                :v="$v.specialOffer.numberOfExtraDish"
                :isEdit="isEdit"
              />
            </div>
          </div>
        </div>

        <InputImage
          class="offer_column"
          v-model="file"
          :isEdit="isEdit"
          :imagePath="imagePath"
          @setImage="setImage()"
        />
      </form>
      <div class="offer__btns" v-if="isEdit === false">
        <div class="offer_btns_remove">
          <ButtonRemove @click.native="handleRemove" />
        </div>
        <div>
          <ButtonEdit @click.native="isEdit = !isEdit" />
        </div>
      </div>

      <div v-if="isEdit === true">
        <FooterButtons @submit="handleSubmit" @cancel="resetModal"
          ><template v-slot:submit v-if="isNewOfferProp === false"
            >Подтвердить</template
          >
          <template v-else v-slot:submit>Добавить</template>
        </FooterButtons>
      </div>
    </b-modal>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";

import { offerValidRules } from "@/Validators/OfferValidRules.js";

import InputOfferName from "../FormComponent/InputName.vue";
import TextareaOfferDescription from "../FormComponent/TextareaDescription.vue";
import InputOfferPromocode from "./InputOfferPromocode.vue";
import SelectOfferType from "./SelectOfferType.vue";
import InputOfferAmount from "./InputOfferAmount.vue";
import InputOfferDiscount from "./InputOfferDiscount.vue";
import SelectOfferDish from "./SelectOfferDishes.vue";
import InputOfferNumberOfDish from "./InputOfferNumberOfDish.vue";
import InputImage from "../FormComponent/InputImage.vue";
import ButtonEdit from "../Buttons/ButtonEdit.vue";
import ButtonRemove from "../Buttons/ButtonRemove.vue";

import FooterButtons from "../Buttons/FooterButtons.vue";

export default {
  components: {
    InputOfferName,
    TextareaOfferDescription,
    InputOfferPromocode,
    SelectOfferType,
    InputOfferAmount,
    InputOfferDiscount,
    SelectOfferDish,
    InputOfferNumberOfDish,
    InputImage,
    ButtonEdit,
    ButtonRemove,
    FooterButtons,
  },
  name: "SpecialOfferForm",
  props: {
    specialOfferProp: Object,
    imagePathProp: String,
    menuProp: Array,
    isEditProp: Boolean,
    isNewOfferProp: Boolean,
  },
  setup: () => ({ $v: useVuelidate() }),
  data() {
    return {
      specialOffer: this.specialOfferProp,
      menu: this.menuProp,

      isEdit: this.isEditProp,
      isDisabled: false,

      imagePath:
        "https://localhost:5001/api/DishImage/getOfferImage?name=default.png",
      showOverlay: true,
      file: null,
    };
  },

  validations() {
    return {
      specialOffer: offerValidRules(this.specialOffer.typeOffer),
    };
  },

  methods: {
    overlayOff() {
      this.showOverlay = false;
      this.isEdit = this.isEditProp;
      if (this.imagePathProp !== "") {
        this.imagePath = this.imagePathProp;
      }
      // console.log("что пришло в пропс");
      // console.log(this.isEditProp);
      // console.log("после присвоения");
      // console.log(this.isEdit);
    },
    getImage() {
      if (this.imagePathProp !== "") {
        this.imagePath = this.imagePathProp;
      }
      this.showOverlay = false;
    },
    setImage() {
      this.imagePath = `https://localhost:5001/api/DishImage/getOfferImage?name=${this.file.name}`;
      this.specialOffer.image = this.file.name;
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
    handleSubmit() {
      this.$v.specialOffer.$touch();
      if (this.$v.specialOffer.$error) return;

      console.log(this.specialOffer);
      this.$emit("submit-offer", this.specialOffer);
      this.$nextTick(() => {
        this.$bvModal.hide("special-offer-form");
      });
    },
    handleRemove() {
      console.log(this.specialOffer.id);
      this.$bvModal.show("modal-confirm");
    },
    resetModal() {
      this.imagePath =
        "https://localhost:5001/api/DishImage/getOfferImage?name=default.png";
      this.showOverlay = true;
      this.file = null;
      this.$v.$reset();
      this.$nextTick(() => {
        this.$bvModal.hide("special-offer-form");
      });
    },
  },
};
</script>

<style>
.special_offer__form {
  color: #495057;
}

.offer_row {
  display: flex;
  /* justify-content: space-between; */
}
.offer_row__item {
  display: flex;
  flex: 0 0 50%;
  /* justify-content: space-between; */
}
.offer_column {
  display: flex;
  /* margin: 0 0 10px 0; */
  flex-direction: column;
  flex: 0 0 50%;
  /* margin-right: 30px; */
}
.offer__btns {
  display: flex;
}
.offer_btns_remove {
  flex: 1 0 auto;
}
.offer__select_dish {
  margin-right: 20px;
}
</style>
