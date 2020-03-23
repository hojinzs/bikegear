<template>
    <div class="lumi-box lumi-box-block-grey">
        <div class="recommend-comment">
            <slot>
                <span v-html="_comment"></span>
            </slot>
            <div class="recommend-comment-info">
                <div class="like">
                    <a class="a-flat a-flat-red" href="" @click.prevent="++recommend.like">
                        <font-awesome-icon :icon="'heart'" />  {{ recommend.likes }}
                    </a>  명이 공감합니다.
                </div>
                <div class="author">
                    by {{ _author_name }} - {{ _written_at  }}
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
        recommend: {
            type: Object,
            require: true,
        },
    },
    computed: {
        _written_at(){
            return moment(this.recommend.written_at).fromNow()
        },
        _comment(){
            return xss(hoxy.bl2r(this.recommend.comment))
        },
        _author_name(){
            return this.recommend.author.name
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