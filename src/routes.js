import Vue from 'vue'
import VueRouter from 'vue-router'

import home from './pages/home'
import home_cover from './components/home/cover.vue'
import apps from './pages/apps/index'
import gear_calculator from './pages/apps/gears'
import component_database from './pages/datas/components'
import infra_map from './pages/datas/inframap'
import place_info from './pages/datas/place'
import place_owner_form from './pages/extra/place-owner-form'

import test from './pages/test.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            components: {
                default: home,
                cover: home_cover
            },
        },
        {
            path: '/data/components',
            name: 'Component Database',
            component: component_database,
        },
        {
            path: '/data/infra-map',
            name: 'Bike Infra Map',
            component: infra_map,
            children: [
                {
                    path: 'place/:id',
                    name: 'place',
                    component: place_info,
                }
            ]
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
        {
            path: '/test',
            name: 'test page',
            component: test,
        },
        {
            path: '/extra/iam-owner',
            name: 'iamowner',
            component: place_owner_form,
            props: true
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
})