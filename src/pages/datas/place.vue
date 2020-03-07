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


import { response } from '@/plugins/sampledb'

export default {
    name: 'place_info',
    components:{
        InfraPlace,
        lumiPopupPannel,
    },
    data(){
        return {
            showPopup: true,
            loading: false,
            place_data: null,
            close_url: { name: 'Bike Infra Map' },
        }
    },
    methods: {
        getData(){
            this.loading = true
            setTimeout(() => {
                this.loading = false
                this.place_data = response[this.place_id]
            },800)
        }
    },
    created(){
        this.place_id = String(this.$route.params.id - 1)

        this.getData()
        console.log("VueRouter => ",this.$route.params.id )
    }
}
</script>

<style lang="stylus" scoped>

</style>