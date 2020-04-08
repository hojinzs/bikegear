<template>
    <div class="tag-info-section">
        
        <div class="new-tag section">

            <div class="lumi-box lumi-box-block-grey">
                <place-tag-write :place="place" />
            </div>

        </div>
        <div class="tag-list">
            <div class="section"
                v-for="(tag,index) in place_tags"
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
import placeTagWrite from './place-tag-write'

export default {
    name: 'place-tag-list',
    components: {
        'place-tag-card': placeTagCard,
        'place-tag-write': placeTagWrite,
    },
    props: ['place','placeId','TagList'],
    data(){
        return {
            user_data: {
                login: true,
            },
            place_tags: this.TagList,
            post_tag: {
                status: 'hidden', // [hidden, posting, posted]
                tag_selected : null,
                text: '',
                ajax_status: 'ready', // [ready, posting, success, fail]
                ajax_fail_message: null,
            },
            user_taging: []
        }
    },
    computed: {
    },
    methods:{
        getTagsOnPlace(){

        },
    },
    mounted(){
    }
}
</script>

<style lang="stylus" scoped>

.section
    padding 0.5em 1em 0.5em 1em

.lumi-button-full
    .lumi-button
        width 100%

.lumi-button-group
    display flex
    button
        flex 1 1 auto
        &:not(:last-child)
            margin-right 0.5rem

.lumi-text-area-wrapper
    textarea
        width 100%

.my-tag
    line-height 2rem
    margin-top 8px
    .option
        font-size 0.9rem

.tagpost_description
    text-align center
    font-size 0.9rem
    margin 10px 0 10px 0

.tag-description
    margin-bottom 1rem

.warning
    color red

// tab transition Style
.tab-fade-enter-active
,.tab-fade-leave-active
    transition opacity .3s ease;

.tab-fade-enter
,.tab-fade-leave-to
    opacity 0

</style>