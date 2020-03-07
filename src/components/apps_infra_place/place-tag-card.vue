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
            <div class="tag-retaging" @click="show_recommend = !show_recommend">
                <div class="tag-retaging-tags">
                    리태깅 수 : 13
                </div>
            </div>
        </div>
        <div v-if="show_recommend" class="tag-recommends">
            asdfasdf
        </div>
    </div>
</template>

<script>
import placeTagMini from './place-tag-mini'

export default {
    name: 'place-tag-card',
    components:{
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
            show_recommend : false
        }
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
        flex none
        .tag-mini-list
            line-height 2rem
        .tag-description
            margin-top 10px
    .tag-retaging
        user-select none
        // flex 1 1 30px
        // flex-basis 30px
        margin-left auto
        // vertical-align middle
        display flex
        border-left 1px solid grey
        .tag-retaging-tags
            flex 1 1 auto
            padding-left 1rem
            margin auto 0

</style>