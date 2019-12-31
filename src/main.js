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
import gear_calculator from './pages/gear_calculator'

const routes = [
  {
    path: '/gears',
    name: 'Gear Calculator',
    component: gear_calculator,
  },
]

const router = new VueRouter({
  routes
})

/**
 * import app
 */
import App from './App.vue'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
