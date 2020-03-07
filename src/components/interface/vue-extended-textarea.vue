<template>
    <textarea ref="textarea" :value="text" :name="name" @input="onChange" :placeholder="placeholder"></textarea>
</template>

<script>
export default {
    name: 'vue-extended-textarea',
    model: {
        prop: 'text',
        event: 'input',
    },
    props: {
        text: String,
        name: {
            type: String,
            default: 'textarea'
        },
        min_height: {
            type: String,
            default: '5rem'
        },
        max_height: {
            type: String,
            default: '500px'
        },
        placeholder: String,
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
textarea
    width 100%
    // min-height 5em
    overflow-y hidden
    resize none
    padding-left 0.5em
    padding-right  0.5em
    padding-top 0.5em
    box-sizing border-box
</style>