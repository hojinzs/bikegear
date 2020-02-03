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
        this.$store.commit('cover_style_change','cover');
        this.$store.commit('cover_title_change',"Gear Ratio Calculator");
        this.$store.commit('background_change','/images/w-cycling.jpg');
    }
}
</script>

<style lang="stylus" scoped>

</style>