import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
      title: 'default title',
      background: 'https://cdn.pixabay.com/photo/2019/08/10/19/50/cycling-4397597_960_720.jpg',
      height: 400,
    },
    mutations: {
      title_change(state,_string){
        state.title = _string
      },
      background_change(state,_url){
        state.background = _url
      },
      height_change(state,_int){
        state.height = _int
      }
    }
})