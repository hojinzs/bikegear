<template>
    <div id="inframap">
        <InfraMap></InfraMap>
        <router-view></router-view>
    </div>
</template>

<script>
import InfraMap from '@/components/apps_infra_map/index.vue'

export default {
    components:{
        InfraMap,
    },
    created(){
        this.$store.commit('page/cover_style_change','none');
        this.$store.commit('page/cover_title_change','');
        this.$store.commit('page/background_change','');
    }
}
</script>

<style lang="stylus" scoped>
#inframap
    height 100%
    width 100%
</style>