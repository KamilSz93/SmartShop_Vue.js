<template>
  <div class="search-container">
    <header>
      <h1>
        Wynik wyszukiwania dla frazy:
        <span>{{ `"${searchPhase}"` }}</span>
      </h1>
      <h2>
        Ilość znalezionych produktów:
        <span>{{ `( ${countFoundProducts} )` }}</span>
      </h2>
    </header>
    <main>
      <div class="search-result">
        <ProductItem
          v-for="(item, nodeId) in itemView"
          :key="nodeId"
          :urlPictureItem="item.urlPicture"
          :nameItem="item.name"
          :screenItem="item.screen"
          :ramItem="item.ram"
          :processorItem="item.processor"
          :priceItem="item.price"
          :id="nodeId"
        ></ProductItem>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { useGetItemStore } from "../stores/items";
import ProductItem from "../components/ProductItem.vue";

const route = useRoute();

const storeItem = useGetItemStore();

let countFoundProducts = ref();

let searchPhase = ref();

let itemView;

watch(
  () => route.params.keyword,
  (newKeyword) => {
    searchItems(newKeyword);
  }
);

const searchItems = (phase) => {
  searchPhase.value = phase;

  let result = Object.entries(storeItem.storeData.items).filter((el) =>
    el[1].name.toLowerCase().includes(phase.toLowerCase().trim())
  );

  countFoundProducts = result.length;

  itemView = Object.fromEntries(result);
};

searchItems(route.params.keyword);
</script>

<style scoped>
.search-container {
  max-width: 120rem;
  margin: 0 auto;
}
header {
  margin: 3rem 0;
  padding-left: 3rem;
  color: var(--textLightColor);
}
h1 {
  font-size: 2.7rem;
}
h2 {
  font-size: 1.7rem;
}
span {
  font-weight: 500;
  color: black;
}
.search-result {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
@media only screen and (max-width: 1200px) {
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
  }
}
</style>
