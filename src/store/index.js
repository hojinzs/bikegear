import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import page from './modules/page'
import user from './modules/user'
import ui from './modules/ui'
import tags from './modules/tags'

export const store = new Vuex.Store({
  modules: {
    page: page,
    user: user,
    tags: tags,
    ui: ui,
  }
})