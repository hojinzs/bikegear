<template>
    <div id="app" :style="Background">

        <TopMenuBar></TopMenuBar>

        <div id="cover" :style="CoverStyle">
            <h1>{{ this.$store.state.title }}</h1>
        </div>

        <div class="container">
            <div class="container_wrapper">
                <router-view></router-view>
            </div>
        </div>
        
    </div>
</template>

<script>
import TopMenuBar from './components/menu'

export default {
    name: 'app',
    components: {
        TopMenuBar,
    },
    computed:{
        username(){
            return this.$route.params.username
        },
        Background(){
            return {
                backgroundImage: 'url(' + this.$store.state.background + ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }
        },
        CoverStyle(){
            return {
                height: this.$store.state.height+'px',
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

<style lang="stylus" scoped>

@import "./assets/variable.styl"

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

        h1
            color white;
            text-shadow 1px 1px 5px black
            top 50%
            position relative

    .container
        background-color white
        z-index 100

        .container_wrapper
            max-width $container_width
            padding-top 2em
            margin 0 auto

@media (max-width: $container_width)
    .container
        .container_wrapper
            padding 2em 2% 0 2%

</style>