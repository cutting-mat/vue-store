import { createApp } from "vue";
import App from "./App.vue";
import store from '../src/store.js';
import storeConfig from "./store.config";

const app = createApp(App);
app.use(store, storeConfig);

app.mount("#app");