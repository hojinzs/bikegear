import axios from 'axios'
import Cookies from 'js-cookie'

let email_login_ajax_address = '//'+process.env.VUE_APP_API_HOST+'/v1/user/login/email?'
let token_login_ajax_address = '//'+process.env.VUE_APP_API_HOST+'/v1/user/login/token?'
let strava_signup_address = '//'+process.env.VUE_APP_AUTH_HOST+'/strava/signup?'

const user = {
    namespaced: true,
    state: {
        status: 'ready', // [ready, loading]
        access_token: null,
        user_data: null,
    },
    getters: {
        signed: state => {
            if(state.user_data){
                return true
            } else {
                return false
            }
        },
        userdata: state => {
            if(state.user_data){
                return state.user_data
            } else {
                return false
            }
        }
    },
    mutations:{
        status(state, data){
            state.status = data
        },
        login(state, data){
            state.access_token = data.token;
            state.user_data = data.user;

            window.localStorage.setItem('Authorization', data.token)
            axios.defaults.headers.common = {'Authorization': `Bearer ${data.token}`}

            // console.log("Login Success => ",data);
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
            commit('status','loading')

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
                    commit('status','ready')
                })
        },
        loginByApiToken({commit}){
            commit('status','loading')
            axios.get('//'+process.env.VUE_APP_API_HOST+'/sanctum/csrf-cookie')
                .then(() => {

                    let status = 'pending'
                    return axios({
                        method: 'POST',
                        url: token_login_ajax_address,
                        withCredentials: true,
                    })
                        .then(res => {
                            status = 'success'
                            commit('login',res.data)
                            return res
                        })
                        .catch(error => {
                            status = 'fail'
                            commit('logout')
                            throw Error(error)
                        })
                        .finally(() => {
                            let event = new CustomEvent('user.login.finish', { detail: {'status': status} })
                            window.dispatchEvent(event)
                            commit('status','ready')
                        })
                })
        },
        loginByStrava()
        {
            let address = strava_signup_address
                +`return_url=${process.env.VUE_APP_URL}/user`
                // +"&scope=activity_read"  //추후 권한 추가승인이 필요할 때 (자출 로그) 사용
            console.log(address)
            location.replace(address)
        },
        logout({commit})
        {
            commit('logout');
        },
        checkOrAfterLogin({state}, callbackFn)
        {
            if(state.user_data){ // 로그인 여부를 체크
                return callbackFn(state.user_data) // 로그인 되었다면, 콜백을 바로 실행, 유저 데이터를 넘겨준다.
            } else {
                if(state.status === 'loading'){ // 로그인 진행중이라면, 콜백 스택에 추가
                    window.addEventListener('user.login.finish', e => {
                        if(e.detail.status === 'success') {
                            return callbackFn(state.user_data) //로그인에 성공했다면 콜백을 실행하는 이벤트를 등록
                        } else {
                            return false //로그인에 실패 했다면 콜백 실행 안함
                        }
                    },{once: true})
                } else {  // 로그인 진행중이 아니라면 false를 호출
                    return false
                }
            }
        }
    }
}

export default user
/**
 * 참고: http://jeonghwan-kim.github.io/2018/03/26/vue-authentication.html
 */