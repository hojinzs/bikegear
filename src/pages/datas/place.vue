<template>
    <lumiPopupPannel
        :display.sync="showPopup"
        :returnTo="close_url">
        <!-- Place Id is => {{ $route.params.id }} -->

        <!-- Loading -->
        <div v-if="loading">
            Loading...
        </div>
        <!-- Data Load Fisish -->
        <div v-if="place_data" class="place-data">
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
                <button class="lumi-button lumi-button-black">좋아요 60</button>
                <button class="lumi-button lumi-button-black">웹사이트</button>
                <button class="lumi-button lumi-button-black">소유권 주장</button>
                <button class="lumi-button lumi-button-black">정정신고</button>
            </div>
            <div class="section">
                <b> Top5 Tags :: </b> [ 태그 ] [ 태그 ] [ 태그 ] [ 태그 ]
            </div>
            <div class="lumi-tab-wrapper">
                <div class="lumi-tab lumi-tab-liner section">
                    <span class="lumi-tab-item actived">추천글</span>
                    <span class="lumi-tab-item">태그</span>
                </div>
                <div class="lumi-tab-contents">
                    <div class="recommend-comment-section">
                        <div>
                            <div class="section">
                                <div class="lumi-button-full">
                                    <button class="lumi-button lumi-button-black">추천글 쓰기</button>
                                </div>
                            </div>
                            <div class="section">
                                <form class="lumi-box" action="submit" @submit.prevent.stop>
                                    <label>추천글</label>
                                    <div class="lumi-text-area-wrapper">
                                        <textarea class="lumi-input-liner"></textarea>
                                    </div>
                                    <div class="lumi-button-full">
                                        <button type="submit" class="lumi-button lumi-button-black">작성</button>
                                    </div>
                                </form>
                            </div>
                            <div class="section">
                                <b>내가 작성한 추천글</b>
                                <recommendComment
                                    :comment="recommend_comment_sample.comment"
                                    :author="recommend_comment_sample.author"
                                    :written_at="recommend_comment_sample.written_at">
                                </recommendComment>
                                <hr>
                            </div>
                        </div>
                        <div class="section">
                            <recommendComment
                                :comment="recommend_comment_sample.comment"
                                :author="recommend_comment_sample.author"
                                :written_at="recommend_comment_sample.written_at">
                            </recommendComment>
                        </div>
                        <div class="section">
                            <recommendComment
                                :comment="recommend_comment_sample.comment"
                                :author="recommend_comment_sample.author"
                                :written_at="recommend_comment_sample.written_at">
                            </recommendComment>
                        </div>
                        <div class="section">
                            <recommendComment
                                :comment="recommend_comment_sample.comment"
                                :author="recommend_comment_sample.author"
                                :written_at="recommend_comment_sample.written_at">
                            </recommendComment>
                        </div>
                        <div class="section">
                            <recommendComment
                                :comment="recommend_comment_sample.comment"
                                :author="recommend_comment_sample.author"
                                :written_at="recommend_comment_sample.written_at">
                            </recommendComment>
                        </div>
                        <div class="section">
                            <recommendComment
                                :comment="recommend_comment_sample.comment"
                                :author="recommend_comment_sample.author"
                                :written_at="recommend_comment_sample.written_at">
                            </recommendComment>
                        </div>
                        <div class="section">
                            <recommendComment
                                :comment="recommend_comment_sample.comment"
                                :author="recommend_comment_sample.author"
                                :written_at="recommend_comment_sample.written_at">
                            </recommendComment>
                        </div>
                    </div>
                </div>
                <div class="lumi-tab lumi-tab-liner section">
                    <span class="lumi-tab-item">추천글</span>
                    <span class="lumi-tab-item actived">태그</span>
                </div>
                <div class="lumi-tab-contents">
                    <div class="tag-info-section">
                        <div class="new-tag">
                            <div class="section">
                                <div class="lumi-button-full">
                                    <button class="lumi-button lumi-button-black">태깅하기</button>
                                </div>
                            </div>
                        </div>
                        <div class="tag-list">
                            <div class="section">
                                <place-tag-card
                                    :place_id="place_id"
                                    :tag="td_sample">
                                </place-tag-card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </lumiPopupPannel>
</template>

<script>
import { lumiPopupPannel } from 'vue-luminus-style'
import { response } from '../../components/apps_infra_map/sampledb'

import recommendComment from './place-recommend-comment'
import placeTagCard from './place-tag-card'

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
    name: 'place_info',
    components:{
        lumiPopupPannel,
        recommendComment,
        'place-tag-card' : placeTagCard,
    },
    data(){
        return {
            showPopup: true,
            loading: false,
            recommend_comment_sample: recommend_comment_sample,
            td_sample: tag_data_sample,
            place_id: null,
            place_data: null,
            close_url: { name: 'Bike Infra Map' }
        }
    },
    methods: {
        getData(){
            this.loading = true
            setTimeout(() => {
                this.loading = false
                this.place_data = response[this.place_id]
            },800)
        }
    },
    created(){
        this.place_id = String(this.$route.params.id - 1)

        this.getData()
        console.log("VueRouter => ",this.$route.params.id )
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