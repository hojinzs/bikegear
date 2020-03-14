<template>
    <div class="lumi-box lumi-box-block-grey">
        <div class="recommend-comment">
            <slot>
                <span v-html="_comment"></span>
            </slot>
            <div class="recommend-comment-info">
                <div class="like">
                    <a class="a-flat a-flat-red" href="" @click.prevent="++like">
                        <font-awesome-icon :icon="'heart'" />  {{this.like}}
                    </a>  명이 공감합니다.
                </div>
                <div class="author">
                    by {{author}} - {{ _written_at  }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import moment from 'moment'
import xss from 'xss'
import hoxy from '@/plugins/hoxy'

moment.locale('ko')

export default {
    name: "recommend_comment",
    data(){
        return {
            like: 0
        }
    },
    components:{
        'font-awesome-icon' : FontAwesomeIcon,
    },
    props: {
        comment: {
            type: String,
        },
        author: {
            type: String,
            required: true
        },
        written_at: {
            required: true
        }
    },
    computed: {
        _written_at(){
            return moment(this.written_at).fromNow()
        },
        _comment(){
            return xss(hoxy.bl2r(this.comment))
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/luminus.styl'

.recommend-comment
    margin 0.5rem
    font-size 1rem
    line-height 1.6rem
    text-align left
    .recommend-comment-info
        user-select none
        display flex
        flex-direction row
        font-size 0.9rem
        .like
            flex 1 1 auto
        .author
            flex 1 1 auto
            text-align right
</style>