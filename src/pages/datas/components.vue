<template>
    <div id="gear-database" class="container coverless backgrounded">
        <div class="container_wrapper">
            <CompDB></CompDB>
        </div>
    </div>
</template>

<script>
import CompDB from '../../components/apps_comp_db/comp_db.vue'

export default {
    components:{
        CompDB,
    },
    created(){
        this.$store.commit('cover_show_change',0);
        this.$store.commit('background_change','/images/bw-bike01.jpg');
    }
}
</script>

<style lang="stylus" scoped>
#gear-database
    .container_wrapper
        padding-left 1em
        padding-right 1em
</style>