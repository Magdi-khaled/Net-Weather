import "./assets/css/tailwind.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "@/App.vue";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
