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
                        <textarea class="lumi-input-liner"></textarea>
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

let recommend_comment_sample = {
    "comment" : "전국에서 찾아올 정도로 피팅으로 유명한 매장입니다.\n피터분이 친절하고 장비가 전문적입니다.",
    "author" : "Moderator",
    "written_at" : new Date('2019-11-21 12:11:21')
}
import recommendComment from './place-recommend-comment'

export default {
    name: 'place-recommend-list',
    components: {
        recommendComment,
    },
    data(){
        return {
            rc_sample: recommend_comment_sample,
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

.lumi-text-area-wrapper
    textarea
        width 100%

.lumi-box
&.lumi-box-grey
    border-radius 5px
    background-color #d9d9d9

</style>