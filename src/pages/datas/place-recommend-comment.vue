<template>
    <div class="wrapper">
        <div class="recommend-comment">
            <slot>
                <span v-html="_comment"></span>
            </slot>
            <div class="author">by {{author}} - {{ _written_at  }}</div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import xss from 'xss'
import hoxy from '@/plugins/hoxy'

moment.locale('ko')

export default {
    name: "recommend_comment",
    props: {
        comment: {
            type: String,
        },
        author: {
            type: String,
            required: true
        },
        written_at: {
            type: Date,
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

.wrapper
    padding 1em 2em 1em 2em
    border-radius 5px
    background-color #d9d9d9

.recommend-comment
    text-align left
    .author
        text-align right
</style>