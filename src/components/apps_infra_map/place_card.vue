<template>
    <div class="infra-place lumi-box lumi-box-block-white lumi-box-border lumi-box-shadow">
                            
        <div class="infra-place-section-1">
            <div class="infra-place-thumbnail thumbnail-wrapper thumbnail-border-radius">
                <div class="thumbnail" v-bind:style="backgroundImage(thumbnail_img_url)" />
            </div>
            <div class="infra-place-contents">
                <div class="infra-place-title infra-place-contents-blocks">
                    {{title}}
                </div>
                <div class="infra-place-description infra-place-contents-blocks">
                    <slot></slot>
                </div>
            </div>
        </div>

        <div class="infra-place-section-2"
            v-if="extention_toggled">
            <slot name="expention">
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'place_card',
    props: {
        thumbnail_img_url: {
            type: String,
            default: "/images/bw-bike01.jpg"
        },
        title: String,
        extention_toggled: {
            type: Boolean,
            default: false
        }
    },
    computed:{
    },
    methods:{
        backgroundImage(_URL){
            return {
                backgroundImage: 'url('+_URL+')',
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/luminus.styl"

.infra-place
    position relative
    text-align left
    width 340px
    // height 100px
    height auto
    overflow hidden
    // pointer-events auto
    // @media (max-width: 400px)
    //     width 75vw
    .infra-place-section-1
        display flex
        .infra-place-thumbnail
            flex-grow 100px
            overflow hidden
            display inline-block
            width auto
        .infra-place-contents
            flex 1
            display inline-block
            overflow hidden
            .infra-place-contents-blocks
                overflow hidden
                margin-left 0.5rem
                margin-right 0.5rem
            .infra-place-title
                font-size 1.2rem
                font-weight bolder
            .infra-detail
                padding-top 0.2rem
                padding-bottom 0.2rem
                text-align right
    .infra-place-section-2
        display flex
        margin-top 1rem
        button 
            margin-left auto

.thumbnail-wrapper
    background-color $light_grey
    &.thumbnail-border-radius
        // border 0.5px solid $light_grey
        border-radius 0.5rem
    .thumbnail
        overflow hidden
        display flex
        align-items center 
        justify-content center
        width 100px
        height 100px
        img
            width auto
            height 100%

</style>