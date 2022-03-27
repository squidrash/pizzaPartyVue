<template>
  <div>
    <b-modal
      id="dish-form"
      ref="dish-form-modal"
      title="Форма блюда"
      @shown="getImage"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Категория" label-for="category-input">
          <b-form-select
            id="category-input"
            v-model="dish.category.id"
            class="mb-3"
          >
            <b-form-select-option
              v-for="category in categories"
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
            v-model="dish.productName"
            placeholder="Введите название блюда"
            required
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label="Изображение блюда" label-for="dish-img">
          <b-overlay :show="showOverlay" rounded="sm">
            <b-img rounded width="250px" id="dish-img" :src="imagePath"></b-img>
          </b-overlay>

          <b-form-file
            accept="image/*"
            v-model="file"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            @input="setImage"
          ></b-form-file>
        </b-form-group>

        <b-form-group
          label="Цена блюда"
          label-for="price-input"
          invalid-feedback="Price is required"
          :state="priceState"
        >
          <b-form-input
            id="price-input"
            v-model.number="dish.price"
            placeholder="Введите цену блюда"
            required
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label="Статус блюда" label-for="isActive-checkbox">
          <b-form-checkbox
            id="isActive-checkbox"
            v-model="dish.isActive"
            name="checkbox-1"
            value="true"
            unchecked-value="false"
          >
            Активно
          </b-form-checkbox>
        </b-form-group>

        <b-form-group
          label="Описание"
          label-for="description-input"
          invalid-feedback="description is required"
        >
          <b-form-textarea
            id="description-input"
            v-model="dish.description"
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
  name: "DishForm",
  props: { dishProp: Object, imagePathProp: String },
  data() {
    return {
      nameState: null,
      priceState: null,
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
  methods: {
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
      this.imagePath = `https://localhost:5001/api/DishImage/getImages?name=${this.file.name}`;
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      this.priceState = valid;
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
      if (this.file !== null) {
        this.dish.image = this.file.name;
      }

      console.log(this.dish);
      this.$emit("submit-dish", this.dish);
      this.$nextTick(() => {
        this.$bvModal.hide("dish-form");
      });
    },
    resetModal() {
      this.priceState = null;
      this.nameState = null;
      this.file = null;
      this.imagePath =
        "https://www.chefmarket.ru/blog/wp-content/uploads/2019/05/delicious-burger-e1558527589911.jpg";
      this.showOverlay = true;
    },
  },
};
</script>
