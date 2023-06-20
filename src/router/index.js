import { createRouter, createWebHistory } from "vue-router";
import { useAccountStore } from "../stores/account";
import Home from "../views/Home.vue";
import Smartphones from "../views/Smartphones.vue";
import Cart from "../views/Cart.vue";
import SignIn from "../views/SignIn.vue";
import CreateAccount from "../views/CreateAccount.vue";
import IsSignIn from "../views/IsSignIn.vue";
import Search from "../views/Search.vue";
import EmptyPage from "../views/EmptyPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/smartphones", name: "smartphones", component: Smartphones },
    { path: "/emptyPage", name: "emptyPage", component: EmptyPage },
    { path: "/cart", name: "cart", component: Cart },
    {
      path: "/signIn",
      name: "signIn",
      component: SignIn,
      beforeEnter: (to, from) => {
        const store = useAccountStore();
        store.autologin();
        if (store.isAuth) {
          return { name: "isSignIn" };
        }
      },
    },
    { path: "/signUp", name: "signUp", component: CreateAccount },
    {
      path: "/isSignIn",
      name: "isSignIn",
      component: IsSignIn,
      beforeEnter: (to, from) => {
        const store = useAccountStore();
        store.autologin();
        if (!store.isAuth) {
          return { name: "signIn" };
        }
      },
    },
    { path: "/search/:keyword", name: "search", component: Search },
  ],
});

export default router;
