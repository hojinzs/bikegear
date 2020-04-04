import axios from 'axios'
import Cookies from 'js-cookie'

let email_login_ajax_address = '//'+process.env.VUE_APP_API_HOST+'/v1/user/login/email?'
let token_login_ajax_address = '//'+process.env.VUE_APP_API_HOST+'/v1/user/login/token?'
let strava_signup_address = '//'+process.env.VUE_APP_AUTH_HOST+'/strava/signup?'
// let get_user_data_address = '//'+process.env.VUE_APP_API_HOST+'/v1/user'

const user = {
    namespaced: true,
    state: {
        status: 'ready', // [ready, loading]
        access_token: null,
        user_data: null,
    },
    mutations:{
        loading(state, data){
            state.loading = data
        },
        login(state, data){
            state.access_token = data.token;
            state.user_data = data.user;

            window.localStorage.setItem('Authorization', data.token)
            axios.defaults.headers.common = {'Authorization': `Bearer ${data.token}`}

            console.log("Login Success => ",data);
        },
        logout(state){
            state.access_token = null;
            state.user_data = null;

            delete axios.defaults.headers.common['Authorization']
            window.localStorage.removeItem('Authorization')

            Cookies.remove('Authorization')
        }
    },
    actions:{
        loginByEmail({commit}, {email, password}){
            commit('loading','loading')

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
                .finally(() => {
                    commit('loading','ready')
                })
        },
        loginByApiToken({commit}){
            axios.get('//'+process.env.VUE_APP_API_HOST+'/sanctum/csrf-cookie')
                .then(() => {
                    commit('loading','loading')

                    return axios({
                        method: 'POST',
                        url: token_login_ajax_address,
                        withCredentials: true,
                    })
                        .then(res => {
                            commit('login',res.data)
                            return res
                        })
                        .catch(error => {
                            throw Error(error)
                        })
                        .finally(() => {
                            commit('loading','ready')
                        })
                })
        },
        loginByStrava(){
            let address = strava_signup_address
                +"return_url=http://bikegear.test:8080/user"
                // +"&scope=activity_read"  //추후 권한 추가승인이 필요할 때 (자출 로그) 사용
            console.log(address)
            location.replace(address)
        },
        logout({commit}){
            commit('logout');
        }
    }
}

export default user
/**
 * 참고: http://jeonghwan-kim.github.io/2018/03/26/vue-authentication.html
 */