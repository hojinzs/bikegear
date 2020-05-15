<template>
    <!-- TODO:: 디자인 다듬기 -->
    <div class="lumi-tab lumi-tab-liner section">
        <div class="lumi-tab-item"
            v-for="(tab,index) in tabs"
            :key="index"
            :class="{ actived: (tab.value == tabToggled.value)}"
            
            @click="toggleTab(index)">
            {{ tab.label }}
        </div>
    </div>
</template>

<script>
export default {
    name: "lumi-tab",
    props:
    {
        tabs: {
            type: Array,
            required: true,
        },
        default: {
            type: Number,
            default: 0,
        }
    },
    data(){
        return {
            tabToggled: this.tabs[0]
        }
    },
    methods:
    {
        toggleTab(_index = 0){
            this.tabToggled = this.tabs[_index]
        }
    },
    created()
    {
        if(this.default){
            this.toggleTab(this.default)
        }
    },
    watch:
    {
        tabToggled(){
            this.$emit('toggle',this.tabToggled.value)
        }
    }
}
</script>

<style lang="stylus" scoped>

.lumi-tab
    line-height 2rem
    display flex
    user-select none
    .lumi-tab-item
        flex 1 1 none
        display inline-block
        text-align center
        padding 0 1rem 0 1rem
        margin 0 0.5rem 0 0.5rem
        &:first-child
            margin-left 0
        &:last-child
            margin-right 0
.lumi-tab-liner
    .lumi-tab-item
        border-bottom 2px solid grey
        cursor pointer
        &.actived
            background-color grey
            font-weight 700
            color white

</style>