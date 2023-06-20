import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useInteractionStore = defineStore("interaction", () => {
  //* State *//
  const modalAddProductActive = ref(false);
  //* Getters *//
  const isActiveModal = computed(() => modalAddProductActive.value);
  //* Action *//
  const toggleCloseModalAddProduct = () => {
    modalAddProductActive.value = !modalAddProductActive.value;
  };

  return { modalAddProductActive, isActiveModal, toggleCloseModalAddProduct };
});
