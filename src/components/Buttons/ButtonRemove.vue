<template>
  <div>
    <button class="remove_button">
      <p style="margin:0; height:26px;">
        <b-icon icon="trash-fill"></b-icon>
        <span class="hiden_text">Удалить</span>
      </p>
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonRemove",
};
</script>

<style>
.hiden_text {
  color: #fff;
  padding: 0 0 0 7px;
}
.remove_button {
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
.remove_button:hover {
  width: 100px;
  background-color: #dc3545;
  color: #fff;
}
</style>
