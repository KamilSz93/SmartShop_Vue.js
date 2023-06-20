import { computed, ref } from "vue";
import { defineStore } from "pinia";
import authAxios from "../auth-axios";

export const useAccountStore = defineStore("account", () => {
  //* State *//
  let token = ref(null);
  let userId = ref(null);
  //* Getters *//
  const auth = {
    token: computed(() => token.value),
    userId: computed(() => userId.value),
  };
  const isAuth = computed(() => token.value !== null);
  //* Action *//
  async function signUp(payload) {
    try {
      let response = await authAxios.post(
        "/v1/accounts:signUp?key=AIzaSyBFdE1Y0M8JT7Xvz5ligAyH9gSDg1ACGHk",
        payload
      );

      const now = new Data();
      const endDate = new Date(now.getTime() + response.data.expiresIn * 1000);

      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("userId", response.data.localId);
      localStorage.setItem("expires", endDate);
    } catch (e) {
      console.log(e);
    }
  }

  async function signIn(payload) {
    try {
      let response = await authAxios.post(
        "/v1/accounts:signInWithPassword?key=AIzaSyBFdE1Y0M8JT7Xvz5ligAyH9gSDg1ACGHk",
        payload
      );

      token.value = response.data.idToken;
      userId.value = response.data.localId;

      const now = new Date();
      const endDate = new Date(now.getTime() + response.data.expiresIn * 1000);

      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("userId", response.data.localId);
      localStorage.setItem("expires", endDate);
    } catch (e) {
      console.log(e);
    }
  }
  function autologin() {
    const tokenLocal = localStorage.getItem("token");
    if (!tokenLocal) {
      return;
    }
    const userIdLocal = localStorage.getItem("userId");
    if (!userIdLocal) {
      return;
    }
    const expirationDate = new Date(localStorage.getItem("expires"));
    const now = new Date();

    if (now >= expirationDate) {
      console.log(now);
      localStorage.removeItem("token");
      localStorage.removeItem("expires");
      localStorage.removeItem("userId");
      return;
    }

    token.value = tokenLocal;
    userId.value = userIdLocal;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
    localStorage.removeItem("userId");

    token.value = null;
    userId.value = null;
  }

  return { token, auth, isAuth, signUp, signIn, autologin, logout };
});
