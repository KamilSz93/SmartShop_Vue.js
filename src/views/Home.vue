<template>
  <div class="container-home">
    <TheMainSlider class="main-slider"></TheMainSlider>
    <div class="content-wrapper">
      <ThePromotionDay class="promotion-day"></ThePromotionDay>
      <TheHeaderInfo class="header-info"></TheHeaderInfo>
      <TheRecentlyAdd class="recently-add"></TheRecentlyAdd>
      <TheForYouSlider class="for-you-slider"></TheForYouSlider>
    </div>
  </div>
</template>

<script setup>
import ThePromotionDay from "../components/ThePromotionDay.vue";
import TheMainSlider from "../components/TheMainSlider.vue";
import TheForYouSlider from "../components/TheForYouSlider.vue";
import TheRecentlyAdd from "../components/TheRecentlyAdd.vue";
import TheHeaderInfo from "../components/TheHeaderInfo.vue";
</script>

<style scoped>
.container-home {
  width: 100%;
}

.content-wrapper {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 0 auto;
  max-width: 120rem;
}
.header-info {
  grid-column: span 5;
  margin-left: 5rem;
}
.promotion-day {
  grid-column: span 2;
  grid-row: span 2;
  margin-left: 2rem;
  margin-top: 2rem;
}
.recently-add {
  grid-column: span 5;
  margin-left: 5rem;
}

.for-you-slider {
  grid-column: span 7;
}
@media only screen and (max-width: 1200px) {
  .content-wrapper {
    width: 100vw;
    padding: 0 1rem;
  }

  .promotion-day {
    grid-column: span 2;
  }
  .recently-add {
    margin: 0 auto;
    grid-column: span 5;
  }
}

@media only screen and (max-width: 830px) {
  .content-wrapper {
    gap: 3rem;
  }
  .header-info {
    grid-column: 1 / 8;
    grid-row: 1 / 2;
    margin: 0;
  }
  .promotion-day {
    grid-column: span 7;
    grid-row: 2 / 3;
    margin: 0 auto;
  }
  .recently-add {
    grid-column: span 7;
  }
}
@media only screen and (max-width: 480px) {
  .container-home {
    grid-template-rows: [row-1-start] 54rem [row-2-start];
    margin-top: 0rem;
  }
  .shop-home {
    width: 20rem;
  }
}
</style>
