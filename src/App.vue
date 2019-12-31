<template>
    <div id="app">
        <div>Hello Vue Router!!</div>
        <router-link to="/">Go to Home</router-link>
        <router-link to="/app/gears/">Go to Gear Calculator</router-link>
        
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    computed:{
        username(){
            return this.$route.params.username
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
        console.log(this.$route)
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>