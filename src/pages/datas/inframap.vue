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
        this.$store.commit('cover_show_change',1);
        this.$store.commit('title_change',"Bike Infra Map");
        this.$store.commit('background_change','/images/w-cycling.jpg');
    }
}
</script>

<style lang="stylus" scoped>

</style>