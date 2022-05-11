<template>
  <div class="perPage__block">
    <div style="margin-right: 5px">на странице:</div>
    <button
      :class="getClassString(option)"
      v-for="(option, index) in perPageOptions"
      :key="index"
      @click="perPage = option"
    >
      {{ option }}
    </button>
  </div>
</template>

<script>
export default {
  name: "PerPageOptions",
  props: {
    perPageOptions: {
      Array,
      default() {
        return [5, 10, 20, 40];
      },
    },
    value: { Number },
  },
  computed: {
    perPage: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    getClassString(option) {
      let classString = "perPage__option";
      if (this.perPage === option) {
        classString += " current_option";
      } else {
        classString += " basic_option";
      }
      return classString;
    },
  },
};
</script>

<style>
.perPage__block {
  height: 35px;
  display: flex;
  margin: 0 5px 10px 5px;
  justify-content: right;
  align-items: center;
}
.perPage__option {
  font-size: 14px;
  min-height: 30px;
  min-width: 30px;
  border-radius: 50%;
  margin: 0 5px 0 0;
  border: 0;
}
.basic_option {
  background-color: #fff;
}
.basic_option:hover {
  background-color: #efefef;
}
.current_option,
.current_option:disabled {
  background-color: #28a745;
  font-weight: bold;
  color: #fff;
}
</style>
