<template>
    <div id="app">
        <div
            id="mapLeftSection"
            :class="{
            'hidden': !showLeftMenu
            }"
        >
            <div class="left-section-box">
                <form
                    id="setPlaceFilter"
                    @submit.prevent="getPlaceData()"
                >
                    <div class="left-section-flex-wrapper">
                        <input
                                class="left-section-search-input lumi-input-liner"
                                placeholder="명칭"
                                v-model="placeFilter.name"
                        />
                        <button
                                class="left-section-search-button lumi-button-liner"
                                type="submit"
                        >
                            Search
                        </button>
                        <button
                            class="left-section-close"
                            @click.prevent="toggleLeftMenu()"
                        >
                            <font-awesome-icon icon="times" />
                        </button>
                    </div>
                    <div>
                        <a
                            v-for="tag in placeFilter.tags"
                            :key="tag.id"
                            @click="addTagInPlaceFilter(tag, true)"
                        >
                            {{ tag.label }} | [X]
                        </a>
                    </div>
                    <hr>
                        <!-- [ = 슬라이더 UI로 develop = ] -->
                        검색 반경
                        <select
                            v-model="placeFilter.distance"
                        >
                            <option
                                v-for="distance in distanceZoomOptions"
                                :key="distance.distance"
                                :value="distance.distance"
                                :selected="distance.default"
                            >
                                {{ distance.distance }}
                            </option>
                        </select>
                        km
                    <hr>
                    <div v-if="tagList.ajax_status === 'finish'" >
                        <b>Select Tag</b>
                        <div
                                v-for="tagType in TagTree"
                                :key="tagType.id"
                        >
                            <b>{{ tagType.label }}</b>
                            <div>
                                <a
                                    v-for="tag in tagType.tags"
                                    :key="tag.id"
                                    :class="{
                                        'tagSelected': tag.selected
                                    }"
                                    @click="addTagInPlaceFilter(tag, tag.selected)"
                                >
                                    {{ tag.label }}
                                    <span v-if="tag.selected">[X]</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div id="mapRightSection" ref="rightSection">
            <div id="MenuTop">
                <div class="lumi-flex-slider-wrapper scroll-free">
                    <ul class="lumi-flex-slider" style="padding-left: 1em">

                        <li class="lumi-flex-slider-item">
                            <button
                                class="infra-indicator lumi-button lumi-button-border-round lumi-button-block-white lumi-button-shadow"
                                @click="toggleLeftMenu()"
                            >
                                <span class="place-filter-indicator">
                                    <font-awesome-icon
                                        icon="chevron-right"
                                        class="left-slider-indicator"
                                        :class="{ 'menuOpened' : showLeftMenu}"
                                    />
                                    <font-awesome-icon
                                        class="place-filter-icon"
                                        icon="search"
                                    />
                                    <!-- Loading -->
                                    <template v-if="(infraList_status === 'loading' && infraList.length === 0)" >
                                        Loading <img class="loading" src="/images/Spinner-1s-104px.gif">
                                    </template>

                                    <!-- Loading Error -->
                                    <template v-if="infraList_status === 'error'">
                                        <font-awesome-icon :icon="'exclamation-triangle'" />
                                    </template>

                                    <!-- Loading Finish -->
                                    <template v-if="infraList.length > 0">
                                        <span class="place-count-number">
                                            {{ PlaceCounter }}
<!--                                            {{ infraList.length }}-->
                                            <span v-if="(infraList_status === 'finish' && placePaging.current_page < placePaging.last_page)">
                                                <font-awesome-icon :icon="'plus'" />
                                            </span>
                                            <span v-else-if="(infraList_status === 'loading' && infraList.length > 0)">
                                                <img class="loading" src="/images/Spinner-1s-104px.gif">
                                            </span>
                                        </span>
                                    </template>
                                </span>
                            </button>
                        </li>

                        <!-- todo :: 실제 검색 프리셋 세팅을 불러올 수 있도록 변경 필요 -->
                        <!-- LOOP START -->
                        <li class="lumi-flex-slider-item"
                            v-for="(item,index) in FeaturedItems"
                            :key="index">
                            <button class="infra-indicator lumi-button lumi-button-border-round lumi-button-block-white lumi-button-shadow"
                                    @click="toggleFilter(item.name)">
                        <span class="dot infra-indicator-item"
                              :class="{'active' : (filter.tags.indexOf(item.name) !== -1) }">
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
                <div>
                    <div class="lumi-flex-slider-wrapper scroll-free">
                        <ul class="lumi-flex-slider" style="padding-left: 1em">
                            <li class="lumi-flex-slider-item">
                                <button
                                        class="infra-indicator lumi-button lumi-button-border-round lumi-button-block-white lumi-button-shadow"
                                        @click="getCurrentPosition()"
                                >
                                    <transition name="fade" mode="out-in">
                                        <template name="hidden" v-if="currentPosition.status === 'hidden'">
                                            <font-awesome-icon icon='question-circle' />
                                        </template>
                                        <template name="loading" v-if="currentPosition.status === 'loading'">
                                            <img class="loading" src="/images/Spinner-1s-104px.gif">
                                        </template>
                                        <template name="display" v-if="currentPosition.status === 'display'">
                                            <font-awesome-icon icon='crosshairs' />
                                        </template>
                                        <template name="error" v-if="currentPosition.status === 'error'">
                                            <font-awesome-icon icon="exclamation-circle" />
                                        </template>
                                    </transition>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="MenuBottom">
                <lumiCaroucel
                        :speedStiky="700"
                        :positionStiky="'center'"
                        :async="true"
                        :autofocus="false"
                        @loaded="setCaroucel"
                        @focused="getFocused">

                    <lumiCaroucelSlide
                            v-for="(place,index) in DisplayItems"
                            :key="index"
                            @onClick="getFocused(index)">

                        <PlaceCard
                                :title="place.name"
                                :thumbnail_img_url="place.Image"
                                :extention_toggled="(DisplayItems_toggled === index)">
                            {{place.type}}
                            <template v-slot:expention>
                                <button class="lumi-button-liner"
                                        @click.stop="showDetail(place.id)">
                                    정보 보기
                                </button>
                            </template>
                        </PlaceCard>

                    </lumiCaroucelSlide>

                    <lumiCaroucelSlide
                        v-if="placePaging.last_page > placePaging.current_page"
                    >
                        <button
                            @click="getPlaceData(false)"
                        >
                            Load More
                        </button>
                    </lumiCaroucelSlide>

                </lumiCaroucel>
            </div>

            <div id="Map">

                <naver-maps
                    ref="Maps"
                    class="maps"
                    style="width: 100%; height: 100%;"
                    :width="100"
                    :height="100"
                    :mapOptions="mapOptions"
                    :initLayers="initLayers"
                    @load="onLoad"
                >

                    <naver-marker
                        ref="currentPosition"
                        v-if="currentPosition.status === 'display'"
                        :lat="currentPosition.latitude"
                        :lng="currentPosition.longitude"
                        :radius="100"
                        fillColor="#ff0000"
                    />

                    <naver-marker
                        v-for="(item, index) in DisplayItems"
                        :key="index" :lat="item.geoPoint.latitude"
                        :lng="item.geoPoint.longitude"
                        @click="getFocused(index)"
                    />

                </naver-maps>

            </div>

        </div>

    </div>
</template>

<script>
import Vue from 'vue'
import naver from 'vue-naver-maps'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Velocity from 'velocity-animate'

// Sample Data
import { featured, tags } from '../../plugins/sampledb'
import Tag from '../../plugins/journey66_tag'

import { lumiCaroucel, lumiCaroucelSlide } from 'vue-luminus-style'
import StyleVariable from '@/assets/variable.styl'
import PlaceCard from './place_card'

/**
 * vue-naver-maps
 * doc: https://shin-jaeheon.github.io/vue-naver-maps/#/
 * doc: https://navermaps.github.io/maps.js.ncp/docs/naver.maps.html
 */
Vue.use(naver,{
    clientID: process.env.VUE_APP_NAVER_API_CLIENT_KEY,
    useGovAPI: false,
    subModules:''
});


export default {
    components:{
        FontAwesomeIcon,
        lumiCaroucel,
        lumiCaroucelSlide,
        PlaceCard,
    },
    data(){
        let place_load_url = '//'+process.env.VUE_APP_API_HOST+'/v1/places';
        let place_tags = '//'+process.env.VUE_APP_API_HOST+'/v1/tags';
        
        return {
            // Map UI Control
            showLeftMenu: true,
            StyleVariable,
            // 샘플 데이터
            featured,
            // 샘플 데이터 edn
            tags,
            infraList: [],
            placeListCount: 0,
            infraList_ajax: {
                url: place_load_url,
                status: 'loading',
            },
            tagList: {
                data: [],
                ajax_url: place_tags,
                ajax_status: 'ready', // ['ready', 'loading', 'finish', 'error' ]
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
            naverMap: null,
            testCircle : null,
            mapOptions: {
                lat: 37.4876,
                lng: 127.1246,
                zoom: 11,
            },
            initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT'],
            currentPosition: {
                status: 'hidden', // ['hidden','loading','display']
                latitude: null,
                longitude: null,
            },
            distanceZoomOptions: [
                {zoom: 13, distance: 15},
                {zoom: 12, distance: 30, default: true},
                {zoom: 11, distance: 50},
                {zoom: 10, distance: 150},
                {zoom: 9, distance: 300},
            ],
            placeFilter: {
                position: {
                    latitude: 37.4876,
                    longitude: 127.1246,
                },
                distance: 5,
                name: '',
                tags: [],
            },
            placePaging: {
                current_page: 1,
                last_page: 1,
                per_page: 10,
                total: 0,
            }
        }
    },
    computed: {
        isMobile(){
            return window.screen.width < Number(this.StyleVariable.containerWidth.replace("px",""))
        },
        TagTree(){
            if(this.tagList.data.length === 0 ){
                return []
            }
            let tagTypes = []
            this.tagList.data.forEach( tag => {
                /** todo :: 태그 타입 기준으로 트리 리스트 만들 **/

                let currentTagType = tagTypes.find( tagType => tagType.name === tag.tag_Type.name )

                if(typeof currentTagType === 'undefined'){
                    currentTagType = tag.tag_Type
                    currentTagType.tags = []
                    tagTypes.push(currentTagType)
                }

                tag.selected = tag.selected || false
                currentTagType.tags.push(tag)
            })
            return tagTypes;
        },
        /**
         * 상단에 띄울 태그 목록을 제어하는 Getter
         */
        FeaturedItems(){
            let featured = []

            this.featured.forEach(name => {
                let i = this.tags.findIndex((e) => e.name === name)
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
            if(this.filter.tags.length !== 0){
                let items = this.infraList.filter((item) => Tag.findTagsOnInfra(item,this.filter.tags));
                return items
            }
            return this.infraList
        },
        PlaceCounter(){
            return this.placeListCount.toFixed(0)
        }
    },
    methods:{
        /**
         * 페이지 로드시 세팅
         */
        onLoad(_map){
            this.map = _map
            this.naverMap = window.naver.maps

            this.getCurrentPosition()

            // naver Maps Event List => https://navermaps.github.io/maps.js.ncp/docs/naver.maps.Map.html
            // 이벤트 등록이 필요할 경우 해당 코드 참조하여 삽입
            this.naverMap.Event.addListener(_map.map,'zoom_changed', () => {
                // let center = this.map.map.getCenter()
                let zoomLevel = this.map.map.getZoom()

                let option = this.distanceZoomOptions.find(option => {
                    if(zoomLevel === option.zoom) {
                        return true
                    }
                    if(zoomLevel > 13 && option.zoom === 13){
                        return true
                    }
                    if(zoomLevel < 9 && option.zoom === 9){
                        return true
                    }
                    return false
                })
                if(typeof option === 'undefined'){
                    option = this.distanceZoomOptions[0]
                }

                this.placeFilter.distance = option.distance
            })

            // // Debug Circle
            // let center = this.map.map.getCenter();
            // this.testCircle = new this.naverMap.Circle({
            //     map: _map.map,
            //     center: {
            //         lat: center.y,
            //         lng: center.x
            //     },
            //     radius: Number(this.placeFilter.distance * 1000)
            // })

            this.getTagsData()
                .then(() => {
                    this.getPlaceData()
                })

        },
        // // use when to debug
        // setTestCircle(){
        //     console.log("change Filter => ",this.placeFilter)
        //
        //     console.log("Circle => ",this.testCircle)
        //
        //     this.testCircle.setCenter({
        //         lat: this.placeFilter.position.latitude,
        //         lng: this.placeFilter.position.longitude,
        //     })
        //
        //     this.testCircle.setRadius(Number(this.placeFilter.distance * 1000))
        // },
        toggleLeftMenu(show = !this.showLeftMenu){
            this.showLeftMenu = show;

            if(!this.isMobile){
                setTimeout(() => {
                    this.map.setSize({
                        width: this.$refs['rightSection'].clientWidth,
                        height: this.$refs['rightSection'].clientHeight
                    })

                    this.map.refresh()
                },1000)
            }
        },
        getCurrentPosition(){
            navigator.geolocation.getCurrentPosition(position => {
                this.currentPosition.latitude = position.coords.latitude
                this.currentPosition.longitude = position.coords.longitude
                this.currentPosition.status = 'display'

                this.map.setCenter(this.currentPosition.latitude,this.currentPosition.longitude)
            },error => {
                console.error("== Cannot Get Current Position == \n",error)
                setTimeout(() => {
                    this.currentPosition.status = 'hidden'
                }, 2000)
                this.currentPosition.status = 'error'
            })
            this.currentPosition.status = 'loading'
        },
        addTagInPlaceFilter(tag, removeTag = false){
            let selectedTagIndex = this.placeFilter.tags.findIndex(selectedTag => selectedTag === tag)
            console.log("selectedTagIndex =>", selectedTagIndex, tag)
            if(selectedTagIndex === -1 && removeTag === false){
                this.placeFilter.tags.push(tag)
                tag.selected = true
                console.log("tag ADD")
            } else if( removeTag === true){
                this.placeFilter.tags.splice(selectedTagIndex, 1)
                tag.selected = false
                console.log("tag REMOVE")
            }

            console.log(this.placeFilter)
        },
        setPlaceFilterLatLng(latitude, longitude){
            this.placeFilter.position.latitude = latitude
            this.placeFilter.position.longitude = longitude
        },
        async getPlaceData(setNewList = true){

            // 새로운 목록을 불러 오는 것이 아니고, 마지막 페이지일 경우 반응 하지 않는다.
            if(setNewList === false && this.placePaging.current_page === this.placePaging.last_page)
            {
                console.error('this is last Page')
                return new Promise.reject('this is last Page')
            }

            // 새로운 목록을 불러올 경우 초기화 옵션
            if(setNewList === true){
                // 페이지 번호와 목록을 초기화
                this.placePaging.current_page = 0
                this.infraList = []

                // 검색 필터를 현재 지도의 중심점으로 맞춘다.
                let center = this.map.map.getCenter()
                this.setPlaceFilterLatLng(center.y, center.x)
            }

            let targetPage = this.placePaging.current_page + 1;

            // if(setNewList === true){
            //     let center = this.map.map.getCenter()
            //     this.setPlaceFilterLatLng(center.y, center.x)
            //     this.placePaging.current_page = 0
            // } else {
            //     if (this.placePaging.last_page > this.placePaging.current_page) {
            //         targetPage = this.placePaging.current_page + 1
            //     } else {
            //         return
            //     }
            // }

            this.infraList_status = 'loading'

            let tags = this.placeFilter.tags.map( tag => tag.name)

            return axios.get(this.infraList_ajax.url,{
                params: {
                    latitude: this.placeFilter.position.latitude,
                    longitude: this.placeFilter.position.longitude,
                    distance: this.placeFilter.distance,
                    name: this.placeFilter.name,
                    tags: tags,
                    page: targetPage
                }
            })
                .then( res => {
                    this.infraList_status = 'finish'

                    this.placePaging.current_page = res.data.meta.current_page
                    this.placePaging.last_page = res.data.meta.last_page
                    this.placePaging.total = res.data.meta.total

                    let list = res.data.data.map(data => {
                        data.Tags = {
                            "Utility" : Tag.filterTagObjectByType(data.tags,'Utility'),
                            "Brand" : Tag.filterTagObjectByType(data.tags,'Brand'),
                            "Merchant" : Tag.filterTagObjectByType(data.tags,'Merchant'),
                            "others" : Tag.filterTagObjectByType(data.tags,'others'),
                        }
                        return data;
                    })

                    if(setNewList){
                        this.infraList = list
                        this.slide.setAsyncFinish(0)
                    } else {
                        list.forEach( place => this.infraList.push(place))
                    }

                    if(this.isMobile && this.showLeftMenu ){
                        this.toggleLeftMenu(false)
                    }

                })
                .catch((error) => {
                    console.log('getPlaceData Error => ',error);
                    this.infraList_status = 'error'

                    setTimeout(()=> this.infraList_status = 'ready')
                })
        },
        setCaroucel($slide){
            this.slide = $slide
        },
        getFocused(_focusNumber){
            this.doPanToPlace(_focusNumber)
            this.DisplayItems_toggled = _focusNumber

            // 마지막 페이지가 아니며, 다른 데이터를 로딩중이 아니라면 추가 데이터를 불러온다.
            if(
                this.placePaging.current_page < this.placePaging.last_page
                && (this.infraList.length - _focusNumber) < 3
                && this.infraList_status !== 'loading'
            ){
                this.getPlaceData(false);
            }
        },
        async getTagsData(){
            this.tagList.ajax_status = 'loading'
            return axios.get(this.tagList.ajax_url)
                .then( res => {
                    this.tagList.ajax_status = 'finish'
                    this.tagList.data = res.data.data
                })
                .catch( error => {
                    console.error("getData Error =>", error)
                    this.tagList.ajax_status = 'error'
                    setTimeout(() => this.tagList.ajax_status = 'ready', 2000)
                })
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
            if(this.DisplayItems[_DisplayItemNumber] !== undefined){
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
    created(){
    },
    mounted(){
        if(this.isMobile){
            this.toggleLeftMenu(false)
        }
    },
    watch: {
        DisplayItems_toggled(_toggledItemNumber){
            if(_toggledItemNumber !== null ){
                this.doPanToPlace(_toggledItemNumber)
                this.doSlideToggle(_toggledItemNumber)
            }
        },
        // // use this observer when enable debug circle
        // placeFilter:{
        //     deep: true,
        //     handler: 'setTestCircle',
        // },
        'placeFilter.distance': function (newDistance) {
            console.log("new Distance => ", newDistance);

            let distanceZoomLevel = this.distanceZoomOptions.find( option => option.distance === newDistance)
            this.map.map.setZoom(distanceZoomLevel.zoom)
        },
        'infraList': function(newList) {

            if(newList.length === 0){
                this.placeListCount = 0
                return
            }

            let old = this.placeListCount
            Velocity(this.$el, {
                tween: [(newList.length), old],
            },{
                duration: 1000,
                progress: (elements, complete, remaining, start, tweenValue) => {
                    this.placeListCount = tweenValue || old
                }
            })

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
        #mapLeftSection
            padding-top 4rem
            overflow-x hidden
            height 100%
        #mapRightSection
            position relative
            height 100%
            #MenuTop
                position absolute
                max-width 100%
                top 4rem
                z-index 150
            #MenuBottom
                position absolute
                width 100%
                bottom 0
                z-index 150
            #Map
                position absolute
                width 100%
                height 100%
                z-index 100

    @media (min-width: $container_width)
        #app
            display flex
            #mapLeftSection
                flex none
                width 30%
                min-width 200px
                max-width: 350px
                transition-property width min-width
                transition-duration 0.5s
                transition-timing-function linear
                &.hidden
                    width 0px
                    min-width 0px
                    transition-property width min-width
                    transition-duration 0.5s
                    transition-timing-function linear
                .left-section-close
                    display none
            #mapRightSection
                flex 1 1 auto
                overflow hidden

    @media (max-width: $container_width)
        #app
            #mapLeftSection
                position absolute
                /*background-color white*/
                backdrop-filter blur(5px)
                width 100%
                z-index 180
                transform translateY(0%)
                opacity 1
                transition-property transform, backdrop-filter, opacity
                transition-duration 0s, 0.25s, 0.25s
                transition-delay 0s, 0s, 0s
                transition-timing-function linear, liner, unset
                &.hidden
                    transform translateY(100%)
                    opacity 0
                    backdrop-filter blur(0px)
                    transition-property transform, backdrop-filter, opacity
                    transition-duration 0s, 0.25s, 0.25s
                    transition-delay 0.25s, 0s, 0s
                    transition-timing-function linear, liner, unset
                    @media screen and (-ms-high-contrast: none), (-ms-high-contrast: active)
                        background-color rgba(255,255,255,0.6)

    #mapLeftSection
        border-left 1px solid grey
        .left-section-flex-wrapper
            display flex
            padding-left 0.7rem
            padding-right 0.7rem
            .left-section-search-input
                flex-basis 100%
            .left-section-search-button
                min-width 100px
                margin-right 10px
            .left-section-close
                margin-left auto

    .place-filter-indicator
        .left-slider-indicator
            transform rotate(0deg)
            transition-property transform
            transition-duration 0.5s
            transition-timing-function ease-in-out
            &.menuOpened
                transform rotate(180deg)
                transition-property transform
                transition-duration 0.5s
                transition-timing-function ease-in-out
        .place-filter-icon
            margin-left 0.25rem
            padding-left 0.5rem
            padding-right 0.5rem
        .place-count-number
            border-left lightgray 1px solid
            color dodgerblue
            padding-left 0.5rem

    #mapRightSection
        box-shadow -5px -1px 20px 2px rgba(0,0,0,0.6)

    .activate
        border none

    .lumi-flex-slider-wrapper
        ul
            margin-top 0.5em
            margin-bottom 0.5em

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