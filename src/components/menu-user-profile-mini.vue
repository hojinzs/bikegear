<template>
    <div class="profile lumi-click-el">
        <div
            class="profile-mini"
            v-if="this.userData"
            @click="goProfilePage"
        >
            <div class="profile-img">
                <img class="img-round h-full w-full object-cover" :src="userData.profile" />
            </div>
            <div class="profile-text">
                <div class="profile-text-name ">
                    {{ userData.name }}
                </div>
            </div>
        </div>
        <div v-else
             class="profile-alter"
        >
            <a @click="$store.dispatch('user/loginByStrava')" href="#">
                <font-awesome-icon class="showmenu" :icon="['fab', 'strava']" /> Login With Strava
            </a>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
    name: 'menu-user-profile',
    components: {
        'font-awesome-icon' : FontAwesomeIcon
    },
    props: {
        logout: {
            type: Boolean,
            default: true,
        }
    },
    computed: {
        userData() {
            return this.$store.state.user.user_data
        }
    },
    methods: {
        goProfilePage(){
            this.$router.push({ name:'User' })
        }
    }
}
</script>

<style lang="stylus" scoped>
.profile
    box-sizing border-box
    height 2rem
    padding 0.3em
    padding-left 0.4rem
    padding-right 0.4rem
    font-size 0.6em
    color inherit
    /*border-radius 6px*/
    /*border-color white*/
    /*border-style solid*/
    /*border-width 1px*/
    .profile-mini
        display flex
        height 20px
        .profile-img
            flex-shrink 0
            width 20px
            height 20px
            background-color grey
            margin-right 5px
            border-radius 50%
            overflow hidden
        .profile-text
            color inherit
            flex 1 1 200px
            margin-right 0px
            text-align left
            .profile-text-name
                margin-top 0.4rem
                margin-bottom 0.4rem
                flex auto
                max-width 80px
                white-space nowrap
                overflow hidden
                text-overflow ellipsis
    .profile-alter
        margin-top 0.4rem
        margin-bottom 0.4rem

</style>