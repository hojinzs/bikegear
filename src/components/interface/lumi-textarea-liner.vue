<template>
    <div class="lumi-textarea-liner-wrapper">
        <label v-if="label" :for="id" class="lumi-component-label">
            {{label}}
        </label>
        <textarea ref="textarea" class="lumi-input-liner"
            :value="longtext"
            :name="name"
            :placeholder="placeholder"
            :disabled="disabled"
            @input="onChange" />
        <div v-if="hint_text" class="lumi-component-hint">
            {{ hint_text }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'lumi-textarea-liner',
    model: {
        prop: 'longtext',
        event: 'input',
    },
    props: {
        longtext: String,
        label: String,
        hint_text: String,
        placeholder: String,
        disabled: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            default: 'textarea'
        },
        id: {
            type: String,
            default: 'select'
        },
        min_height: {
            type: String,
            default: '5rem'
        },
        max_height: {
            type: String,
            default: '500px'
        },
    },
    data(){
        return {
            rows: this.default_rows
        }
    },
    methods: {
        onChange(){
            this.$refs.textarea.style.height = 'auto'
            this.$refs.textarea.style.height = (this.$refs.textarea.scrollHeight+10)+'px'
            this.$emit('input', this.$refs.textarea.value)
        }
    },
    mounted(){
        this.$refs.textarea.style.minHeight = this.min_height
        this.$refs.textarea.style.maxHeight = this.max_height
    }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/luminus.styl'

textarea
    width 100%
    overflow-y hidden
    resize none
    padding-left 0.5em
    padding-right  0.5em
    padding-top 0.5em
    box-sizing border-box
</style>