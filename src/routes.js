import home from './pages/home'
import home_cover from './components/home/cover.vue'
import apps from './pages/apps/index'
import gear_calculator from './pages/apps/gears'
import component_database from './pages/datas/components'

const routes = [
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
        path: '/app',
        name: 'Apps',
        component: apps,
    },
    {
        path: '/app/gears',
        name: 'Gear Calculator',
        component: gear_calculator,
    }
]

export default routes