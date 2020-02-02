<template>
    <div>
        <div id="map" style="width:100%;height:400px;"></div>
    </div>
</template>

<script>
/**
 * 외부 스크립트 로드 참고자료
 * https://fifthsage.wordpress.com/2017/03/29/vuejs-%EC%99%B8%EB%B6%80-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%A1%9C%EB%93%9C-%ED%9B%84-%EA%B0%9D%EC%B2%B4-%EC%82%AC%EC%9A%A9/
 * 방법 찾긔
 */
export default {
    methods: {
        init: function () {
            let self = this,
                el = document.createElement('script')
                el.setAttribute('type', 'text/javascript');
                el.setAttribute('src', '//openapi.map.naver.com/openapi/v3/maps.js?ncpClientId='+process.env.VUE_APP_NAVER_API_CLIENT_KEY);

            document.getElementsByTagName('head')[0].appendChild(el);

            el.onload = function(){
                let mapOptions = {
                    center: new naver.maps.LatLng(37.3595704, 127.105399),
                    zoom: 10
                    },
                    map = new naver.maps.Map(self.$el, mapOptions);
            };
        }
    },
    mounted(){
        this.init()
    }
}
</script>

<style lang="stylus" scoped>

</style>