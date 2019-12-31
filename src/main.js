/**
 * use vue.js & config
 */
import Vue from 'vue'

/**
 * vue.js libralies
 */
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(VueRouter)
Vue.use(Vuex)

/**
 * vue.js config
 */
Vue.config.productionTip = false

/**
 * vue.js Router Settings
 */
import home from './pages/home'
import apps from './pages/apps'
import gear_calculator from './pages/gear_calculator/index'

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

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
