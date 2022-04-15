<template>
  <div>
    <button class="btn_info">
      <b-icon icon="info"></b-icon>
      <span style="color:#fff">подробнее</span>
    </button>
  </div>
</template>

<script>
export default { name: "ButtonInfo" };
</script>

<style>
.btn_info {
  border: 1px solid rgb(125, 129, 243);
  color: rgb(125, 129, 243);
  background-color: #fff;
  height: 22px;
  width: 22px;
  border-radius: 50%;
  transition-duration: 0.5s;
  overflow: hidden;
  white-space: nowrap;
  padding: 1px 5px 1px 3px;
}
.btn_info:hover {
  border: 1px solid #ffffff;
  background-color: rgb(125, 129, 243);

  color: #fff;
  width: 100px;
  border-radius: 5px;
}
</style>
