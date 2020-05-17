<template>
    <div id="app" :class="{'blocked': (this.$store.state.page.cover_style === 'none') }">

        <TopMenuBar
            :Blocked="(this.store_cover_style === 'none')"
            :TitleText="'Journey66'"
            :MenuLeft="ShotLinks"
            :MenuRight="GlobalMenu"></TopMenuBar>

        <div id="FullCover"
            v-if="this.store_cover_style === 'full'"
            :style="[FullCover]"></div>

        <div id="TitleCover"
            v-if="this.store_cover_style === 'cover'"
            :style="[Background]">
            
            <h2>{{ this.$store.state.page.cover_title }}</h2>
            <div class="container_wrapper cover_contents">
                <router-view name="cover"></router-view>
            </div>
        </div>

        <div id="contents" :class="{scrolled: (this.store_cover_style !== 'none') }">
            <router-view></router-view>
        </div>

        <div id="footer" v-if="(this.store_cover_style !== 'none')">
            <Footer></Footer>
        </div>
        
    </div>
</template>

<script>
import TopMenuBar from '@/components/menu'
import Footer from '@/components/footer'
import { GlobalMenu, ShotLinks } from "./global-menu-list"
import axios from 'axios'

/**
 * Tailwind CSS
 * vue cli 3 import guide :: https://medium.com/@morrislaptop/using-tailwind-with-vue-cli-3-405171de6a58
 */
import './assets/css/tailwind.css'

export default {
    name: 'app',
    components: {
        TopMenuBar,
        Footer,
    },
    data(){
        return {
            GlobalMenu,
            ShotLinks,
        }
    },
    computed:{
        store_bacground(){
            return this.$store.state.page.cover_background
        },
        store_cover_style(){
            return this.$store.state.page.cover_style
        },
        Background(){
            return {
                backgroundImage: "linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.2),rgba(0,0,0,0.2),rgba(0,0,0,0.5)), url(" + this.store_bacground + ")",
            }
        },
        FullCover(){
            return {
                backgroundImage: "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.4)), url(" + this.store_bacground + ")",
            }
        }
    },
    methods:{
        goBack(){
            window.history.length > 1
                ? this.$route.go(-1)
                : this.$route.push('/')
        }
    },
    created(){
        if(axios.defaults.headers.common['Authorization']){
            this.$store.dispatch('user/loginByApiToken')
        }
    },
}
</script>

<style lang="stylus">

    @import '../luminus/styl/variable.styl'

    $footer_height = 50px
    $menu_height = ($global_inline_height * 2) + ($global_font_text / 2)

    html, body
        font-size 14px

    #app
        font-family: 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale
        text-align: center
        color: #2c3e50
        position relative
        &.blocked
            // margin-top $menu_height
            height 100%
            overflow none
        #contents
            height 100%
            &.scrolled
                min-height 100vh
            .app-container
                background none
                z-index 100
                .container_wrapper
                    max-width $container_width
                    padding-top 2em
                    margin 0 auto
                    @media (max-width: $container_width)
                        padding 2em 2% 0 2%
                &.coverless
                    padding-top $menu_height
                &.backgrounded
                    color white
                    text-shadow 1px 1px 5px black
        #footer
            min-height $footer_height
</style>

<style lang="stylus" scoped>
#app
    #FullCover
        position fixed
        background-position center
        background-repeat no-repeat
        background-size cover
        top 0
        z-index -10
        width 100%
        height 100vh
    #TitleCover
        top 0
        background-position center
        background-repeat no-repeat
        background-size cover
        width 100%
        overflow hidden
        z-index -100
        padding-top 60px
        h2
            color white;
            text-shadow 1px 1px 5px black
            top 30%
            position relative
        .cover_contents
            margin-top 1em
            margin-bottom  1em
        &:after
            background rgba(0,0,0,1)

</style>