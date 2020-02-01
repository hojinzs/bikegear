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
    }
}
</script>

<style lang="stylus" scoped>
#gear-database
    background linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.4)),url(bw-bike01.jpg)
    background-repeat no-repeat
    background-size cover
    background-position center
    background-attachment fixed
</style>