<template>
    <InfraMap></InfraMap>
</template>

<script>
import InfraMap from '../../components/apps_infra_map/index.vue'

export default {
    components:{
        InfraMap,
    },
    created(){
        this.$store.commit('cover_style_change','none');
        this.$store.commit('cover_title_change','');
        this.$store.commit('background_change','');
    }
}
</script>

<style lang="stylus" scoped>

</style>