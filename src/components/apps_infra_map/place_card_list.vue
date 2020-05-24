<template>
        <div class="place-card-list bg-white border rounded-lg overflow-hidden border-solid border-gray-300 m-2 lumi-click-el"
             :class="{ 'border-blue-500 border-2': focused }"
             @click="doClick"
        >
            <div class="flex">
                <div class="place-card-list-right inline-block w-24">
                    <div class="relative bg-gray-500" style="padding-bottom: 100%">
                        <img
                                class="place-card-list-image absolute h-full w-full object-cover"
                                :src="tagObject.Image"
                        />
                    </div>
                </div>
                <div class="place-card-list-left inline-block p-2 w-full overflow-hidden">
                    <div class="place-card-list-name truncate">
                        {{ tagObject.name }}
                    </div>
                    <div class="place-card-list-name">

                    </div>
                </div>
            </div>
            <div class="place-card-list-detail flex flex-row border-t border-gray-300 text-sm px-2 pb-2"
                 :class="{'focused': focused}"
            >
                <button class="btn hover:bg-gray-300 px-2 rounded text-sm lumi-sticky-right"
                        @click.prevent="$router.push({ name: 'place', params: { id: tagObject.id } } )"
                >
                    정보 보기
                    <font-awesome-icon :icon="['far','window-restore']" />
                </button>
            </div>
        </div>
</template>

<script>
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

    export default {
        name: 'place_card_list',
        components: {
            FontAwesomeIcon,
        },
        props: {
            tagObject: {
                type: Object,
                require: true,
            },
            focused: {
                type: Boolean,
                default: false
            }
        },
        computed:{
        },
        methods:{
            doClick(element){
                this.$emit('click',element)
            },
        }
    }
</script>

<style lang="stylus" scoped>

    .place-card-list-detail
        max-height 0px
        overflow hidden
        transition max-height 0.25s
        &.focused
            max-height 100px
            transition max-height 0.5s
</style>