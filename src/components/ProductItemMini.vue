<template>
  <div class="product-mini-item">
    <div class="product-mini-box-image">
      <img
        :src="urlPictureItem"
        class="product-mini-image"
        alt="product-mini-image"
      />
    </div>
    <div class="product-mini-name">{{ nameItem }}</div>
    <div class="product-mini-price">{{ priceItem }} zł</div>
    <button
      class="product-mini-add-to-basket-btn"
      @click="store.addCartItemStore(props.id)"
    >
      Dodaj do koszyka
    </button>
  </div>
</template>

<script setup>
import { useCartStore } from "../stores/cart.js";

const props = defineProps(["nameItem", "urlPictureItem", "priceItem", "id"]);

const store = useCartStore();
</script>

<style>
.product-mini-item {
  min-width: 14rem;
  height: 20rem;
  box-shadow: var(--shadowSearchInputHover);
  background-color: white;
  margin: 0 0rem 0.5rem 0.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
}
.product-mini-box-image {
  display: flex;
  justify-content: center;
  align-items: center;
}
.product-mini-image {
  height: 9rem;
  width: 10rem;
  object-fit: cover;
  border-radius: 0.5rem;
}
.product-mini-name {
  margin-top: 1rem;
  font-size: 1.1rem;
}
.product-mini-price {
  margin-top: 0.3rem;
  font-size: 1.8rem;
  font-weight: 500;
}
.product-mini-add-to-basket-btn {
  width: 100%;
  height: 2.5rem;
  margin-top: 1rem;
  font-size: 1rem;
  background-color: transparent;
  border: 0.1rem solid var(--mainColor);
  border-radius: 4rem;
  transition: 0.4s;
}
.product-mini-add-to-basket-btn:hover {
  color: white;
  background-color: var(--mainColor);
}
</style>
