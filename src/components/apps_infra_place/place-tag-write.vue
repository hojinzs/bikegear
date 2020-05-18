<template>
    <div>
        <transition name="tab-fade" mode="out-in">

            <!-- 인증됨, 사용자 인증됨 -->
            <div v-if="userData" key="ready">
                <b># 내가 이 곳에 등록한 태그 </b>

                <!-- 사용자의 태그 정보 불러오는 중 -->
                <div v-if="userTags.status === 'loading'">
                    불러오는 중
                </div>

                <div v-if="userTags.status === 'finish' && userTags.data.length === 0"
                     class="tagpost_description"
                >
                    등록된 태그가 없습니다.<br>
                    이곳을 태깅해 나만의 지도를 만들어보세요.
                </div>

                <!-- 사용자의 장소 태깅 정보 시작 -->
                <div v-else v-for="(uc, index) in userTags.data"
                     :key="index" class="my-tag"
                >
                    <place-tag-mini :tagObject="uc.tag" />
                    <font-awesome-icon icon="heart" /> {{ uc.like || 0 }}
                    | {{ _written_at(uc.written_at) }}
                    | <a class="a-flat" href="" @click.prevent="destroyUserTagging(uc)"><font-awesome-icon icon="trash-alt" /></a>
                    <div>
                        {{ uc.comment }}
                    </div>
                </div>
                <!-- 사용자의 장소 태깅 정보 끝 -->

                <hr class="lumi-horizon" />

                <!-- 태그 등록 홈 시작 -->
                <transition name="tab-fade" mode="out-in">

                    <!-- 등록 폼 숨기기  -->
                    <div v-if="postTagFormShow === 'hidden'" key="hidden">
                        <div class="tagpost_description">
                            태깅한 장소를 마이페이지에서 모아볼 수 있습니다.
                        </div>
                        <div class="lumi-button-full">
                            <button class="lumi-button lumi-button-black w-full my-2"
                                    @click="toggle_newTaggingForm(true)"
                                    :disabled="!(tags)"
                            >
                                태깅하기
                            </button>
                        </div>
                    </div>

                    <!-- 등록 클릭 -->
                    <div v-if="( postTagFormShow === 'posting')" key="posting">
                        <form action="submit"
                              @submit.prevent="postUserTagging"
                        >
                            <label for="post_recomment_comment">새로운 태그를 등록합니다.</label>
                            <div class="lumi-text-area-wrapper">
                                <lumi-select-box
                                    v-model="postTagData.tag_selected"
                                    :select_list="unTaggedList"
                                    :label="'태그 선택'"
                                />

                                <div class="tag-description">
                                    <span v-if="postTagData.tag_selected">
                                        <font-awesome-icon :icon="[getSelectedTag.icon_prefix,getSelectedTag.icon_name]" />  {{ getSelectedTag.description }}
                                    </span>
                                    <span v-else>
                                        태그를 선택해주세요.
                                    </span>
                                </div>

                                <lumi-textarea-liner
                                    v-model="postTagData.text"
                                    :label="'태깅 메시지'"
                                    :hint_text="'태깅을 하는 이유에 대해 알려주세요.'" />
                            </div>
                            <div class="lumi-button-group">
                                <button class="lumi-button lumi-button-flat-dark"
                                        @click.prevent="toggle_newTaggingForm(false)"
                                >
                                    취소
                                </button>
                                <button class="lumi-button lumi-button-black"
                                        type="submit"
                                        :disabled="(this.postTag.status !== 'ready')"
                                >
                                    작성
                                </button>
                            </div>
                            <div>
                                <span class="warning"
                                      v-show="postTag.status === 'fail'"
                                >
                                    {{ postTag.errormsg }}
                                </span>
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
import apiResourceManager from "../../plugins/apiResourceManager";

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
        let user_tags_ajax_address = '/v1/user/places/'
            +this.place.id+'/tags/comments'

        let post_tags_ajax_address = '/v1/places/'
            +this.place.id+'/tags/'


        return {
            postTagFormShow: 'hidden', // [hidden, posting, posted]
            postTag: new apiResourceManager(post_tags_ajax_address,{ method: 'POST' }),
            postTagData: {
                tag_selected : null,
                text: '',
            },
            destroy_tag: {
                ajax_status: 'ready', // [ready, pending, success, fail]
            },
            userTags: new apiResourceManager(user_tags_ajax_address),
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
            return this.tags.find( tag => tag.name === this.postTagData.tag_selected)
        },
        unTaggedList(){
            let unTagged = []
            this.tags.forEach(tag => {
                let duplicated = this.userTags.data.filter(compare => compare.tag.name === tag.name)
                if(duplicated.length === 0){
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
        getUserTaggingData(){
            axios.get(this.userTags.apiUrl)
                .then(res => {
                    this.userTags.data = res.data.data
                })
                .catch(error => {
                    this.userTags.handlingFail(error.message)
                })
            this.userTags.setLoading()
            
        },
        postUserTagging(){
            axios.post(this.postTag.apiUrl+this.getSelectedTag.id+'/comments',{
                'content': this.postTagData.text
            })
                .then(() => {
                    this.postTag.handlingSuccess(1000)
                    this.getUserTaggingData()
                    this.toggle_newTaggingForm(false)

                    this.$emit('update')
                })
                .catch(error => {
                    this.postTag.handlingFail(error.message)
                })
            this.postTag.setLoading()
        },
        destroyUserTagging(tagging){

            let del = window.confirm("태깅과 코멘트를 삭제합니다. 계속 하시겠습니까?")

            if(!del){
                return;
            }

            axios.delete(this.postTag.apiUrl+tagging.tag.id+'/comments/'+tagging.id)
                .then(() => {
                    this.destroy_tag.ajax_status = 'success'
                    this.getUserTaggingData()
                    this.toggle_newTaggingForm(false)

                    this.$emit('update')
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
                this.postTagFormShow = 'posting'
            } else {
                this.postTagFormShow = 'hidden'
                this.postTagData.text = ''
                this.postTagData.tag_selected = ''
            }
        },
    },
    mounted()
    {
        this.$store.dispatch('user/checkOrAfterLogin', () => this.getUserTaggingData())
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