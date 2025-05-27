import './assets/main.css'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'

const app = createApp(App)

app.use(ToastService)

ModuleRegistry.registerModules([AllCommunityModule])
app.use(router)
app.use(PrimeVue, { ripple: true, theme: { preset: Aura }, prefix: 'Prime' })
app.mount('#app')
