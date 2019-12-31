<template>
    <Gears></Gears>
</template>

<script>
import Gears from '../../components/apps_gear_calculator/index'

export default {
    components:{
        Gears,
    },
    created(){
        this.$store.commit('title_change',"Bike Gear Ratio Calulator")
        this.$store.commit('height_change',500)
    }
}
</script>

<style lang="stylus" scoped>

</style>