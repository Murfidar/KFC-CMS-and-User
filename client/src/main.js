import './assets/tailwind.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  iconfont: 'mdi',
  ssr: true,
  components,
  directives,
})

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(pinia)
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: '468324798053-6ck2eeuq9isc39np89t9rcq0l23qq0jj.apps.googleusercontent.com'
})
app.use(vuetify)

app.mount('#app')
