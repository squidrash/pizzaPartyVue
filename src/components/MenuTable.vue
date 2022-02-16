<template>
  <div>
    <div>
      <MenuFilters :categoriesProp="categories" />
    </div>

    <b-button @click="addNewDish">Добавить</b-button>
    <div>
      <div class="menu__row">
        <div class="menu__column menu__column_name">
          <div class="menu__item">Название</div>
        </div>
        <div class="menu__column menu__column_price">
          <div class="menu__item">
            Цена
          </div>
        </div>
        <div class="menu__column menu__column_status">
          <div class="menu__item">Статус</div>
        </div>
        <div class="menu__column menu__column_description">
          <div class="menu__item">
            Описание
          </div>
        </div>
        <div class="menu__column">
          <div class="menu__item"></div>
        </div>
      </div>
      <div
        v-for="category in menu"
        :key="category.categoryId"
        class="menu__category_block"
      >
        <div class="menu__category_name">{{ category.categoryName }}</div>

        <div
          class="menu__row"
          v-for="dish in category.dishes"
          :key="dish.id"
          :class="[dish.isActive ? rowActiveClass : rowNotActiveClass]"
        >
          <div class="menu__column menu__column_name">
            <div class="menu__item">{{ dish.productName }}</div>
          </div>
          <div class="menu__column menu__column_price">
            <div class="menu__item">
              {{ dish.price }}
            </div>
          </div>
          <div class="menu__column menu__column_status">
            <div class="menu__item">{{ dish.isActive | status }}</div>
          </div>
          <div class="menu__column menu__column_description">
            <div v-if="dish.description !== undefined" class="menu__item">
              <b-button>Подробнее</b-button>
            </div>
            <div v-else>-----------</div>
          </div>
          <div class="menu__column">
            <div class="menu__item">
              <b-button-group size="sm">
                <b-button
                  variant="success"
                  size="sm"
                  @click="editData(dish, category.categoryId)"
                >
                  <b-icon icon="pencil-square" aria-hidden="true"> </b-icon>
                  Изменить</b-button
                >
                <b-button size="sm" variant="danger" @click="remove(dish.id)">
                  <b-icon icon="trash-fill" aria-hidden="true"> </b-icon>
                  Удалить</b-button
                >
              </b-button-group>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <DishForm2
        :dishProp="dish"
        :categoriesProp="categories"
        @submit-dish="test"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MenuFilters from "./MenuFilters.vue";
import DishForm2 from "./DishForm2.vue";

export default {
  name: "MenuTable",
  components: { MenuFilters, DishForm2 },
  data() {
    return {
      rowActiveClass: "menu__row_active",
      rowNotActiveClass: "menu__row_not_active",
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
      isEdit: false,
    };
  },
  filters: {
    status(value) {
      switch (value) {
        case true:
          return "Активно";

        case false:
          return "Не активно";
      }
      return "Ошибка";
    },
  },
  computed: {
    ...mapState("menuM", {
      menu: "menu",
    }),
    ...mapState("categoriesM", {
      categories: "categories",
    }),
  },
  methods: {
    test(dish) {
      if (this.isEdit == false) {
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
      this.isEdit = false;
      this.dish = {
        id: 0,
        productName: "",
        price: 0,
        isActive: true,
        description: "",
        shortDescription: "",
        category: {
          id: 0,
        },
      };
      this.$bvModal.show("dish-form2");
      console.log("addNew конец");
      console.log(this.dish);
    },
    editData(dish, categoryId) {
      this.isEdit = true;

      this.dish.id = dish.id;
      this.dish.productName = dish.productName;
      this.dish.price = dish.price;
      this.dish.isActive = dish.isActive;
      this.dish.description = dish.description;
      this.dish.shortDescription = dish.shortDescription;
      this.dish.category.id = categoryId;

      this.$bvModal.show("dish-form2");
    },
    remove(id) {
      console.log(id);
      this.removeDish(id);
    },
    ...mapActions("menuM", [
      "getFullMenu",
      "removeDish",
      "editMenu",
      "addToMenu",
    ]),
    ...mapActions("categoriesM", ["getCategories"]),
  },
  mounted() {
    this.getFullMenu();
    this.getCategories();
  },
};
</script>
<style>
.menu__category_block {
  border: 2px solid red;
  margin-bottom: 10px;
}
.menu__category_block:last-child {
  margin-bottom: 20px;
}
.menu__category_name {
  text-align: left;
  padding: 10px;
}
.menu__row {
  display: flex;
  justify-content: center;
  /* background-color: aquamarine; */
  /* border: 2px solid black; */
}
.menu__row_active {
  background-color: aquamarine;
}
.menu__row_not_active {
  background-color: rgb(243, 178, 13);
}
.menu__column {
  padding-right: 20px;
  /* padding-left: 40px; */
  /* text-align: left; */
  flex: 1 1 200px;
}
.menu__column_name {
  flex: 1 1 20%;
  padding-left: 40px;
  text-align: left;
}
.menu__column_price {
  flex: 1 1 7%;
  text-align: right;
}
.menu__column_status {
  flex: 1 1 10%;
}
.menu__column_description {
  flex: 1 1 40%;
}
.menu__item {
}
/* .dish_description__column {
}
.dish_description__row {
} */
</style>
