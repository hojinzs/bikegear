/**
 * use vue.js & config
 */
import Vue from 'vue'

Vue.config.productionTip = false

import Vue2TouchEvents from 'vue2-touch-events'
Vue.use(Vue2TouchEvents)

/**
 * import app
 */
import App from './App.vue'
import { store } from './store' // Vuex Store Setting
import { router } from './routes' // Vue Router Setting

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
