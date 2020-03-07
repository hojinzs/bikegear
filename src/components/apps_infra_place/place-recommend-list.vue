<template>
    <div class="recommend-comment-section">
        <div>
            <div class="section">
                <div class="lumi-button-full">
                    <button class="lumi-button lumi-button-black">추천글 쓰기</button>
                </div>
            </div>
            <div class="section">
                <form class="lumi-box" action="submit" @submit.prevent.stop>
                    <label>추천글</label>
                    <div class="lumi-text-area-wrapper">
                        <vue-extended-textarea class="lumi-input-liner" 
                            v-model="new_comment.text" />
                    </div>
                    <div class="lumi-button-full">
                        <button type="submit" class="lumi-button lumi-button-black">작성</button>
                    </div>
                </form>
            </div>
            <div class="section">
                <b>내가 작성한 추천글</b>
                <recommendComment
                    :comment="rc_sample.comment"
                    :author="rc_sample.author"
                    :written_at="rc_sample.written_at">
                </recommendComment>
                <hr>
            </div>
        </div>
        <div class="section">
            <recommendComment
                :comment="rc_sample.comment"
                :author="rc_sample.author"
                :written_at="rc_sample.written_at">
            </recommendComment>
        </div>
    </div>
</template>

<script>
import { recommend_comment } from '@/plugins/sampledb'

import recommendComment from './place-recommend-comment'
import vueExtendedTextarea from '@/components/interface/vue-extended-textarea'

export default {
    name: 'place-recommend-list',
    components: {
        recommendComment,
        'vue-extended-textarea' : vueExtendedTextarea
    },
    data(){
        return {
            rc_sample: recommend_comment,
            new_comment: {
                text: 'defalut text abcdef'
            }
        }
    }
    
}
</script>

<style lang="stylus" scoped>

.section
    padding 0.5em 1em 0.5em 1em

.lumi-button-full
    .lumi-button
        width 100%

.lumi-box
&.lumi-box-grey
    border-radius 5px
    background-color #d9d9d9

</style>