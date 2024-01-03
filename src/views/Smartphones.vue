<template>
  <div class="container">
    <div class="smartfon-image">
      <img src="../assets/smartfon-picture.svg" alt="smartfon-picture" />
    </div>
    <div class="title">
      Smartfony <span> ({{ items.length }})</span>
      <button class="site-bar-button" @click="clickSiteBarButton">
        Sortowane i filtrowanie
      </button>
    </div>
    <div class="site-bar" :class="{ active: isActive }">
      <div class="sort">
        <button class="arrow-site-bar" @click="clickSiteBarButton">
          <img
            src="../components/icons/iconArrowSitebar.svg"
            class="arrow-icon"
            alt="arrow-img"
          />
        </button>
        <h2>Sortowanie</h2>
        <select id="sort-item" @input="(event) => sortConditionSet(event)">
          <option value="popular">Od najpopularniejszych</option>
          <option value="theCheapest">Cena: Od najtańszych</option>
          <option value="theMostExpensive">Cena: Od najdroższych</option>
        </select>
      </div>
      <div class="filters">
        <h2>Filtry</h2>
        <div class="producent">
          <h3>Producent</h3>
          <div>
            <input
              type="checkbox"
              name="apple"
              id="apple"
              value="apple"
              @input="(e) => checkedProducentSet(e)"
            />
            <label for="apple">Apple(szt)</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="samsung"
              value="samsung"
              @input="(e) => checkedProducentSet(e)"
            />
            <label for="samsung">Samsung(szt)</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="xiaomi"
              id="xiaomi"
              value="xiaomi"
              @input="(e) => checkedProducentSet(e)"
            />
            <label for="xiaomi">Xiaomi(szt)</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="realme"
              id="realme"
              value="realme"
              @input="(e) => checkedProducentSet(e)"
            />
            <label for="realme">Realme(szt)</label>
          </div>
        </div>
        <div class="price">
          <h3>Cena</h3>
          <input
            type="number"
            placeholder="od  "
            name="fromPrice"
            @input="(e) => fromPriceSet(e)"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="do"
            name="toPrice"
            @input="(e) => toPriceSet(e)"
          />
        </div>
      </div>
    </div>

    <div class="content" v-if="emptyPointSmartfon">
      <ProductItem
        v-for="(item, nodeId) in items"
        :key="nodeId"
        :urlPictureItem="item.urlPicture"
        :nameItem="item.name"
        :screenItem="item.screen"
        :ramItem="item.ram"
        :processorItem="item.processor"
        :priceItem="item.price"
        :id="item.id"
      >
      </ProductItem>
    </div>
    <div class="emptyPoint" v-else>Nie znaleziono produktów</div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useGetItemStore } from "../stores/items";
import ProductItem from "../components/ProductItem.vue";

let isActive = ref(false);

const clickSiteBarButton = () => (isActive.value = !isActive.value);

let response;

let items = ref({});

const store = useGetItemStore();

onMounted(async () => {
  response = await store.getDataItems();

  items.value = response;
});

/**  Filter and sort items **/
let checkedProducent = [];
let fromPrice;
let toPrice;
let sortCondition;

const sortItems = () => {
  let sortedItems = response;

  sortCondition === "theCheapest" &&
    sortedItems.sort((a, b) => a.price - b.price);
  sortCondition === "theMostExpensive" &&
    sortedItems.sort((a, b) => b.price - a.price);

  filterByProducent(sortedItems);
};

const filterByProducent = (sortedItems) => {
  let filterByProducent = sortedItems;
  if (checkedProducent.length) {
    filterByProducent = sortedItems.filter(filterByCheckProducent);
  }
  filterByPrice(filterByProducent);
};

const filterByCheckProducent = (el) => {
  let empty = false;
  checkedProducent.forEach((producent) => {
    el.name.toLowerCase().includes(producent.toLowerCase()) && (empty = true);
  });
  return empty;
};

const filterByPrice = (filterByProducent) => {
  !fromPrice && (fromPrice = 0);
  !toPrice && (toPrice = 100000);

  let result;
  if (fromPrice <= toPrice) {
    result = filterByProducent.filter(
      (el) =>
        parseFloat(fromPrice) <= parseFloat(el.price) &&
        parseFloat(el.price) <= parseFloat(toPrice)
    );
  } else {
    result = [];
  }
  items.value = result;
};

const checkedProducentSet = (e) => {
  e.target.checked
    ? checkedProducent.push(e.target.value)
    : checkedProducent.splice(checkedProducent.indexOf(e.target.value), 1);
  sortItems();
};

const sortConditionSet = (e) => {
  sortCondition = e.target.value;
  sortItems();
};

const fromPriceSet = (e) => {
  fromPrice = parseInt(e.target.value);
  sortItems();
};

const toPriceSet = (e) => {
  toPrice = parseInt(e.target.value);
  sortItems();
};

/**  check empty state   **/

const emptyPointSmartfon = computed(() => items.value.length);
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: 19em 1fr;
  max-width: 120rem;
  margin-left: auto;
  margin-right: auto;
  padding: 3rem;
  background-color: white;
}
img {
  width: 19rem;
  height: 19rem;
  margin-left: auto;
  margin-right: auto;
}
.title {
  position: relative;
  margin-top: 7rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  font-size: 2.5rem;
}
span {
  color: var(--textLightColor);
  font-weight: 500;
}
.site-bar-button {
  display: none;
}
.sort {
  min-width: 25rem;
  height: 10rem;
  padding: 1rem;
  margin-right: 1rem;
  border: 1px solid var(--mainColor);
  border-bottom: none;
  border-radius: 1rem 1rem 0rem 0rem;
}
.arrow-site-bar {
  display: none;
}
select {
  width: 100%;
  height: 2.6rem;
  padding-left: 1rem;
  border-radius: 2rem;
  outline: none;
  border: 0.1rem solid var(--mainColor);
}
select option {
  appearance: none;
  border-radius: 2rem;
  height: 3rem;
}
.filters {
  min-width: 25rem;
  height: 32rem;
  padding: 1rem;
  margin-right: 1rem;
  border: 1px solid var(--mainColor);
  border-radius: 0rem 0rem 1rem 1rem;
}
h2 {
  font-weight: 600;
  font-size: 2.4rem;
  letter-spacing: 0.1rem;
  margin-bottom: 2rem;
}
h3 {
  font-size: 1.8rem;
  font-weight: 500;
}
.producent {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
input[type="checkbox"] {
  position: relative;
  cursor: pointer;
  margin-right: 1rem;
}
input[type="checkbox"]:before {
  content: "";
  display: block;
  position: absolute;
  width: 1.7rem;
  height: 1.7rem;
  top: -0.2rem;
  left: -0.2rem;
  border: 0.1rem solid var(--textLightColor);
  border-radius: 0.4rem;
  background-color: white;
}
input[type="checkbox"]:checked:after {
  content: "";
  display: block;
  width: 5px;
  height: 10px;
  border: solid var(--mainColor);
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: 0.1rem;
  left: 0.4rem;
}
.price input {
  width: 10rem;
  height: 2.6rem;
  padding-left: 1rem;
  margin-top: 1rem;
  border-radius: 2rem;
  outline: none;
  border: 0.1rem solid var(--mainColor);
}
span {
  margin: 0.5rem;
}
.content {
  grid-row: 2/4;
  grid-column: 2/3;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
}
.emptyPoint {
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  margin-bottom: 60vh;
  font-size: 2rem;
}
@media only screen and (max-width: 1080px) {
  .container {
    padding: 0;
  }
  .sort {
    height: 15rem;
    border: none;
  }
  .site-bar-button {
    display: block;
    position: absolute;
    bottom: 2rem;
    width: 20rem;
    height: 3rem;
    border: 0.1rem solid var(--mainColor);
    border-radius: 5rem;
    background-color: transparent;
  }
  .site-bar-button:hover {
    box-shadow: var(--shadowSearchInputHover);
  }
  .arrow-site-bar {
    display: contents;
    background-color: transparent;
    border: none;
  }
  .arrow-icon {
    height: 3rem;
    width: 3rem;
  }
  .filters {
    border-left: none;
    border-right: none;
    border-bottom: none;
  }
  .site-bar {
    z-index: 1000;
    background-color: white;
    width: 100vw;
    height: 100%;
    position: absolute;
    transform: translate(-100%);
    transition: all 0.3s;
  }
  .site-bar.active {
    transform: translate(0%);
  }
  img {
    margin: 0;
  }
  .smartfon-image {
    display: flex;
    justify-content: flex-end;
  }
  .title {
    display: flex;
    justify-content: center;
  }
  .content {
    grid-row: 2 / span 2;
    grid-column: span 2;
  }
  .emptyPoint {
    grid-column: 1/3;
  }
}
@media only screen and (max-width: 500px) {
  .container {
    grid-template-columns: 25rem 1fr;
    grid-template-rows: 19em 12rem 1fr;
  }
  .smartfon-image {
    grid-column: 1 / 3;
    display: flex;
    justify-content: center;
  }
  .title {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  .content {
    grid-row: 3 / end;
  }
}
</style>
