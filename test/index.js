import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 全局样式
import './assets/global.css';

import store from '../src/store.js';
import storeConfig from "./store.config";

const app = createApp(App);
app.use(ElementPlus)
app.use(store, storeConfig);

app.mount("#app");