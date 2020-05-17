<template>
    <lumiPopupPannel
        :display.sync="showPopup"
        :returnTo="close_url">

        <!-- Loading -->
        <div v-if="loading">
            Loading...
        </div>

        <!-- Loading Complete -->
        <InfraPlace v-if="place_data"
            :placeData="place_data">
        </InfraPlace>

    </lumiPopupPannel>
</template>

<script>
import InfraPlace from '@/components/apps_infra_place/index'

import axios from 'axios'

export default {
    name: 'place_info',
    components:{
        InfraPlace,
    },
    data(){
        let ajax_url = '//'+process.env.VUE_APP_API_HOST
            +'/v1/places/'

        return {
            showPopup: true,
            load_place: {
                url: ajax_url,
            },
            loading: false,
            place_data: null,
            close_url: { name: 'PlaceMap' },
        }
    },
    methods: {
        getData(){
            this.loading = true

            axios({
                method: 'GET',
                url: this.load_place.url+this.place_id,
            })
            .then( res => {
                this.place_data = res.data.data
                this.loading = false

            })
            .catch( error => {
                console.log('AXIOS ERROR => ',error,'preset data');
            })
        }
    },
    created(){
        console.log("VueRouter => ",this.$route.params.id )
        this.place_id = this.$route.params.id
        this.getData()
    },
}
</script>

<style lang="stylus" scoped>

</style>