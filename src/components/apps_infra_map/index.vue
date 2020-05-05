<template>
    <div id="app">
        <div
            id="mapLeftSection"
            :class="{
            'hidden': !showLeftMenu
            }"
        >
            <div class="left-section-box">
                <input
                    class="lumi-input-liner"
                    placeholder="명칭"
                    v-model="placeFilter.name"
                />
                <button
                    class="lumi-button-liner"
                    @click="getPlaceData()"
                >
                    Search
                </button>
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
                    [ = 슬라이더 UI로 develop = ]
                    <select
                        v-model="placeFilter.distance"
                    >
                        <option>5</option>
                        <option>15</option>
                        <option selected>30</option>
                        <option>50</option>
                        <option>100</option>
                        <option>150</option>
                        <option>300</option>
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
                                <span v-if="infraList">
                                    {{ infraList.length }}
                                </span>
                                <span v-else>
                                    0
                                </span>
                            </button>
                        </li>

                        <!-- Loading -->
                        <li class="lumi-flex-slider-item"
                            v-if="infraList_status === 'loading'">
                            <button class="infra-indicator lumi-button lumi-button-border-round lumi-button-block-white lumi-button-shadow">
                                <img class="loading" src="/images/Spinner-1s-104px.gif">
                                <!-- :style="{color: item.color}"/> -->
                                Loading
                            </button>
                        </li>

                        <!-- Load Error -->
                        <li class="lumi-flex-slider-item"
                            v-if="infraList_status === 'error'">
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
        let place_tags = '//'+process.env.VUE_APP_API_HOST+'/v1/tags/';
        
        return {
            // Map UI Control
            showLeftMenu: true,
            StyleVariable,
            // 샘플 데이터
            featured,
            // 샘플 데이터 edn
            tags,
            infraList: [],
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
                    console.log("new Tag Type")
                } else {
                    console.log("old Tag Type")
                }
                console.log("Currnet Tag Type => ", currentTagType)
                tag.selected = tag.selected || false
                currentTagType.tags.push(tag)
            })

            console.log("tag Trees => ", tagTypes)
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
    },
    methods:{
        /**
         * 페이지 로드시 세팅
         */
        onLoad(_map){
            this.map = _map
            this.naverMap = window.naver.maps

            let center = this.map.map.getCenter();
            this.testCircle = new this.naverMap.Circle({
                map: _map.map,
                center: {
                    lat: center.y,
                    lng: center.x
                },
                radius: Number(this.placeFilter.distance * 1000)
            })

            this.getCurrentPosition()

            // this.naverMap.Event.addListener(_map.map,'bounds_changed', () => {
            //     let center = this.map.map.getCenter()
            //     let zoomLevel = this.map.map.getZoom()
            //
            //     console.log("Drag End => ", center, "\nZoomLevel => ", zoomLevel)
            //
            //     this.setPlaceFilterLatLng(center.y, center.x)
            // })
        },
        setTestCircle(){
            console.log("change Filter => ",this.placeFilter)

            console.log("Circle => ",this.testCircle)

            this.testCircle.setCenter({
                lat: this.placeFilter.position.latitude,
                lng: this.placeFilter.position.longitude,
            })

            this.testCircle.setRadius(Number(this.placeFilter.distance * 1000))
        },
        toggleLeftMenu(show = !this.showLeftMenu){
            this.showLeftMenu = show;

            setTimeout(() => {
                this.map.setSize({
                    width: this.$refs['rightSection'].clientWidth,
                    height: this.$refs['rightSection'].clientHeight
                })

                // this.map.refresh()
            },100)
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

            let targetPage = 1;
            if(setNewList === true){
                let center = this.map.map.getCenter()
                this.setPlaceFilterLatLng(center.y, center.x)
            } else {
                if (this.placePaging.last_page > this.placePaging.current_page) {
                    targetPage = this.placePaging.current_page + 1
                } else {
                    return
                }
            }

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

            // 자동 로딩
            if(this.placePaging.current_page < this.placePaging.last_page && ((this.infraList.length - _focusNumber) < 3)){
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
    created() {
        this.getTagsData()
            .then(() => {
                this.getPlaceData()
            })
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
        placeFilter:{
            deep: true,
            handler: 'setTestCircle',
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
                &.hidden
                    width 0%
                    min-width 0px
            #mapRightSection
                flex 1 1 auto
                overflow hidden

    @media (max-width: $container_width)
        #app
            #mapLeftSection
                position absolute
                background-color white
                transform translateX(0%)
                z-index 180
                &.hidden
                    transform translateX(-100%)

    #mapLeftSection
        border-left 1px solid grey

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