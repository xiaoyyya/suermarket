import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'
import bus from './bus'
import store from "./store";


const app=createApp(App)
app.config.globalProperties.$bus = bus
app.use(router).use(VueAxios,axios).use(store).mount('#app')

