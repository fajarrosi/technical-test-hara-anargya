import { createApp } from "vue";
import "./style.css";
import "../src/assets/css/index.css";
import App from "./App.vue";
import { Icon } from "@iconify/vue";
import router from './router';
import "./card.css"

const app = createApp(App)
app.use(router)
app.component("Icon", Icon)
app.mount('#app');
