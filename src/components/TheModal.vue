<template>
  <transition name="modal-animation">
    <div v-show="storeInteraction.modalAddProductActive" class="modal">
      <Transition name="modal-animation-inner">
        <div
          v-show="storeInteraction.modalAddProductActive"
          class="modal-inner"
        >
          <div class="box-logo-close">
            <img
              src="../components/icons/iconCloseCircle.svg"
              alt="logo-close"
              class="logo-close"
              @click="storeInteraction.toggleCloseModalAddProduct()"
            />
          </div>
          <!--mnoadal content-->
          <slot></slot>
          <button
            @click="storeInteraction.toggleCloseModalAddProduct()"
            class="modal-close-btn"
          >
            Zamknij
          </button>
        </div>
      </Transition>
    </div>
  </transition>
</template>

<script setup>
import { useInteractionStore } from "../stores/interaction";
import { watch } from "vue";
import { useRouter } from "vue-router";

const storeInteraction = useInteractionStore();

const router = useRouter();
watch(
  () => storeInteraction.modalAddProductActive,
  (isActive) => {
    if (!isActive) {
      setTimeout(() => {
        router.push("/");
      }, 700);
    }
  }
);
</script>

<style style>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-enter-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.modal-animation-inner-leave-to {
  transform: scale(0.5);
}

.modal {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  height: 100vh;
  width: 100vw;
  background-color: transparent;
}
.modal-inner {
  position: relative;
  max-width: 64rem;
  width: 80%;
  height: 20rem;
  margin-top: 20rem;
  padding: 2rem;
  background-color: white;
  box-shadow: var(--shadowSearchInputHover);
}
.modal-inner img {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  width: 2.3rem;
}
.modal-inner img:hover {
  cursor: pointer;
}
.modal-close-btn {
  position: absolute;
  bottom: 3rem;
  width: 22rem;
  height: 4rem;
  margin-top: 1.5rem;
  background-color: transparent;
  border: 0.1rem solid var(--redColor);
  border-radius: 3rem;
  transition: 0.4s;
}
.modal-close-btn:hover {
  color: white;
  background-color: var(--redColor);
}
</style>
