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
                            @click="toggle_showNewCommentForm(true)">추천글 쓰기</button>
                    </div>
                </div>

                <!-- 인증됨, 등록 클릭 -->
                <div class="section" key="posting"
                v-if="( user_data.login == true && post_comment.status == 'posting')">
                    <form class="lumi-box lumi-box-block-grey" action="submit" @submit.prevent="postRecommentPost">
                        <label for="post_recomment_comment">새로운 추천글을 등록합니다.</label>
                        <div class="lumi-text-area-wrapper">
                            <vue-extended-textarea class="lumi-input-liner" id="post_recomment_comment"
                                v-model="post_comment.text" />
                        </div>
                        <div class="lumi-button-group">
                            <button class="lumi-button lumi-button-flat-dark"
                                @click.prevent="toggle_showNewCommentForm(false)">취소</button>
                            <button type="submit" class="lumi-button lumi-button-black"
                                :disabled="(this.post_comment.ajax_status != 'ready')">작성</button>
                            </div>
                        <div>
                            <span v-show="post_comment.ajax_fail_message" class="warning"
                            >{{ post_comment.ajax_fail_message }}</span>
                        </div>
                    </form>
                </div>

                <!-- 인증됨, 내가 작성한 추천글 -->
                <div class="section" key="done"
                v-if="( user_data.login == true && post_comment.status == 'posted' && post_comment.user_posted != null)">
                    <b>내가 작성한 추천글</b>
                    <recommend-comment :recommend="post_comment.user_posted" />
                    <a @click="toggle_showNewCommentForm(true)">업데이트 하기</a>
                </div>
            
            </transition>

            <div class="section">
                <hr>
            </div>
        </div>

        <!-- 추천글 목록 -->
        <div v-for="(rc,index) in recommend_comment.list" :key="index" class="section">
            <recommend-comment :recommend="rc" />
        </div>
        <div class="section lumi-button-full">
            <button class="lumi-button lumi-button-flat-dark" ref="scrollend" :disabled="(recommend_comment.ajax_status != 'complete')"
            @click="getRecommendCommentList()">
                <transition name="tab-fade" mode="out-in">
                    <span key="loading" v-if="recommend_comment.ajax_status == 'loading'">
                        <img class="loading" src="/images/Spinner-1s-104px.gif">
                    </span>
                    <span key="complete" v-if="recommend_comment.ajax_status == 'complete'" >
                        더 보기
                    </span>
                    <span key="complete" v-if="recommend_comment.ajax_status == 'nomore'" >
                        없습니다
                    </span>
                    <span key="fail" class="warning" v-if="recommend_comment.ajax_status == 'fail'">
                        [!] {{ recommend_comment.ajax_fail_message }}
                    </span>
                </transition>
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import { recommend_comment } from '@/plugins/sampledb'

import recommendComment from './place-recommend-comment'
import vueExtendedTextarea from '@/components/interface/vue-extended-textarea'

export default {
    name: 'place-recommend-list',
    props: {
        place: {
            type: Object,
            required: true,
        }
    },
    components: {
        'recommend-comment': recommendComment,
        'vue-extended-textarea' : vueExtendedTextarea
    },
    data(){
        let ajax_address = '//'+process.env.VUE_APP_API_HOST+'/v1/places/'
            +this.place.id
            +'/recommends'

        return {
            user_data: {
                login: true,
            },
            post_comment: {
                status: 'hidden', // [hidden, posting, posted]
                text: '',
                ajax_status: 'ready', // [ready, posting, success, fail]
                ajax_fail_message: null,
                user_posted: undefined
            },
            recommend_comment: {
                list: [],
                ajax_address: ajax_address,
                ajax_status: 'complete', // [complete, loading, fail, nomore]
                ajax_fail_message: null,
            },
        }
    },
    computed: {
        post_button_disabled(){
            console.log("disabled => ", this.post_comment.ajax_status != 'ready')
            return this.post_comment.ajax_status != 'ready'
        }
    },
    methods:{
        toggle_showNewCommentForm(show){
            if(show){
                this.post_comment.status = 'posting'
            } else {
                if(this.user_posted){
                    this.post_comment.status = 'posted'
                } else {
                    this.post_comment.status = 'hidden'
                }
                this.clearTextArea()
            }
        },
        clearTextArea(){
            this.post_comment.text = ''
            this.post_comment.ajax_fail_message = ''
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
                    this.clearTextArea()
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
        },
        getRecommendCommentList(){

            //get data
            axios({
                method: 'GET',
                url: this.recommend_comment.ajax_address
            })
            .then(res => {
                console.log("get Recommend Data => ",res)

                // 코멘트 배열에 데이터 넣기
                let comments = res.data.data
                comments.forEach(comment => {
                    let newComment = {
                        id: comment.id,
                        comment: comment.comment,
                        likes: comment.likes,
                        author: comment.author.name,
                        written_at: comment.written_at,                        
                    }
                    this.recommend_comment.list.push(newComment)
                })

                // 페이징 처리
                if(res.data.links.next != null){
                    this.recommend_comment.ajax_address = res.data.links.next
                    this.recommend_comment.ajax_status = 'complete'
                } else {
                    this.recommend_comment.ajax_status = 'nomore'
                }
            })

            //Before
            this.recommend_comment.ajax_status = 'loading'

        }
    },
    created(){
        this.getRecommendCommentList()
    },
    
}
</script>

<style lang="stylus" scoped>
@import '../../assets/luminus.styl'

.section
    padding 0.5em 1em 0.5em 1em

.warning
    color red

.loading
    width 1em
    height auto

// tab transition Style
.tab-fade-enter-active
,.tab-fade-leave-active
    transition opacity .3s ease;

.tab-fade-enter
,.tab-fade-leave-to
    opacity 0

</style>