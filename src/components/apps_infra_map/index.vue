<template>
    <div id="app">

        <div id="MenuTop">
            <div class="lumi-flex-slider-wrapper">
                <ul class="lumi-flex-slider">

                    <!-- Loading -->
                    <li class="lumi-flex-slider-item"
                    v-if="infraList_status == 'loading'">
                        <button class="infra-indicator lumi-button lumi-button-border-round lumi-button-block-white lumi-button-shadow">
                            <img class="loading" src="/images/Spinner-1s-104px.gif">
                                <!-- :style="{color: item.color}"/> -->
                            Loading
                        </button>
                    </li>

                    <!-- Load Error -->
                    <li class="lumi-flex-slider-item"
                    v-if="infraList_status == 'error'">
                        <button class="infra-indicator lumi-button lumi-button-border-round lumi-button-block-white lumi-button-shadow"
                            :style="{color: 'red'}">
                            <font-awesome-icon class="infra-icon"
                                :icon="'exclamation-triangle'" />
                            Error
                        </button>
                    </li>

                    <!-- LOOP START -->
                    <li class="lumi-flex-slider-item"
                    v-for="(item,index) in FeaturedItems"
                    :key="index">
                        <button class="infra-indicator lumi-button lumi-button-border-round lumi-button-block-white lumi-button-shadow"
                        @click="toggleFilter(item.name)">
                            <span class="dot infra-indicator-item"
                                :class="{'active' : (filter.tags.indexOf(item.name) != -1) }">
                            </span>
                            <font-awesome-icon class="infra-icon infra-indicator-item"
                                :icon="item.icon"
                                :style="{color: item.color}"/>
                            <span class="infra-indicator-item">
                                {{item.label}}
                            </span>
                            <span class="infra-count-int infra-indicator-item"
                                :style="{backgroundColor: item.color}">
                                {{item.count}}
                            </span>
                        </button>
                    </li>
                    <!-- LOOP END -->

                </ul>
            </div>
        </div>

        <div id="MenuBottom" style="display:none">
            <div class="lumi-flex-slider-wrapper">

                <!-- <transition-group tag="ul" class="lumi-flex-slider lumi-flex-slider-aligin-bottom" -->
                <ul class="lumi-flex-slider lumi-flex-slider-aligin-bottom"
                    name="infra-place-fade"
                    v-bind:css="false"
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:leave="leave">

                    <!-- LOOP START -->
                        <li class="lumi-flex-slider-item"
                        v-for="(place,index) in DisplayItems"
                        :key="index">

                            <div class="infra-place lumi-button lumi-button-block-white lumi-box-border lumi-button-shadow"
                                :class="{
                                    'infra-place-activate' : ( DisplayItems_toggled == 'item_'+index )
                                }"
                                :ref="'item_'+index"
                                @click.stop="doItemToggle('item_'+index,place)">
                                
                                <div class="infra-place-section-1">

                                    <div class="infra-place-thumbnail thumbnail-wrapper thumbnail-border-radius">
                                        <div class="thumbnail" v-bind:style="backgroundImage(place.Image)" ></div>
                                    </div>
                                    <div class="infra-place-contents">
                                        <div class="infra-place-title infra-place-contents-blocks">
                                            {{place.name}}
                                        </div>
                                        <div class="infra-place-description infra-place-contents-blocks">
                                            {{place.type}}
                                        </div>
                                    </div>
                                
                                </div>

                                <div class="infra-place-section-2"
                                    v-if="( DisplayItems_toggled == 'item_'+index )">
                                    <button class="lumi-button-liner"
                                    @click.stop="showDetail()">
                                        정보 보기
                                    </button>
                                </div>

                            </div>

                        </li>
                    <!-- LOOP END -->

                <!-- </transition-group> -->
                </ul>
                
            </div>
        </div>
        <div id="MenuBottom">
            <lumiCaroucel
                :speedStiky="400"
                :positionStiky="'left'">
                <lumiCaroucelSlide
                    v-for="(place,index) in DisplayItems"
                    :key="index">

                        <div class="infra-place lumi-box lumi-box-block-white lumi-box-border lumi-box-shadow"
                            :class="{
                                'infra-place-activate' : ( DisplayItems_toggled == 'item_'+index )
                            }"
                            :ref="'item_'+index"
                            @click.stop="doItemToggle('item_'+index,place)">
                            
                            <div class="infra-place-section-1">

                                <div class="infra-place-thumbnail thumbnail-wrapper thumbnail-border-radius">
                                    <div class="thumbnail" v-bind:style="backgroundImage(place.Image)" />
                                </div>

                                <div class="infra-place-contents">
                                    <div class="infra-place-title infra-place-contents-blocks">
                                        {{place.name}}
                                    </div>
                                    <div class="infra-place-description infra-place-contents-blocks">
                                        {{place.type}}
                                    </div>
                                </div>
                            
                            </div>

                            <div class="infra-place-section-2"
                                v-if="( DisplayItems_toggled == 'item_'+index )">
                                <button class="lumi-button-liner"
                                @click.stop="showDetail()">
                                    정보 보기
                                </button>
                            </div>

                        </div>


                </lumiCaroucelSlide>
            </lumiCaroucel>
        </div>


        <naver-maps class="maps" style="width: 100%; height: 100%;"
            :width="100"
            :height="100"
            :mapOptions="mapOptions"
            @load="onLoad">

                    <naver-marker
                        v-for="(item, index) in DisplayItems"
                        :key="index"
                        :lat="item.geoPoint.latitude"
                        :lng="item.geoPoint.longitude"
                        @load="onMarkerLoad"
                        @click="doItemToggle('item_'+index,item)">
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
import Velocity from'velocity-animate'

// Sample Data
import { featured, tags } from './sampledb'

import { lumiCaroucel, lumiCaroucelSlide } from '~/vue-luminus-style/luminus/components'

import geo from './geo_calc'

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
        'font-awesome-icon' : FontAwesomeIcon,
        lumiCaroucel,
        lumiCaroucelSlide
    },
    data(){
        return {
            geo,
            featured,
            tags,
            infraList: [],
            infraList_status : 'loading',
            DisplayItems_toggled : null,
            filter: {
                tags: []
            },
            mapOptions: {
                lat: 37.4876,
                lng: 127.1246,
                zoom: 11,
            },
            map: null
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
    },
    methods:{
        onLoad(_map){
            this.map = _map

            navigator.geolocation.getCurrentPosition((_position) => {
                this.map.setCenter(_position.coords.latitude,_position.coords.longitude)
            })

        },
        onMarkerLoad(){
        },
        backgroundImage(_URL){
            return {
                backgroundImage: 'url('+_URL+')',
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
            }
        },
        toggleFilter(_filter){

            let i = this.filter.tags.indexOf(_filter)

            if(i != -1){
                this.filter.tags.splice(i,1)
            } else {
                this.filter.tags.push(_filter)
            }

            this.DisplayItems_toggled = null
        },
        addFilter(_filter){
            this.DisplayItems_toggled = null
            this.filter.tags.push(_filter)
        },
        doItemToggle(_ref,_place){

            if(this.DisplayItems_toggled == _ref){
                this.DisplayItems_toggled = null
            } else {
                this.DisplayItems_toggled = _ref
            }

            this.map.setCenter(_place.geoPoint.latitude,_place.geoPoint.longitude)
        },
        getInfraData(){

            axios({
                method: 'GET',
                url: process.env.VUE_APP_INFRADB_URL,
                headers: { 'secret-key': atob(process.env.VUE_APP_COMPDB_API_KEY) },
            })
                .then((res) => {
                    // console.log('AXIOS RESPONSE =>',res.data)
                    this.infraList_status = 'loaded'
                    this.infraList = res.data.Infras

                })
                .catch((error) => {
                    console.log('AXIOS ERROR => ',error,'preset data');
                    this.infraList_status = 'error'
                })

            this.infraList_status = 'loading'
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
        },
        doShowPreview(_place){
            this.map.setCenter(_place.geoPoint.latitude,_place.geoPoint.longitude)
        },
        showDetail(){
            alert("TEST!!")
        },
        /**
         * Transition methods
         */
        beforeEnter(el) {
            el.style.opacity = 0
        },
        enter(el, done) {
            let delay = el.dataset.index * 150
            setTimeout(function () {
                Velocity(
                    el,
                    { opacity: 1 },
                    { complete: done }
                )
            }, delay)
        },
        leave(el, done) {
            let delay = el.dataset.index * 150
            setTimeout(function () {
                Velocity(
                    el,
                    { opacity: 0},
                    { complete: done }
                )
            }, delay)
        }
    },
    mounted(){
        this.getInfraData()
    },
    watch: {
        // DisplayItems(newItems){
        //     if(this.map != null && newItems.length > 0){
        //         let Arr_LatLng = new Array,
        //             centerLatLng = new geo.LatLng

        //         newItems.forEach((item) => {
        //             Arr_LatLng.push(new geo.LatLng(item.geoPoint.latitude,item.geoPoint.longitude))
        //         })
        //         centerLatLng = geo.Calc.getCenterLatLng(Arr_LatLng);

        //         this.map.setCenter(centerLatLng.Lat,centerLatLng.Lng)
        //     }
        // }
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
    font-size 1.2rem
    line-height 1.2rem
    display flex
    .infra-indicator-item
        margin auto 0
    span.dot
        height 0.6em
        width 0.6em
        background-color $light_grey
        border-radius 50%
        display inline-block
        margin-left 0.2em
        margin-right 0.2em
        &.active
            background-color #009933
    .infra-icon
        margin-left 0.2em
        margin-right 0.2em
    .infra-count-int
        margin-left 0.2rem
        border-radius 0.5rem
        color white
        font-size 0.8rem
        font-weight 800
        padding 0.2rem
    img.loading
        width 0.8rem
        height auto

.infra-place
    position relative
    text-align left
    width 340px
    // height 100px
    height auto
    overflow hidden
    // pointer-events auto
    @media (max-width: 400px)
        width 80vw
    .infra-place-section-1
        display flex
        .infra-place-thumbnail
            flex-grow 100px
            overflow hidden
            display inline-block
            width auto
            &.thumbnail-wrapper
                background-color $light_grey
                &.thumbnail-border-radius
                    // border 0.5px solid $light_grey
                    border-radius 0.5rem
                .thumbnail
                    overflow hidden
                    display flex
                    align-items center 
                    justify-content center
                    width 100px
                    height 100px
                    img
                        width auto
                        height 100%
        .infra-place-contents
            flex 1
            display inline-block
            overflow hidden
            .infra-place-contents-blocks
                overflow hidden
                margin-left 0.5rem
                margin-right 0.5rem
            .infra-place-title
                font-size 1.2rem
                font-weight bolder
            .infra-detail
                padding-top 0.2rem
                padding-bottom 0.2rem
                text-align right
    .infra-place-section-2
        display flex
        margin-top 1rem
        button 
            margin-left auto

.fade-enter-active,
.fade-leave-active
    transition opacity .5s

.fade-enter,
.fade-leave-to
    opacity 0

</style>