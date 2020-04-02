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
import { store } from './store/index' // Vuex Store Setting
import { router } from './routes' // Vue Router Setting

/**
 * Set XSRF-TOKEN
 */
import axios from 'axios'
axios.defaults.withCredentials = true
axios.get('//'+process.env.VUE_APP_API_HOST+'/sanctum/csrf-cookie')

/**
 * Set Auto Login
 */
import Cookies from 'js-cookie'
if(Cookies.get('Authorization')){
    window.localStorage.setItem('Authorization', Cookies.get('Authorization'))
    Cookies.remove('Authorization')
}
if(window.localStorage.getItem('Authorization')){
    axios.defaults.headers.common = {'Authorization': `Bearer ${window.localStorage.getItem('Authorization')}`}
}

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
