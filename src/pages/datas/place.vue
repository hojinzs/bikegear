<template>
    <lumiPopupPannel
        :display.sync="showPopup"
        :returnTo="close_url">
        <!-- Place Id is => {{ $route.params.id }} -->

        <!-- Loading -->
        <div v-if="loading">
            Loading...
        </div>

        <!-- Data Load Fisish -->
        <div v-if="place_data" class="place-data">
            <div>
                <h2>{{place_data.name}}</h2>
            </div>
            <div class="place-img-wrapper">
                <img :src="place_data.Image"/>
            </div>
            <div>
                <a :href="place_data.Url" target="_blank">바로가기</a>
            </div>
        </div>

    </lumiPopupPannel>
</template>

<script>
import { lumiPopupPannel } from 'vue-luminus-style'

let place_detail = {
    "name": "마니또바이크",
    "type": "shop",
    "description": "마니또바이크",
    "geoPoint": {
        "latitude": 37.59279,
        "longitude": 127.07831
    },
    "phone": "024912040",
    "formattedAddress": "서울 중랑구 중랑천로 10길 98 , (면목동) 1층",
    "Url": "http://www.manitoubike.co.kr/",
    "Image": "https://modo-phinf.pstatic.net/20151110_11/1447154093942Ut5Vk_JPEG/mosa6YkuQl.jpeg?type=w1100",
    "Tags": {
        "Utility": [
            "maintenance"
        ],
        "Brand": [
            "trek"
        ],
        "Merchant": [
            "cycle", "mtb"
        ],
        "others": [

        ]
    }
}

export default {
    name: 'place_info',
    components:{
        lumiPopupPannel
    },
    data(){
        return {
            showPopup: true,
            loading: false,
            place_data: null,
            close_url: { name: 'Bike Infra Map' }
        }
    },
    methods: {
        getData(){
            this.loading = true
            setTimeout(() => {
                this.loading = false
                this.place_data = place_detail
            },800)
        }
    },
    created(){
        this.getData()
        console.log("VueRouter => ",this.$route.params.id )
    }
}
</script>

<style lang="stylus" scoped>
.place-data
    width 100%
    overflow-x hidden
    .place-img-wrapper
        height 120px
        background-color grey
        img
            margin 0 auto
            height 100%
</style>