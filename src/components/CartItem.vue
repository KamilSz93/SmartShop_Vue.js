<template>
  <div class="container-cart">
    <img :src="props.url" alt="product-picture" />
    <div class="name-item-cart">{{ props.name }}</div>
    <div class="count-product-cart">
      <button
        class="decrease-count-product-button"
        @click="store.decreaseAmountItem(props.id)"
      >
        -
      </button>
      <input class="count-product-cart-input" disabled :value="countItem" />
      <button
        class="increase-count-product-button"
        @click="store.increaseAmountItem(props.id)"
      >
        +
      </button>
    </div>
    <div class="price-item-cart">{{ props.price }}</div>
    <button
      class="delete-item-cart-button"
      @click="store.removeCartItem(props.id)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-trash3"
        viewBox="0 0 16 16"
      >
        <path
          d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { useCartStore } from "../stores/cart";
import { computed } from "vue";

const props = defineProps(["url", "name", "price", "id", "count"]);

const store = useCartStore();

let countItem = computed(() => props.count);
</script>

<style scoped>
.container-cart {
  display: flex;
  margin-bottom: 2rem;
  align-items: center;
  justify-content: space-around;
  width: 72rem;
  height: 10rem;
  border-radius: 1rem;
  box-shadow: var(--shadowSearchInputHover);
}
.container-cart img {
  height: 10rem;
  width: 11rem;
  padding: 0.4rem;
  margin: 0 -2.5rem;
  object-fit: contain;
}
.name-item-cart {
  font-size: 3rem;
  width: 19rem;
  overflow: hidden;
}
.count-product-cart button {
  background-color: var(--mainColor);
  color: white;
  height: 3rem;
  width: 3rem;
  border: none;
  border-radius: 3rem;
}
.count-product-cart button:hover {
  cursor: pointer;
  box-shadow: var(--shadowSearchInputHover);
}
.count-product-cart-input {
  margin: 0.6rem;
  width: 5rem;
  height: 3rem;
  padding-left: 2rem;
  border-radius: 2rem;
  border: 0.1rem solid var(--textLightColor);
  background-color: transparent;
}
.price-item-cart {
  width: 11rem;
  font-size: 3rem;
  overflow: hidden;
}
.delete-item-cart-button {
  color: white;
  padding: 1rem;
  background-color: var(--redColor);
  border: none;
  height: 10rem;
  width: 3rem;
  margin-right: -2.5rem;
  border-radius: 0 1rem 1rem 0;
}
.delete-item-cart-button:hover {
  cursor: pointer;
}

@media only screen and (max-width: 750px) {
  .container-cart {
    width: 40rem;
    height: 15rem;
    display: grid;
    grid-template-columns: [col-1-start] 10rem [col-2-start] 1fr [col-3-start] 1fr [col-4-start] 4rem [col-4-end];
    grid-template-rows: [row-1-start] 7.5rem [row-2-start] 7.5rem [row-2-end];
  }
  .container-cart img {
    grid-row: 1 /3;
    margin-left: -0.3rem;
  }
  .name-item-cart {
    grid-row-start: row-1-start;
    grid-row-end: row-2-start;
    grid-column-start: col-2-start;
    grid-column-end: col-4-start;
    margin-top: 2rem;
    margin-left: 1rem;
  }
  .count-product-cart {
    grid-row-start: row-2-start;
    grid-row-end: row-2-end;
    grid-column-start: col-2-start;
    grid-column-end: col-3-start;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
  }
  .price-item-cart {
    grid-row-start: row-2-start;
    grid-row-end: row-2-end;
    grid-column-start: col-3-start;
    grid-column-end: col-4-start;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
  }
  .delete-item-cart-button {
    grid-row-start: row-1-start;
    grid-row-end: row-2-end;
    grid-column-start: col-4-start;
    grid-column-end: col-4-end;
    height: 15rem;
    width: 4rem;
  }
}
@media only screen and (max-width: 750px) {
  .container-cart {
    width: 30rem;
    height: 11rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    display: grid;
    grid-template-columns: [col-1-start] 10rem [col-2-start] 1fr [col-3-start] 1fr [col-4-start] 4rem [col-4-end];
    grid-template-rows: [row-1-start] 5.5rem [row-2-start] 5.5rem [row-2-end];
  }
  .container-cart img {
    height: 7rem;
    width: 8rem;
    padding: 0rem;
    margin: 0 1rem;
  }
  .name-item-cart {
    font-size: 1.5rem;
    width: 7rem;
    margin: 0;
  }
  .count-product-cart {
    margin: 0 0 1rem 0;
    width: 12rem;
  }
  .count-product-cart button {
    background-color: var(--mainColor);
    color: white;
    height: 3rem;
    width: 3rem;
    border: none;
    border-radius: 3rem;
  }
  .count-product-cart button:hover {
    cursor: pointer;
    box-shadow: var(--shadowSearchInputHover);
  }
  .count-product-cart-input {
    margin: 0.6rem;
    width: 3rem;
    height: 3rem;
    padding-left: 1rem;
    border-radius: 2rem;
    border: 0.1rem solid var(--textLightColor);
    background-color: transparent;
  }
  .price-item-cart {
    width: 5.5rem;
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 6rem;
  }
  .delete-item-cart-button {
    color: white;
    padding: 0rem;
    background-color: var(--redColor);
    border: none;
    height: 11rem;
    width: 3.5rem;

    border-radius: 0 1rem 1rem 0;
  }
  .delete-item-cart-button:hover {
    cursor: pointer;
  }
}
</style>
