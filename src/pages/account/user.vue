<template>
    <div>
        <div>
            Who Am I?
        </div>
        <div v-if="userData">
            <div>
                {{ userData }}
            </div>
            <button @click="$store.dispatch('user/logout')">Logout</button>
        </div>

        <div v-else>
            Cannot Find user Data
            <router-link to="Login">Login First</router-link> 
        </div>
    </div>
</template>

<script>
// import axios from 'axios'

export default {
    name: 'userInformation',
    computed: {
        userData(){
            return this.$store.state.user.user_data
        }
    },
    created()
    {
        this.$store.commit('page/cover_style_change','cover');
        this.$store.commit('page/cover_title_change',"My Page");
        this.$store.commit('page/background_change','/images/bw-bike01.jpg');
    }
}
</script>