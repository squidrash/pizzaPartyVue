<template>
  <div>
    <button class="edit_button">
      <p style="margin:0; height:26px;">
        <b-icon icon="pencil-square"></b-icon>
        <span class="hiden_text">Редактировать</span>
      </p>
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonEdit",
};
</script>

<style>
.hiden_text {
  color: #fff;
  padding: 0 0 0 7px;
}
.edit_button {
  border: 0;
  border-radius: 5px;
  max-height: 34px;
  width: 34px;
  background-color: #fff;
  text-align: left;
  transition-property: background-color, width, color;
  transition-duration: 0.5s, 1s, 0.5s;
  overflow: hidden;
  color: #000;
  white-space: nowrap;
}
.edit_button:hover {
  width: 150px;
  background-color: #282;
  color: #fff;
}
</style>
