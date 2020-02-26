<template>
    <div class="lumi-popup-backdrop"
        :style="[ styleBackdropFilter ]"
        @click.self="close()">
        <div class="lumi-popup" ref="popup">
            <div class="popup_header">
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
        returnTo: Object
    },
    data() {
        return {
            backdrop: {
                Blur: 0,
                Bright: 100,
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
        close(){

            let during = this.transitionDuring,
                interval = during / 50,
                conunt = during / interval

            let mounted = setInterval(() => {
                this.backdrop.Blur = this.backdrop.Blur - ( this.backdropBlur / conunt )
                this.backdrop.Bright = this.backdrop.Bright + ( (100 - this.backdropBright) / conunt )
            }, interval);

            Velocity(this.$refs['popup'], {
                translateY: [ 1000, 0 ]
            },{
                duration: during,
                easing: 'ease-in-out',
            })

            setTimeout(() => {
                clearInterval(mounted)
                this.backdrop.Blur = 0
                this.backdrop.Bright = 100
                this.$router.push({ name: 'Bike Infra Map'} )
            }, during);

        }
    },
    created(){
        console.log("Get Item id => ", this.$route.params.id)
    },
    mounted(){
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
            translateY: [ 0, 1000 ]
        },{
            duration: during,
            easing: 'ease',
        })

    },
    destroyed(){
        this.$router.push(this.returnTo)
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
        height 100%
        width 100%
        background-color white
        border-radius 1.3em 1.3em 0 0
        overflow hidden
        .popup_header
            min-height 2em
        .popup_contents
            width 100%
            overflow-y scroll
</style>