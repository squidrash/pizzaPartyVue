<template>
  <div>
    <MenuFilters :dishStatusProp="false" />
    <MenuTable :menu="menu" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import MenuTable from "./MenuTable.vue";
import MenuFilters from "./MenuFilters.vue";
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
