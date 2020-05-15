<template>
    <div
        class="tag-mini"
        :style="{
            'background-color': 'rgba( '+String(getColor('rgb'))+', 0.2)'
        }"
        @click="doClick"
    >
        <span class="dot"></span>
        <font-awesome-icon
            v-if="showIcon"
            :style="{

            }"
            :icon="[getIconPrefix(),getIconName()]"
        />
        <span
            :title="getDescription()"
        >
            {{ getTagLabel() }}
        </span>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import colorConverter from 'color-convert'

export default {
    name: 'place-tag-mini',
    components:{
        'font-awesome-icon' : FontAwesomeIcon,
    },
    props: {
        tagObject: {
            type: Object,
        },
        label: {
            type: String,
            default: '(이름 없음)'
        },
        icon_prefix: {
            type: String,
            default: 'fas'
        },
        icon_name: {
            type: String,
            default: 'tag'
        },
        showIcon: {
            type: Boolean,
            default: true,
        },
        description: {
            type: String,
            default: '(설명 없음)'
        }
    },
    methods:{
        getTagLabel(){
            if(typeof this.tagObject == 'undefined'){
                return this.label
            } else {
                return this.tagObject.label
            }
        },
        getColor(returnType = 'hex'){
            let color = null
            if(typeof this.tagObject === "undefined"){
                color = this.color
            } else {
                color = this.tagObject.color
            }

            switch (returnType) {
                case 'hex':
                    return color;

                case 'rgb':
                    return colorConverter.hex.rgb(color)

                default:
                    break;
            }
            return color;
        },
        getIconPrefix(){
            if(typeof this.tagObject === 'undefined'){
                return this.icon_prefix|| 'fas'
            } else {
                return this.tagObject.icon_prefix
            }
        },
        getIconName(){
            if(typeof this.tagObject == 'undefined'){
                return this.icon_name
            } else {
                return this.tagObject.icon_name
            }
        },
        getDescription(){
            if(typeof this.tagObject == 'undefined'){
                return this.description
            } else {
                return this.tagObject.description
            }
        },
        doClick(){
            this.$emit('click',this)
        }
    }
}
</script>

<style lang="stylus" scoped>
.tag-mini
    line-height 2rem
    user-select none
    display inline-block
    /*background-color grey*/
    padding 0 1rem 0 0.5rem
    border-radius 0.5rem
    color black
    margin-top 0.5rem
    margin-right 0.5rem

span.dot
    height 10px
    width 10px
    background-color white
    border-radius 50%
    display inline-block
    margin-left 0.2em
    margin-right 0.5em
</style>