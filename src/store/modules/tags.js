import axios from 'axios'

const all_tags_ajax_adress = '//'+process.env.VUE_APP_API_HOST+'/v1/tags'

const getTagData = function(callback){
    axios.get(all_tags_ajax_adress)
        .then(res => {
            return callback(res.data.data)
        })
        .catch(error => {
            throw Error(error)
        })
}

const tags = {
    namespaced: true,
    state: {    
        // loadStatus: 'pending', // [pending, loading]
        tags: null,
    },
    mutations:{
        tags(state, data){
            state.tags = data
        },
    },
    actions:{
        setTags({ commit, state }, refresh = false){
            if(state.tags == null || refresh){
                getTagData( data => {
                    return commit('tags',data)
                })
            }
        },
    }
}

export default tags