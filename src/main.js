import Vue from 'vue'
// 全局样式
import './assets/global.css';

import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import { plugin as store } from '../lib/store.js';
import storeConfig from "./store.config";
Vue.use(store, storeConfig);

new Vue({
    render: h => h(App)
}).$mount('#app')
