<template>
    <transition name="tab-fade" mode="out-in">

        <!-- 인증되지 않았을 경우 -->
        <div v-if="userData == null"
        class="section" key="loginRequire">

            로그인이 필요합니다.

        </div>

        <!-- 인증됨, 로딩중 -->
        <div v-if="( userData && post_comment.status == 'loading' )"
        class="section" key="loading">

            사용자의 글을 가져오고 있습니다.

        </div>

        <!-- 인증됨, 새로운 글을 등록하거나, 등록된 글 없음 -->
        <div v-if="( userData && post_comment.user_posted == null && post_comment.status == 'ready' )"
        class="section" key="ready">

            <div class="lumi-button-full">
                <button class="lumi-button lumi-button-black"
                    @click="toggle_showNewCommentForm(true)">추천글 쓰기</button>
            </div>

        </div>

        <!-- 인증됨, 등록 클릭 -->
        <div v-if="( userData && post_comment.status == 'posting' )"
        class="section" key="posting">

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
        <div v-if="( userData && post_comment.user_posted )"
        class="section" key="done">

            <b>내가 작성한 추천글</b>
            <recommend-comment :recommend="post_comment.user_posted" />
            <div>
                <div>
                    <a @click="toggle_showNewCommentForm(true)">업데이트 하기</a>
                </div>
                <div>
                    <a @click="destroyRecommentPost()">삭제하기</a>
                </div>
            </div>

        </div>
    
    </transition>
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
        let post_comment_ajax_address = '//'+process.env.VUE_APP_API_HOST+'/v1/places/'
            +this.place.id
            +'/recommends';

        let user_comment_ajax_address = '//'+process.env.VUE_APP_API_HOST+'/v1/user/places/'
            +this.place.id
            +'/recommends';

        return {
            user_comment_ajax_address,
            post_comment: {
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
        }
    },
    methods: 
    {
        toggle_showNewCommentForm(show){
            if(show){
                this.post_comment.status = 'posting'
            } else {
                this.post_comment.status = 'ready'
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
                    let userPost = res.data.data.find(item => item.hidden == false)
                    
                    if(userPost){
                        this.post_comment.user_posted = userPost
                    }
                })
                .finally(() => {
                    this.post_comment.status = 'ready'
                })
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

            axios.post(this.post_comment.ajax_address,{
                'content' : this.post_comment.text
            })
                .then(res => {
                    this.post_comment.status = 'posted'
                    this.post_comment.ajax_status = 'success'
                    this.post_comment.user_posted = res.data.data
                    this.clearTextArea()
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
        // this.$store.dispatch('user/checkOrAfterLogin',this.getUserPost())
        this.$store.dispatch('user/checkOrAfterLogin', () => this.getUserPost() )
    }
}
</script>

<style lang="stylus" scoped>

</style>