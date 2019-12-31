/**
 * use vue.js & config
 */
import Vue from 'vue'

/**
 * vue.js libralies
 */
import VueRouter from 'vue-router'
Vue.use(VueRouter)

/**
 * vue.js config
 */
Vue.config.productionTip = false

/**
 * vue.js Router Settings
 */
import home from './pages/home'
import apps from './pages/apps/index'
import gear_calculator from './pages/apps/gears'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home,
    },
    {
      path: '/app',
      name: 'Apps',
      component: apps,
    },
    {
      path: '/app/gears',
      name: 'Gear Calculator',
      component: gear_calculator,
    },
  ]
})

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
