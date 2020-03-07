<template>
    <div class="recommend-comment-section">
        <!-- 내가 작성한 추천 글 -->
        <div class="my-comment">
            
            <transition name="tab-fade" mode="out-in">

                <!-- 인증되지 않았을 경우 -->
                <div v-if="false" class="section" key="loginRequire">
                    로그인이 필요합니다.
                </div>

                <!-- 인증됨, 사용자 인증됨 -->
                <div class="section" key="ready"
                v-if="( user_data.login == true && post_comment.status == 'hidden')">
                    <div class="lumi-button-full">
                        <button class="lumi-button lumi-button-black"
                            @click="setStatus_postRecommentPost">추천글 쓰기</button>
                    </div>
                </div>

                <!-- 인증됨, 등록 클릭 -->
                <div class="section" key="posting"
                v-if="( user_data.login == true && post_comment.status == 'posting')">
                    <form class="lumi-box" action="submit" @submit.prevent="postRecommentPost">
                        <label for="post_recomment_comment">새로운 추천글을 등록합니다.</label>
                        <div class="lumi-text-area-wrapper">
                            <vue-extended-textarea class="lumi-input-liner" id="post_recomment_comment"
                                v-model="post_comment.text" />
                        </div>
                        <div class="lumi-button-full">
                            <button type="submit" class="lumi-button lumi-button-black"
                                :disabled="(this.post_comment.ajax_status != 'ready')">작성</button>
                            <span v-show="post_comment.ajax_fail_message" class="warning"
                            >{{ post_comment.ajax_fail_message }}</span>
                        </div>
                    </form>
                </div>

                <!-- 인증됨, 내가 작성한 추천글 -->
                <div class="section" key="done"
                v-if="( user_data.login == true && post_comment.status == 'posted' && post_comment.user_posted != null)">
                    <b>내가 작성한 추천글</b>
                    <recommend-comment
                        :comment="post_comment.user_posted.comment"
                        :author="post_comment.user_posted.author"
                        :written_at="post_comment.user_posted.written_at">
                    </recommend-comment>
                    <a @click="setStatus_postRecommentPost">업데이트 하기</a>
                </div>
            
            </transition>

            <div class="section">
                <hr>
            </div>
        </div>

        <!-- 추천글 목록 -->
        <div class="section">
            <recommend-comment
                :comment="rc_sample.comment"
                :author="rc_sample.author"
                :written_at="rc_sample.written_at">
            </recommend-comment>
        </div>
        <div class="section">
            <div class="load-more lumi-box lumi-box-grey">
                더 보기
            </div>
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
        'recommend-comment': recommendComment,
        'vue-extended-textarea' : vueExtendedTextarea
    },
    data(){
        return {
            rc_sample: recommend_comment,
            user_data: {
                login: true,
            },
            post_comment: {
                status: 'hidden', // [hidden, posting, posted]
                text: 'defalut text abcdef',
                ajax_status: 'ready', // [ready, posting, success, fail]
                ajax_fail_message: null,
                user_posted: undefined
            }
        }
    },
    computed: {
        post_button_disabled(){
            console.log("disabled => ", this.post_comment.ajax_status != 'ready')
            return this.post_comment.ajax_status != 'ready'
        }
    },
    methods:{
        setStatus_postRecommentPost(){
            this.post_comment.status = 'posting'
        },
        postRecommentPost(){
            // Set Dummy Data
            let newPost = {
                "comment" : this.post_comment.text,
                "author" : "Moderator",
                "written_at" : new Date()
            }
            let form = JSON.stringify(newPost)

            //Before
            this.post_comment.ajax_status = 'posting'
            console.log("set form => ", form)

            //Post
            let ajax_success = Math.round(Math.random())
            setTimeout(()=>{
                let res = JSON.parse(form)

                if(ajax_success){
                    console.log(res)
                    this.post_comment.status = 'posted'
                    this.post_comment.ajax_status = 'success'
                    this.post_comment.user_posted = res
                } else {
                    this.post_comment.ajax_status = 'fail'
                    this.post_comment.ajax_fail_message = '제대로 등록되지 않았습니다.'
                }

                //Complete
                console.log("success => ",ajax_success)
                setTimeout(() => {
                    this.post_comment.ajax_status = 'ready'

                },1000)
            },1200)
        }
    },
    created(){

    },
    
}
</script>

<style lang="stylus" scoped>

.section
    padding 0.5em 1em 0.5em 1em

.lumi-button-full
    .lumi-button
        width 100%
    .warning
        color red

.lumi-box
&.lumi-box-grey
    border-radius 5px
    background-color #d9d9d9

.load-more
    text-align center

// tab transition Style
.tab-fade-enter-active
,.tab-fade-leave-active
    transition: opacity .3s ease;

.tab-fade-enter
,.tab-fade-leave-to
    opacity 0

</style>