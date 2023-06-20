<template>
  <div class="recently-add-wrapper">
    <h2>Ostatnio dodane</h2>
    <div class="recently-add-container">
      <button class="btn-recently-add btn-prev-slide-recently-add">
        <img
          class="img-btn-recently-add"
          src="../assets/slider-image/left.png"
        />
      </button>
      <button class="btn-recently-add btn-next-slide-recently-add active">
        <img
          class="img-btn-recently-add"
          src="../assets/slider-image/right.png"
        />
      </button>
      <div class="recently-add-slider-slide">
        <ProductItemMini
          class="recently-add-product"
          v-for="(item, nodeId) in recentlyAddProducts"
          :key="nodeId"
          :urlPictureItem="item.urlPicture"
          :nameItem="item.name"
          :screenItem="item.screen"
          :ramItem="item.ram"
          :processorItem="item.processor"
          :priceItem="item.price"
          :id="nodeId"
        >
        </ProductItemMini>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductItemMini from "./ProductItemMini.vue";
import { useGetItemStore } from "../stores/items";
import { onMounted, ref } from "vue";

let productItems = ref({});

let recentlyAddProducts = ref({});

onMounted(async () => {
  const storeItem = useGetItemStore();
  await storeItem.getDataItems();
  productItems.value = storeItem.storeData.items;

  recentlyAddProducts.value = Object.fromEntries(
    Object.entries(productItems.value).filter(
      (el, i, array) => i > array.length - 11
    )
  );

  let sliderSlides = [
    ...document.querySelectorAll(".recently-add-slider-slide"),
  ];
  let prevBtn = [...document.querySelectorAll(".btn-prev-slide-recently-add")];
  let nextBtn = [...document.querySelectorAll(".btn-next-slide-recently-add")];

  sliderSlides.forEach((item, index) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nextBtn[index].addEventListener("click", () => {
      item.scrollLeft += containerWidth;
      document
        .querySelector(".btn-prev-slide-recently-add")
        .classList.add("active");
    });

    prevBtn[index].addEventListener("click", () => {
      item.scrollLeft -= containerWidth;
      if (item.scrollLeft - containerWidth <= 0)
        document
          .querySelector(".btn-prev-slide-recently-add")
          .classList.remove("active");
    });
  });
});
</script>

<style scoped>
.recently-add-slider-slide {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
}
.recently-add-product {
  margin: 1rem;
}
.btn-recently-add {
  display: none;
}
h2 {
  font-size: 2rem;
  margin-left: 1rem;
}
@media only screen and (max-width: 1200px) {
  .recently-add-slider-slide {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media only screen and (max-width: 1000px) {
  .recently-add-slider-slide {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media only screen and (max-width: 830px) {
  .recently-add-container {
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
  }
  h2 {
    padding-left: 1.75rem;
    font-size: 3rem;
  }
  .recently-add-slider-slide {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 22rem;
    margin: 0 auto;
    overflow-x: auto;
    scroll-behavior: smooth;
  }
  .recently-add-slider-slide::-webkit-scrollbar {
    display: none;
  }
  .recently-add-product {
    width: 14rem;
    height: 20rem;
    margin: 0.5rem;
  }
  .btn-recently-add {
    display: block;
  }
  .btn-recently-add {
    position: absolute;
    border: none;
    background-color: rgb(233, 231, 231);
    z-index: 9;
    opacity: 0.5;
  }
  .btn-recently-add:hover {
    cursor: pointer;
    border: 0.2rem solid black;
    opacity: 0.7;
  }
  .img-btn-recently-add {
    height: 3rem;
    width: 3rem;
  }
  .btn-prev-slide-recently-add {
    display: none;
  }
  .btn-prev-slide-recently-add.active {
    display: block;
  }
  .btn-next-slide-recently-add {
    right: 2%;
  }
}
</style>
