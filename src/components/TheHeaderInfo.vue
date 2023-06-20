<template>
  <div class="info-container">
    <div class="info info-start">
      Czas na zmiane telefonu? Sprzedaj go logując sie,
    </div>
    <RouterLink to="/isSignIn">
      <button class="main-login-btn" v-if="!storeAccount.isAuth">
        Zaloguj się
      </button>
    </RouterLink>
    <div class="info info-end">
      a może przy okazji znajdziesz tutaj swój nowy smartfon
    </div>
  </div>
</template>

<script setup>
import { useAccountStore } from "../stores/account";

const storeAccount = useAccountStore();

</script>

<style scoped>
.info-container {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
}
.info {
  position: relative;
  margin: auto 0;
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(61, 60, 60);
  overflow-wrap: break-word;
}
.info::before {
  content: "";
  position: absolute;
  background-image: linear-gradient(
    114deg,
    #fff 12% 1%,
    #c6f5ef 48% 0%,
    #00bfa6 79% 100%
  );
  background-size: 300%;
  background-position: left;
  z-index: -1;
  top: 1rem;
  left: 1rem;
  width: 100%;
  height: 110%;
  animation: bg-animation 5s infinite alternate;
}
@keyframes bg-animation {
  0% {
    background-position: left;
  }
  100% {
    background-position: right;
  }
}
.info-start {
  grid-column: 1 / 4;
  max-width: max-content;
}
.info-end {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
}
.main-login-btn {
  position: absolute;
  top: 0.1rem;
  left: -19rem;
  grid-column: 3 / 4;
  grid-row: 3 / 4;
  width: 22rem;
  height: 4.5rem;
  background-image: linear-gradient(139deg, #fff 0% 3%, #89aff0 100%); 
  background-size: 400%;
  background-position: left;
  border: 0.1rem solid #84a9e9;
  border-radius: 4rem;
  box-shadow: 7px 5px 24px -12px rgba(66, 68, 90, 1);
  transition: background-position 1.5s;
}

.main-login-btn:hover {
  background-position: right;
  color: #ffffff;
}
.main-shop-picture {
  height: 7rem;
}
.image-box {
  grid-column: 4 / 5;
  grid-row: 1 / 3;
  justify-content: end;
  display: flex;
  justify-content: end;
}
@media only screen and (max-width: 1200px) {
  .info-start {
    grid-column: 1 / 4;
  }
}
</style>
