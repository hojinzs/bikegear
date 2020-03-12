<template>
    <div class="lumi-select-box-wrapper">
        <label v-if="label" :for="id" class="lumi-select-label">
            {{label}}
        </label>
        <div class="lumi-select-box">
            <select class="lumi-select lumi-input-liner" ref="select"
            :name="name"
            :id="id"
            :value="selected"
            @focus="focusOn()"
            @blur="focusOut()"
            @change="onChange()"
            required>
                <option v-if="placeholder" value="" disabled selected hidden> {{ placeholder }} </option>
                <option v-for="(item,key) in select_list"
                :key="key"
                :value="item.value">
                    {{ item.label }}
                </option>
            </select>
            <div class="lumi-select-box-decorate" ref="decorate">
                <slot name="decorate">
                    <font-awesome-icon class="default-decorate" icon="caret-down" />
                </slot>
            </div>
        </div>
        <div v-if="hint_text" class="lumi-component-hint">
            {{ hint_text }}
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Velocity from 'velocity-animate'

export default {
    name: 'lumi-select-box',
    components: {
        'font-awesome-icon': FontAwesomeIcon,
    },
    model: {
        prop: 'selected',
        event: 'change',
    },
    props: {
        selected: null,
        label: String,
        hint_text: String,
        placeholder: String,
        name: {
            type: String,
            default: 'select'
        },
        id: {
            type: String,
            default: 'select'
        },
        decorate_icon:{
            type: String,
        },
        select_list : {
            type: Array,
            required: true,
            validator(select_list){
                let check_properties = ['key','value','label'],
                    unique_keys = []

                let filtered = select_list.filter(item => {
                    let lost_property = check_properties.filter(property => !item.hasOwnProperty(property))
                    let duplicated = unique_keys.filter(compare => {
                        if(compare == item.key){
                            return true
                        } else {
                            unique_keys.push(item.val)
                            return false
                        }
                    })
                    return !(lost_property.length == 0 && duplicated.length == 0)
                })
                return filtered.length == 0
            }
        },
    },
    methods: {
        focusOn(){
            Velocity(this.$refs.decorate,{ rotateX: "180deg" })
        },
        focusOut(){
            Velocity(this.$refs.decorate,{ rotateX: "0deg" })
        },
        onChange(){
            this.$emit('change', this.$refs.select.value)
        }
    },
}
</script>

<style lang="stylus" scoped>
@import '../../assets/luminus.styl'

select:invalid
    color grey

.lumi-select-box-wrapper
    margin-top 1em
    margin-bottom 1em
    .lumi-select-label
        font-weight bolder
    .lumi-select-box
        position relative
        display flex
        select
            height 2.5em
            flex 1 1 auto
            padding-top 0.3em
            padding-left 0.5em
            padding-right 0.5em
        .lumi-select-box-decorate
            position absolute
            font-size 1.5em
            right 0
            height 90%
            width 8%
            display flex
            align-items center
            justify-content center
    .lumi-component-hint
        font-size 0.6em
</style>