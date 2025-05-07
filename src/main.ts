import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { piniaLocalStorage } from './plugins/persist'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaLocalStorage)
app.use(pinia)
app.mount('#app')
