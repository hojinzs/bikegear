<template>
    <div class="tag-info-section">
        <div class="new-tag">
            <div class="section">
                <div class="lumi-button-full">
                    <button class="lumi-button lumi-button-black">태깅하기</button>
                </div>
            </div>
        </div>
        <div class="tag-list">
            <div class="section"
                v-for="(tag,index) in TagList"
                :key="index">
                <place-tag-card
                    :place_id="placeId"
                    :tag="tag">
                </place-tag-card>
            </div>
        </div>
    </div>
</template>

<script>
import placeTagCard from './place-tag-card'

export default {
    name: 'place-tag-list',
    components: {
        'place-tag-card' : placeTagCard,
    },
    props: ['placeId','TagList'],
}
</script>

<style lang="stylus" scoped>

.section
    padding 0.5em 1em 0.5em 1em

.lumi-button-full
    .lumi-button
        width 100%

.lumi-text-area-wrapper
    textarea
        width 100%

.lumi-box
&.lumi-box-grey
    border-radius 5px
    background-color #d9d9d9

</style>