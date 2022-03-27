<template>
  <div class="special_offer__card">
    <div class="special_offer__title">
      {{ offer.name }}
    </div>
    <div class="special_offer__promocode">
      <div class="special_offer__promocode_item">
        {{ offer.promoCode }}
      </div>
    </div>
    <div class="special_offer__img"><img :src="image" alt="" /></div>
  </div>
</template>

<script>
export default {
  name: "SpecialOfferCard",
  props: { specialOfferProp: Object },
  data() {
    return {
      offer: this.specialOfferProp,
      image:
        "https://localhost:5001/api/DishImage/getOfferImage?name=default.png",
    };
  },
};
</script>

<style>
.special_offer__card {
  position: relative;
  margin: 0 10px 10px 0;
  /* border: 2px solid grey; */
  border-radius: 15px;
  height: 160px;
  width: 260px;
  background-color: bisque;
  overflow: hidden;
  cursor: pointer;
  transition-duration: 0.5s;
  bottom: 0;
  text-align: left;
  color: #ffffff;
  line-height: 1.1;
}
.special_offer__card:hover {
  bottom: 5px;
  /* width: 500px; */
  /* height: 500px; */
  /* box-shadow: 0 5px 0px #3c354a; */
  box-shadow: 0 5px 5px #3c354a;
  /* border: 2px solid #000000; */
}
.special_offer__title {
  position: absolute;
  top: 20px;
  left: 10px;
  max-width: 150px;
  font-size: 22px;

  z-index: 1;
}
.special_offer__promocode {
  position: absolute;
  justify-content: center;
  bottom: 10px;
  left: 10px;
  /* max-width: 80px; */
  height: 30px;
  font-size: 20px;
  border-radius: 5px;
  background-color: #ffffff;
  z-index: 1;
}
.special_offer__promocode_item {
  height: 100%;
  padding: 5px 10px;
  color: #000000;
  font-weight: bold;
}
.special_offer__img {
}
.special_offer__img img {
  max-width: 262px;
}
</style>
