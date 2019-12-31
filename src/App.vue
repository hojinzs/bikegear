<template>
    <div id="app" :style="Background">

        <TopMenuBar></TopMenuBar>

        <div id="cover" :style="CoverStyle">
            <h1>{{ this.$store.state.title }}</h1>
        </div>

        <div id="contents">
            <router-view></router-view>
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

#app
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

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

    #contents
        padding 8px
        background-color white
        z-index 100

</style>