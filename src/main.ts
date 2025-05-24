import './assets/main.css'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import Nora from '@primeuix/themes/nora'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, { ripple: true, theme: { preset: Nora }, prefix: 'Prime' })
app.mount('#app')
