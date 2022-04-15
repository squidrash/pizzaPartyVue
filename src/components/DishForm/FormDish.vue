<template>
  <div>
    <b-modal
      id="dish-form"
      ref="dish-form-modal"
      hide-header
      hide-footer
      @show="getImage"
      @hidden="resetModal"
    >
      <form novalidate>
        <InputName
          v-model="dish.productName"
          :v="$v.dish.productName"
          :isEdit="true"
        />
        <div class="flexbox_row">
          <div class="flexbox_column">
            <InputPrice
              v-model="dish.price"
              :v="$v.dish.price"
              :isEdit="true"
            />
          </div>
          <div class="flexbox_column">
            <SelectDishCategory
              v-model="dish.category.id"
              :categories="categories"
            />
          </div>
        </div>

        <TextareaDescription
          v-model="dish.description"
          :v="$v.dish.description"
          :isEdit="true"
        />

        <InputImage
          v-model="file"
          :imagePath="imagePath"
          :isEdit="true"
          @setImage="setImage"
        />
      </form>
      <FooterButtons @submit="handleSubmit" @cancel="resetModal">
        <template v-slot:submit v-if="isNewDishProp === true">
          Добавить
        </template>
        <template v-else v-slot:submit>
          Изменить
        </template>
      </FooterButtons>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";

import useVuelidate from "@vuelidate/core";
import { dishValidRules } from "@/Validators/DishValidRules";

import SelectDishCategory from "./SelectDishCategory.vue";
import InputName from "../FormComponent/InputName.vue";
import InputPrice from "../FormComponent/InputPrice.vue";
import TextareaDescription from "../FormComponent/TextareaDescription.vue";
import InputImage from "../FormComponent/InputImage.vue";
import FooterButtons from "../Buttons/FooterButtons.vue";

export default {
  name: "DishForm",
  setup: () => ({ $v: useVuelidate() }),
  props: { dishProp: Object, imagePathProp: String, isNewDishProp: Boolean },
  components: {
    SelectDishCategory,
    InputName,
    InputPrice,
    TextareaDescription,
    InputImage,
    FooterButtons,
  },
  data() {
    return {
      // dish: {
      //   id: 0,
      //   productName: "",
      //   price: 0,
      //   isActive: true,
      //   description: "",
      //   shortDescription: "",
      //   category: {
      //     id: 0,
      //   },
      // },
      dish: this.dishProp,
      imagePath:
        "https://www.chefmarket.ru/blog/wp-content/uploads/2019/05/delicious-burger-e1558527589911.jpg",
      showOverlay: true,
      file: null,
    };
  },
  computed: {
    ...mapState("menuM", {
      id: (state) => state.dishVX.id,
    }),
    ...mapState("categoriesM", {
      categories: "categories",
    }),
  },
  validations() {
    return {
      dish: dishValidRules(),
    };
  },
  methods: {
    testVuelidate() {
      this.$v.dish.$touch();
      if (this.$v.dish.$error) {
        console.log(this.$v.dish.$errors);
      }
    },

    getImage() {
      console.log(`getImage DishForm ${this.imagePathProp}`);
      if (this.imagePathProp !== "") {
        this.imagePath = this.imagePathProp;
      }
      this.showOverlay = false;

      // console.log(`this.image ${this.image}`);
      // console.log(`this.imageProp ${this.imageProp}`);
    },
    setImage() {
      this.imagePath = `https://localhost:5001/api/DishImage/getDishImage?name=${this.file.name}`;
      this.dish.image = this.file.name;
    },
    handleSubmit() {
      this.$v.dish.$touch();
      if (this.$v.dish.$error) return;

      console.log(this.dish);
      this.$emit("submit-dish", this.dish);
      this.$nextTick(() => {
        this.$bvModal.hide("dish-form");
      });
    },
    resetModal() {
      this.$v.$reset();
      this.file = null;
      this.imagePath = `https://localhost:5001/api/DishImage/getDishImage?name=default.jpeg`;
      this.showOverlay = true;
      this.$nextTick(() => {
        this.$bvModal.hide("dish-form");
      });
    },
  },
};
</script>
