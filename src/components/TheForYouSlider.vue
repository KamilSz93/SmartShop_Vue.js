<template>
  <div class="for-you-slider-wrapper">
    <h2>Palecane dla ciebie</h2>
    <div class="for-you-slider-container">
      <button class="btn btn-prev-slide-for-you">
        <img class="img-btn" src="../assets/slider-image/left.png" />
      </button>
      <button class="btn btn-next-slide-for-you active">
        <img class="img-btn" src="../assets/slider-image/right.png" />
      </button>
      <div class="for-you-slider-slides">
        <ProductItem
          class="for-you-slider-slide"
          v-for="(item, nodeId) in productItems"
          :key="nodeId"
          :urlPictureItem="item.urlPicture"
          :nameItem="item.name"
          :screenItem="item.screen"
          :ramItem="item.ram"
          :processorItem="item.processor"
          :priceItem="item.price"
          :id="nodeId"
        >
        </ProductItem>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductItem from "./ProductItem.vue";
import { useGetItemStore } from "../stores/items";
import { onMounted, ref } from "vue";

let productItems = ref({});

onMounted(async () => {
  const storeItem = useGetItemStore();
  await storeItem.getDataItems();
  productItems.value = storeItem.storeData.items;

  let sliderSlides = [...document.querySelectorAll(".for-you-slider-slides")];
  let prevBtn = [...document.querySelectorAll(".btn-prev-slide-for-you")];
  let nextBtn = [...document.querySelectorAll(".btn-next-slide-for-you")];

  sliderSlides.forEach((item, index) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nextBtn[index].addEventListener("click", () => {
      item.scrollLeft += containerWidth;
      document.querySelector(".btn-prev-slide-for-you").classList.add("active");
    });

    prevBtn[index].addEventListener("click", () => {
      item.scrollLeft -= containerWidth;
      if (item.scrollLeft - containerWidth <= 0)
        document
          .querySelector(".btn-prev-slide-for-you")
          .classList.remove("active");
    });
  });
});
</script>

<style scoped>
.for-you-slider-wrapper {
  margin-top: 2rem;
}
.for-you-slider-container {
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
}
h2 {
  padding-left: 1.75rem;
  font-size: 3rem;
}
.for-you-slider-slides {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 42rem;
  margin: 0 auto;
  overflow-x: auto;
  scroll-behavior: smooth;
}
.for-you-slider-slides::-webkit-scrollbar {
  display: none;
}
.for-you-slider-slide {
  margin: 2rem;
}
.btn {
  position: absolute;
  border: none;
  background-color: rgb(233, 231, 231);
  z-index: 9;
  opacity: 0.5;
}
.btn:hover {
  cursor: pointer;
  border: 0.2rem solid black;
  opacity: 0.7;
}
.img-btn {
  height: 5rem;
  width: 5rem;
}
.btn-prev-slide-for-you {
  display: none;
}
.btn-prev-slide-for-you.active {
  display: block;
}
.btn-next-slide-for-you {
  right: 0rem;
}
@media only screen and (max-width: 1200px) {
  .for-you-slider-slides {
    padding: 0 1rem;
  }
  h2 {
    padding-left: 2.75rem;
  }
}
</style>
