<template>
  <div class="product-item">
    <div class="product-image">
      <img :src="urlPictureItem" alt="product-image" />
    </div>
    <div class="product-name">{{ nameItem }}</div>
    <div class="product-description">
      ekran {{ screenItem }}, ram {{ ramItem }}, procesor {{ processorItem }}
    </div>
    <div class="product-price">{{ priceItem }} zł</div>
    <div class="product-add-to-basket">
      <button
        class="product-add-to-basket-btn"
        @click="store.addCartItemStore(props.id)"
      >
        Dodaj do koszyka
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "../stores/cart.js";

const props = defineProps([
  "nameItem",
  "urlPictureItem",
  "screenItem",
  "ramItem",
  "processorItem",
  "priceItem",
  "id",
]);

const store = useCartStore();
</script>

<style>
.product-item {
  position: relative;
  width: 26rem;
  height: 39rem;
  box-shadow: var(--shadowSearchInputHover);
  background-color: white;
  margin: 0 1.5rem 3rem 1.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
}
.product-image {
  height: 19rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.product-image img {
  width: 22rem;
}
.product-name {
  margin-top: 0.5rem;
  font-size: 2.4rem;
  overflow: hidden;
}
.product-description {
  overflow: auto;
  height: 4rem;
  word-break: break-all;
  margin-top: 0.5rem;
  font-size: 1.2rem;
}
.product-price {
  margin-top: 0.3rem;
  font-size: 1.8rem;
  font-weight: 500;
}
.product-add-to-basket {
  position: absolute;
  bottom: 2rem;
  width: 22rem;
  margin-left: auto;
  margin-right: auto;
}
.product-add-to-basket-btn {
  width: 100%;
  height: 3.5rem;
  background-color: transparent;
  border: 0.1rem solid var(--mainColor);
  border-radius: 4rem;
  transition: 0.4s;
}
.product-add-to-basket-btn:hover {
  color: white;
  background-color: var(--mainColor);
}
</style>
