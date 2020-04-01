<template>
    <div>
        <form id="login" name="login" action="/login" method="post" @submit.prevent="doLogin" ref="loginForm">
            <div class="lumi-input-group">
                <label for="id">ID</label>
                <input class="lumi-input-liner" name="email" type="text" >
            </div>
            <div class="lumi-input-group">
                <label for="password">password</label>
                <input class="lumi-input-liner" name="password" type="password" >
            </div>
            <div class="lumi-input-group">
                <button class="lumi-button lumi-button-black" type="submit"> 로그인 </button>
            </div>
        </form>
        <div>
            <hr/>
            <a @click="$store.dispatch('user/loginByStrava')" ><button class="lumi-button lumi-button-black">Login with Strava</button></a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    // computed:
    // {
    //     stravaLoginURL(){
    //         return "//auth.bikegear.test/strava/signup?"
    //             +"&return_url="+window.location.href
    //     }
    // },
    methods:
    {
        doLogin($form){
            let logindata = new FormData($form.target),
                email = logindata.get('email'),
                password = logindata.get('password')

            this.$store.dispatch('user/loginByEmail',{email, password})
                .then(() => {
                    this.$router.push({ name: 'User' })
                })
                .catch(error => {console.log("Login Failure => ",error)})
        },
    },
    created()
    {
        this.$store.commit('page/cover_style_change','cover');
        this.$store.commit('page/cover_title_change',"Login");
        this.$store.commit('page/background_change','/images/w-cycling.jpg');
    }
}
</script>

<style lang="stylus" scoped>
.lumi-input-group
    margin-top 0.8rem
    display flex
    label 
        flex-basis 100px
        line-height 34px
        text-align right
        vertical-align middle

</style>