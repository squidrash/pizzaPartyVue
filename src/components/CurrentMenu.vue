<template>
  <div>
    <div class="flexbox_row stiky_block stiky_block_menu">
      <div class="flexbox_row_expanded">
        <button class="green_btn" @click="addNewDish">Добавить блюдо</button>
      </div>
      <button class="purple_btn" v-b-toggle.menu-filters>Фильтры</button>
    </div>

    <MenuFilters :dishStatusProp="true" />

    <MenuTableHead />
    <div
      v-for="category in menu"
      :key="category.categoryId"
      class="menu__category_block"
      @click="dish.category.id = category.categoryId"
    >
      <div class="menu__category_name">{{ category.categoryName }}</div>
      <div v-for="dish in category.dishes" :key="dish.id">
        <MenuTableBody
          :dish="dish"
          :dishOptions="true"
          @edit-dish="editDish"
          @remove-dish="handleRemove"
        />
      </div>
    </div>
    <DishForm
      :dish-prop="dish"
      @submit-dish="submitDish"
      :image-path-prop="imagePath"
      :isNewDishProp="isNewDish"
    />
    <ModalConfirm modalTitle="Удалить блюдо?" @submit-action="remove" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import MenuTableHead from "@/components/MenuTable/MenuTableHead.vue";
import MenuTableBody from "@/components/MenuTable/MenuTableBody.vue";

import DishForm from "./DishForm/FormDish.vue";
import ModalConfirm from "@/components/ModalConfirm.vue";
import MenuFilters from "./MenuFilters/MenuFilters.vue";
export default {
  name: "CurrentMenu",
  components: {
    MenuTableHead,
    MenuTableBody,
    DishForm,
    ModalConfirm,
    MenuFilters,
  },
  data() {
    return {
      isNewDish: false,
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
      categoryId: 0,
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
    ...mapActions("menuM", [
      "getFullMenu",
      "removeDish",
      "editMenu",
      "addToMenu",
    ]),
    ...mapActions("categoriesM", ["getCategories"]),
    submitDish(dish) {
      if (this.isNewDish === true) {
        console.log("добавить блюдо");
        this.addToMenu(dish);
      } else {
        console.log("изменить блюдо");
        this.editMenu(dish);
      }
    },

    addNewDish() {
      console.log("addNew начало");
      console.log(this.dish);
      this.isNewDish = true;
      this.dish.id = 0;
      this.dish.productName = "";
      this.dish.price = "";
      this.dish.isActive = true;
      this.dish.description = "";
      this.dish.category.id = 0;
      this.dish.image = "";
      this.imagePath = "";

      this.$nextTick(function() {
        this.$bvModal.show("dish-form");
      });

      console.log("addNew конец");
      console.log(this.dish);
    },

    editDish(dish) {
      this.isNewDish = false;

      this.dish.id = dish.id;
      this.dish.productName = dish.productName;
      this.dish.price = dish.price;
      this.dish.isActive = dish.isActive;
      this.dish.description = dish.description;
      this.dish.image = dish.image;
      console.log(this.dish);

      if (dish.image !== "") {
        this.imagePath = `https://localhost:5001/api/DishImage/getDishImage?name=${dish.image}`;
      } else {
        this.imagePath = `https://localhost:5001/api/DishImage/getDishImage?name=default.jpeg`;
      }

      this.$nextTick(function() {
        this.$bvModal.show("dish-form");
      });
    },
    handleRemove(id) {
      this.dish.id = id;
      this.$bvModal.show("modal-confirm");
    },
    remove() {
      this.removeDish(this.dish.id);
    },
  },
  mounted() {
    this.getFullMenu();
    this.getCategories();
  },
};
</script>

<style>
.stiky_block_menu {
  top: 50px;
  /* z-index: 100; */
}
.menu__category_block {
  /* border: 2px solid red; */
  margin-bottom: 5px;
  box-shadow: 0 0 5px;
  padding: 10px;
}
.menu__category_block:last-child {
  margin-bottom: 30px;
}
.menu__category_name {
  text-align: left;
  padding: 10px;
  padding-left: 40px;
  font-weight: bold;
}
</style>
