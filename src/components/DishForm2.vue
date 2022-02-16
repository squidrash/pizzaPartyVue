<template>
  <div>
    <b-modal
      id="dish-form2"
      ref="modal"
      title="Форма блюда"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Категория" label-for="category-input">
          <b-form-select
            id="category-input"
            v-model="dishProp.category.id"
            class="mb-3"
          >
            <b-form-select-option
              v-for="category in categoriesProp"
              :key="category.id"
              :value="category.id"
              >{{ category.name }}</b-form-select-option
            ></b-form-select
          >
        </b-form-group>

        <b-form-group
          label="Название блюда"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="dishProp.productName"
            placeholder="Введите название блюда"
            required
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          label="Цена блюда"
          label-for="price-input"
          invalid-feedback="Price is required"
          :state="priceState"
        >
          <b-form-input
            id="price-input"
            v-model.number="dishProp.price"
            placeholder="Введите цену блюда"
            required
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label="Статус блюда" label-for="isActive-checkbox">
          <b-form-checkbox
            id="isActive-checkbox"
            v-model="dishProp.isActive"
            name="checkbox-1"
            value="true"
            unchecked-value="false"
          >
            Активно
          </b-form-checkbox>
        </b-form-group>

        <b-form-group
          label="краткое описание"
          label-for="shortDescription-input"
          invalid-feedback="shortDescription is required"
        >
          <b-form-input
            id="shortDescription-input"
            v-model="dishProp.shortDescription"
            placeholder="Введите краткое описание"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          label="Описание"
          label-for="description-input"
          invalid-feedback="description is required"
        >
          <b-form-textarea
            id="description-input"
            v-model="dishProp.description"
            placeholder="Введите описание"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DishForm2",
  props: ["dishProp", "categoriesProp"],
  data() {
    return {
      nameState: null,
      priceState: null,
      // descriptionState: null,
      // shortDescriptionState: null,
      // isActiveState: null,
      dish: {
        id: 0,
        productName: "",
        price: 0,
        isActive: true,
        description: "",
        shortDescription: "",
        category: {
          id: 0,
        },
      },
    };
  },
  computed: {
    ...mapState("menuM", {
      id: (state) => state.dishVX.id,
    }),
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      this.priceState = valid;
      return valid;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    //  handleSubmit() {
    //    if (!this.checkFormValidity()) {
    //      return;
    //    }
    //    this.dish.productName = this.name;
    //    this.dish.price = this.price;
    //    if (this.isEdit === true) {
    //      this.dish.id = this.id;
    //      this.editMenu(this.dish);
    //    } else if (this.isEdit === false) {
    //      this.addToMenu(this.dish);
    //    } else {
    //      console.log("Ошибка блок Else в handleSubmit компонента dish-form");
    //    }
    //    this.isEdit = false;
    //    this.$nextTick(() => {
    //      this.$bvModal.hide("dish-form");
    //    });
    //  },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.dish = this.dishProp;
      console.log(this.dish);
      this.$emit("submit-dish", this.dish);
      this.$nextTick(() => {
        this.$bvModal.hide("dish-form2");
      });
    },
    resetModal() {
      this.priceState = null;
      this.nameState = null;
    },
  },
};
</script>
