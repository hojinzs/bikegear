<template>
    <div>
        <transition name="tab-fade" mode="out-in">

            <!-- 인증됨, 사용자 인증됨 -->
            <div v-if="userData"
            key="ready">

                <!-- 사용자의 장소 태깅 정보 시작 -->
                <b>내가 이 곳에 등록한 태그 </b>
                <div v-if="user_tags.data.length == 0"
                class="tagpost_description">
                    등록된 태그가 없습니다.<br>
                    이곳을 태깅해 나만의 지도를 만들어보세요.
                </div>
                <div v-else v-for="(uc, index) in user_tags.data" :key="index" class="my-tag">
                    <place-tag-mini :tagObject="uc.tag" />
                    {{ uc.comment }}
                    <div class="option">
                        <font-awesome-icon icon="heart" /> {{ uc.like }}
                            | {{ _written_at(uc.written_at) }}
                            | <a class="a-flat" href="" @click.prevent="destroyUserTagging(uc)"><font-awesome-icon icon="trash-alt" /></a>
                    </div>
                </div>
                <!-- 사용자의 장소 태깅 정보 끝/ -->

                <hr class="lumi-horizon" />

                <!-- 태그 등록 홈 시작 -->
                <transition name="tab-fade" mode="out-in">

                    <!-- 등록 폼 숨기기  -->
                    <div v-if="post_tag.status == 'hidden'" key="hidden">
                        <div class="tagpost_description">
                            태깅한 장소를 마이페이지에서 모아볼 수 있습니다.
                        </div>
                        <div class="lumi-button-full">
                            <button class="lumi-button lumi-button-black" @click="toggle_newTaggingForm(true)" :disabled="!(tags)">
                                태깅하기
                            </button>
                        </div>
                    </div>

                    <!-- 등록 클릭 -->
                    <div v-if="( post_tag.status == 'posting')" key="posting">
                        <form action="submit" @submit.prevent="postUserTagging" >
                            <label for="post_recomment_comment">새로운 태그를 등록합니다.</label>
                            <div class="lumi-text-area-wrapper">
                                <lumi-select-box
                                    v-model="post_tag.tag_selected"
                                    :select_list="unTaggedList"
                                    :label="'태그 선택'"
                                    :hint_text="'등록테스트가 어쩌고 저쩌고'" />

                                <div class="tag-description">
                                    <span v-if="post_tag.tag_selected">
                                        <font-awesome-icon :icon="[getSelectedTag.icon_prefix,getSelectedTag.icon_name]" />  {{ getSelectedTag.description }}
                                    </span>
                                    <span v-else>
                                        태그를 선택해주세요.
                                    </span>
                                </div>

                                <lumi-textarea-liner
                                    v-model="post_tag.text"
                                    :label="'태깅 메시지'"
                                    :hint_text="'태깅을 하는 이유에 대해 알려주세요.'" />
                            </div>
                            <div class="lumi-button-group">
                                <button class="lumi-button lumi-button-flat-dark"
                                    @click.prevent="toggle_newTaggingForm(false)">취소</button>
                                <button type="submit" class="lumi-button lumi-button-black"
                                    :disabled="(this.post_tag.ajax_status != 'ready')">작성</button>
                                </div>
                            <div>
                                <span v-show="post_tag.ajax_fail_message" class="warning"
                                >{{ post_tag.ajax_fail_message }}</span>
                            </div>
                        </form>
                    </div>

                </transition>
                <!-- 태그 등록 폼 끝/ -->

            </div>

            <!-- 인증되지 않았을 경우 -->
            <div v-else key="loginRequire">
                로그인이 필요합니다.
            </div>

        </transition>        
    </div>
</template>

<script>
import lumiSelectBox from '../../components/interface/lumi-select-box'
import lumiTextareaLiner from '../../components/interface/lumi-textarea-liner'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import placeTagMini from './place-tag-mini'
import moment from 'moment'
import axios from 'axios'

export default {
    name: 'place-tag-write',
    components:
    {
        'font-awesome-icon' : FontAwesomeIcon,
        'place-tag-mini': placeTagMini,
        'lumi-select-box': lumiSelectBox,
        'lumi-textarea-liner' : lumiTextareaLiner
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
        let user_tags_ajax_address = '//'+process.env.VUE_APP_API_HOST+'/v1/user/places/'
            +this.place.id+'/tags/comments'

        let post_tags_ajax_address = '//'+process.env.VUE_APP_API_HOST+'/v1/places/'
            +this.place.id+'/tags/'


        return {
            post_tag: {
                status: 'hidden', // [hidden, posting, posted]
                tag_selected : null,
                text: '',
                ajax_address: post_tags_ajax_address,
                ajax_status: 'ready', // [ready, posting, success, fail]
                ajax_fail_message: null,
            },
            destroy_tag: {
                ajax_status: 'ready', // [ready, pending, success, fail]
            },
            user_tags: {
                ajax_address: user_tags_ajax_address,
                ajax_status: 'ready', // [ready, loading, success, fail]
                ajax_fail_message: null,
                data: []
            }
        }
    },
    computed:
    {
        userData(){
            return this.$store.state.user.user_data
        },
        tags(){
            return this.$store.state.tags.tags
        },
        getSelectedTag(){
            return this.tags.find( tag => tag.name == this.post_tag.tag_selected)
        },
        unTaggedList(){
            let unTagged = []
            this.tags.forEach(tag => {
                let duplicated = this.user_tags.data.filter(compare => compare.tag.name == tag.name)
                if(duplicated.length == 0){
                    unTagged.push({
                        'key': tag.name,
                        'value': tag.name,
                        'label': tag.label,
                        'description' : tag.description,
                    })
                }
            })
            return unTagged
        },
    },
    methods:
    {
        _written_at(date){
            return moment(date).fromNow()
        },
        getUserTaggindData(){
            axios.get(this.user_tags.ajax_address)
                .then(res => {
                    this.user_tags.status = 'success'
                    this.user_tags.data = res.data.data
                })
                .catch(() => {
                    this.user_tags.status = 'fail'
                })
            this.user_tags.status = 'loading'
            
        },
        postUserTagging(){
            axios.post(this.post_tag.ajax_address+this.getSelectedTag.id+'/comments',{
                'content': this.post_tag.text
            })
                .then(() => {
                    this.post_tag.ajax_status = 'success'
                    this.getUserTaggindData()
                    this.toggle_newTaggingForm(false)
                })
                .catch(() => {
                    this.post_tag.ajax_status = 'fail'
                })
                .finally(() => {
                    setTimeout(() => this.post_tag.ajax_status = 'ready' , 1000)
                })
            this.post_tag.ajax_status = 'posting'
        },
        destroyUserTagging(tagging){
            axios.delete(this.post_tag.ajax_address+tagging.tag.id+'/comments/'+tagging.id)
                .then(() => {
                    this.destroy_tag.ajax_status = 'success'
                    this.getUserTaggindData()
                    this.toggle_newTaggingForm(false)
                })
                .catch(() => {
                    this.destroy_tag.ajax_status = 'fail'
                })
                .finally(() => {
                    setTimeout(() => this.destroy_tag.ajax_status = 'ready' , 1000)
                })
            this.destroy_tag.ajax_status = 'pending'
        },
        toggle_newTaggingForm(_show){
            if(_show ){
                this.post_tag.status = 'posting'
            } else {
                this.post_tag.status = 'hidden'
                this.post_tag.text = ''
                this.post_tag.tag_selected = ''
            }
        },
    },
    mounted()
    {
        this.$store.dispatch('user/checkOrAfterLogin', () => this.getUserTaggindData())
        this.$store.dispatch('tags/setTags')
    }
}
</script>

<style lang="stylus">
// tab transition Style
.tab-fade-enter-active
,.tab-fade-leave-active
    transition opacity .3s ease;

.tab-fade-enter
,.tab-fade-leave-to
    opacity 0
</style>