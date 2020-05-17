<template>
    <div class="form-body lumi-container">
        <div class="where">
            어디를 등록하고자 하느냐
        </div>
        <div class="description">
            등록하면 왜 좋은가, 절대 삥을 뜯지 않는다아
        </div>
        <div class="form">
            <vue-form-generator :schema="schema" :model="model" />
        </div>
    </div>
</template>

<script>
/**
 * Use VueJS Form Generator
 * doc: https://vue-generators.gitbook.io/vue-generators/
 */
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'

export default {
    name: 'place-owner-form',
    components: {
        'vue-form-generator' : VueFormGenerator.component
    },
    created(){
        this.$store.commit('page/cover_style_change','cover');
        this.$store.commit('page/cover_title_change',"장소 / 매장 소유자 등록");
        this.$store.commit('page/background_change','/images/w-cycling.jpg');
    },
    data(){
        return {
            model: {
                id: null
            },
            schema: {
                fields : [
                    {
                        type: 'input',
                        inputType: 'text',
                        label: '점으어',
                        model: 'id',
                        placeholder: '매장이다',
                        hint: '매장이다'
                    }
                ]
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import "../../../luminus/styl/variable.styl"

    .form
        text-align left
        border none

    .lumi-container
        max-width $container_width
        margin 0 auto

</style>

<style lang="stylus">
    fieldset
        margin 0
        border none
</style>