<template>
    <div id="app">

        <div id="MenuTop">
            <div class="lumi-flex-slider-wrapper scroll-free">
                <ul class="lumi-flex-slider" style="padding-left: 1em">

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

        <div id="MenuLeft">
        </div>

        <div id="MenuBottom">
            <lumiCaroucel
                :speedStiky="700"
                :positionStiky="'center'"
                :async="true"
                @loaded="setCaroucel"
                @focused="getFocused">
                
                <lumiCaroucelSlide
                    v-for="(place,index) in DisplayItems"
                    :key="index"
                    @onClick="getFocused(index)">

                        <PlaceCard
                            :title="place.name"
                            :thumbnail_img_url="place.Image"
                            :extention_toggled="(DisplayItems_toggled == index)">
                            {{place.type}}
                            <template v-slot:expention>
                                <button class="lumi-button-liner"
                                @click.stop="showDetail(place.id)">
                                    정보 보기
                                </button>
                            </template>
                        </PlaceCard>

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
                        @click="getFocused(index)">
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
import { featured, tags } from '../../plugins/sampledb'
// import { featured, tags, response } from '../../plugins/sampledb'

import { lumiCaroucel, lumiCaroucelSlide } from 'vue-luminus-style'
import PlaceCard from './place_card'

import geo from './geo_calc'
import Tag from '../../plugins/journey66_tag'

/**
 * vue-fontawesome
 * doc: https://www.npmjs.com/package/@fortawesome/vue-fontawesome
 */
library.add(fas)

/**
 * vue-naver-maps
 * doc: https://shin-jaeheon.github.io/vue-naver-maps/#/
 */
Vue.use(naver,{
    clientID: process.env.VUE_APP_NAVER_API_CLIENT_KEY,
    useGovAPI: false,
    subModules:''
});


export default {
    components:{
        'font-awesome-icon' : FontAwesomeIcon,
        lumiCaroucel,
        lumiCaroucelSlide,
        PlaceCard,
    },
    data(){
        let place_load_url = '//'+process.env.VUE_APP_API_HOST+'/v1/places'
        
        return {
            // 샘플 데이터
            geo,
            featured,
            // 샘플 데이터 edn
            tags,
            infraList: [],
            infraList_ajax: {
                url: place_load_url,
                status: 'loading',
            },
            infraList_status: 'loading',
            DisplayItems_toggled : 0,
            filter: {
                tags: []
            },
            // 슬라이더 오브젝트
            slide: null,
            // 지도 오브젝트
            map: null,
            mapOptions: {
                lat: 37.4876,
                lng: 127.1246,
                zoom: 11,
            },
        }
    },
    computed: {
        /**
         * 상단에 띄울 태그 목록을 제어하는 Getter
         */
        FeaturedItems(){
            let featured = []

            this.featured.forEach(name => {
                let i = this.tags.findIndex((e) => e.name == name)
                let item = {
                    name : this.tags[i].name,
                    label : this.tags[i].label,
                    icon : this.tags[i].icon,
                    color : this.tags[i].color,
                    count : Tag.countInfrasByTag(this.infraList,this.tags[i].name).length
                }
                featured.push(item)
            });

            return featured
        },
        /**
         * 마커 목록을 보여주는 Getter
         */
        DisplayItems(){
            if(this.filter.tags.length != 0){
                let items = this.infraList.filter((item) => Tag.findTagsOnInfra(item,this.filter.tags));
                return items
            }
            return this.infraList
        },
    },
    methods:{
        /**
         * 페이지 로드시 세팅
         */
        onLoad(_map){
            this.map = _map

            navigator.geolocation.getCurrentPosition((_position) => {
                this.map.setCenter(_position.coords.latitude,_position.coords.longitude)
            })

        },
        setCaroucel($slide){
            this.slide = $slide
        },
        getFocused(_focusNumber){
            this.doPanToPlace(_focusNumber)
            this.DisplayItems_toggled = _focusNumber
        },
        getInfraData(){

            // axios.defaults.withCredentials = true;
            axios({
                method: 'GET',
                url: this.infraList_ajax.url,
                headers: {
                    // 'secret-key': atob(process.env.VUE_APP_COMPDB_API_KEY),
                },
            })
                .then((res) => {
                    // console.log('AXIOS RESPONSE =>',res.data)
                    this.infraList_status = 'loaded'

                    let list = res.data.data.map(data => {
                        data.Tags = {
                            "Utility" : Tag.filterTagObjectByType(data.tags,'Utility'),
                            "Brand" : Tag.filterTagObjectByType(data.tags,'Brand'),
                            "Merchant" : Tag.filterTagObjectByType(data.tags,'Merchant'),
                            "others" : Tag.filterTagObjectByType(data.tags,'others'),
                        }
                        return data;
                    })

                    this.infraList = list

                    console.log(res.data.data)

                    this.slide.setAsyncFinish()

                })
                .catch((error) => {
                    console.log('AXIOS ERROR => ',error,'preset data');
                    this.infraList_status = 'error'
                })

            // setTimeout(() => {
            //     this.infraList_status = 'loaded'
            //     this.infraList = response
            //     this.slide.setAsyncFinish()
            // },400)

            this.infraList_status = 'loading'
        },
        /**
         * 필터 컨트롤을 위한 메소드
         * @param {Array} _tagName filter에 넣거나 뺄 태그 name
         */
        toggleFilter(_tagName){

            let i = this.filter.tags.indexOf(_tagName)

            if(i !== -1){
                this.filter.tags.splice(i,1)
            } else {
                this.filter.tags.push(_tagName)
            }

            this.doPanToPlace(0)
            this.getFocused(0)
        },
        /**
         * 아이템 토글 제어
         * * @param {Number} _SlideNumber 포커스할 슬라이드 번호
         */
        doSlideToggle(_SlideNumber){
            if(this.slide.slideFocused !== _SlideNumber) this.slide.doItemFocus(_SlideNumber)
        },
        doPanToPlace(_DisplayItemNumber){
            if(this.DisplayItems[_DisplayItemNumber] != undefined){
                let target = this.DisplayItems[_DisplayItemNumber],
                    lat = target.geoPoint.latitude,
                    lng = target.geoPoint.longitude

                this.map.panTo({lat,lng})
            }
        },
        /**
         * 아이템 정보 보기 클릭시 액션
         */
        showDetail(_id){
            this.$router.push({ name: 'place', params: { id: _id } } )
        },
    },
    mounted(){
        this.getInfraData()
    },
    watch: {
        DisplayItems_toggled(_toggledItemNumber){
            if(_toggledItemNumber !== null ){
                this.doPanToPlace(_toggledItemNumber)
                this.doSlideToggle(_toggledItemNumber)
            }
        }
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
    #MenuLeft
        position absolute
        top 3rem
        left 0
        z-index 200
    #MenuTop
        position absolute
        max-width 100%
        top 3rem
        z-index 200
    #MenuBottom
        position absolute
        width 100%
        bottom 0
        z-index 200
    #place_info
        position absolute
        top 4rem
        left 50%

.activate
    border none

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

.fade-enter-active,
.fade-leave-active
    transition opacity .5s

.fade-enter,
.fade-leave-to
    opacity 0

</style>