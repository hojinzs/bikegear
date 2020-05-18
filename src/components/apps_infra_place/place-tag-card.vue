<template>
    <div class="tag-card lumi-box lumi-box-block-grey">
        <div class="tag">
            <div class="tag-info">
                <div class="tag-mini-list">
                    <placeTagMini :tagObject="tag" />
                </div>
                <div class="tag-description">
                    {{ tag.description }}
                </div>
            </div>
            <div class="tag-retaging" @click="show_comments = !show_comments">
                <button class="tag-retaging-wrapper lumi-button lumi-button-flat-dark">
                    <div class="tag-retaging-count">
                        {{ tag.pivot.tagging_counts }}
                    </div>
                    <div class="tag-retaging-label">
                        태깅 수
                    </div>
                </button>
            </div>
        </div>
        <div class="tag-recommends">
            <div v-if="show_comments">
                <div class="tag-comment"
                     v-for="cmt in tagComments.data"
                     :key="cmt.id"
                >
                    <div class="tag-comment-row">
                        <div class="tag-comment-text">
                            {{ cmt.comment }}
                        </div>
                    </div>
                    <div class="tag-comment-row">
                        <div class="tag-author tag-comment-row-item">
                            <a class="a-flat a-flat-red"
                               href=""
                               @click.prevent="toggleCommentLike(cmt)"
                            >
                                <font-awesome-icon class="thumbs-up"
                                                   :class="{ 'active' : cmt.user_like === true }"
                                                   icon="heart"
                                />
                                {{ cmt.likes }}
                            </a>
                            | {{ cmt.author }}
                            | {{ _written_at(cmt.written_at) }}
                        </div>
                    </div>
                </div>
                <!-- TODO:: 디자인 다듬기 -->
                <button class="w-full"
                        v-if="tagComments.nextPage"
                        @click="getTagComments(true)"
                >
                    <lumi-loading v-show="tagComments.status === 'loading'"
                                  :loading="tagComments.status === 'loading'"
                    />
                    <span v-show="tagComments.status !== 'loading'"
                    >더 보기</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import apiResourceManager from "../../plugins/apiResourceManager";

import placeTagMini from './place-tag-mini'

import axios from 'axios'
import LumiLoading from "../interface/lumi-loading";

export default {
    name: 'place-tag-card',
    components:{
        LumiLoading,
        FontAwesomeIcon,
        placeTagMini,
    },
    props: {
        place_id: {
            required: true
        },
        tag: {
            type: Object,
            required: true
        },
    },
    data(){
        let indexPlaceTagComment = `v1/places/${this.place_id}/tags/${this.tag.id}/comments`
        return {
            show_comments : false,
            tagComments: new apiResourceManager(indexPlaceTagComment),
        }
    },
    methods: {
        getTagComments(getMoreData = false){
            let page = 1
            if(getMoreData){
                if(this.tagComments.nextPage === null) throw new Error('this is lastpage')

                page = this.tagComments.nextPage
            }

            axios.get(this.tagComments.apiUrl,{
                params: {
                    'page': page
                }
            })
                .then(res => {
                    let comments = res.data.data.map( comment => {
                        return {
                            id: comment.id,
                            comment: comment.comment,
                            likes: comment.likes,
                            user_like: comment.user_like,
                            author: comment.author.name,
                            written_at: comment.written_at,
                        }
                    })
                    this.tagComments.mergeData(comments)
                    this.tagComments.setPaging(res.data.meta)
                })
                .catch(error => {
                    this.tagComments.handlingFail(error.message)
                })
            this.tagComments.setLoading()
        },
        _written_at(date){
            return moment(date).fromNow()
        },
        toggleCommentLike(comment){
            let like_url = '//'+process.env.VUE_APP_API_HOST
                +'/v1/places/tags/comments/'
                +comment.id+'/like'

            axios.post(like_url)
                .then(res => {
                    switch (res.data) {
                        case 'stored':
                            ++comment.likes
                            comment.user_like = true
                            break;
                        case 'destroyed':
                            --comment.likes
                            comment.user_like = false
                            break;                    
                        default:
                            break;
                    }
                })
        }

    },
    mounted() {
        this.getTagComments()
    }
}
</script>

<style lang="stylus" scoped>
@import '../../../luminus/styl/variable.styl'

    .thumbs-up.active
        color red

    .tag-card
        .tag
            display flex
            .tag-info
                flex-grow 1
                .tag-mini-list
                    line-height 2rem
                .tag-description
                    margin-top 10px
            .tag-retaging
                flex-basis 15px
                user-select none
                margin-left auto
                .tag-retaging-wrapper
                    display flex
                    height 4.5rem
                    flex-direction column
                    border-radius 5px
                    // background-color grey
                    .tag-retaging-count
                        flex 1 1 auto
                        width 100%
                        display flex
                        justify-content center
                        align-items center
                        font-size 1.4rem
                    .tag-retaging-label
                        flex none
                        flex-basis 0.5rem
                        width 100%
                        font-size 0.5rem
        .tag-recommends
            .tag-comment
                line-height 1.6rem
                margin-bottom 1rem
                background-color $lumi_opacity_white_level_2
                border-radius 6px
                padding 0.5rem
                .tag-comment-row
                    display flex
                    .tag-comment-row-item
                        flex 1 1 50%
                    .tag-comment-posted
                        text-align right
                    .tag-author
                        font-size 0.9rem
</style>