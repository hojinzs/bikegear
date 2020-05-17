<template>
    <div class="lumi-box lumi-box-block-grey">
        <transition name="tab-fade" mode="out-in">
            <!-- 인증됨 -->
            <div v-if="userData" key="loginComplete">
                <transition name="tab-fade" mode="out-in">

                    <!-- 글 로딩 중 -->
                    <div v-if="showStatus === 'loading'" key="loading">
                        사용자의 글을 가져오고 있습니다.
                    </div>

                    <!-- 등록된 글이 없거나, 글 등록 폼을 보여주는 상태가 아님 -->
                    <div v-if="showStatus === 'ready'" key="ready">
                        이곳에 대해 알고계신가요?
                        <div class="lumi-button-full">
                            <button class="lumi-button lumi-button-black"
                                @click="toggle_showNewCommentForm(true)">추천글 쓰기</button>
                        </div>
                    </div>

                    <!-- 등록된 글이 있음 -->
                    <div v-if="showStatus === 'posted'" key="posted">
                        <b>내가 작성한 추천글</b>
                        <recommend-comment :boxing="false" :recommend="post_comment.user_posted" />
                        <div>
                            <div>
                                <a @click="toggle_showNewCommentForm(true)">업데이트 하기</a>
                            </div>
                            <div>
                                <a @click="destroyRecommentPost()">삭제하기</a>
                            </div>
                        </div>                        
                    </div>

                    <!-- 글 등록 폼을 표시함 -->
                    <div v-if="showStatus === 'posting'" key="posting">
                        <form action="submit" @submit.prevent="postRecommentPost">
                            <label for="post_recomment_comment">새로운 추천글을 등록합니다.</label>
                            <div class="lumi-text-area-wrapper">
                                <vue-extended-textarea class="lumi-input-liner" id="post_recomment_comment"
                                    v-model="post_comment.text" />
                            </div>
                            <div class="lumi-button-group">
                                <button class="lumi-button lumi-button-flat-dark"
                                    @click.prevent="toggle_showNewCommentForm(false)">취소</button>
                                <button type="submit" class="lumi-button lumi-button-black"
                                    :disabled="(this.post_comment.ajax_status !== 'ready')">작성</button>
                                </div>
                            <div>
                                <span v-show="post_comment.ajax_fail_message" class="warning"
                                >{{ post_comment.ajax_fail_message }}</span>
                            </div>
                        </form>
                    </div>

                </transition>
            </div>

            <!-- 인증 되지 않았을 경우 -->
            <div v-else key="loginRequire">
                로그인이 필요합니다.
            </div>
        </transition>
    </div>

</template>

<script>
import recommendComment from './place-recommend-comment'
import vueExtendedTextarea from '@/components/interface/vue-extended-textarea'
import axios from 'axios'

export default {
    name: 'place-recommend-write',
    components:
    {
        'recommend-comment': recommendComment,
        'vue-extended-textarea' : vueExtendedTextarea,
    },
    props:
    {
        place: {
            type: Object,
            required: true,
        }
    },
    data()
    {
        let post_comment_ajax_address = '/v1/places/'
            +this.place.id
            +'/recommends';

        let user_comment_ajax_address = '/v1/user/places/'
            +this.place.id
            +'/recommends';

        return {
            user_comment_ajax_address,
            post_comment: {
                show_input_form: false,
                status: 'ready', // [ready, posting]
                text: '',
                ajax_address: post_comment_ajax_address,
                ajax_status: 'ready', // [ready, posting, success, fail]
                ajax_fail_message: null,
                user_posted: null
            },
        }

    },
    computed:
    {
        userData() {
            return this.$store.state.user.user_data
        },
        showStatus(){
            if(this.userData){
                if(this.post_comment.user_posted == null){
                    if(this.post_comment.status === 'loading'){
                        return 'loading'
                    } else {
                        if(this.post_comment.show_input_form === false){
                            return 'ready'
                        } else {
                            return 'posting'
                        }
                    }
                } else {
                    if(this.post_comment.show_input_form === false){
                        return 'posted'
                    } else {
                        return 'posting'
                    }
                }
            } else {
                return 'none'
            }
        }
    },
    methods: 
    {
        toggle_showNewCommentForm(show = !this.post_comment.show_input_form){
            if(show){
                this.post_comment.show_input_form = true
            } else {
                this.post_comment.show_input_form = false
                this.clearTextArea()
            }
        },
        clearTextArea(){
            this.post_comment.text = ''
            this.post_comment.ajax_fail_message = ''
        },
        getUserPost(){
            this.post_comment.status = 'loading'

            axios.get(this.user_comment_ajax_address)
                .then(res => {
                    let userPost = res.data.data.find(item => item.hidden === false)
                    
                    if(userPost){
                        this.post_comment.user_posted = userPost
                    }
                })
                .finally(() => {
                    this.post_comment.status = 'ready'
                })
        },
        postRecommentPost(){
            //Before
            this.post_comment.ajax_status = 'posting'

            axios.post(this.post_comment.ajax_address,{
                'content' : this.post_comment.text
            })
                .then(res => {
                    this.post_comment.ajax_status = 'success'
                    this.post_comment.user_posted = res.data.data
                    this.toggle_showNewCommentForm(false)
                })
                .catch(() => {
                    this.post_comment.ajax_status = 'fail'
                    this.post_comment.ajax_fail_message = '제대로 등록되지 않았습니다.'
                })
                .finally(() => {
                    setTimeout(() => this.post_comment.ajax_status = 'ready' ,1000)
                })
        },
        destroyRecommentPost(){

            let ok = confirm("작성한 추천글을 삭제합니다. \n계속하시겠습니까?")
            if(ok){
                this.post_comment.ajax_status = 'posting'
                axios.delete(this.post_comment.ajax_address+'/'+this.post_comment.user_posted.id)
                    .then(() => {
                        this.post_comment.ajax_status = 'success'
                        this.post_comment.user_posted = null
                    })
                    .catch(() => {
                        this.post_comment.ajax_status = 'fail'
                    })
                    .finally(() => {
                        setTimeout(() => this.post_comment.ajax_status = 'ready' ,1000)
                    })
            }
            

        }
    },
    mounted()
    {
        this.$store.dispatch('user/checkOrAfterLogin', () => this.getUserPost() )
    }
}
</script>

<style lang="stylus" scoped>
// tab transition Style
.tab-fade-enter-active
,.tab-fade-leave-active
    transition opacity .3s ease;

.tab-fade-enter
,.tab-fade-leave-to
    opacity 0

</style>