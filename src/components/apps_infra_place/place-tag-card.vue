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
                <hr class="lumi-horizon">
                <div class="tag-comment" v-for="(cmt, index) in comments" :key="index">
                    <div class="tag-comment-row">
                        <div class="tag-comment-text">
                            {{ cmt.comment }}
                        </div>
                    </div>
                    <div class="tag-comment-row">
                        <div class="tag-author tag-comment-row-item">
                            <a class="a-flat a-flat-red" href="" @click.prevent><font-awesome-icon icon="heart" /> {{ cmt.like }}</a>
                            | {{ cmt.author }}
                            | {{ _written_at(cmt.written_at) }}
                        </div>
                    </div>
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
        let ajax_url = '//'+process.env.VUE_APP_API_HOST+'/v1/places/'
            +this.place_id
            +'/tags/'
            +this.tag.id

        return {
            show_comments : false,
            comments: [],
            comments_load: {
                url: ajax_url,
                status: 'none' // [none, loading, success, fail]
            }
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
@import '../../assets/variable.styl'

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