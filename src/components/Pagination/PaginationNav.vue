<template>
  <div class="pagination_nav__block ">
    <button
      class="pagination_nav__btn basic_page"
      v-if="page != 1"
      @click="page--"
    >
      <b-icon icon="arrow-left" />
    </button>
    <button
      class="pagination_nav__btn basic_page"
      v-if="firstPage"
      @click="page = 1"
    >
      1
    </button>
    <button
      v-show="page > 4"
      @click="decrementEllipsis"
      class="pagination_nav__btn basic_page"
    >
      ...
    </button>

    <button
      v-for="(pageNumber, index) in toPage"
      :key="index"
      :disabled="page === pageNumber"
      @click="page = pageNumber"
      :class="currentPageClass(pageNumber)"
    >
      {{ pageNumber }}
    </button>
    <button
      v-show="page < pages.length - 3"
      @click="incrementEllipsis"
      class="pagination_nav__btn basic_page"
    >
      ...
    </button>
    <button
      class="pagination_nav__btn basic_page"
      v-if="lastPage"
      @click="page = pages.length"
    >
      {{ pages.length }}
    </button>
    <button
      class="pagination_nav__btn basic_page"
      @click="page++"
      v-if="page < pages.length"
    >
      <b-icon icon="arrow-right" />
    </button>
  </div>
</template>

<script>
export default {
  name: "PaginationNav",
  props: {
    value: { Number },
    pages: { Array },
  },
  computed: {
    page: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    firstPage() {
      if (this.pages.length <= 4) return false;
      if (this.page > 3) return true;
      return false;
    },
    lastPage() {
      if (this.pages.length <= 4) return false;
      if (this.page < this.pages.length - 2) return true;
      return false;
    },
    toPage() {
      let page = this.page;
      let pages = this.pages;

      if (pages.length > 4) {
        switch (page) {
          case 1:
            return pages.slice(page - 1, page + 4);
          case 2:
            return pages.slice(page - 2, page + 3);
          case pages.length - 1:
            return pages.slice(page - 4, page + 1);
          case pages.length:
            return pages.slice(page - 5, page);
          default:
            return pages.slice(page - 3, page + 2);
        }
      } else {
        return pages;
      }
    },
  },
  methods: {
    currentPageClass(page) {
      let classString = "pagination_nav__btn";
      if (this.page === page) {
        classString += " current_page";
      } else {
        classString += " basic_page";
      }
      return classString;
    },
    incrementEllipsis() {
      switch (this.page) {
        case 1:
          this.page += 5;
          return;

        case 2:
          this.page += 4;
          return;

        default:
          this.page += 3;
          return;
      }
    },
    decrementEllipsis() {
      switch (this.page) {
        case this.pages.length:
          this.page -= 5;
          return;

        case this.pages.length - 1:
          this.page -= 4;
          return;

        default:
          this.page -= 3;
          return;
      }
    },
  },
};
</script>

<style>
.pagination_nav__block {
  margin: 0 5px 10px 5px;
}
.pagination_nav__btn {
  font-size: 14px;
  min-height: 30px;
  min-width: 30px;
  border-radius: 50%;
  margin: 0 5px 5px 0;
  border: 0;
  /* background-color: #fff; */
}
/* .pagination_nav__btn:hover {
  background-color: #efefef;
} */
.basic_page {
  background-color: #fff;
}
.basic_page:hover {
  background-color: #efefef;
}
.current_page,
.current_page:disabled {
  background-color: #28a745;
  font-weight: bold;
  color: #fff;
}
</style>
