<template>
    <div class="tag-info-section">
        
        <div class="new-tag section">

            <div class="lumi-box lumi-box-grey">
                <transition name="tab-fade" mode="out-in">

                    <!-- 인증되지 않았을 경우 -->
                    <div v-if="false" key="loginRequire">
                        로그인이 필요합니다.
                    </div>

                    <!-- 인증됨, 사용자 인증됨 -->
                    <div key="ready"
                    v-if="( user_data.login == true)">
                        <b>내가 이 곳에 등록한 태그 </b>
                        <div v-for="(uc, index) in user_taging" :key="index" class="my-tag">
                            <place-tag-mini :tagObject="uc.tag" />
                            {{ uc.comment }}
                            <div class="option">
                                <font-awesome-icon icon="heart" /> {{ uc.like }} | {{ _written_at(uc.written_at) }} | <font-awesome-icon icon="trash-alt" />
                            </div>
                        </div>

                        <hr class="lumi-horizon" />

                        <transition name="tab-fade" mode="out-in">

                            <!-- 등록 폼 숨기기  -->
                            <div v-if="post_tag.status == 'hidden'" class="lumi-button-full" key="hidden">
                                태깅한 장소를 마이페이지에서 모아볼 수 있습니다.

                                <button class="lumi-button lumi-button-black" @click="toggle_newTaggingForm(true)">
                                    태깅하기
                                </button>
                            </div>

                            <!-- 등록 클릭 -->
                            <div v-if="( post_tag.status == 'posting')" key="posting">
                                <form action="submit" @submit.prevent >
                                    <label for="post_recomment_comment">새로운 태그를 등록합니다.</label>
                                    <div class="lumi-text-area-wrapper">
                                        <lumi-select-box
                                            v-model="post_tag.tag_selected"
                                            :select_list="unTaggedList"
                                            :label="'태그 선택'"
                                            :hint_text="'등록테스트가 어쩌고 저쩌고'" />

                                        <div class="tag-description">
                                            <span v-if="post_tag.tag_selected">
                                                <font-awesome-icon :icon="getSelectedTag.icon" />  {{ getSelectedTag.description }}
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
                    </div>

                </transition>
            </div>

        </div>
        <div class="tag-list">
            <div class="section"
                v-for="(tag,index) in place_tags"
                :key="index">
                <place-tag-card
                    :place_id="placeId"
                    :tag="tag">
                </place-tag-card>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import moment from 'moment'

import placeTagCard from './place-tag-card'
import placeTagMini from './place-tag-mini'

import lumiSelectBox from '@/components/interface/lumi-select-box'
import lumiTextareaLiner from '@/components/interface/lumi-textarea-liner'

import { tags, tag_comment } from '@/plugins/sampledb'
import Tag from '@/plugins/journey66_tag'

export default {
    name: 'place-tag-list',
    components: {
        'font-awesome-icon' : FontAwesomeIcon,
        'place-tag-mini': placeTagMini,
        'place-tag-card': placeTagCard,
        'lumi-select-box': lumiSelectBox,
        'lumi-textarea-liner' : lumiTextareaLiner
    },
    props: ['placeId','TagList'],
    data(){
        return {
            user_data: {
                login: true,
            },
            place_tags: this.TagList,
            post_tag: {
                status: 'hidden', // [hidden, posting, posted]
                tag_selected : null,
                text: '',
                ajax_status: 'ready', // [ready, posting, success, fail]
                ajax_fail_message: null,
            },
            user_taging: []
        }
    },
    computed: {
        unTaggedList(){
            let unTagged = []
            tags.forEach(tag => {
                let duplicated = this.user_taging.filter(compare => compare.tag.name == tag.name )
                if(duplicated.length == 0){
                    unTagged.push({
                        'key': tag.name,
                        'value': tag.name,
                        'label': tag.label,
                        'description' : tag.description,
                    })
                }
            });
            return unTagged
        },
        getSelectedTag(){
            return Tag.getTagDetailFromArray([this.post_tag.tag_selected],tags)[0]
        }
    },
    methods:{
        getUserTaggindData(){
            // make Sample Data
            let userTag = this.place_tags.map(tag => {
                let comment = JSON.parse(JSON.stringify(tag_comment))
                comment.tag = tag;
                comment.tag_name = tag.name
                comment.place = this.placeId

                return comment
            })
            this.user_taging = userTag
        },
        getTagsOnPlace(){

        },
        toggle_newTaggingForm(_show){
            if(_show ){
                this.post_tag.status = 'posting'
            } else {
                this.post_tag.status = 'hidden'
            }
        },
        _written_at(date){
            return moment(date).fromNow()
        }
    },
    mounted(){
        this.getUserTaggindData()
    }
}
</script>

<style lang="stylus" scoped>

.section
    padding 0.5em 1em 0.5em 1em

.lumi-button-full
    .lumi-button
        width 100%

.lumi-button-group
    display flex
    button
        flex 1 1 auto
        &:not(:last-child)
            margin-right 0.5rem

.lumi-text-area-wrapper
    textarea
        width 100%

.lumi-box
&.lumi-box-grey
    border-radius 5px
    background-color #d9d9d9

.my-tag
    line-height 2rem
    margin-top 8px
    .option
        font-size 0.9rem

.tag-description
    margin-bottom 1rem

.warning
    color red

// tab transition Style
.tab-fade-enter-active
,.tab-fade-leave-active
    transition opacity .3s ease;

.tab-fade-enter
,.tab-fade-leave-to
    opacity 0

</style>