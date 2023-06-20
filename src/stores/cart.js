import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useGetItemStore } from "./items";

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref(JSON.parse(localStorage.getItem("CART_STORAGE")) ?? []);

  const totalPrice = computed(() =>
    cartItems.value.reduce((acc, curr) => {
      return acc + curr[1].price * curr[1].count;
    }, 0)
  );

  function addCartItemStore(id) {
    let addItem = cartItems.value.find((el) => el[0] === id.toString());

    if (addItem) {
      addItem[1].count++;
    } else {
      const storeItem = useGetItemStore();

      const arrStoreItem = Object.entries(storeItem.compStoreData);

      cartItems.value.push(arrStoreItem.find((el) => el[0] === id.toString()));
    }
  }

  function removeCartItem(id) {
    let findItem = cartItems.value.find((el) => el[0] === id.toString());
    findItem[1].count = 1;

    let result = cartItems.value.filter((el) => el[0] !== id.toString());
    cartItems.value = result;
  }

  function increaseAmountItem(id) {
    let result = cartItems.value.find((el) => el[0] === id.toString());
    result[1].count++;
  }

  function decreaseAmountItem(id) {
    let result = cartItems.value.find((el) => el[0] === id.toString());
    result[1].count > 1 ? result[1].count-- : (result[1].count = 1);
  }

  return {
    cartItems,
    totalPrice,
    addCartItemStore,
    removeCartItem,
    increaseAmountItem,
    decreaseAmountItem,
  };
});
