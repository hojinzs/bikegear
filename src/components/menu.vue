<template>
    <div id="Menu" ref="menu"
        @mouseover="doMouseOver"
        @mouseout="doMouseOut"
        :class="{
            'hover': menu_hover, 'unhover': !menu_hover,
            'mobile_menu_hidden': !mobile_show_menu, 'mobile_menu_show': mobile_show_menu,
            'menu_blocked': (Blocked || !isClear), 'menu_clear': (isClear && !mobile_show_menu && !Blocked) }">

        <div class="menu-wrapper">
            <div id="MenuLeft">
                <ul>
                    <router-link 
                    :to="{ name: 'Home' }">
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
                    <ul v-on:click="toggleMobileMenu">
                        <font-awesome-icon v-if="!mobile_show_menu" class="showmenu" icon="bars" />
                        <font-awesome-icon v-if="mobile_show_menu" class="showmenu" icon="times" />
                    </ul>
                </div>
            </template>

            <template v-if="(!isMobile || mobile_show_menu)">

                <div id="MenuRight">

                    <div class="flex_wrapper">

                        <ul class="menu-section-wrapper" v-if="isMobile">
                            <div class="menu-section">
                                <menu-user-profile />
                            </div>
                        </ul>

                        <ul v-for="(First,i1) in MenuRight"
                            v-bind:key="i1">

                            <template v-if="First.use">
                                <router-link :to="First.route">
                                    <span class="first_menu">{{First.name}}</span>
                                </router-link>
                            </template>
                            <template v-else>
                                <span class="first_menu unused">{{First.name}}</span>
                            </template>

                            <hr v-show="isMobile">

<!--                            <transition name="menu-fade">-->

                            <menuitem v-show="(MenuRight_expaneded || isMobile)">

                                <li class="item"
                                v-for="(Second, i2) in First.children"
                                v-bind:key="i2">

                                    <template v-if="Second.use">
                                        <router-link :to="Second.route">
                                            <span class="second_menu">{{Second.name}}</span>
                                        </router-link>
                                    </template>
                                    <template v-else>
                                        <span class="second_menu unused">{{Second.name}}</span>
                                    </template>

                                </li>

                            </menuitem>

<!--                            </transition>-->

                        </ul>

                        <ul v-if="(!isMobile)">
                            <menu-user-profile-mini class="user-info transition-border"/>

                            <menuitem v-if="$store.getters['user/signed']" v-show="(MenuRight_expaneded || isMobile)">
                                <li class="item">
                                    <router-link :to="{ name: 'User' }">
                                        <span class="second_menu">
                                            MyPage
                                        </span>
                                    </router-link>
                                </li>
                                <li class="item">
                                    <a href="" @click.prevent="$store.dispatch('user/logout')">
                                        Logout
                                    </a>
                                </li>
                            </menuitem>
                        </ul>


                    </div>

                </div>

            </template>
            
        </div>
        <div class="mobile-bg"
            @click="doCloseMenu()"
            v-show="mobile_show_menu"></div>
    </div>    
</template>

<script>
import StyleVariable from '@/assets/variable.styl'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars,faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars,faTimes)

import menuUserProfile from './menu-user-profile.vue'
import menuUserProfileMini from './menu-user-profile-mini.vue'

export default {
    components:{
        'font-awesome-icon': FontAwesomeIcon,
        'menu-user-profile': menuUserProfile,
        'menu-user-profile-mini': menuUserProfileMini
    },
    props: {
        TitleText: String,
        MenuLeft: {
            type: Array,
        },
        MenuRight: {
            type: Array,
        },
        Blocked: {
            type: Boolean,
            default: true,
        }
    },
    data(){
        return {
            StyleVariable,
            MenuRight_expaneded: false,
            scroll: 0,
            scrollLimit: 0,
            window: {
                width: 0,
                height: 0,
            },
            menu_hover: false,
            // mobile_show_menu: false,
        }
    },
    computed:{
        isMobile(){
            return this.window.width < Number(this.StyleVariable.containerWidth.replace("px","")) 
        },
        isClear(){
            return this.scrollLimit > this.scroll
        },
        stravaLogin(){
            return "//auth.bikegear.test/strava/signup?"
                +"&return_url="+window.location.href
        },
        mobile_show_menu(){
            return this.$store.state.ui.show_menu;
        }
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
            if(!this.isMobile){
                this.MenuRight_expaneded = true;
                this.menu_hover = true;
            }
        },
        doMouseOut(){
            this.MenuRight_expaneded = false;
            this.menu_hover = false;
        },
        doCloseMenu(){
            this.$store.commit('ui/show_menu',false)
            this.MenuRight_expaneded = false;
            this.menu_hover = false;
        },
        toggleMobileMenu(){
            this.$store.commit('ui/show_menu',!this.$store.state.ui.show_menu)
        }
    },
    mounted(){
        this.scrollLimit = this.$refs['menu'].offsetHeight
    },
}
</script>

<style lang="stylus">

@import "../assets/variable.styl"

$is_clear_link_color = white

$link_color = black
$link_color_disabled = #b3b3b3

$shadow_color = #595959

#Menu
    position fixed
    top 0
    width 100%
    z-index 500
    align-items center
    font-weight 500
    a
        color: $link_color
        text-decoration: none
        font-weight 700
        &:link
        &:visited
            color: $link_color
        &:hover
            font-weight bolder
    .transition-border
        border-radius 5px
        border-style solid
        border-width 1px
    &.menu_blocked
        background white
        border-bottom 1px solid $link_color_disabled
        a
            color: $link_color
            text-decoration: none
            font-weight 700
            &:link
            &:visited
                color: $link_color
            &:hover
                font-weight bolder
        .transition-border
            border-color $link_color
    &.menu_clear
        background: none //linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0))
        text-shadow 1px 1px 2px $shadow_color
        a
            color: $is_clear_link_color
            &:link
            &:visited
                color: $is_clear_link_color
        &.hover
            background: rgba(0,0,0,0.5)
            text-shadow none
        .showmenu
            color $is_clear_link_color
        .transition-border
            border-color $is_clear_link_color
    &.mobile_menu_show
        background white
    ul
        padding-inline-start 0px
        font-size 1rem
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
            .showmenu
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
            .user-info
                margin-top -0.4em

.mobile-bg
    position absolute
    z-index 99
    height 100%
    width 100%
    background-color rgba(0,0,0,0.5)

@media (min-width: $container_width)
    #Menu
        &.mobile_menu_show
            border-radius 10px
            border-bottom 1px solid $link_color_disabled
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
       

@media (max-width: $container_width)
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
            .menu-section-wrapper
                display flex
                .menu-section
                    width 80%
                    margin 0 auto
                    margin-top 8px
                    margin-bottom 8px
/**
* Animation Styles
*/
#Menu.menu_blocked
    transition-property: background-color border color
    transition-duration: 0.5s;

#Menu.menu_clear
    transition-property background-color border color
    transition-duration 0.5s

#Menu.mobile_menu_show
    transition-property background-color border color
    transition-duration 0.5s

#Menu.menu_clear.hover
    transition-property background-color border color
    transition-duration 0.5s

.second_menu_fade-enter-active
.second_menu_fade-leave-active
    transition height 0.5s
</style>