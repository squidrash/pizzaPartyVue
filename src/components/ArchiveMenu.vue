<template>
  <div>
    <div class="flexbox_row stiky_block stiky_block_menu">
      <div class="flexbox_row_expanded"></div>
      <button class="purple_btn" v-b-toggle.menu-filters>Фильтры</button>
    </div>
    <MenuFilters :dishStatusProp="false" />
    <MenuTableHead />
    <div
      v-for="category in menu"
      :key="category.categoryId"
      class="menu__category_block"
    >
      <div class="menu__category_name">{{ category.categoryName }}</div>
      <div v-for="dish in category.dishes" :key="dish.id">
        <MenuTableBody :dish="dish" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MenuTableHead from "@/components/MenuTable/MenuTableHead.vue";
import MenuTableBody from "@/components/MenuTable/MenuTableBody.vue";

import MenuFilters from "./MenuFilters/MenuFilters.vue";
export default {
  name: "ArchiveMenu",
  components: {
    MenuTableHead,
    MenuTableBody,
    MenuFilters,
  },
  computed: {
    ...mapState("menuM", {
      menu: "archiveMenu",
    }),
  },
  methods: {
    ...mapActions("menuM", ["getArchiveMenu"]),
  },
  mounted() {
    this.getArchiveMenu();
  },
};
</script>

<style></style>
