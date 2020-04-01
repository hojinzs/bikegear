<template>
    <div>
        <form id="register" name="register" action="/signup" method="post" @submit.prevent="doRegister" @input="formValidate" ref="register">
            <div class="lumi-input-group">
                <label for="id">e-mail</label>
                <input class="lumi-input-liner" name="email" type="text"
                :class="{
                    'limu-error': ( '' )
                }">
            </div>
            <div class="lumi-input-group">
                <label for="password">password</label>
                <input class="lumi-input-liner" name="password" type="password" >
            </div>
            <div class="lumi-input-group">
                <label for="password">confirmation</label>
                <input class="lumi-input-liner" name="password_confirmation" type="password" >
            </div>
            <div class="lumi-input-group">
                <label for="id">name</label>
                <input class="lumi-input-liner" name="name" type="text" >
            </div>
            <div class="lumi-input-group">
                <button class="lumi-button lumi-button-black" type="submit" :disabled="!register.data_valitate_passed"> 회원가입 </button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import valitator from 'validate.js' //doc:: https://validatejs.org

export default {
    name: 'login',
    data()
    {
        let ajax_address = '//'+process.env.VUE_APP_API_HOST+'/v1/user/signup'

        return {
            register: {
                ajax_address: ajax_address,
                data_validator: null,
                data_valitate_passed: false,
            }
        }
    },
    methods:
    {
        doRegister($form){
            console.log($form.target)

            let registerData = new FormData($form.target)

            console.log(registerData)
            
            axios({
                method: 'POST',
                url: this.register.ajax_address,
                data: registerData,
                withCredentials: true,
            })
                .then(res => {
                    console.log(res.data)
                    axios.defaults.headers.common = {'Authorization': `Bearer ${res.data}`}
                    alert("Login Success")
                    this.$router.push({ name: 'User' })
                })
                .catch( error => {
                    console.log('AXIOS ERROR => ',error,'preset data');
                })
        },
        formValidate(){
            let validationField = {
                email: {
                    email: true
                },
                password: {
                    presence: true,
                    length: {
                        minimum: 8
                    }
                },
                password_confirmation: {
                    equality: "password"
                },
                name: {
                    presence: true,
                    length: {
                        minimum: 2
                    }
                }
            }
            let error = valitator(this.$refs.register,validationField);
            console.log(error)
            this.register.data_validator = error
            this.register.data_valitate_passed = typeof error == "undefined"
        },
    },
    created()
    {
        this.$store.commit('page/cover_style_change','cover');
        this.$store.commit('page/cover_title_change',"Register");
        this.$store.commit('page/background_change','/images/w-cycling.jpg');
    },
    watch:{
        'register.data': {
            handler: 'dataValidate',
            deep: true
        }
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