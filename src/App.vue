<template>
    <div id="app">

        <TopMenuBar></TopMenuBar>

        <div id="cover" :style="[Background]" :hidden="!this.$store.state.cover_show" >
            <h2>{{ this.$store.state.cover_title }}</h2>
            <div class="container_wrapper cover_contents">
                <router-view name="cover"></router-view>
            </div>
        </div>

        <div>
            <router-view></router-view>
        </div>

        <Footer></Footer>
        
    </div>
</template>

<script>
import TopMenuBar from './components/menu'
import Footer from './components/footer'

export default {
    name: 'app',
    components: {
        TopMenuBar,
        Footer,
    },
    computed:{
        username(){
            return this.$route.params.username
        },
        Background(){
            return {
                backgroundImage: 'url(' + this.$store.state.cover_background + ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }
        },
    },
    methods:{
        goBack(){
            window.history.length > 1
                ? this.$route.go(-1)
                : this.$route.push('/')
        }
    },
    mounted(){
        console.log(this.$route);
        console.log(this.$store);
    }
}
</script>

<style lang="stylus">

@import "./assets/luminus.styl"
@import "./assets/variable.styl"

#app
    .container
        background-color white
        z-index 100
        .container_wrapper
            max-width $container_width
            padding-top 2em
            margin 0 auto
        &.coverless
            padding-top 30px
        &.backgrounded
            color white
            text-shadow 1px 1px 5px black

@media (min-width: $container_width)
    #app
        .container
            min-height 80vh

@media (max-width: $container_width)
    .container
        min-height 100vh
        .container_wrapper
            padding 2em 2% 0 2%

</style>

<style lang="stylus" scoped>

#app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50

    #cover
        top 0
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

    #cover:after
        background rgba(0,0,0,1)

</style>