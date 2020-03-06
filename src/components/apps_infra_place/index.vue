<template>
    <div class="place-data">
        <div class="place-title">
            <h2>{{place_data.name}}</h2>
        </div>
        <div class="place-img-wrapper">
            <img :src="place_data.Image"/>
        </div>
        <div class="section">
            <recommendComment
                :comment="recommend_comment_sample.comment"
                :author="recommend_comment_sample.author"
                :written_at="recommend_comment_sample.written_at">
            </recommendComment>
        </div>
        <div class="lumi-button-group section">
            <button class="lumi-button lumi-button-black">
                <font-awesome-icon :icon="'thumbs-up'" /> {{' '}} 좋아요 {{place_data.like}}
            </button>
            <button class="lumi-button lumi-button-black" @click="showHomepage(place_data.Url)">
                웹사이트
            </button>
            <button class="lumi-button lumi-button-black">소유권 주장</button>
            <button class="lumi-button lumi-button-black">정정신고</button>
        </div>
        <div class="section">
            <b> Top5 Tags :: </b>
            <span class="tag-small"
                v-for="(tag,index) in TagList"
                :key="index">
                {{ tag.label }}
            </span>
        </div>
        <div class="lumi-tab-wrapper">
            <div class="lumi-tab lumi-tab-liner section">
                <span class="lumi-tab-item"
                    @click="toggleTab('PlaceRecommendList')">
                    추천글
                </span>
                <span class="lumi-tab-item"
                    @click="toggleTab('PlaceTagList')">
                    태그
                </span>
            </div>
            <div class="lumi-tab-contents">
                <keep-alive>
                    <component
                        :is="tab_component" 
                        :placeId="place_data.id"
                        :TagList="TagList">
                    </component>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import recommendComment from './place-recommend-comment'

import PlaceRecommendList from './place-recommend-list'
import PlaceTagList from './place-tag-list'

import Tag from '../../plugins/journey66_tag'

let recommend_comment_sample = {
    "comment" : "전국에서 찾아올 정도로 피팅으로 유명한 매장입니다.\n피터분이 친절하고 장비가 전문적입니다.",
    "author" : "Moderator",
    "written_at" : new Date('2019-11-21 12:11:21')
}

let tag_data_sample = {
    'index' : '1',
    'name' : 'maintenance',
    'label' : '정비',
    'icon' : 'tools',
    'color' : '#ffcc66',
    'type' : 'Utility',
    'description' : '자전거 정비가 가능합니다.',
    'retagging' : '11'
}

export default {
    name: 'infra-place',
    components:{
        'font-awesome-icon' : FontAwesomeIcon,
        PlaceRecommendList,
        PlaceTagList,
        recommendComment,
    },
    props:{
        placeData:{
            type: Object,
            required: true
        }
    },
    computed:{
        TagList(){
            return Tag.getTagsOnInfra(this.place_data,true)
        },
    },
    data(){
        return {
            showPopup: true,
            loading: false,
            recommend_comment_sample: recommend_comment_sample,
            td_sample: tag_data_sample,
            place_id: null,
            place_data: this.placeData,
            tab_component: PlaceRecommendList
        }
    },
    methods: {
        showHomepage(_URL){
            console.log("GO => ",_URL)
            window.open(_URL)
        },
        toggleTab(_component){
            this.tab_component = _component
        }
    },
    created(){

    }
}
</script>

<style lang="stylus" scoped>
.place-data
    width 100%
    overflow-x hidden
    text-align left
    .place-title
        text-align center
    .place-img-wrapper
        height 120px
        background-color grey
        align-content center
        text-align center
        img
            margin 0 auto
            height 100%
    .section
        padding 0.5em 1em 0.5em 1em

.lumi-button-full
    .lumi-button
        width 100%

.lumi-text-area-wrapper
    textarea
        width 100%

.lumi-button-group
    display flex
    .lumi-button
        flex 1 1 auto
        &:not(:last-child)
            margin-right 1rem

.lumi-box
&.lumi-box-grey
    border-radius 5px
    background-color #d9d9d9

.lumi-tab-wrapper
    line-height 2rem
    .lumi-tab
        display flex
        .lumi-tab-item
            flex 1 1 none
            text-align center
            padding 0 1rem 0 1rem
            margin 0 0.5rem 0 0.5rem
            &:first-child
                margin-left 0
            &:last-child
                margin-right 0
    .lumi-tab-liner
        .lumi-tab-item
            border-bottom 2px solid grey
            &.actived
                background-color grey
                font-weight 700
                color white

</style>