<template>
    <div id="Menu">
        <router-link to="/">
            <h1>new Journey66</h1>
        </router-link>

        <div id="GlobalMenu">

            <ul v-for="(First,i1) in GlobalMenu"
                v-bind:key="i1">

                <template v-if="First.use">
                    <router-link 
                        :to="First.url">
                        <span class="first_menu">{{First.name}}</span>
                    </router-link>
                </template>
                <template v-else>
                    <span class="first_menu unused">{{First.name}}</span>
                </template>

                <li v-for="(Second,i2) in First.children"
                    v-bind:key="i2"
                    class="item">

                    <template v-if="Second.use">
                        <router-link
                            :to="First.url+Second.url">
                            <span class="second_menu">{{Second.name}}</span>
                        </router-link>
                    </template>
                    <template v-else>
                        <span class="second_menu unused">{{Second.name}}</span>
                    </template>

                </li>

            </ul>

        </div>

    </div>
</template>

<script>
const GlobalMenu = [
    {
        name: "Route",
        url: '/route',
        use: false,
    },
    {
        name: "Community",
        url: '/community',
        use: false,
    },
    {
        name: "Information",
        url: '/datas',
        use: false,
    },
    {
        name: "Apps",
        url: "/app",
        use: true,
        children: [
            {
                name: "Gear Calculator",
                url: "/gears",
                use: true,
            },
            {
                name: "Gear Calculator",
                url: "/gears",
                use: false,
            }
        ]
    }
]

export default {
    data(){
        return {
            GlobalMenu
        }
    }
}
</script>

<style lang="stylus" scoped>
LINK_DISABLED = #b3b3b3

#Menu
    position fixed
    width 100%
    z-index 100
    background-color white

    #GlobalMenu 
        ul 
            span.first_menu
                display: block
            
            span.unused
                color: LINK_DISABLED
                
            li.item
                display inline
                font-size 80%

</style>