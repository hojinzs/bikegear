import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
      cover_title: 'default title',
      cover_show: 1,
      cover_background: '/images/w-cycling.jpg',
    },
    mutations: {
      cover_show_change(state,_boolean){
        state.cover_show = _boolean
      },
      title_change(state,_string){
        state.cover_title = _string
      },
      background_change(state,_url){
        state.cover_background = _url
      },
    }
})