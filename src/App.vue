<template>
    <div id="app">

        <TopMenuBar
            :TitleText="'Journey66'"
            :MenuLeft="ShotLinks"
            :MenuRight="GlobalMenu"></TopMenuBar>

        <div id="FullCover"
            v-if="!this.$store.state.cover_show"
            :style="[FullCover]"></div>

        <div id="TitleCover"
            v-if="this.$store.state.cover_show"
            :style="[Background]">
            
            <h2>{{ this.$store.state.cover_title }}</h2>
            <div class="container_wrapper cover_contents">
                <router-view name="cover"></router-view>
            </div>
        </div>

        <div id="contents">
            <router-view></router-view>
        </div>

        <div id="footer">
            <Footer></Footer>
        </div>
        
    </div>
</template>

<script>
import TopMenuBar from './components/menu'
import Footer from './components/footer'

let ShotLinks = [
    {
        name: 'old',
        url: 'https://www.journey66.cc',
        target: '_blank',
    }
]

let GlobalMenu = [
    {
        name: "Route",
        url: '/route',
        use: false,
    },
    // {
    //     name: "Community",
    //     url: '/community',
    //     use: false,
    // },
    {
        name: "Database",
        url: '/data',
        use: false,
        children: [
            {
                name: "Components",
                url: "/components",
                use: true,
            },
            {
                name: "Infra-Map",
                url: "/infra-map",
                use: false,
            },
            {
                name: "Events",
                url: "/events",
                use: false,
            },
        ]
    },
    {
        name: "Apps",
        url: "/app",
        use: false,
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
        username(){
            return this.$route.params.username
        },
        Background(){
            return {
                backgroundImage: "url(" + this.$store.state.cover_background + ")",
            }
        },
        FullCover(){
            return {
                backgroundImage: "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.4)), url(" + this.$store.state.cover_background + ")",
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
    mounted(){
        
    }
}
</script>

<style lang="stylus">
@import "./assets/luminus.styl"
@import "./assets/variable.styl"

$footer_height = 50px

#app
    #contents
        min-height 100vh
        .container
            background none
            z-index 100
            .container_wrapper
                max-width $container_width
                padding-top 2em
                margin 0 auto
                @media (max-width: $container_width)
                    padding 2em 2% 0 2%
            &.coverless
                padding-top 30px
            &.backgrounded
                color white
                text-shadow 1px 1px 5px black
    #footer
        min-height $footer_height

</style>

<style lang="stylus" scoped>

#app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    position relative
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