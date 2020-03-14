<template>
    <div class="lumi-box lumi-box-grey">
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
                <button class="tag-retaging-wrapper">
                    <div class="tag-retaging-count">
                        13
                    </div>
                    <div class="tag-retaging-label">
                        태깅 수
                    </div>
                </button>
            </div>
        </div>
        <div v-if="show_comments" class="tag-recommends">
            <hr class="lumi-horizon">
            <div class="tag-comment" v-for="(cmt, index) in comments" :key="index">
                <div class="tag-comment-row">
                    <div class="tag-comment-text">
                        " {{ cmt.comment }}
                    </div>
                </div>
                <div class="tag-comment-row">
                    <div class="tag-author tag-comment-row-item">
                        <font-awesome-icon icon="heart" /> {{ cmt.like }} | {{ cmt.author }} | {{ _written_at(cmt.written_at) }}
                    </div>
                    <!-- <div class="tag-comment-posted tag-comment-row-item">
                        {{ _written_at(cmt.written_at) }}
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import placeTagMini from './place-tag-mini'

import { tag_comment } from '@/plugins/sampledb'

export default {
    name: 'place-tag-card',
    components:{
        'font-awesome-icon' : FontAwesomeIcon,
        placeTagMini,
    },
    props: {
        place_id: {
            required: true
        },
        tag: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            show_comments : false,
            comments: []
        }
    },
    methods: {
        getTagComments(){
            let comment = JSON.parse(JSON.stringify(tag_comment))
            for (let i = 0; i < 5; i++) {
                this.comments.push(comment)
            }
        },
        _written_at(date){
            return moment(date).fromNow()
        }
    },
    mounted() {
        this.getTagComments()
    }
}
</script>

<style lang="stylus" scoped>
.lumi-box
&.lumi-box-grey
    border-radius 5px
    background-color #d9d9d9

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
            background-color grey
            .tag-retaging-count
                flex 1 1 auto
                width 100%
                display flex
                justify-content center
                align-items center
                font-size 1.4rem
            .tag-retaging-label
                flex none
                flex-basis 1rem
                width 100%
                font-size 0.5rem
.tag-comment
    line-height 2em
    .tag-comment-row
        display flex
        .tag-comment-row-item
            flex 1 1 50%
        .tag-comment-posted
            text-align right
        .tag-author
            font-size 0.8rem



</style>