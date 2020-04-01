import axios from 'axios';

let email_login_ajax_address = '//'+process.env.VUE_APP_API_HOST+'/v1/user/login?'
let strava_signup_address = '//'+process.env.VUE_APP_AUTH_HOST+'/strava/signup?'

const user = {
    namespaced: true,
    state: {
        access_token: null,
        user_data: null,
    },
    mutations:{
        login(state, access_token){
            state.access_token = access_token;
            axios.defaults.headers.common = {'Authorization': `Bearer ${access_token}`}
            window.sessionStorage.setItem('Authorization','Bearer '+access_token)
        },
        logout(state){
            state.access_token = null;
        }
    },
    actions:{
        loginByEmail({commit}, {email, password}){
            return axios({
                method: 'POST',
                url: email_login_ajax_address,
                data: { email, password },
                withCredentials: true,
            })
                .then(res => {
                    commit('login',res.data)
                    return res
                })
                .catch(error => {
                    throw Error(error)
                })
        },
        getUserData(){

        },
        loginByStrava(){
            let address = strava_signup_address+"return_url=http://bikegear.test:8080/user"
            console.log(address)
            location.replace(address)
        }
    }
}

export default user
/**
 * 참고: http://jeonghwan-kim.github.io/2018/03/26/vue-authentication.html
 */