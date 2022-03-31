<template>
  <div>
    <button class="edit_button" @click="edit">
      <p style="margin:0; height:26px;">
        <b-icon class="icon" icon="pencil-square"></b-icon>
        <span class="hiden_text">Редактировать</span>
      </p>
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonEdit",
  methods: {
    edit() {
      this.$emit("click");
    },
  },
};
</script>

<style>
.hiden_text {
  color: #fff;
  padding: 0 0 0 7px;
  position: absolute;
  /* z-index: 2; */
}
.edit_button {
  border: 0;
  border-radius: 5px;
  height: 34px;
  width: 34px;
  background-color: #fff;
  text-align: left;
  transition-property: background-color, width, color;
  transition-duration: 0.5s, 1s, 0.5s;
  box-sizing: border-box;
  overflow: hidden;
  color: #000;
}
.edit_button:hover {
  width: 150px;
  background-color: #282;
  color: #fff;
}
</style>
