import { createApp } from 'vue'
// 全局样式
import './assets/global.css';


import App from './App.vue'
const app = createApp(App);

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

import { install as store } from '../lib/store.js';
import storeConfig from "./store.config";
app.use(store, storeConfig);

app.mount('#app')
