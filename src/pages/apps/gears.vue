<template>
    <div class="container">
        <div class="container_wrapper">
            <Gears></Gears>
        </div>
    </div>
</template>

<script>
import Gears from '../../components/apps_gear_calculator/index'

export default {
    components:{
        Gears,
    },
    created(){
        this.$store.commit('cover_show_change',1);
        this.$store.commit('title_change',"Journey66");
    }
}
</script>

<style lang="stylus" scoped>

</style>