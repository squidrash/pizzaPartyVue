<template>
  <div class="special_offer__table">
    <div><b-button @click="addNewOffer">добавить</b-button></div>

    <div v-for="offer in specialOffers" :key="offer.id">
      <SpecialOfferCard :specialOfferProp="offer" @showOffer="showOffer" />
    </div>

    <SpecialOfferForm
      :specialOfferProp="specialOffer"
      :imagePathProp="imagePath"
      :menuProp="menu"
      :isEditProp="isEdit"
      :isNewOfferProp="isNewOffer"
      @submit-offer="submitOffer"
    />
    <ModalConfirm
      modalTitle="Удалить акцию?"
      @submit-action="handleRemoveOffer"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SpecialOfferForm from "./OfferForm/FormOffer.vue";
import SpecialOfferCard from "./SpecialOfferCard.vue";
import ModalConfirm from "./ModalConfirm.vue";

export default {
  name: "SpecialOffersTable",
  components: { SpecialOfferForm, SpecialOfferCard, ModalConfirm },
  data() {
    return {
      specialOffer: {
        id: 0,
        name: "",
        promoCode: "",
        description: "",
        typeOffer: null,
        discount: 0,
        minOrderAmount: 0,
        mainDish: null,
        requiredNumberOfDish: 0,
        extraDish: null,
        numberOfExtraDish: 0,
        image: "",
      },
      imagePath: "",
      // specialOffer: null,
      // image:
      //   "https://localhost:5001/api/DishImage/getOfferImage?name=default.png",
      isEdit: false,
      isNewOffer: false,
    };
  },
  computed: {
    ...mapState("specialOffersM", {
      specialOffers: "specialOffers",
    }),
    ...mapState("menuM", {
      menu: "menu",
    }),
    testIsEdit: {
      get() {
        return this.isEdit;
      },
      set(value) {
        this.isEdit = value;
      },
    },
  },
  filters: {
    type(value) {
      if (!value) return "";
      switch (value) {
        case "ExtraDish":
          return "Доп блюдо";

        case "ThreeForPriceTwo":
          return "1+1=3";

        case "GeneralDiscount":
          return "Скидка";
      }
      return "";
    },
  },
  methods: {
    ...mapActions("specialOffersM", [
      "getSpecialOffers",
      "addOffer",
      "editOffer",
      "removeOffer",
    ]),
    showOffer(offer) {
      // this.$bvModal.show("special-offer-form");
      // console.log(offer);
      // this.specialOffer = offer;
      this.isEdit = false;
      this.isNewOffer = false;
      // this.testIsEdit = false;

      this.specialOffer.id = offer.id;
      this.specialOffer.name = offer.name;
      this.specialOffer.promoCode = offer.promoCode;
      this.specialOffer.description = offer.description;
      this.specialOffer.typeOffer = offer.typeOffer;
      this.specialOffer.discount = offer.discount;
      this.specialOffer.minOrderAmount = offer.minOrderAmount;
      this.specialOffer.mainDish = offer.mainDish;
      this.specialOffer.requiredNumberOfDish = offer.requiredNumberOfDish;
      this.specialOffer.extraDish = offer.extraDish;
      this.specialOffer.numberOfExtraDish = offer.numberOfExtraDish;
      this.specialOffer.image = offer.image;

      if (offer.image !== "") {
        this.imagePath = `https://localhost:5001/api/DishImage/getOfferImage?name=${offer.image}`;
      } else {
        this.imagePath = `https://localhost:5001/api/DishImage/getOfferImage?name=default.png`;
      }

      // console.log(this.specialOffer);
      // this.specialOffer = offer;
      // this.$bvModal.show("special-offer-form");
      this.$nextTick(() => {
        this.$bvModal.show("special-offer-form");
      });
    },
    addNewOffer() {
      this.isEdit = true;
      this.isNewOffer = true;
      // this.testIsEdit = true;

      this.specialOffer.id = 0;
      this.specialOffer.name = "";
      this.specialOffer.promoCode = "";
      this.specialOffer.description = "";
      this.specialOffer.typeOffer = null;
      this.specialOffer.discount = 0;
      this.specialOffer.minOrderAmount = 0;
      this.specialOffer.mainDish = null;
      this.specialOffer.requiredNumberOfDish = 0;
      this.specialOffer.extraDish = null;
      this.specialOffer.numberOfExtraDish = 0;
      this.specialOffer.image = "";

      this.imagePath = "";

      // console.log(this.specialOffer);
      // this.specialOffer = offer;
      this.$nextTick(function() {
        this.$bvModal.show("special-offer-form");
      });
      // this.$bvModal.show("special-offer-form");
    },
    submitOffer(offer) {
      if (this.isNewOffer === true) {
        console.log("добавить акцию");
        this.addOffer(offer);
      } else {
        console.log("изменить акцию");
        this.editOffer(offer);
      }
      console.log(offer);
    },

    handleRemoveOffer() {
      this.$bvModal.hide("special-offer-form");
      this.removeOffer(this.specialOffer.id);
    },
  },
  mounted() {
    this.getSpecialOffers();
  },
};
</script>

<style>
.special_offer__table {
  border: 2px solid red;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.text_input {
  margin: 10px 0 10px 0;
  border: 0px;
  border-bottom: 1px solid #28a;
}
.text_input:disabled {
  border: 1px solid red;
}
</style>
