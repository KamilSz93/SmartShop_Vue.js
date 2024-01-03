<template>
  <div class="container-promotion">
    <span></span>
    <div class="content">
      <h2>Promocja Dnia</h2>
      <img
        class="product-picture"
        :src="items.urlPicture"
        alt="img-promotion"
      />
      <div class="product-name">{{ items.name }}</div>
      <div class="prices">
        <div class="old-price">{{ `${items.price} zł` }}</div>
        <div class="new-price">{{ `${promotionPrice} zł` }}</div>
      </div>
      <button class="product-add-to-basket-btn" @click="(e) => addItem(e)">
        Kup teraz
      </button>
      <div class="countdown">
        <p>Na zakup masz jeszcze:</p>
        <div class="timer">
          <div class="hours">
            <p>Godziny</p>
            <div>{{ h }}</div>
          </div>
          <div class="minutes">
            <p>Minuty</p>
            <div>{{ m }}</div>
          </div>
          <div class="seconds">
            <p>Sekundy</p>
            <div>{{ s }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useGetItemStore } from "../stores/items";
import { useCartStore } from "../stores/cart.js";
import { computed } from "@vue/reactivity";
import { onAddItemTooltip } from "../composables/showTooltipAddToBasket";

const store = useGetItemStore();

const storeCard = useCartStore();

const items = ref({});

let response;

const promotionPrice = computed(() =>
  Math.floor(
    items.value["price"] - (parseFloat(items.value["price"]) * 20) / 100
  )
);

onMounted(async () => {
  response = await store.getDataItems();

  items.value = response[2]; //["-NPEzuY07LnOmfjMRQ2k"];
});

const addItem = (e) => {
  onAddItemTooltip(e);
  storeCard.addCartItemStore(items.value.id);
};

//* Timer *//
const h = ref();

const m = ref();

const s = ref();

setInterval(() => {
  const currentTime = new Date().getTime();

  const nextDay = new Date(
    `${new Date().getMonth() + 1} ${
      new Date().getDate() + 1
    } ${new Date().getFullYear()} 00:00:00`
  ).getTime();

  const diff = nextDay - currentTime.toString();

  h.value = Math.floor(diff / 1000 / 60 / 60) % 24;

  m.value =
    Math.floor(diff / 1000 / 60) % 60 < 10
      ? "0" + (Math.floor(diff / 1000 / 60) % 60)
      : Math.floor(diff / 1000 / 60) % 60;

  s.value =
    Math.floor(diff / 1000) % 60 < 10
      ? "0" + (Math.floor(diff / 1000) % 60)
      : Math.floor(diff / 1000) % 60;
}, 1000);
</script>

<style scoped>
.container-promotion {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 40rem;
  height: 50rem;
  padding: 2rem;
  overflow: hidden;
  border-radius: 1.2rem;
}
.container-promotion::after {
  content: "";
  position: absolute;
  width: 90rem;
  height: 80rem;
  background-image: conic-gradient(
    transparent,
    transparent,
    transparent,
    var(--redColor)
  );
  animation: animate 4s linear infinite;
  animation-delay: -2s;
}
.container-promotion::before {
  content: "";
  position: absolute;
  width: 90rem;
  height: 80rem;
  background-image: conic-gradient(
    transparent,
    transparent,
    transparent,
    var(--redColor)
  );
  animation: animate 4s linear infinite;
}
@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.container-promotion span {
  position: absolute;
  inset: 0.5rem;
  background-color: white;
  z-index: 1;
  border-radius: 1.2rem;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
}
h2 {
  font-size: 3rem;
  font-weight: 400;
  color: rgba(1, 1, 14, 0.767);
}
.product-picture {
  max-width: 30rem;
  max-height: 22rem;
}
.product-name {
}
.prices {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 2rem;
}
.old-price {
  font-size: 2rem;
  font-weight: 200;
  text-decoration: line-through;
}
.new-price {
  font-weight: 500;
  font-size: 2.5rem;
  color: var(--redColor);
}
.product-add-to-basket-btn {
  width: calc(100% - 2rem);
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
.countdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.countdown > p {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
}
.timer {
  display: flex;
  justify-content: space-around;
  margin-top: 0.2rem;
  font-size: 2.5rem;
  width: 25rem;
  color: rgb(163, 124, 84);
}
.timer div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.timer div p {
  font-size: 1.3rem;
}
@media only screen and (max-width: 1200px) {
  .container-promotion {
    width: 29rem;
  }
}
</style>
