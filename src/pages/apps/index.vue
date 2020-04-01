<template>
    <div class="container">
        <div class="container_wrapper">
            <h2>Apps</h2>

            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        this.$store.commit('page/cover_style_change','cover');
        this.$store.commit('page/cover_title_change',"Useful Apps");
        this.$store.commit('page/background_change','/images/w-cycling.jpg');
    }
}
</script>

<style lang="stylus" scoped>

</style>