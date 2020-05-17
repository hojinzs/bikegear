<template>
    <div class="infra-place lumi-box lumi-box-block-white lumi-box-shadow" @click="doClick">
                            
        <div class="infra-place-section-1">
            <div class="infra-place-thumbnail thumbnail-wrapper thumbnail-border-radius">
                <div class="thumbnail" v-bind:style="backgroundImage(placeObject.Image)" />
            </div>
            <div class="infra-place-contents">
                <div class="infra-place-title infra-place-contents-blocks">
                    {{placeObject.name}}
                </div>
                <div class="infra-place-description infra-place-contents-blocks">
                    {{placeObject.type}}
                </div>
            </div>
        </div>

        <div
            class="infra-place-section-2"
            :class="{'toggled': focused}"
        >
            <button
                @click.prevent="$router.push({ name: 'place', params: { id: placeObject.id } } )"
            >
                정보 보기
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'place_card',
    props: {
        placeObject: {
            type: Object,
            require: true
        },
        thumbnail_img_url: {
            type: String,
            default: "/images/bw-bike01.jpg"
        },
        title: String,
        focused: {
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
        },
        doClick(element){
            this.$emit('click',element)
        },
    }
}
</script>

<style lang="stylus" scoped>

    @import "../../../luminus/styl/variable.styl"

    .infra-place
        position relative
        text-align left
        width 360px
        height auto
        overflow hidden
        // pointer-events auto
        @media (max-width: $mobile_viewport_width)
            width 60vw
            min-width 240px
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
                    font-weight 500
                    word-break break-all
                .infra-detail
                    padding-top 0.2rem
                    padding-bottom 0.2rem
                    text-align right
        .infra-place-section-2
            display flex
            margin-top 1rem
            max-height 0px
            overflow hidden
            transition max-height 0.5s 0.25s
            &.toggled
                max-height 500px
                transition max-height 0.5s 0.25s
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