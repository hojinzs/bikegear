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
import { lumiPopupPannel } from 'vue-luminus-style'
import InfraPlace from '@/components/apps_infra_place/index'
import Tag from '../../plugins/journey66_tag'

import axios from 'axios'

export default {
    name: 'place_info',
    components:{
        InfraPlace,
        lumiPopupPannel,
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
                headers: {
                    // 'secret-key': atob(process.env.VUE_APP_COMPDB_API_KEY),
                },
            })
            .then((res) => {
                console.log("get Place Data => ", res.data);
                let place = res.data.data
                place.Tags = {
                        "Utility" : Tag.filterTagObjectByType(place.tags,'Utility'),
                        "Brand" : Tag.filterTagObjectByType(place.tags,'Brand'),
                        "Merchant" : Tag.filterTagObjectByType(place.tags,'Merchant'),
                        "others" : Tag.filterTagObjectByType(place.tags,'others'),
                }
                this.place_data = place
                this.loading = false

            })
            .catch((error) => {
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