<template>
    <div ref="backdrop"
         class="lumi-popup-backdrop"
         :class="{
             'backdrop-on': backdropOn
         }"
         v-show="displayModal"
         @click.self="setClose()"
    >

        <div ref="wrapper"
             class="lumi-popop-wrapper"
             :style="[styleWrapperHeight]"
             @click.self="setClose()"
        >

            <div ref="popup"
                 class="lumi-popup"
                 :style="{
                    transform: 'translateY('+position.translateY+'px)',
                    maxWidth: this.maxWidth+'px'}"
            >

                <div ref="topHandler"
                     class="lumi-popup-pannel-handler"
                     :style="`box-shadow: rgba(0,0,0,${contents.scrollShadow}) 0px 9px 11px 0px`"
                     @pointingStart="topHandlerPointingStart"
                     @pointerMove="topHandlerMoving"
                     @swipe="topHandlerSwipe"
                     @pointingEnd="topHandlerPointingEnd"
                >

                    <div class="handler" ref="handler"></div>
                </div>

                <div class="lumi-popup-pannel-header"
                    v-if="showHeader"
                    @click="$refs.contents.scrollTop = 0"
                >
                    <slot name="header">
                        <div class="header-default">
                            <h3>{{headerTitle}}</h3>
                        </div>
                    </slot>
                </div>

                <div ref="contents"
                     class="popup_contents"
                     @scroll="handleScroll"
                >
<!--                    :style="'box-shadow: inset 1px 6px 9px -6px rgba(0,0,0,'+contents.scrollShadow+')'"-->
                    <div class="popup_contents_wrapper" >
                        <slot></slot>
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
import Velocity from 'velocity-animate'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import elementTouchControl from "../plugins/element-touch-control";

export default {
    name: 'lumi-popup',
    props: {
        display: {
            type: Boolean,
            default: false
        },
        backdropBlur: {
            type: Number,
            default: 2
        },
        backdropBright: {
            type: Number,
            default: 40
        },
        transitionDuring: {
            type: Number,
            default: 700
        },
        maxWidth: {
            type: Number,
            default: 990
        },
        maxHeight: {
            type: Number,
            default: 92
        },
        returnTo: {
            type: Object,
            default: null
        },
        headerTitle: {
            type: String,
        },
        useHeader: {
            type: Boolean,
            default: false
        }
    },
    data() {
        let _headerTitleUse = () => {
            return !(typeof this.headerTitle == 'undefined') || this.useHeader
        }
        return {
            wrapperHeight: 0,
            scrolled: 0,
            HeightExtend: 0,
            displayModal: false,
            backdropOn: false,
            position: {
                translateY: 0,
                PannelMoving: false
            },
            topHandler: null,
            // backdrop: {
            //     Blur: 0,
            //     Bright: 100,
            // },
            touchEvent: {
                isMoving: false,
                isSwipe: false,
                movedY: 0,
                startPosition: 0,
                swipeTolerance: 300,
                totalMovded: 0,
            },
            contents: {
                scrollShadow: 0
            },
            showHeader: _headerTitleUse()
        }
    },
    computed: {
        styleWrapperHeight(){
            // let maxHeight = this.wrapperHeight,
            //     minHeight = maxHeight * (0.01 * this.maxHeight),
            //     mixedHeight = minHeight + this.scrolled,
            //     height
            //
            // if(mixedHeight < minHeight){
            //     height = minHeight
            // } else if(mixedHeight > maxHeight){
            //     height = maxHeight
            // } else {
            //     height = mixedHeight
            // }
            return {
                'height': this.maxHeight+'%'
            }
        }
        // styleBackdropFilter(){
        //     return {
        //         backdropFilter: "blur("+this.backdrop.Blur+"px) brightness("+this.backdrop.Bright+"%)"
        //     }
        // },
    },
    methods:{
        setClose(){
            if(!this.touchEvent.isMoving) this.$emit('update:display',false)
        },
        topHandlerPointingStart(e){
            console.log("Pointing Start => ", e)

            /**
             * 터치 시작시 핸들러 피드백 (포커싱) 한다
             */
            Velocity(this.$refs.handler,{
                scaleX: [1, 1.2, 0.8],
                scaleY: [1, 1.5, 0.8],
                backgroundColor: '#4d4d4d',
            },{
                duration: 500,
                easing: 'spring'
            })

        },
        topHandlerMoving(e){
            this.position.translateY = this.position.translateY + e.detail.movedY
        },
        topHandlerSwipe(e){
            // 하단으로 스와이프 되었을 떄, 팝업을 닫는다.
            if(e.detail.swipe === 'bottom'){
                this.setClose()
            }
        },
        topHandlerPointingEnd(e){

            /**
             * 포커싱된 핸들러 초기화
             */
            Velocity(this.$refs.handler,{
                backgroundColor: '#a6a6a6',
            },{
                duration: 500,
            })

            // 하단으로 스와이프 되지 않았을 경우
            if(e.detail.swipe === 'none' || e.detail.swipe.swipe !== 'bottom'){

                let scrollDowned = this.$el.clientTop + this.position.translateY,
                    limit = ( window.outerHeight * ( 1 - 0.70) )
                if(scrollDowned > limit){
                    // 화면의 70% 이하로 내려갔을 경우 팝업을 닫는다.
                    this.setClose()
                } else {
                    // 70% 이하가 아닐 경우 바운스.
                    Velocity(this.$refs['popup'], {
                        translateY: [ 0, this.position.translateY ]
                    },{
                        duration: this.transitionDuring,
                        easing: 'spring',
                        complete: () => {
                            this.position.translateY = 0
                        },
                    })
                }
            }

        },
        open(){
            if(!this.touchEvent.isMoving && this.displayModal === false){
                this.displayModal = true

                let during = this.transitionDuring
                    // interval = during / 50,
                    // conunt = during / interval

                // let mounted = setInterval(() => {
                //     this.backdrop.Blur = this.backdrop.Blur + ( this.backdropBlur / conunt )
                //     this.backdrop.Bright = this.backdrop.Bright - ( (100 - this.backdropBright) / conunt )
                // }, interval);


                Velocity(this.$refs['popup'], {
                    translateY: [ this.position.translateY, 1000 ]
                },{
                    duration: during,
                    easing: 'ease',
                    before: () => {
                        this.touchEvent.isMoving = true
                    },
                    complete: () => {
                        this.touchEvent.isMoving = false
                    }
                })

                setTimeout(() => {
                    this.backdropOn = true
                }, 100)

                setTimeout(() => {
                    // clearInterval(mounted)
                    // this.backdrop.Blur = this.backdropBlur
                    // this.backdrop.Bright = this.backdropBright

                    disableBodyScroll(this.$refs.contents)

                }, during);
            }
            this.$refs['contents'].scrollTop = 0
            return false
        },
        close(){
            if(!this.touchEvent.isMoving && this.displayModal === true){

                this.backdropOn = false

                let during = this.transitionDuring
                    // interval = during / 50,
                    // conunt = during / interval

                // let mounted = setInterval(() => {
                //     this.backdrop.Blur = this.backdrop.Blur - ( this.backdropBlur / conunt )
                //     this.backdrop.Bright = this.backdrop.Bright + ( (100 - this.backdropBright) / conunt )
                // }, interval);

                Velocity(this.$refs['popup'], {
                    translateY: [ 1000, this.position.translateY ]
                },{
                    duration: during,
                    easing: 'ease-in-out',
                    before: () => {
                        this.touchEvent.isMoving = true
                    },
                    complete: () => {
                        this.position.translateY = 0
                        this.touchEvent.isMoving = false
                    }
                })

                setTimeout(() => {
                    // clearInterval(mounted)
                    // this.backdrop.Blur = 0
                    // this.backdrop.Bright = 100

                    enableBodyScroll(this.$refs.contents)
                    this.displayModal = false

                    if(this.returnTo) this.$router.push(this.returnTo)
                }, during);
            }
            return false
        },
        handleScroll($event){
            if($event.target.scrollTop >= 120) {
                this.contents.scrollShadow = 0.60
            } else {
                this.contents.scrollShadow = $event.target.scrollTop*0.005
            }
        }
    },
    watch: {
        display(_newDisplay){
            if(_newDisplay === true ){
                this.open()
            } else {
                this.close()
            }
        },
    },
    mounted(){
        this.topHandler = new elementTouchControl(this.$refs.topHandler,{
            'swipeDetectDirection': 'bottom'
        })

        if(this.display) {
            this.open()
        }
        this.$emit('mounted',this)
    },
    destroyed(){
        clearAllBodyScrollLocks()
    }
}
</script>