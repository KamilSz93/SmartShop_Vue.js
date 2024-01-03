import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useGetItemStore } from "./items";

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref(JSON.parse(localStorage.getItem("CART_STORAGE")) ?? []);

  const totalPrice = computed(() =>
    cartItems.value.reduce((acc, curr) => {
      return acc + curr.price * curr.count;
    }, 0)
  );

  async function addCartItemStore(id) {
    const store = useGetItemStore();
    const storeItems = await store.getDataItems();

    if (!cartItems.value.length) {
    
      cartItems.value.push(storeItems.find((el) => el.id === id.toString()));
    } else {
      let addedItem = cartItems.value.find((el) => el.id === id.toString());

      if (addedItem) {
        addedItem.count++;
      } else {
        cartItems.value.push(storeItems.find((el) => el.id === id.toString()));
      }
    }
    localStorage.setItem("CART_STORAGE", JSON.stringify(cartItems.value));
  }

  function removeCartItem(id) {
    cartItems.value = cartItems.value.filter((el) => el.id !== id.toString());
    localStorage.setItem("CART_STORAGE", JSON.stringify(cartItems.value));
  }

  function increaseAmountItem(id) {
    let result = cartItems.value.find((el) => el.id === id.toString());

    result.count++;
    localStorage.setItem("CART_STORAGE", JSON.stringify(cartItems.value));
  }

  function decreaseAmountItem(id) {
    let result = cartItems.value.find((el) => el.id === id.toString());
    result.count > 1 ? result.count-- : (result.count = 1);
    localStorage.setItem("CART_STORAGE", JSON.stringify(cartItems.value));
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
