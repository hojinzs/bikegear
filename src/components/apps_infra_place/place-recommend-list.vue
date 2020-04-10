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
        'recommend-comment': recommendComment,
        'place-recommend-write' : placeRecommendWrite,
    },
    data(){
        let ajax_address = '//'+process.env.VUE_APP_API_HOST+'/v1/places/'
            +this.place.id
            +'/recommends'

        return {
            recommend_comment: {
                list: [],
                ajax_address: ajax_address,
                ajax_status: 'complete', // [complete, loading, fail, nomore]
                ajax_fail_message: null,
            },
        }
    },
    methods:{
        getRecommendCommentList(){

            //get data
            axios({
                method: 'GET',
                url: this.recommend_comment.ajax_address
            })
            .then(res => {

                // 코멘트 배열에 데이터 넣기
                let comments = res.data.data
                comments.forEach(comment => {
                    let newComment = {
                        id: comment.id,
                        comment: comment.comment,
                        likes: comment.likes,
                        user_like: comment.user_like,
                        author: comment.author,
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