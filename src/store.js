import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        cover_title: 'default title',
        cover_style: 'cover',
        cover_height: 300,
        cover_background: '/images/w-cycling.jpg',
    },
    mutations: {
        cover_style_change(state, _style) {
            let cover = 'cover',
                full = 'full',
                none = 'none'

            switch (_style) {
                case cover:
                    state.cover_style = cover
                    state.cover_height = 300
                    break;

                case full:
                    state.cover_style = full
                    break;

                case none:
                    state.cover_style = none
                    state.cover_height = 0
                    break;

                default:
                    break;
            }
        },
        cover_title_change(state, _string) {
            state.cover_title = _string
        },
        cover_height_change(state, _integer) {
            state.cover_style = _integer
        },
        background_change(state, _url) {
            state.cover_background = _url
        },
    }
})