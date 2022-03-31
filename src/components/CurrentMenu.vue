<template>
  <div>
    <MenuFilters :dishStatusProp="true" />

    <div>
      <b-button @click="addNewDish">Добавить блюдо</b-button>
    </div>

    <MenuTable :menu="menu" @edit-image="editImage">
      <template v-slot:column_options="slotProps">
        <b-button-group size="sm">
          <b-button
            @click="editDish(slotProps.dish, slotProps.categoryId)"
            variant="success"
            size="sm"
          >
            <b-icon icon="pencil-square" aria-hidden="true"> </b-icon>
          </b-button>
          <b-button
            @click="removeDish(slotProps.dish.id)"
            size="sm"
            variant="danger"
          >
            <b-icon icon="trash-fill" aria-hidden="true"> </b-icon>
          </b-button>
        </b-button-group>
      </template>
    </MenuTable>

    <DishForm
      :dish-prop="dish"
      @submit-dish="submitDish"
      :image-path-prop="imagePath"
    />
  </div>
</template>

<script>
import pizzaApi from "@/api/pizzaApi";
import { mapState, mapActions } from "vuex";

import MenuTable from "./MenuTable.vue";
import DishForm from "./DishForm/FormDish.vue";
import MenuFilters from "./MenuFilters.vue";
export default {
  name: "CurrentMenu",
  components: { MenuTable, DishForm, MenuFilters },
  data() {
    return {
      isEdit: false,
      dish: {
        id: 0,
        productName: "",
        price: 0,
        isActive: true,
        description: "",
        category: {
          id: 0,
        },
        image: "",
      },
      imagePath: "",
      file1: null,
      testImg: "",
      testImg2: null,
    };
  },
  computed: {
    ...mapState("menuM", {
      menu: "menu",
    }),
  },
  methods: {
    async testFile() {
      // this.tesmages/${this.file1.name}`);
      // this.testImg = require(`../../../DishImages/${this.file1.name}`);
      console.log(this.file1);
      const formData = new FormData();
      formData.append("dishPic", this.file1, `${this.file1.name}`);
      pizzaApi.images(formData);
    },

    async getImage() {
      const img = await pizzaApi.getImage();
      // this.testImg2 = img.request.responseURL;
      this.testImg2 = img.config.url;
      // console.log(typeof img.data.result);
    },
    ...mapActions("menuM", [
      "getFullMenu",
      "removeDish",
      "editMenu",
      "addToMenu",
    ]),
    ...mapActions("categoriesM", ["getCategories"]),
    submitDish(dish) {
      if (this.isEdit === false) {
        console.log("добавить блюдо");
        this.addToMenu(dish);
      } else {
        console.log("изменить блюдо");
        this.editMenu(dish);
      }
    },
    editImage(image) {
      if (image !== "") {
        this.dish.image = `https://localhost:5001/api/DishImage/getImages?name=${image}`;
      } else {
        this.dish.image =
          "https://www.chefmarket.ru/blog/wp-content/uploads/2019/05/delicious-burger-e1558527589911.jpg";
      }
      console.log(`currentmenu editImage ${this.dish.image}`);
      // this.dish.image = image;
      this.$bvModal.show("dish-image-form");
    },
    addNewDish() {
      console.log("addNew начало");
      console.log(this.dish);
      this.isEdit = false;
      this.dish.id = 0;
      this.dish.productName = "";
      this.dish.price = "";
      this.dish.isActive = true;
      this.dish.description = "";
      this.dish.category.id = 0;
      this.dish.image = "";
      this.imagePath = "";
      // this.dish = {
      //   id: 0,
      //   productName: "",
      //   price: 0,
      //   isActive: true,
      //   description: "",
      //   category: {
      //     id: 0,
      //   },
      //   image: "",
      // };
      // this.dish.image =
      //   "https://www.chefmarket.ru/blog/wp-content/uploads/2019/05/delicious-burger-e1558527589911.jpg";

      this.$nextTick(function() {
        this.$bvModal.show("dish-form");
      });

      console.log("addNew конец");
      console.log(this.dish);
    },
    editDish(dish, categoryId) {
      this.isEdit = true;

      this.dish.id = dish.id;
      this.dish.productName = dish.productName;
      this.dish.price = dish.price;
      this.dish.isActive = dish.isActive;
      this.dish.description = dish.description;
      this.dish.image = dish.image;
      this.dish.category.id = categoryId;
      // this.dish.image = dish.image;
      console.log(this.dish);
      // if (dish.image !== "") {
      //   this.dish.image = `https://localhost:5001/api/DishImage/getImages?name=${dish.image}`;
      // } else {
      //   this.dish.image =
      //     "https://www.chefmarket.ru/blog/wp-content/uploads/2019/05/delicious-burger-e1558527589911.jpg";
      // }
      if (dish.image !== "") {
        this.imagePath = `https://localhost:5001/api/DishImage/getImages?name=${dish.image}`;
      } else {
        this.imagePath =
          "https://www.chefmarket.ru/blog/wp-content/uploads/2019/05/delicious-burger-e1558527589911.jpg";
      }

      this.$nextTick(function() {
        this.$bvModal.show("dish-form");
      });
    },
    remove(id) {
      console.log(id);
      this.removeDish(id);
    },
  },
  mounted() {
    this.getFullMenu();
    this.getCategories();
  },
};
</script>

<style></style>
