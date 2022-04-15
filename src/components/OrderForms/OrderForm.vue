<template>
  <div>
    <b-modal
      id="order-form"
      @hidden="resetModal"
      centered
      hide-header
      hide-footer
    >
      <div class="order_form__block">
        <RadioBtnDelivery
          v-model="deliveryMethod"
          @change.native="resetAddress"
        />
        <div v-if="deliveryMethod === 'delivery'">
          <div v-if="addressConfirmed === false">
            <div class="flexbox_row">
              <SelectCity
                class="order_form__address"
                v-model="address.city"
                :v="$v.address.city"
              />
              <InputStreet
                class="order_form__address"
                v-model="address.street"
                :v="$v.address.street"
              />
            </div>
            <div class="flexbox_row">
              <div class="flexbox_row_expanded">
                д.
                <InputBuild
                  class="order_form__address"
                  v-model="address.numberOfBuild"
                  :v="$v.address.numberOfBuild"
                />

                п.
                <InputBuild
                  class="order_form__address"
                  v-model="address.numberOfEntrance"
                  :v="$v.address.numberOfEntrance"
                />

                кв.
                <InputBuild
                  class="order_form__address "
                  v-model="address.apartment"
                  :v="$v.address.apartment"
                />
              </div>

              <button class="green_btn" @click="findAddress">
                Подтвердить
              </button>
            </div>
          </div>
          <div
            v-else
            class="order_form__address
            order_form__address_selected"
            @click="addressConfirmed = false"
          >
            г. {{ address.city }}, ул. {{ address.street }}, д.
            {{ address.numberOfBuild }}
            <template v-if="address.numberOfEntrance !== ''">
              , п. {{ address.numberOfEntrance }}, кв. {{ address.apartment }}
            </template>
          </div>
        </div>
      </div>

      <div class=" order_form__block">
        <div class="flexbox_row">
          <div class="flexbox_row_expanded">
            <SelectDishes
              class="order_form__dish_item"
              v-model="selectedDish"
              :menu="menu"
              :v="$v.selectedDish"
            />

            <input
              :class="{
                order_form__dish_item: true,
                order_form__dish_quantity: true,
                form_item__error: $v.quantity.$error,
              }"
              type="text"
              v-model.number="quantity"
            />
          </div>

          <button class="  green_btn" @click="addDish">
            добавить <b-icon icon="bag-plus" />
          </button>
        </div>
      </div>
      <div class="order_form__block" v-if="$v.dishes.$error">
        <small v-for="error in $v.dishes.$errors" :key="error.$uid">{{
          error.$message
        }}</small>
      </div>

      <div class="order_form__block" v-if="dishes.length">
        <div class="flexbox_row" v-for="(dish, index) in dishes" :key="dish.id">
          <div class="order_form__dish_item order_form__dish_name">
            {{ dish.productName }}
          </div>

          <b-form-spinbutton
            class="order_form__dish_item "
            style="width: 8rem; height:29px"
            size="sm"
            v-model.number="dish.quantity"
            @change="countTotalSum"
            min="1"
            max="100"
          />
          <div class="order_form__dish_item order_form__dish_price ">
            {{ dish.quantity * dish.price }} ₽
          </div>
          <button
            class="order_form__dish_item order_form__dish_btn_remove"
            @click="removeDish(index)"
          >
            <b-icon icon="x" />
          </button>
        </div>
      </div>
      <div class="flexbox_row">
        <div class="order_form__dish_total">Итого:</div>
        <div class="order_form__dish_sum">{{ totalSum }} ₽</div>
      </div>
      <FooterButtons @submit="handleOk" @cancel="$bvModal.hide('order-form')">
        <template v-slot:submit>
          Оформить заказ
        </template>
      </FooterButtons>
      <AlertModal :message="formErrorMessage" />
      <ModalConfirm
        modalTitle="Подтвердить заказ?"
        @submit-action="handleSubmit"
      />
    </b-modal>
  </div>
</template>

<script>
import pizzaApi from "../../api/pizzaApi";

import { mapActions } from "vuex";

import useVuelidate from "@vuelidate/core";
import {
  addressValidRules,
  dishesValidRules,
  quantityValidRules,
} from "@/Validators/OrderValidRules";

import AlertModal from "../AlertErrorModal.vue";
import RadioBtnDelivery from "../AddressForm/RadioBtnDelivery.vue";
import SelectCity from "../AddressForm/SelectCity.vue";
import InputStreet from "../AddressForm/InputStreet.vue";
import InputBuild from "../AddressForm/InputBuild.vue";
import SelectDishes from "../FormComponent/SelectDishes.vue";
import FooterButtons from "../Buttons/FooterButtons.vue";
import ModalConfirm from "../ModalConfirm.vue";
export default {
  name: "OrderForm",
  components: {
    AlertModal,
    RadioBtnDelivery,
    SelectCity,
    InputStreet,
    InputBuild,
    SelectDishes,
    FooterButtons,
    ModalConfirm,
  },
  props: {
    menu: {
      type: Array,
      reqiured: true,
    },
  },
  setup: () => ({ $v: useVuelidate() }),
  data() {
    return {
      selectedDish: null,
      quantity: 1,
      dishes: [],
      totalSum: 0,
      deliveryMethod: "pickup",
      address: {
        city: "",
        street: "",
        numberOfBuild: "",
        numberOfEntrance: "",
        apartment: "",
      },
      addressId: 0,
      addressConfirmed: false,
      formErrorMessage: "",
    };
  },
  validations() {
    return {
      address: addressValidRules(),
      dishes: dishesValidRules(),
      selectedDish: dishesValidRules(),
      quantity: quantityValidRules(),
    };
  },

  methods: {
    ...mapActions("ordersM", ["postNewOrder"]),
    test() {
      console.log(this.address);
    },
    countTotalSum() {
      let result = 0;

      for (let dish of this.dishes) {
        result += dish.quantity * dish.price;
      }

      this.totalSum = result;
    },
    addDish() {
      this.$v.selectedDish.$touch();
      this.$v.quantity.$touch();
      if (this.$v.selectedDish.$error || this.$v.quantity.$error) return;

      let index = this.dishes.findIndex((x) => x.id === this.selectedDish.id);

      if (index === -1) {
        let dish = new Object();
        dish = this.selectedDish;
        dish.quantity = this.quantity;
        this.dishes.push(dish);
      } else {
        this.dishes[index].quantity += this.quantity;
      }

      this.countTotalSum();

      this.selectedDish = null;
      this.quantity = 1;
      this.$v.selectedDish.$reset();
    },
    async removeDish(index) {
      await this.dishes.splice(index, 1);
      this.countTotalSum();
    },
    async findAddress() {
      this.$v.address.$touch();
      if (this.$v.address.$error) {
        return;
      }

      const result = await pizzaApi.address.findAddress(this.address);
      if (result.status !== 200) {
        this.formErrorMessage = "Адрес не найден";
        this.$bvModal.show("alert-modal");
        return;
      }
      this.formErrorMessage = "";
      this.addressConfirmed = true;
      this.addressId = result.data.id;
      console.log(this.addressId);
    },

    handleOk() {
      if (this.deliveryMethod === "delivery") {
        this.$v.address.$touch();
      }
      this.$v.dishes.$touch();

      if (this.$v.$errors.length) return;

      this.$bvModal.show("modal-confirm");
    },
    handleSubmit() {
      let order = {
        dishes: this.dishes,
        addressId: this.addressId,
      };
      this.postNewOrder(order);
      this.$bvModal.hide("order-form");
    },
    resetAddress() {
      this.address = {
        city: "",
        street: "",
        numberOfBuild: "",
        numberOfEntrance: "",
        apartment: "",
      };
      this.addressId = 0;
      this.$v.address.$reset();
    },
    resetModal() {
      this.$v.$reset();
      this.selectedDish = null;
      this.quantity = 1;
      this.dishes = [];
      this.totalSum = 0;
      this.deliveryMethod = "pickup";
      this.resetAddress();
      this.addressConfirmed = false;
      this.formErrorMessage = "";
      // this.$bvModal.hide('order-form')
    },
  },
};
</script>

<style>
.order_form__block {
  border-bottom: 1px solid grey;
  margin: 0 0 20px 0;
}

.order_form__dish_item {
  margin: 0 10px 10px 0;
}
.order_form__dish_select {
  max-width: 250px;
}
.order_form__dish_quantity {
  max-width: 50px;
}

.order_form__dish_name {
  flex: 1 0 auto;
}
.order_form__dish_price {
  width: 80px;
  text-align: right;
}
.order_form__dish_btn_remove {
  width: 24px;
  height: 24px;
  padding: 0;
  margin: 0 0 5px 0;
  background-color: #fff;
  border: 0;
  max-width: 50px;
  border-radius: 4px;
}
.order_form__dish_total {
  flex: 1 0 auto;
}
.order_form__dish_sum {
  margin: 0 34px 5px 0;
}
.order_form__dish_btn_remove:hover {
  background-color: rgb(234, 232, 232);
}

.order_form__address {
  margin: 0 10px 10px 0;
}
.order_form__address_selected {
  border-bottom: 1px solid #fff;
}
.order_form__address_selected:hover {
  border-bottom: 1px solid #28a745;
}
</style>
