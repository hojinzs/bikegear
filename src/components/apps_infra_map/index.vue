<template>
    <div id="app">
        <naver-maps class="maps" style="width: 100%; height: 100%;"
            :width="100"
            :height="100"
            :mapOptions="mapOptions"
            @load="onLoad">
        </naver-maps>
    </div>
</template>

<script>
import Vue from 'vue'
import naver from 'vue-naver-maps'

Vue.use(naver,{
    clientID: process.env.VUE_APP_NAVER_API_CLIENT_KEY,
    useGovAPI: false,
    subModules:''
});

export default {
    data(){
        return {
            mapOptions: {
                lat: 37,
                lng: 127,
                zoom: 10,
            }
        }
    },
    methods:{
        onLoad(){
        },
    },
    mounted(){
        // setInterval(()=> this.count++,2000)
    }
}
</script>

<style lang="stylus" scoped>
#app
    height 100%
    width 100%
    .maps
        height 100%
        width 100%
</style>