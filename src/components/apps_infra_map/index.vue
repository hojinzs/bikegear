<template>
    <div id="app">
        <div ref="LeftSection"
             id="mapLeftSection"
             class="padding-menu"
             @swipe="swipeLeftSection"
             :class="{ 'hidden': !showLeftMenu }"
        >
            <div class="left-section-box">
                <div class="left-section-box-top">

                    <div id="setPlaceFilter">
                        <div class="left-section-flex-wrapper">
                            <button class="left-section-list-button left-section-button-tab"
                                    :class="{'activate lumi-button-liner':leftMenuMode === 'places'}"
                                    @click.prevent="toggleLeftMenuMode('places')"
                            >
                                <font-awesome-icon class="icon" icon="map-marker-alt" />
                                <span class="list-bubble"
                                      v-if="leftMenuMode !== 'places'"
                                >
                                    {{ placeList.data.length }}
                                </span>
                            </button>
                            <input class="left-section-search-input lumi-input-liner liner-full"
                                   :class="{ 'liner-close': leftMenuMode !== 'search' }"
                                   :disabled="leftMenuMode !== 'search'"
                                   v-model="placeFilter.name"
                                   placeholder="이름"
                            />
                            <button class="left-section-search-button left-section-button-tab lumi-button-liner"
                                    v-if="leftMenuMode === 'search'"
                                    @click.prevent="getPlaceData()"
                            >
                                <font-awesome-icon class="icon" icon="search" />
                            </button>
                            <button class="left-section-search-button left-section-button-tab"
                                    v-if="leftMenuMode !== 'search'"
                                    @click.prevent="toggleLeftMenuMode('search')"
                            >
                                <font-awesome-icon class="icon" icon="search" />
                            </button>
                        </div>
                    </div>

                    <div class="left-section-top-description text-left p-2">
                        <!-- 선택된 태그 목록 영역 시작 -->
                        <div class="selected-tag-list"
                             v-if="leftMenuMode === 'search'"
                        >
                            <div class="text-center font-light"
                                  v-if="placeFilter.tags.length === 0"
                            >
                                태그 목록에서 태그 선택
                            </div>
                            <a class="selected-tag"
                               v-for="tag in placeFilter.tags"
                               :key="tag.id"
                               @click="addTagInPlaceFilter(tag, true)"
                            >
                                <place-tag-mini :tag-object="tag" />
                                <span class="close">
                                    <font-awesome-icon icon="times-circle" />
                                </span>
                            </a>
                        </div>
                        <!-- 선택된 태그 목록 영역 종료 -->

                        <!-- 검색 결과 갯수 시작 -->
                        <div class="text-lg text-dodgerblue font-medium pt-2"
                             v-if="leftMenuMode === 'places'"
                        >
                            # 검색 결과 {{ PlaceCounter }}건
                        </div>
                        <!-- 검색 결과 갯수 종료 -->

                    </div>
                </div>
                <div class="left-section-box-bottom"
                     style="text-align: left"
                >

                    <!-- 태그 목록 영역 시작 -->
                    <div v-if="leftMenuMode === 'search'"
                    >
                        <div class="tag-list box-side-padding-sm"
                             v-if="tagList.status === 'finish'"
                        >
                            <div class="pb-2">
                                <b>태그 목록</b>
                            </div>
                            <div v-for="tagType in TagTree"
                                 :key="tagType.id"
                            >
                                {{ tagType.label }}
                                <div>
                                    <a v-for="tag in tagType.tags"
                                       :key="tag.id"
                                       @click="addTagInPlaceFilter(tag, tag.selected)"
                                    >
                                        <place-tag-mini
                                            :tag-object="tag"
                                            :class="{'tagSelected': tag.selected}"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 태그 목록 영역 종료 -->

                    <!-- 장소 정보 목록 영역 시작 -->
                    <div v-if="leftMenuMode === 'places'">
                        <place-card-list
                            v-for="(place, index) in DisplayItems"
                            :key="place.id"
                            :tag-object="place"
                            :focused="DisplayItems_toggled === index"
                            @click="getFocused(index)"
                        />

                        <div class="place-card-list-more p-2"
                             v-if="(placeList.status === 'finish' && placePaging.current_page < placePaging.last_page)"
                        >
                            <button
                                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                @click.prevent="getPlaceData(false)"
                            >
                                + 더 보기
                            </button>
                        </div>

                    </div>
                    <!-- 장소 정보 목록 영역 종료 -->

                </div>
            </div>
        </div>


        <div id="mapRightSection" ref="rightSection">

            <!---------------------------
                상단 메뉴(Top Menu) 영역 시작
            ---------------------------->
            <div id="MenuTop"
                 class="padding-menu"
                 :class="{'slided': showLeftMenu }"
            >
                <div class="lumi-flex-slider-wrapper"
                     :class="{ 'scroll-free' : !showLeftMenu}"
                >
                    <ul class="lumi-flex-slider" style="padding-left: 0.5rem">

                        <li class="lumi-flex-slider-item">
                            <button class="infra-indicator lumi-button lumi-button-border-round lumi-button-block-white lumi-button-shadow"
                                    @click="toggleLeftMenu()"
                            >
                                <span class="place-filter-indicator">
                                    <font-awesome-icon class="left-slider-indicator"
                                                       :class="{ 'menuOpened' : showLeftMenu}"
                                                       icon="chevron-right"
                                    />
                                    <font-awesome-icon class="place-filter-icon icon"
                                                       icon="search"
                                    />

                                    <!-- Loading -->
                                    <template v-if="(placeList.status === 'loading' && placeList.data.length === 0)" >
                                        <span class="icon">
                                            <img class="loading" src="/images/Spinner-1s-104px.gif">
                                        </span>
                                    </template>

                                    <!-- Loading Error -->
                                    <template v-if="placeList.data === 'fail'">
                                        <font-awesome-icon icon="exclamation-triangle" />
                                    </template>

                                    <!-- Loading Finish -->
                                    <template v-if="placeList.data.length > 0">
                                        <span class="place-count-number">
                                            {{ PlaceCounter }}
                                            <font-awesome-icon
                                                class="icon more"
                                                v-if="(placeList.status === 'finish' && placePaging.current_page < placePaging.last_page)"
                                                :icon="'plus'"
                                            />
                                            <span class="icon" v-else-if="(placeList.status === 'loading' && placeList.data.length > 0)">
                                                <img class="loading" src="/images/Spinner-1s-104px.gif">
                                            </span>
                                        </span>
                                    </template>

                                    <!-- Loading Error -->
                                    <template v-if="placeList.status === 'finish' && placeList.data.length === 0" >
                                        <span class="place-empty">
                                            <font-awesome-icon class="icon" :icon="'exclamation-triangle'" />
                                            0
                                        </span>
                                    </template>

                                </span>
                            </button>
                        </li>

                        <!---------------------------------
                            Featured Item Control. 향후 개발
                            todo :: 실제 검색 프리셋 세팅을 불러올 수 있도록 변경 필요
                        ---------------------------------->
                        <!--
                        <li class="lumi-flex-slider-item"
                            v-for="(item,index) in FeaturedItems"
                            :key="index">
                            <button class="infra-indicator lumi-button lumi-button-border-round lumi-button-block-white lumi-button-shadow"
                                    @click="toggleFilter(item.name)"
                            >
                                <span
                                    class="dot infra-indicator-item"
                                    :class="{'active' : (filter.tags.indexOf(item.name) !== -1) }"
                                />
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
                        -->
                        <!-- Featured Item Control 종료 -->

                    </ul>
                </div>

                <!---------------------
                현재 위치 찾기 시작
                ----------------------->
                <div style="padding-left: 0.5rem">
                    <button
                            class="infra-indicator lumi-button lumi-button-border-round lumi-button-block-white lumi-button-shadow pointer-event-auto"
                            @click="getCurrentPosition()"
                    >
                        <transition name="fade" mode="out-in">
                            <template name="hidden" v-if="currentPosition.status === 'hidden'">
                                <font-awesome-icon icon='crosshairs' style="color: grey"/>
                            </template>
                            <template name="loading" v-if="currentPosition.status === 'loading'">
                                <img class="loading" src="/images/Spinner-1s-104px.gif">
                            </template>
                            <template name="display" v-if="currentPosition.status === 'display'">
                                <font-awesome-icon icon='crosshairs' style="color: dodgerblue"/>
                            </template>
                            <template name="error" v-if="currentPosition.status === 'error'">
                                <font-awesome-icon icon="exclamation-circle" style="color: darkred"/>
                            </template>
                        </transition>
                    </button>
                </div>
                <!---------------------
                현재 위치 찾기 종료
                ----------------------->


            </div>

            <div id="MenuBottom"
                 :class="{
                    'burrow' : ( !isMobile && showLeftMenu === true && leftMenuMode === 'places' ) || placeList.data.length === 0
                 }"
            >
                <lumiCaroucel
                    :speedStiky="700"
                    :positionStiky="'center'"
                    :async="true"
                    :autofocus="false"
                    @loaded="setCaroucel"
                    @focused="getFocused"
                >

                    <lumiCaroucelSlide
                        v-for="(place,index) in DisplayItems"
                        :key="place.id"
                        @onClick="getFocused(index)"
                    >

                        <PlaceCard
                            :placeObject="place"
                            :focused="DisplayItems_toggled === index"
                        />

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
                    >
                        <!-- todo :: slot 내의 html 마크업을 icon.content 로 불러올 수 있도록 기여 -->
                    </naver-marker>

                </naver-maps>

            </div>

        </div>

    </div>
</template>

<script>

// import packages
import Vue from 'vue'
import naver from 'vue-naver-maps'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Velocity from 'velocity-animate'
import elementTouchControl from '../../plugins/element-touch-controll'

// import components & plugins
import { lumiCaroucel, lumiCaroucelSlide } from 'vue-luminus-style'
import StyleVariable from '@/assets/variable.styl'
import PlaceCard from './place_card'
import PlaceTagMini from "../apps_infra_place/place-tag-mini";
import PlaceCardList from './place_card_list'
import apiResourceManager from "../../plugins/apiResourceManager";

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
        PlaceTagMini,
        FontAwesomeIcon,
        lumiCaroucel,
        lumiCaroucelSlide,
        PlaceCard,
        PlaceCardList,
    },
    data(){
        let place_load_url = '//'+process.env.VUE_APP_API_HOST+'/v1/places';
        let place_tags = '//'+process.env.VUE_APP_API_HOST+'/v1/tags';
        
        return {
            // UI Properties
            StyleVariable,
            // UI Control
            showLeftMenu: true,
            leftMenuMode : 'search', // ['places', 'search']
            placeList: new apiResourceManager(place_load_url),
            placeListCount: 0,
            DisplayItems_toggled : 0,
            tagList: new apiResourceManager(place_tags),
            // 슬라이더 오브젝트
            slide: null,
            // 지도 오브젝트
            map: null,
            naverMap: null,
            mapOptions: {
                lat: 37.4876,
                lng: 127.1246,
                zoom: 11,
            },
            initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT'],
            currentPosition: {
                status: 'hidden', // ['hidden','loading','display', 'error']
                latitude: null,
                longitude: null,
                error: '',
            },
            distanceZoomOptions: [
                {zoom: 13, distance: 15},
                {zoom: 12, distance: 30, default: true},
                {zoom: 11, distance: 50},
                {zoom: 10, distance: 150},
                {zoom: 9, distance: 300},
            ],
            distance: 5,
            placeFilter: {
                bounds: {
                    north: 0,
                    east: 0,
                    south: 0,
                    west: 0,
                },
                center: {
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
        /**
         * 태그 선택 UI에서 보여줄 태그 트리의 Getter
         * @returns {[]|*[]}
         * @constructor
         */
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
         * 장소 목록을 보여주는 Getter
         */
        DisplayItems(){
            // 향후 필터를 고도화 하여 추가
            return this.placeList.data
        },
        PlaceCounter(){
            return this.placeListCount.toFixed(0)
        }
    },
    methods:{
        /**
         * 지도 로드 완료 후
         */
        onLoad(_map){
            this.map = _map
            this.naverMap = window.naver.maps

            this.getCurrentPosition()

            // 이벤트 등록이 필요할 경우 해당 코드 참조하여 삽입
            // naver Maps Event List => https://navermaps.github.io/maps.js.ncp/docs/naver.maps.Map.html
            this.naverMap.Event.addListener(_map.map,'zoom_changed', () => {
                // 줌 레벨이 바뀌었을 때
                this.setZoomDistanceLevel()
            })

            this.setZoomDistanceLevel()

            this.getTagsData()
                .then(() => {
                    this.getPlaceData()
                })

        },
        /**
         * 좌측 검색 영역을 토글
         * @param {Boolean} show 검색 영역 표시 여부
         */
        toggleLeftMenu(show = !this.showLeftMenu){
            this.showLeftMenu = show;

            if(!this.isMobile){
                setTimeout(() => {
                    this.map.setSize({
                        width: this.$refs['rightSection'].clientWidth,
                        height: this.$refs['rightSection'].clientHeight
                    })

                    // this.map.refresh()
                },1000)
            }
        },
        /**
         * 좌측 검색 영역을 왼쪽으로 스와이프 하면, 좌즉 영역을 숨긴다.
         */
        swipeLeftSection(e){
            if(e.detail.swipe === 'left'){
                this.toggleLeftMenu(false);
            }
        },
        setCaroucel($slide){
            this.slide = $slide
        },
        /**
         * 장소 포커스 변경
         */
        getFocused(_focusNumber){
            this.doPanToPlace(_focusNumber)
            this.DisplayItems_toggled = _focusNumber

            // 마지막 페이지가 아니며, 다른 데이터를 로딩중이 아니라면 추가 데이터를 불러온다.
            if(
                this.placePaging.current_page < this.placePaging.last_page
                && (this.placeList.data.length - _focusNumber) < 3
                && this.placeList.status !== 'loading'
            ){
                this.getPlaceData(false);
            }
        },
        /**
         * 현재 위치 가져오기
         */
        getCurrentPosition(){
            // 에러나 로딩 상황에서는 동작하지 않음
            if(this.currentPosition.status === ('error' || 'loading')){
                return;
            }

            navigator.geolocation.getCurrentPosition(position => {
                this.currentPosition.latitude = position.coords.latitude
                this.currentPosition.longitude = position.coords.longitude
                this.currentPosition.status = 'display'

                this.map.setCenter(this.currentPosition.latitude,this.currentPosition.longitude)
            },error => {
                console.error("== Cannot Get Current Position == \n",error)

                if(error.code === ( 1 || 2 )){
                    // 에러 코드 1, 2일 경우 에러메시지 표시
                    // 에러코드 레퍼런스 :: https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError
                    if(error.code === 1){
                        this.currentPosition.error = '위치 접근권한 없음'
                    } else {
                        this.currentPosition.error = '위치 정보가 유효하지 않음'
                    }

                } else {
                    // 에러 코드 1,2가 아니라면 재시도 할 수 있도록 타임아웃 설정
                    setTimeout(() => {
                        this.currentPosition.status = 'hidden'
                    }, 2000)
                }
                this.currentPosition.status = 'error'
            })
            this.currentPosition.status = 'loading'
        },
        addTagInPlaceFilter(tag, removeTag = false){
            let selectedTagIndex = this.placeFilter.tags.findIndex(selectedTag => selectedTag === tag)
            if(selectedTagIndex === -1 && removeTag === false){
                this.placeFilter.tags.push(tag)
                tag.selected = true
            } else if( removeTag === true){
                this.placeFilter.tags.splice(selectedTagIndex, 1)
                tag.selected = false
            }
        },
        setPlaceFilterLatLng(latitude, longitude){
            this.placeFilter.center.latitude = latitude
            this.placeFilter.center.longitude = longitude
        },
        setPlaceFilterBounds(){
            let bounds = this.map.map.getBounds()

            this.placeFilter.bounds.north = bounds._ne._lng
            this.placeFilter.bounds.east = bounds._ne._lat
            this.placeFilter.bounds.south = bounds._sw._lng
            this.placeFilter.bounds.west = bounds._sw._lat
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
                this.placeList.clearData()
                // this.infraList = []

                // 검색 필터를 현재 지도의 중심점으로 맞춘다.
                let center = this.map.map.getCenter()
                this.setPlaceFilterLatLng(center.y, center.x)
                this.setPlaceFilterBounds()
                this.placeFilter.distance = this.distance
            }

            let targetPage = this.placePaging.current_page + 1;
            let tags = this.placeFilter.tags.map( tag => tag.name)

            this.placeList.setLoading()
            return axios.get(this.placeList.apiUrl,{
                params: {
                    latitude: this.placeFilter.center.latitude,
                    longitude: this.placeFilter.center.longitude,
                    distance: this.placeFilter.distance,
                    name: this.placeFilter.name,
                    tags: tags,
                    page: targetPage
                }
            })
                .then( res => {
                    this.placePaging.current_page = res.data.meta.current_page
                    this.placePaging.last_page = res.data.meta.last_page
                    this.placePaging.total = res.data.meta.total

                    let list = res.data.data

                    if(setNewList){
                        this.placeList.data = list
                        this.slide.setAsyncFinish(0)
                    } else {
                        this.placeList.mergeData(list)
                    }

                    if(this.isMobile && this.showLeftMenu ){
                        this.toggleLeftMenu(false)
                    }

                    if(!this.isMobile && this.showLeftMenu){
                        this.toggleLeftMenuMode('places')
                    }

                })
                .catch( error => {
                    this.placeList.handlingFail(error.message)
                })
        },
        async getTagsData(){
            this.tagList.setLoading()
            return axios.get(this.tagList.apiUrl)
                .then( res => {
                    this.tagList.data = res.data.data
                })
                .catch( error => {
                    console.error("getData Error =>", error)
                    this.tagList.handlingFail()
                })
        },
        /**
         * 슬라이드를 토글한다.
         * @param {Number} _SlideNumber 포커스할 슬라이드 번호
         */
        doSlideToggle(_SlideNumber){
            if(this.slide.slideFocused !== _SlideNumber) {
                this.slide.doItemFocus(_SlideNumber)
            }
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
         * 왼쪽 영역의 모드 변경
         */
        toggleLeftMenuMode(mode = null){
            let modeList = ['search', 'places']
            if(!modeList.find( findMode => findMode === mode)){
                throw new Error(mode+' is not Menu')
            }
            if(mode === null){
                let i = modeList.findIndex(findMode => findMode === mode) + 1
                if(modeList.length === i){
                    i = 0
                }
                mode = modeList[i]
            }
            this.leftMenuMode = mode
        },
        /**
         * 지도의 줌 상태에 따라 검색 범위 (distance)를 조절한다.
         */
        setZoomDistanceLevel(){
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

            this.distance = option.distance
        },
    },
    created(){
    },
    mounted(){

        // 좌측 토글 영역에 swipe 이벤트 핸들러를 붙임
        let LeftSection = new elementTouchControl(this.$refs.LeftSection)
        LeftSection.bindPointingEnd(() => {})

        // 모바일일 경우, 좌측 토글 메뉴 영역은 기본적으로 숨긴다.
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
        distance: function (newDistance) {
            let distanceZoomLevel = this.distanceZoomOptions.find( option => option.distance === newDistance)
            this.map.map.setZoom(distanceZoomLevel.zoom)
        },
        'placeList.data': function(newList) {

            // placeList 데이터가 바뀌었을 떄, 검색 결과 장소 갯수의 카운팅 애니메이션 수행
            if(newList.length === 0){
                this.placeListCount = 0
                return
            }
            let old = this.placeListCount
            Velocity(this.$el, {
                tween: [(newList.length), old],
            },{
                duration: 700,
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
            overflow-x hidden
            height 100%
            .activate
                color dodgerblue
        #mapRightSection
            position relative
            height 100%
            #MenuTop
                position absolute
                max-width 100%
                z-index 150
            #MenuBottom
                position absolute
                width 100%
                bottom 0
                z-index 150
                transition bottom 0.5s ease-in
                &.burrow
                    bottom -30%
                    transition bottom 0.5s ease-out
            #Map
                position absolute
                width 100%
                height 100%
                z-index 100
        .padding-menu
            padding-top 3.5rem

    @media (min-width: $container_width)
        #app
            display flex
            #mapLeftSection
                flex none
                width 30%
                min-width 200px
                max-width: 350px
                box-shadow inset rgba(0,0,0,0.7) 40px -40px 20px 0px
                transition-property width min-width
                transition-duration 0.25s
                transition-timing-function linear
                &.hidden
                    width 0px
                    min-width 0px
                    transition-property width min-width
                    transition-duration 0.25s
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
                width 70%
                z-index 180
                /*background-color white*/
                // backdrop-filter blur(5px)
                // for animation
                opacity 1
                left 0%
                box-shadow inset rgba(0,0,0,0.7) 40px -40px 30px 0px
                transition-property left opacity box-shadow
                transition-duration 0.25s
                transition-delay 0s
                transition-timing-function ease-out
                &.hidden
                    opacity 0
                    left -70%
                    box-shadow none
                    transition-property left opacity box-shadow
                    transition-duration 0.25s
                    transition-delay 0s
                    transition-timing-function ease-in
            #MenuTop
                left 0%
                transition-property left
                transition-duration 0.25s
                transition-timing-function ease-in-out
                &.slided
                    left 70%
                    transition-property left
                    transition-duration 0.25s
                    transition-timing-function ease-in-out


    #mapLeftSection
        display flex
        flex-direction column
        hr
            border solid 1px #cecece
        .left-section-box
            display flex
            flex-direction column
            max-height 100%
            margin 0.5rem
            margin-bottom 4.5rem
            padding-top 0.5rem
            padding-bottom 0.5rem
            background-color white
            border-radius 8px
            box-shadow rgba(0,0,0,0.5) 1px 2px 7px 1px
            overflow hidden
            .left-section-box-top
                flex 1 1 auto
            .left-section-box-bottom
                flex 1 1 auto
                overflow-y scroll
            .left-section-flex-wrapper
                display flex
                padding-left 0.7rem
                padding-right 0.7rem
                .left-section-button-tab
                    flex-shrink 0
                    flex-basis 40px
                .left-section-list-button
                    width 40px
                    margin-left 0px
                    margin-right 0.5em
                    position relative
                    .list-bubble
                        position absolute
                        background-color dodgerblue
                        color white
                        font-size 4px
                        right 0px
                        top 0px
                        border-radius 6px
                .left-section-search-input
                    flex-basis 100%
                /*.left-section-search-button*/
                /*    min-width 90px*/
                .left-section-close
                    margin-left auto
            .selected-tag-list
                white-space nowrap
                overflow-x scroll
                margin-top 0.5rem
                padding-bottom 0.7rem
                .selected-tag
                    position relative
                    .close
                        position absolute
                        right 0
                        top -50%
            .tag-list
                text-align left
                .tagSelected
                    border solid 2px dodgerblue

    #mapRightSection
        text-align left
        #MenuTop
            pointer-events none
            .lumi-flex-slider-wrapper
                pointer-events auto

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
            margin-right 0.5rem
            padding-left 0.5rem
            padding-right 0.5rem
            border-right lightgray 1px solid
        .place-count-number
            color dodgerblue
            .more
                font-size 0.6em
                margin-bottom 0.2em
        .place-empty
            color lightcoral


    /*.activate*/
    /*    border none*/

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

    .text-dodgerblue
        color dodgerblue

</style>