<template>
    <div>
        <div>
            Who Am I?
        </div>
        <div v-if="userData">
            {{ userData.user }}

            <div>
                <a :href="stravaLoginURL">integrate Strava</a>
            </div>

        </div>

        <div v-else>
            Cannot Find user Data
            <router-link to="Login">Login First</router-link> 
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'userInformation',
    data()
    {
        let url = '//'+process.env.VUE_APP_API_HOST+'/v1/user'
        return {
            ajax_url: url,
            userData: null,
        }
    },
    computed: {
        stravaLoginURL(){
            return "//auth.bikegear.test/strava/signin?"
                +"api_token="+this.userData.api_token
                +"&return_url="+window.location.href
        }
    },
    created()
    {
        axios({
            method: 'GET',
            url: this.ajax_url,
            withCredentials: true,
        })
            .then(res => {
                console.log('Get User Data =>',res.data)
                this.userData = res.data
                console.log(this.stravaLoginURL);
            })
            .catch(Err => {
                console.log("Error => ",Err)
            })
    }
}
</script>