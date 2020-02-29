<template>
    <div class="lumi-popup-backdrop"
        :style="[ styleBackdropFilter ]"
        @click.self.stop="close()">

        <div class="lumi-popup" ref="popup"
            v-bind:style="{ transform: 'translateY('+position.translateY+'px)' }">
            <div @touchstart="touchStart">
                -------------------
            </div>
            <div class="popup_contents">
                <slot></slot>
            </div>
        </div>

    </div>
</template>

<script>
import Velocity from 'velocity-animate'

export default {
    name: 'lumi-popup',
    props: {
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
        returnTo: Object
    },
    data() {
        return {
            position: {
                translateY: 0
            },
            backdrop: {
                Blur: 0,
                Bright: 100,
            },
            touchEvent: {
                isMoving: false,
                isSwipe: false,
                movedY: 0,
                startPosition: 0,
                swipeTolerance: 300,
                totalMovded: 0,
            }
        }
    },
    computed: {
        styleBackdropFilter(){
            return {
                backdropFilter: "blur("+this.backdrop.Blur+"px) brightness("+this.backdrop.Bright+"%)"
            }
        }
    },
    methods:{
        touchStart($touchEvent){
            this.touchEvent.isMoving = true
            this.touchEvent.movedY = $touchEvent.touches[0].clientY
            this.touchEvent.totalMovded = 0

            /**
             * 일정 시간 동안 스와이프 판정
             */
            this.touchEvent.isSwipe = true,
            setTimeout(() => {
                this.touchEvent.isSwipe = false
            },this.touchEvent.swipeTolerance)

            let touchMove = ($touchMoveEvent) => {
                let moved = this.touchEvent.movedY - $touchMoveEvent.touches[0].clientY
                this.position.translateY = this.position.translateY - moved
                this.touchEvent.totalMovded = this.touchEvent.totalMovded + moved

                console.log("moved => ", moved)

                // clear
                this.touchEvent.movedY = $touchMoveEvent.touches[0].clientY
                this.touchEvent.startPosition = 0
            }

            let touchEnd = () => {
                document.body.removeEventListener("touchmove", touchMove)

                /**
                 * 스와이프 감지 시간동안, 음의 방향으로 움직였다면 닫기로 감지
                 */
                if(this.touchEvent.isSwipe){
                    if(this.touchEvent.totalMovded < 0){
                        this.close()
                        return
                    }
                }

                /**
                 * body Height의 70% 이하로 내려가면 창을 닫는다.
                 */
                let scrollDowned = this.$el.clientTop + this.position.translateY,
                    limit = ( document.body.offsetHeight * ( 1 - 0.70) )
                if(scrollDowned > limit){
                    this.close()
                    return
                } else {
                    // 60% 이하가 아닐 경우 바운스
                    Velocity(this.$refs['popup'], {
                        translateY: [ 0, this.position.translateY ]
                    },{
                        duration: this.transitionDuring,
                        easing: 'spring',
                        complete: () => {
                            this.position.translateY = 0
                            this.touchEvent.isMoving = false
                            this.touchEvent.movedY = 0
                        },
                    })
                    return
                }
            }

            document.body.addEventListener('touchmove',touchMove,false)
            document.body.addEventListener('touchend',touchEnd,{once: true})

        },
        open(){
            let during = this.transitionDuring,
                interval = during / 50,
                conunt = during / interval

            let mounted = setInterval(() => {
                this.backdrop.Blur = this.backdrop.Blur + ( this.backdropBlur / conunt )
                this.backdrop.Bright = this.backdrop.Bright - ( (100 - this.backdropBright) / conunt )
            }, interval);

            setTimeout(() => {
                clearInterval(mounted)
                this.backdrop.Blur = this.backdropBlur
                this.backdrop.Bright = this.backdropBright
            }, during);

            Velocity(this.$refs['popup'], {
                translateY: [ this.position.translateY, 1000 ]
            },{
                duration: during,
                easing: 'ease',
            })
        },
        close(){
            let during = this.transitionDuring,
                interval = during / 50,
                conunt = during / interval

            let mounted = setInterval(() => {
                this.backdrop.Blur = this.backdrop.Blur - ( this.backdropBlur / conunt )
                this.backdrop.Bright = this.backdrop.Bright + ( (100 - this.backdropBright) / conunt )
            }, interval);

            Velocity(this.$refs['popup'], {
                translateY: [ 1000, this.position.translateY ]
            },{
                duration: during,
                easing: 'ease-in-out',
            })

            setTimeout(() => {
                clearInterval(mounted)
                this.backdrop.Blur = 0
                this.backdrop.Bright = 100

                this.$router.push(this.returnTo)
            }, during);

        }
    },
    created(){
        console.log("Get Item id => ", this.$route.params.id)
    },
    mounted(){
        this.open()
    },
}
</script>

<style lang="stylus" scoped>
.lumi-popup-backdrop
    position absolute
    z-index 500
    top 0
    bottom 0
    height 100%
    width 100%
    // backdrop-filter blur(2px) brightness(30%)
    .lumi-popup
        position absolute
        z-index 510
        top 4em
        height 110%
        width 100%
        background-color white
        border-radius 1.3em 1.3em 0 0
        overflow hidden
        .popup_header
            min-height 2em
        .popup_contents
            width 100%
            height 100%
            overflow-y scroll
</style>