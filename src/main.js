/**
 * use vue.js & config
 */
import Vue from 'vue'

Vue.config.productionTip = false

/**
 * import app
 */
import App from './App.vue'
import { store } from './store/index' // Vuex Store Setting
import { router } from './routes' // Vue Router Setting

/**
 * use fontawesome global
 */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, fab)

/**
 * use Luminus Component & CSS
 */
import '../luminus/luminus.styl'
import Luminus from '../luminus/components'
Vue.use(Luminus)

/**
 * Set XSRF-TOKEN
 */
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
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
    axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('Authorization')}`
}

// import './assets/css/tailwind.css'

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
