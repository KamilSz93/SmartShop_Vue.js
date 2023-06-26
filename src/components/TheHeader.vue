<template>
  <header>
    <div class="logo">
      <RouterLink to="/"
        ><img
          src="../assets/main-logo.png"
          alt="main-logo"
          @click="() => (isActive = false)"
      /></RouterLink>
    </div>
    <div class="search-bar">
      <input
        type="text"
        @input="(e) => searchHandler(e.target.value)"
        @keyup.enter="(e) => searchHandler(e.target.value)"
        class="search-bar-input"
        placeholder="Czego szukasz?"
      />
    </div>
    <ul class="categories" :class="{ active: isActive }">
      <li @click="changeActivSiteMenu">
        <RouterLink to="/smartphones">Smartfony</RouterLink>
      </li>
      <li @click="changeActivSiteMenu">
        <RouterLink to="/emptyPage">Etui i pokrowce</RouterLink>
      </li>
      <li @click="changeActivSiteMenu">
        <RouterLink to="/emptyPage">Folie ochronne</RouterLink>
      </li>
      <li @click="changeActivSiteMenu">
        <RouterLink to="/emptyPage">Ladowarki</RouterLink>
      </li>
      <li @click="changeActivSiteMenu">
        <RouterLink to="/emptyPage">Uchwyty</RouterLink>
      </li>
    </ul>
    <div class="menu-container">
      <RouterLink to="/isSignIn">
        <img
          v-if="storeAccount.isAuth"
          src="../components/icons/logoPeopleActive.svg"
          alt="logo-account"
          class="logo-account"
        />
        <img
          v-else
          src="../components/icons/logoPeople.svg"
          alt="logo-account"
          class="logo-account"
        />
      </RouterLink>
      <RouterLink to="/cart">
        <div class="logo-basket" @click="() => (isActive = false)">
          <img src="../components/icons/logoBasket.svg" alt="logo-basket" />
          <div v-if="amountItemInCart" class="amount-produkts-basket">
            {{ amountItemInCart }}
          </div>
        </div>
      </RouterLink>
      <button
        class="burger-categories"
        @click="changeActivSiteMenu"
        :class="{ active: isActive }"
      >
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </button>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { computed } from "vue";
import { useCartStore } from "../stores/cart";
import { useRouter, useRoute } from "vue-router";
import { useAccountStore } from "../stores/account";

const props = defineProps(["quantityBasket"]);

const storeCart = useCartStore();

const storeAccount = useAccountStore();

const router = useRouter();

const amountItemInCart = computed(() => storeCart.cartItems.length);

let isActive = ref(false);

function changeActivSiteMenu() {
  isActive.value = !isActive.value;
}

function searchHandler(e) {
  if (e.trim()) pushWithParams(e);
  else router.push("/");
}

function pushWithParams(e) {
  router.push({
    name: "search",
    params: {
      keyword: e,
    },
  });
}
</script>

<style scoped>
header {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem;
  box-shadow: var(--shadowNav);
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
}
.logo {
  width: 10.1rem;
  height: 4rem;
  padding-left: 2rem;
}
img {
  height: 100%;
}
.search-bar {
  width: calc(100% - 90rem);
  min-width: 20rem;
}
.search-bar-input {
  height: 3.4rem;
  width: 100%;
  max-width: 58rem;
  padding: 1rem;
  border-radius: 2rem;
  border: 0.1rem solid var(--textLightColor);
}
.search-bar-input:focus {
  outline: none;
  box-shadow: var(--shadowSearchInputHover);
}
.menu-container {
  display: flex;
}

.logo-basket {
  position: relative;
  height: 3.4rem;
  cursor: pointer;
}
.amount-produkts-basket {
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  color: white;
  padding-left: 0.7rem;
  padding-top: 0.3rem;
  background-color: var(--redColor);
  position: absolute;
  left: 2.3rem;
  top: -0.5rem;
}
.logo-account {
  height: 2.8rem;
  cursor: pointer;
  margin-top: 0.3rem;
  margin-right: 0.7rem;
}
.categories {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50rem;
  list-style: none;
  font-size: 1.4rem;
}
.categories li a {
  text-decoration: none;
  color: black;
}
.categories li {
  cursor: pointer;
  position: relative;
  padding-bottom: 0.2rem;
  transform: translate(0%);
}
.categories li::after {
  content: "";
  position: absolute;
  bottom: -0.2rem;
  left: 0rem;
  height: 0.4rem;
  width: 0%;
  border-radius: 2.5rem;
  background-image: var(--mainHover);
  transition: 0.3s ease-in-out;
}
.categories li:hover::after {
  width: 100%;
}
.burger-categories {
  display: none;
}

@media only screen and (max-width: 1080px) {
  header {
    flex-wrap: wrap;
    justify-content: space-between;
    height: 14vh;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .search-bar {
    order: 4;
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.2rem;
  }
  .search-bar-input {
    max-width: none;
  }
  .logo {
    margin-right: -1.9rem;
  }
  .menu-container {
    margin-right: 0.5rem;
  }
  .categories {
    position: absolute;
    left: 0;
    top: 14vh;
    background-color: white;
    height: 90vh;
    width: 30rem;
    padding: 2rem;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    transform: translate(-100%);
    transition: 0.3s ease-in-out;
  }
  .categories.active {
    transform: translate(0%);
  }
  .categories li {
    font-size: 2.3rem;
    margin: 2rem;
  }
  .burger-categories {
    display: block;
    height: 2.9rem;
    margin-left: 2.9rem;
    background-color: transparent;
    cursor: pointer;
    border: none;
  }
  .line {
    background-color: black;
    width: 3.5rem;
    height: 0.5rem;
    margin: 0.5rem;
    border-radius: 3.7rem;
    transition: 0.3s linear;
  }
  .burger-categories.active .line:nth-child(2) {
    background-color: transparent;
  }
  .burger-categories.active .line:nth-child(1) {
    transform: rotate(45deg) translateY(9px) translateX(5px);
  }
  .burger-categories.active .line:nth-child(3) {
    transform: rotate(-45deg) translateY(-9px) translateX(5px);
  }
}
@media only screen and (max-width: 480px) {
  .categories {
    width: 100%;
  }
  .logo {
    padding: 0;
  }
}
</style>
