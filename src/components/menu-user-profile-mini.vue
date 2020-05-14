<template>
    <div class="profile">
        <div
            class="profile-mini lumi-click-el"
            v-if="this.userData"
            @click="goProfilePage"
        >
            <div class="profile-img">
                <img class="img-round" :src="userData.profile" />
            </div>
            <div class="profile-text">
                <div class="profile-text-name">
                    {{ userData.name }}
                </div>
            </div>
        </div>
        <div v-else>
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
    font-size 0.6em
    color inherit
    padding 0.4em
    padding-left 6px
    padding-right 6px
    /*border-radius 6px*/
    /*border-color white*/
    /*border-style solid*/
    /*border-width 1px*/
    .profile-mini
        display flex
        height 20px
        .profile-img
            flex 1 1 20px
            max-width 50px
            margin-right 5px
            flex-basis 20px
            .img-round
                height 20px
                border-radius 50%
        .profile-text
            color inherit
            flex 1 1 200px
            margin-right 0px
            text-align left
            .profile-text-name
                flex auto
                max-width 80px
                white-space nowrap
                overflow hidden
                text-overflow ellipsis
                a
                    text-decoration none
                    :visited
                        /*color inherit*/
</style>