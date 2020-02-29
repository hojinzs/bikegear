<template>
    <PopUp
        :returnTo="CloseUrl()">
        Place Id is => {{ $route.params.id }}
    </PopUp>
</template>

<script>
import PopUp from '@/components/interface/lumi-popup.vue'

export default {
    name: 'place_info',
    components:{
        PopUp
    },
    methods: {
        CloseUrl(){
            return { name: 'Bike Infra Map'}
        }
    },

}
</script>

<style lang="stylus" scoped>

</style>