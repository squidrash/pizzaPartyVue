<template>
  <div>
    <PerPageOptions v-model="perPage" />
    <PaginationNav v-model="page" :pages="pages" />
  </div>
</template>

<script>
import PerPageOptions from "@/components/Pagination/PerPageOptions.vue";
import PaginationNav from "@/components/Pagination/PaginationNav.vue";
export default {
  name: "Pagination",
  components: { PerPageOptions, PaginationNav },
  props: { items: Array },
  data() {
    return {
      page: 1,
      perPage: 10,
      pages: [],
    };
  },
  computed: {
    displayedItems() {
      return this.paginate(this.items);
    },
  },
  watch: {
    items() {
      this.setPages();
    },
    perPage() {
      this.setPages();
    },
    displayedItems() {
      this.updateItems();
    },
  },
  methods: {
    setPages() {
      this.page = 1;
      this.pages = [];
      let numberOfPages = Math.ceil(this.items.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    paginate(items) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return items.slice(from, to);
    },
    updateItems() {
      this.$emit("update-displayed-items", this.displayedItems);
    },
  },
};
</script>

<style></style>
