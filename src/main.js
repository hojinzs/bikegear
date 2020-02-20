/**
 * use vue.js & config
 */
import Vue from 'vue'

Vue.config.productionTip = false

/**
 * vue.js Router Settings
 */
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
})

import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents)

/**
 * import app
 */
import App from './App.vue'
import { store } from './store'

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
