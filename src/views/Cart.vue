<template>
  <div v-if="amountItemInCart" class="page-container">
    <div class="title">
      Koszyk <span>{{ amountItemInCart }}</span>
    </div>
    <div class="basket-picture">
      <img src="../assets/empty-cart.svg" alt="basket picture" />
    </div>
    <div class="cart-item-container">
      <CartItem
        v-for="itemCart in storeCartItems"
        :url="itemCart[1]['urlPicture']"
        :name="itemCart[1]['name']"
        :price="itemCart[1]['price']"
        :id="itemCart[0]"
        :count="itemCart[1]['count']"
      />
    </div>
    <div class="summary">
      <div class="summary-title">Do zapłaty: {{ store.totalPrice }}</div>
      <button class="summary-button">Zapłać</button>
    </div>
    <div class="payment-and-delivery">
      <h2>Spsób dostawy</h2>
      <div>
        <input type="radio" name="delivery" id="carrier" value="carrier" />
        <label for="carrier">Kurier</label>
      </div>
      <div>
        <input
          type="radio"
          name="delivery"
          id="package-locker"
          value="package-locker"
        />
        <label for="package-locker">Autopmat paczkowy</label>
      </div>
      <div>
        <input type="radio" name="delivery" id="personal" value="personal" />
        <label for="personal">Odbiór osobisty</label>
      </div>
      <h2>Płatność</h2>
      <div>
        <input type="radio" name="payment" id="transfer" value="transfer" />
        <label for="transfer">Przelew bankowy</label>
      </div>
      <div>
        <input type="radio" name="payment" id="personally" value="personally" />
        <label for="personally">Płatność przy odbiorze</label>
      </div>
    </div>
  </div>
  <div v-else class="empty-basket">
    Twój koszyk jest pusty
    <img src="../assets/empty-cart.svg" alt="empty basket picture" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "../stores/cart";
import CartItem from "../components/CartItem.vue";

const store = useCartStore();

const storeCartItems = computed(() => store.cartItems);

const amountItemInCart = computed(() => store.cartItems.length);

window.onbeforeunload = () => {
  window.localStorage.setItem("CART_STORAGE", JSON.stringify(store.cartItems));
};
</script>

<style scoped>
.page-container {
  display: grid;
  grid-template-columns: [col-1-start] 75rem [col-2-start] 45rem [col-2-end];
  grid-template-rows: [row-1-start] 9em [row-2-start] 1fr [row-3-start] 30rem [row-3-end];
  max-width: 120rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3rem;
  background-color: white;
}
.title {
  font-size: 3rem;
  margin-left: 3rem;
}
.title span {
  color: var(--textLightColor);
}
.basket-picture {
  margin-left: 2rem;
}
img {
  width: 7rem;
  height: 7rem;
  margin-left: auto;
  margin-right: auto;
}
.cart-item-container {
  margin-left: auto;
  margin-right: auto;
}
.summary {
  height: 15rem;
  width: 40rem;
  padding-left: 3rem;
  padding-right: 3rem;
  border-radius: 1rem;
  box-shadow: var(--shadowSearchInputHover);
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
}
.summary-title {
  font-size: 3rem;
  color: black;
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
}
.summary-button {
  width: 100%;
  height: 3.5rem;
  background-color: var(--mainColor);
  border-radius: 4rem;
  border: 0px;
  color: white;
}
.summary-button:hover {
  cursor: pointer;
  box-shadow: var(--shadowSearchInputHover);
  transition: 0.3s;
}

.payment-and-delivery {
  margin-left: 2rem;
  padding: 2rem;
}
.payment-and-delivery h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  margin-top: 2rem;
}
.payment-and-delivery div {
  margin-bottom: 1.6rem;
}
.payment-and-delivery input {
  margin-right: 0.6rem;
}
.payment-and-delivery label {
  font-size: 1.3rem;
}

.payment-and-delivery input[type="radio"]:after {
  width: 25px;
  height: 25px;
  border-radius: 15px;
  top: -5px;
  left: -9px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
.payment-and-delivery input[type="radio"]:checked:after {
  width: 25px;
  height: 25px;
  border-radius: 15px;
  top: -5px;
  left: -9px;
  position: relative;
  background-color: var(--mainColor);
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
.empty-basket {
  padding-top: 2rem;
  font-size: 3rem;
  color: var(--textLightColor);
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
.empty-basket img {
  display: block;
  margin-top: 2rem;
  height: 16rem;
  width: 16rem;
}

@media only screen and (max-width: 1200px) {
  .page-container {
    grid-template-columns: [col-1-start] 1fr [col-2-start] 1fr [col-2-end];
    grid-template-rows: [row-1-start] 9em [row-2-start] 1fr [row-3-start] 30rem [row-3-end];
  }
  .title {
    margin-left: auto;
    margin-right: auto;
  }
  .basket-picture {
    margin-left: auto;
    margin-right: auto;
  }
  .cart-item-container {
    grid-column: 1 / 3;
    margin-left: auto;
    margin-right: auto;
  }
  .payment-and-delivery {
    grid-row-start: row-3-start;
    grid-row-end: row-3-end;
    grid-column-start: col-1-start;
    grid-column-end: col-2-start;
    margin-left: auto;
    margin-right: 15rem;
  }
  .summary {
    grid-row-start: row-3-start;
    grid-row-end: row-3-end;
    grid-column-start: col-2-start;
    grid-column-end: col-2-end;
    margin-left: 0;
    margin-right: auto;
    margin-top: 4rem;
    padding: 1rem;
    width: 35rem;
  }
}

@media only screen and (max-width: 750px) {
  .payment-and-delivery {
    grid-row-start: row-3-start;
    grid-row-end: row-3-end;
    grid-column-start: col-1-start;
    grid-column-end: col-2-end;
    margin-left: auto;
    margin-right: auto;
  }
  .summary {
    grid-row-start: row-4-start;
    grid-row-end: row-4-end;
    grid-column-start: col-1-start;
    grid-column-end: col-2-end;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
  }
}
@media only screen and (max-width: 480px) {
  .summary {
    height: 15rem;
    width: 90%;
    margin: 1rem 1rem 0rem 0rem;
    padding-left: 3rem;
    padding-right: 3rem;
    border-radius: 1rem;
    box-shadow: var(--shadowSearchInputHover);
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
  }
  .summary-title {
    font-size: 3rem;
    color: black;
    margin: 1rem 0 1.2rem 0;
  }
}
</style>
