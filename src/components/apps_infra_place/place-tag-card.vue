<template>
    <div class="lumi-box lumi-box-grey">
        <div>
            <font-awesome-icon :icon="tag.icon" /> <b>{{ tag.label }}</b>
        </div>
        <div>
            {{ tag.description }}
        </div>
        <div>
            리태깅 수 : 13
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
    name: 'place-tag-card',
    components:{
        'font-awesome-icon' : FontAwesomeIcon,
    },
    props: {
        place_id: {
            required: true
        },
        tag: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="stylus" scoped>
.lumi-box
&.lumi-box-grey
    border-radius 5px
    background-color #d9d9d9

</style>