<template>
  <Header></Header>
  <RouterView></RouterView>
  <Footer></Footer>
</template>

<script setup>
import Header from "./components/TheHeader.vue";
import Footer from "./components/TheFooter.vue";
import { useGetItemStore } from "./stores/items";
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { useAccountStore } from "./stores/account";

const store = useGetItemStore();

const accountStore = useAccountStore();

onMounted(() => {
  accountStore.autologin();
  store.getDataItems();
});
</script>

<style scoped></style>
