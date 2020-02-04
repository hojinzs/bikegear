<template>
    <div id="app">
        <div id="Menu1">
            <div class="lumi-flex-slier-wrapper">
                <ul class="lumi-flex-slider">

                    <!-- LOOP START -->
                    <li class="lumi-flex-slider-item">
                        <button class="infra-indicator lumi-button lumi-button-block-white">
                            <font-awesome-icon class="infra-icon"
                                :icon="'charging-station'"
                                :style="{color:'red'}"/>
                            충전
                            <span class="infra-count-int"
                                :style="{color:'red'}">
                                14
                            </span>
                        </button>
                    </li>
                    <!-- LOOP END -->

                    <li class="lumi-flex-slider-item">
                        <button class="lumi-button lumi-button-block-white">
                            DUMMY
                        </button>
                    </li>
                    <li class="lumi-flex-slider-item">
                        <button class="lumi-button lumi-button-block-white">
                            DUMMY
                        </button>
                    </li>
                </ul>
            </div>
        </div>
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

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChargingStation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChargingStation)

Vue.use(naver,{
    clientID: process.env.VUE_APP_NAVER_API_CLIENT_KEY,
    useGovAPI: false,
    subModules:''
});

export default {
    components:{
        'font-awesome-icon' : FontAwesomeIcon
    },
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
        setInterval(()=> this.count++,1000)
    }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/lumigrid.styl"

#app
    position relative
    height 100%
    width 100%
    overflow hidden
    #Menu1
        width 100%
        position absolute
        top 3rem
        z-index 100

        .infra-indicator
            color $light_black
            .infra-icon
                padding-right 0.2rem

</style>