<template>
    <div id="profile">
        <div class="user-profile" v-if="this.userData">
            <div class="profile-img">
                <img class="img-round" :src="userData.profile" />
            </div>
            <div class="profile-text">
                <div class="profile-text-provider">
                    <font-awesome-icon class="showmenu" :icon="['fab', 'strava']" /> strava
                </div>
                <div class="profile-text-name">
                    <router-link :to="{ name:'User' }">{{ userData.name }}</router-link>
                </div>
            </div>
            <div v-if="logout" class="logout">
                <button class="logout-button"  @click="$store.dispatch('user/logout')">
                    <font-awesome-icon class="showmenu" :icon="['fas', 'sign-out-alt']" /> Logout
                </button>
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
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStrava } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faStrava)

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
    }
}
</script>

<style lang="stylus">
    .user-profile
        margin 0 auto
        max-width 400px
        display flex
        height 40px
        padding 8px
        background-color #f2f2f2
        border-radius 6px
</style>
<style lang="stylus" scoped>
    #profile
        .user-profile
            margin 0 auto
            max-width 400px
            display flex
            height 40px
            padding 8px
            background-color #f2f2f2
            border-radius 6px
            .profile-img
                flex 1 1 40px
                max-width 50px
                margin-right 20px
                flex-basis 40px
                .img-round
                    height 40px
                    border-radius 50%
            .profile-text
                flex 1 1 100%
                text-align left
                .profile-text-provider
                    flex auto
                    font-size 0.8em
                    color #a6a6a6
                .profile-text-name
                    flex auto
                    color #595959
                    a
                        text-decoration none
                        &:visited
                            color #595959
            .logout
                border-left 1px solid #e6e6e6
                flex 1 1 auto
                display flex
                flex-direction column
                .logout-button
                    flex 1 1 auto
                    background none
                    font-weight 200
                    color #595959


</style>