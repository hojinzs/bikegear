<template>
    <div id="app">

        <div id="MenuTop">
            <div class="lumi-flex-slier-wrapper">
                <ul class="lumi-flex-slider">

                    <!-- LOOP START -->
                    <li class="lumi-flex-slider-item"
                    v-for="(item,index) in FeaturedItems"
                    :key="index">
                        <button class="infra-indicator lumi-button lumi-button-block-white lumi-box-border">
                            <font-awesome-icon class="infra-icon"
                                :icon="item.icon"
                                :style="{color: item.color}"/>
                            {{item.label}}
                            <span class="infra-count-int"
                                :style="{backgroundColor: item.color}">
                                14
                            </span>
                        </button>
                    </li>
                    <!-- LOOP END -->

                </ul>
            </div>
        </div>

        <div id="MenuBottom">
            <div class="lumi-flex-slier-wrapper">
                <ul class="lumi-flex-slider">

                    <!-- LOOP START -->
                    <li class="lumi-flex-slider-item"
                    v-for="(place,index) in DisplayItems"
                    :key="index">
                        <button class="infra-place lumi-button lumi-button-block-white lumi-box-border">
                            <div class="infra-place-thumbnail">
                                <!-- 센터 정렬 필요 -->
                                <img :src="place.Image">
                            </div>
                            <div class="infra-place-title">
                                {{place.name}}
                            </div>
                            <div>
                                {{place.type}}
                            </div>
                        </button>
                    </li>
                    <!-- LOOP END -->

                </ul>
            </div>
        </div>

        <naver-maps class="maps" style="width: 100%; height: 100%;"
            :width="100"
            :height="100"
            :mapOptions="mapOptions"
            @load="onLoad">
                <div class="infra-marker"
                    v-for="(marker, index) in markers"
                    :key="index" >
                    <naver-marker
                        v-for="(marker, index) in markers"
                        :key="index"
                        :lat="marker.lat"
                        :lng="marker.lng">
                    </naver-marker>
                </div>
        </naver-maps>

    </div>
</template>

<script>
import Vue from 'vue'
import naver from 'vue-naver-maps'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import axios from 'axios'

// Sample Data
import { featured, tags, response } from './sampledb'

/**
 * vue-naver-maps
 * doc: https://shin-jaeheon.github.io/vue-naver-maps/#/
 */
Vue.use(naver,{
    clientID: process.env.VUE_APP_NAVER_API_CLIENT_KEY,
    useGovAPI: false,
    subModules:''
});

/**
 * vue-fontawesome
 * doc: https://www.npmjs.com/package/@fortawesome/vue-fontawesome
 */
library.add(fas)

export default {
    components:{
        'font-awesome-icon' : FontAwesomeIcon
    },
    data(){
        return {
            featured,
            tags,
            infraList: response,
            markers: [],
            mapOptions: {
                lat: 37.4876,
                lng: 127.1246,
                zoom: 11,
            }
        }
    },
    computed: {
        FeaturedItems(){
            let featured = []

            this.featured.forEach(name => {
                let i = this.tags.findIndex((e) => e.name == name)
                featured.push(this.tags[i])
            });


            return featured
        },
        DisplayItems(){
            let items = []

            items = this.infraList

            return items
        }
    },
    methods:{
        onLoad(){
            this.markers = this.getMarkers();
        },
        getMarkers(){
            let markers = []

            this.infraList.forEach(element => {
                let marker = {}

                marker.lat = element.geoPoint.latitude
                marker.lng = element.geoPoint.longitude
                marker.name = element.name

                markers.push(marker)
            })

            return markers
        }
    },
    mounted(){

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
    #MenuTop
        max-width 100%
        position absolute
        top 3rem
        z-index 100
    #MenuBottom
        max-width 100%
        bottom 0
        position absolute
        z-index 100
        ul
            li
                width 360px
                overflow hidden

.infra-indicator
    color $light_black
    .infra-icon
        padding-right 0.2rem
    .infra-count-int
        margin-left 0.2rem
        border-radius 0.5rem
        color white
        font-size 0.8rem
        font-weight 800
        padding 0.2rem

.infra-place
    text-align left
    width 100%
    .infra-place-title
        font-size 1.2rem
        font-weight bolder
    .infra-place-thumbnail
        img
            width 100%
            min-height 12rem

</style>