<template>
    <div class="recommend-comment-section">
        <!-- 내가 작성한 추천 글 -->
        <div class="my-comment">
            <div class="section">
                <place-recommend-write :place="place"/>
                <hr>
            </div>
        </div>

        <!-- 추천글 목록 -->
        <div class="section"
             v-for="(rc,index) in commentList.data"
             :key="index"
        >
            <recommend-comment :recommend="rc" />
        </div>

        <div class="section lumi-button-full">
            <button class="lumi-button lumi-button-flat-dark"
                    ref="scrollend"
                    :disabled="commentList.status === 'finish'"
                    @click="getRecommendCommentList()"
            >
                <transition name="tab-fade" mode="out-in">
                    <span key="loading" v-if="commentList.status === 'loading'">
                        <img class="loading" src="/images/Spinner-1s-104px.gif">
                    </span>
                    <span key="fail" class="warning" v-if="commentList.status === 'fail'">
                        [!] {{ commentList.errormsg }}
                    </span>
                    <span key="complete" v-if="commentList.status === 'finish' && commentList.nextPage" >
                        더 보기
                    </span>
                    <span key="complete" v-if="commentList.status === 'finish' && commentList.nextPage === null" >
                        없습니다
                    </span>
                </transition>
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import apiResourceManager from "../../plugins/apiResourceManager";

import placeRecommendWrite from './place-recommend-write'
import recommendComment from './place-recommend-comment'

export default {
    name: 'place-recommend-list',
    props: {
        place: {
            type: Object,
            required: true,
        }
    },
    components: {
        recommendComment,
        placeRecommendWrite,
    },
    data(){
        let ajax_address = '//'+process.env.VUE_APP_API_HOST+'/v1/places/'
            +this.place.id
            +'/recommends'

        return {
            commentList: new apiResourceManager(ajax_address),
            next: undefined
        }
    },
    methods:{
        getRecommendCommentList(){
            //get data
            axios.get(this.commentList.apiUrl)
                .then(res => {

                    // 코멘트 배열에 데이터 넣기
                    let comments = res.data.data.map( comment => {
                        return {
                            id: comment.id,
                            comment: comment.comment,
                            likes: comment.likes,
                            user_like: comment.user_like,
                            author: comment.author,
                            written_at: comment.written_at,
                        }
                    })
                    this.commentList.mergeData(comments)

                    // 페이징 처리
                    if(res.data.links.next != null){
                        this.commentList.setApiEndpoint(res.data.links.next)
                        this.commentList.setPaging(res.data.meta)
                    } else {
                        this.commentList.setPaging(res.data.meta)
                    }
                })
                .catch( error => {
                    this.commentList.handlingFail(error.message)
                })
            this.commentList.setLoading()
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