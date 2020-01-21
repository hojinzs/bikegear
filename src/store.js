import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
      cover_title: 'default title',
      cover_show: 1,
      cover_background: 'https://cdn.pixabay.com/photo/2019/08/10/19/50/cycling-4397597_960_720.jpg',
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