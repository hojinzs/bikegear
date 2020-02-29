<template>
    <lumiPopupPannel
        :display.sync="show"
        :returnTo="CloseUrl()">
        Place Id is => {{ $route.params.id }}
    </lumiPopupPannel>
</template>

<script>
import { lumiPopupPannel } from 'vue-luminus-style'

export default {
    name: 'place_info',
    components:{
        lumiPopupPannel
    },
    data(){
        return {
            show: true
        }
    },
    methods: {
        CloseUrl(){
            return { name: 'Bike Infra Map' }
        }
    },

}
</script>

<style lang="stylus" scoped>

</style>