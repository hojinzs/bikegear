<template>
    <div class="tag-mini" >
        <span class="dot"></span>
        <font-awesome-icon :icon=" getTagIcon() " />
        <span :title="getDescription()"> {{ getTagLabel() }} </span>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
        icon: {
            type: String,
            default: 'tag'
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
        getTagIcon(){
            if(typeof this.tagObject == 'undefined'){
                return this.icon
            } else {
                return this.tagObject.icon
            }
        },
        getDescription(){
            if(typeof this.tagObject == 'undefined'){
                return this.description
            } else {
                return this.tagObject.description
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.tag-mini
    user-select none
    display inline-block
    background-color grey
    padding 0 1em 0 0.5em
    border-radius 0.5em
    color black

span.dot
    height 0.6em
    width 0.6em
    background-color white
    border-radius 50%
    display inline-block
    margin-left 0.2em
    margin-right 0.5em

</style>