<template>
    <div class="place-data">
        <div class="place-title">
            <h2>{{place_data.name}}</h2>
        </div>
        <div class="place-contents">
            <div class="place-contents-block">
                <div class="place-img-wrapper">
                    <img :src="place_data.Image"/>
                </div>
            </div>
            <div class="place-contents-block">
                <div class="section">
                    <recommendComment :recommend="recommend_comment_sample" />
                </div>
                <div class="section">
                    <div>
                        Top5 Tags
                        <div class="tag-mini-list">
                            <tagMini class="tag-item"
                                v-for="(tag,index) in TagList"
                                :key="index"
                                :tagObject="tag"
                                :label="'태그라벨 어쩌고 저쩌고'">
                            </tagMini>
                        </div>
                    </div>
                </div>
                <div class="lumi-button-group section">
                    <button class="lumi-button lumi-button-black">
                        <a @click="togglePlaceLike()">
                            <font-awesome-icon class="thumbs-up" :class="{'active': place_data.user_like === true }" :icon="'thumbs-up'" /> {{' '}}{{place_data.likes_count}}
                        </a>
                    </button>
                    <button class="lumi-button lumi-button-black" @click="showHomepage(place_data.Url)">
                        웹사이트
                    </button>
                    <router-link tag="button" class="lumi-button lumi-button-flat-dark"
                        :to="{ name: 'IamOwner', query: { placeId: place_data.id }}">
                        소유자 등록
                    </router-link>
                    <button class="lumi-button lumi-button-flat-dark">정정신고</button>
                </div>
            </div>
        </div>
        <div class="lumi-tab-wrapper">
            <lumiTab :tabs="tabs"
                     @toggle="toggleTab"
            />
            <div class="lumi-tab-contents">
                <transition name="tab-fade" mode="out-in">
                    <keep-alive>
                        <component
                            :is="tab_component" 
                            :place="place_data"
                            :placeId="place_data.id"
                            :TagList="TagList">
                        </component>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import recommendComment from './place-recommend-comment'
import tagMini from './place-tag-mini'

// tab component
import lumiTab from '@/components/interface/lumi-tab'
import PlaceRecommendList from './place-recommend-list'
import PlaceTagList from './place-tag-list'

import { recommend_comment, tags } from '@/plugins/sampledb'

import axios from 'axios'

export default {
    name: 'infra-place',
    components:{
        'font-awesome-icon' : FontAwesomeIcon,
        PlaceRecommendList,
        PlaceTagList,
        recommendComment,
        lumiTab,
        tagMini,
    },
    props:{
        placeData:{
            type: Object,
            required: true
        }
    },
    computed:{
        TagList(){
            return this.placeData.tags
        },
    },
    data(){
        return {
            showPopup: true,
            loading: false,
            recommend_comment_sample: recommend_comment,
            td_sample: tags[0],
            place_id: null,
            place_data: this.placeData,
            tabs: [
                {
                    label: '추천글',
                    value: 'PlaceRecommendList'
                },
                {
                    label: '태그',
                    value: 'PlaceTagList'
                }
            ],
            tab_component: PlaceRecommendList,
        }
    },
    methods: {
        showHomepage(_URL){
            window.open(_URL)
        },
        toggleTab(_component){
            this.tab_component = _component
        },
        togglePlaceLike(){
            axios.post('v1/places/'+this.placeData.id+'/like')
                .then(res => {
                    switch (res.data) {
                        case 'stored':
                            ++this.place_data.likes_count
                            this.place_data.user_like = true
                            break;
                        case 'destroyed':
                            --this.place_data.likes_count
                            this.place_data.user_like = false
                            break;                    
                        default:
                            break;
                    }
                })
        }
    },
    created(){

    }
}
</script>

<style lang="stylus" scoped>

    @import '../../../luminus/styl/variable'

    .thumbs-up.active
        color red

    .place-data
        width 100%
        overflow-x hidden
        text-align left
        .place-title
            text-align center
            margin 0.4rem
        .place-img-wrapper
            height 180px
            overflow hidden
            background-color grey
            align-content center
            text-align center
            img
                margin 0 auto
                height 100%
        .tag-mini-list
            line-height 2rem
            .tag-item
                margin-top 0.5rem
                &:not(:last-child)
                    margin-right 0.5rem
        .section
            padding 0.5rem 1rem 0.5rem 1rem
        @media (min-width: $container_width)
            .place-contents
                display flex
                .place-contents-block
                    flex 1 1 50%
            .place-img-wrapper
                height 200px
                margin 0.5rem 0 0.5rem 1rem

    .lumi-devider
        border-bottom 0.5px solid #d9d9d9

    // tab transition Style
    .tab-fade-enter-active
    ,.tab-fade-leave-active
        transition: opacity .3s ease;

    .tab-fade-enter
    ,.tab-fade-leave-to
        opacity 0

</style>