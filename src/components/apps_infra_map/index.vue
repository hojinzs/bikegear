<template>
    <div id="app">

        <div id="MenuTop">
            <div class="lumi-flex-slier-wrapper">
                <ul class="lumi-flex-slider">

                    <li class="lumi-flex-slider-item"
                    v-if="infraList.length == 0">
                        <button class="infra-indicator lumi-button lumi-button-block-white lumi-box-border"
                        @click="setFilter(item.name)">
                            <font-awesome-icon class="infra-icon"
                                :icon="'file-download'"/>
                                <!-- :style="{color: item.color}"/> -->
                            Loading..
                        </button>
                    </li>

                    <!-- LOOP START -->
                    <li class="lumi-flex-slider-item"
                    v-for="(item,index) in FeaturedItems"
                    :key="index">
                        <button class="infra-indicator lumi-button lumi-button-block-white lumi-box-border"
                        @click="setFilter(item.name)">
                            <font-awesome-icon class="infra-icon"
                                :icon="item.icon"
                                :style="{color: item.color}"/>
                            {{item.label}}
                            <span class="infra-count-int"
                                :style="{backgroundColor: item.color}">
                                {{item.count}}
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
                            <div class="infra-place-thumbnail thumbnail-wrapper thumbnail-border-radius">
                                <div class="thumbnail">
                                    <div class="centered">
                                        <img :src="place.Image">
                                    </div>
                                </div>
                            </div>
                            <hr>
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

                    <naver-marker
                        v-for="(marker, index) in DisplayMarkers"
                        :key="index"
                        :lat="marker.lat"
                        :lng="marker.lng">
                    </naver-marker>

        </naver-maps>

    </div>
</template>

<script>
import Vue from 'vue'
import naver from 'vue-naver-maps'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import axios from 'axios'

// Sample Data
import { featured, tags } from './sampledb'

// import Jimp from 'jimp'

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
            infraList: [],
            filter: {
                tags: []
            },
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
                let item = {
                    name : this.tags[i].name,
                    label : this.tags[i].label,
                    icon : this.tags[i].icon,
                    color : this.tags[i].color,
                    count : this.countInfrasByTag(this.infraList,this.tags[i].name).length
                }
                featured.push(item)
            });

            return featured
        },
        DisplayItems(){
            if(this.filter.tags.length != 0){
                let items = this.infraList.filter((item) => this.findTagsOnInfra(item,this.filter.tags));
                return items
            }
            return this.infraList
        },
        DisplayMarkers(){
            let markers = []

            this.DisplayItems.forEach(element => {
                let marker = {}

                marker.lat = element.geoPoint.latitude
                marker.lng = element.geoPoint.longitude
                marker.name = element.name

                markers.push(marker)
            })

            return markers
        }
    },
    methods:{
        onLoad(){
        },
        setFilter(_filter){
            this.filter.tags = [_filter]
        },
        findTagsOnInfra(_item,_tagArray = []){
            let keys = Object.keys(_item.Tags)
            let tagFind = 0

            keys.forEach(key => {
                _tagArray.forEach(searchTag => {
                    _item.Tags[key].forEach(targetTag => {
                        if(targetTag == searchTag) ++tagFind
                    })
                })
            });

            return tagFind > 0
        },
        countInfrasByTag(_itemArray,_tagName){

            let tagArray = [_tagName],
                newInfras = _itemArray.filter((item) => this.findTagsOnInfra(item,tagArray) > 0)

            return newInfras
        }
    },
    mounted(){
        
        // Get Infra Database JSON
        axios({
            method: 'GET',
            url: process.env.VUE_APP_INFRADB_URL,
            headers: { 'secret-key': atob(process.env.VUE_APP_COMPDB_API_KEY) }
        })
            .then((res) => {
                console.log('AXIOS RESPONSE =>',res.data)
                this.infraList = res.data.Infras

            })
            .catch((error) => {
                console.log('AXIOS ERROR => ',error,'preset data');
            })

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
        z-index 200
    #MenuBottom
        max-width 100%
        bottom 0
        position absolute
        z-index 200

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
    width 340px
    overflow hidden
    @media (max-width: 400px)
        width 80vw
    hr
        border 0.5px solid $light_grey
    .infra-place-title
        font-size 1.2rem
        font-weight bolder
    .infra-place-thumbnail
        overflow hidden

.thumbnail-wrapper
    background-color $light_grey
    width 100%
    &.thumbnail-border-radius
        border 0.5px solid $light_grey
        border-radius 0.5rem
    .thumbnail
        position relative
        padding-top 56.25% /** 16:9 */
        overflow hidden
        .centered
            position absolute
            top 0
            left 0
            right 0
            bottom 0
            -webkit-transform translate(50%,50%)
            -ms-transform translate(50%,50%)
            transform translate(50%,50%)
            img
                position absolute
                top 0
                left 0
                max-width 100%
                height auto
                -webkit-transform translate(-50%,-50%)
                -ms-transform translate(-50%,-50%)
                transform translate(-50%,-50%)

</style>