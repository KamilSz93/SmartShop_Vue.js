import { createApp } from "vue";
import router from "./router";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./assets/main.css";
import ".//firebase";
import axios from "axios";
import VueAxios from "vue-axios";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);

app.use(pinia);
app.mount("#app");
