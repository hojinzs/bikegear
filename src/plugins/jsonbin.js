import axios from 'axios'

const jsonBin = axios.create()
jsonBin.defaults.xsrfCookieName = ''
jsonBin.defaults.headers = {
    'secret-key': atob(process.env.VUE_APP_COMPDB_API_KEY)
}

export default jsonBin