<template>
  <div>
    <button class="purple_btn" v-b-toggle.menu-filters>Фильтры</button>
    <MenuFilters :dishStatusProp="false" />
    <MenuTable :menu="menu" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import MenuTable from "./MenuTable.vue";
import MenuFilters from "./MenuFilters/MenuFilters.vue";
export default {
  name: "ArchiveMenu",
  components: {
    MenuTable,
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

<style lang="scss" scoped></style>
