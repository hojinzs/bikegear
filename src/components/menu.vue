<template>
    <div
        id="Menu" ref="menu"
        @mouseover="doMouseOver"
        @mouseout="doMouseOut"
        :class="{'hover': menu_hover, 'menu_show': mobile_show_menu, 'menu_blocked': !isClear, 'menu_clear': isClear}">

        <div class="menu-wrapper">
            <div id="MenuLeft">
                <ul>
                    <router-link 
                    to="/"
                    @click.native="doCloseMenu()">
                        <div class="logo_item">
                            <span><b>{{TitleText}}</b></span>
                        </div>
                    </router-link>
                </ul>

                <template v-if="!isMobile">

                    <ul v-for="(Link,i) in MenuLeft"
                        v-bind:key="i">
                        <a :href='Link.url' :target="Link.target">
                            {{Link.name}}
                        </a>
                    </ul>

                </template>
            </div>

            <template v-if="isMobile">
                <div id="MobileMenu">
                    <ul v-on:click="mobile_show_menu = !mobile_show_menu">
                        <img
                            class="showmenu"
                            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iMzJweCIgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMyIDMyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMzIgMzIiIHdpZHRoPSIzMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNNCwxMGgyNGMxLjEwNCwwLDItMC44OTYsMi0ycy0wLjg5Ni0yLTItMkg0QzIuODk2LDYsMiw2Ljg5NiwyLDhTMi44OTYsMTAsNCwxMHogTTI4LDE0SDRjLTEuMTA0LDAtMiwwLjg5Ni0yLDIgIHMwLjg5NiwyLDIsMmgyNGMxLjEwNCwwLDItMC44OTYsMi0yUzI5LjEwNCwxNCwyOCwxNHogTTI4LDIySDRjLTEuMTA0LDAtMiwwLjg5Ni0yLDJzMC44OTYsMiwyLDJoMjRjMS4xMDQsMCwyLTAuODk2LDItMiAgUzI5LjEwNCwyMiwyOCwyMnoiLz48L3N2Zz4=">
                    </ul>
                </div>
            </template>

            <template v-if="(!isMobile || mobile_show_menu)">

                <div id="MenuRight">

                    <div class="flex_wrapper">

                        <ul v-for="(First,i1) in MenuRight"
                            v-bind:key="i1">

                            <template v-if="First.use">
                                <router-link 
                                    :to="First.url"
                                    @click.native="mobile_show_menu = false;">

                                    <span class="first_menu">{{First.name}}</span>

                                </router-link>
                            </template>
                            <template v-else>
                                <span class="first_menu unused">{{First.name}}</span>
                            </template>

                            <hr v-show="isMobile">

                            <menuitem v-show="(MenuRight_expaneded || isMobile)">

                            <li v-for="(Second,i2) in First.children"
                                v-bind:key="i2"
                                class="item">

                                    <template v-if="Second.use">
                                        <router-link
                                            :to="First.url+Second.url"
                                            @click.native="doCloseMenu()">

                                            <span class="second_menu">{{Second.name}}</span>

                                        </router-link>
                                    </template>
                                    <template v-else>
                                        <span class="second_menu unused">{{Second.name}}</span>
                                    </template>

                            </li>

                            </menuitem>

                        </ul>

                    </div>

                </div>

            </template>

        </div>
    </div>
</template>

<script>

const ShotLinks = [
    {
        name: 'old',
        url: 'https://www.journey66.cc',
        target: '_blank',
    }
]

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
                name: "Route Map",
                url: "/gears",
                use: false,
            }
        ]
    }
]

import StyleVariable from '../assets/variable.styl'

export default {
    data(){
        return {
            StyleVariable,
            TitleText: 'Journey66',
            MenuLeft: ShotLinks,
            MenuRight: GlobalMenu,
            MenuRight_expaneded: false,
            scroll: 0,
            scrollLimit: 0,
            window: {
                width: 0,
                height: 0,
            },
            menu_hover: false,
            mobile_show_menu: false,
        }
    },
    computed:{
        isMobile(){ return this.window.width < 900 },
        isClear(){ return this.scrollLimit > this.scroll }
    },
    created(){
        window.addEventListener('resize',this.handleResize)
        window.addEventListener('scroll',this.handleScroll)

        this.handleResize()
        this.handleScroll()
    },
    methods:{
        handleResize(){
            this.window.width = window.innerWidth
        },
        handleScroll(){
            this.scroll = window.pageYOffset
            this.menu_hover = false;
            this.MenuRight_expaneded = false;
        },
        doMouseOver(){
            this.MenuRight_expaneded = true;
            this.menu_hover = true;
        },
        doMouseOut(){
            this.MenuRight_expaneded = false;
            this.menu_hover = false;
        },
        doCloseMenu(){
            this.mobile_show_menu = false;
            this.MenuRight_expaneded = false;
        }
    },
    mounted(){
        this.scrollLimit = this.$refs['menu'].offsetHeight
    },
    watch:{
        isClear(_val){
            console.log("Clear Status Changed!! => ",_val)
        }
    }
}
</script>

<style lang="stylus" scoped>

@import "../assets/variable.styl"

$is_clear_link_color = white

$link_color = black
$link_color_disabled = #b3b3b3

$shadow_color = #595959

#Menu
    position fixed
    width 100%
    z-index 100
    align-items center
    a
        color: $link_color
        text-decoration: none
        &:link
        &:visited
            color: $link_color
        &:hover
            font-weight bold
    &.menu_blocked
        background-color white
        border-bottom 1px solid black
    &.menu_clear
        text-shadow 1px 1px 2px $shadow_color
        a
            color: $is_clear_link_color
            text-decoration: none
            &:link
            &:visited
                color: $is_clear_link_color
            &:hover
                font-weight bold
// #Menu
//     a
//         color: $link_color
//         text-decoration: none
//         &:link
//         &:visited
//             color: $link_color
//         &:hover
//             font-weight bold

    ul
        padding-inline-start 0px
        font-size 1em

    .menu-wrapper
        max-width $container_width
        margin 0 auto

        span.unused
            color: $link_color_disabled

        #MenuLeft
            float left
            display flex
            left 0px
            width 30%

            ul
                float left 
                flex 1

                .logo_item
                    padding-left 10px

        #MobileMenu
            float right

            img.showmenu
                height 1em
                margin-right 1em

        #MenuRight

            .flex_wrapper
                display flex

                ul
                    flex 1
                        
                    li.item
                        margin-top 1em
                        margin-bottom 1em
                        display block
                        font-size 90%
                        overflow hidden

@media (min-width: $container_width)
    #Menu
        #MenuRight
            float right
            right 20px
            width 50%

            ul
                float left
                        
                li.item
                    margin-top 1em
                    margin-bottom 1em
                    display block
                    font-size 90%
                    overflow hidden
                hr
                    display none

    #Menu.hover.menu_clear
        background-color rgba(0,0,0,0.5)
        text-shadow none
        

@media (max-width: $container_width)

    #Menu.menu_show.menu_clear
        background-color rgba(0,0,0,0.5)

    #Menu

        #MenuRight
            display flow-root
            width 100%

            .flex_wrapper
                flex-direction column

            ul
                hr
                    width 60%
                    border: solid 1px $link_color_disabled

</style>