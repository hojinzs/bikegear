<template>
    <div class="container">
        <div class="container_wrapper">
            <h3>now constructing...</h3>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        this.$store.commit('cover_show_change',1);
        this.$store.commit('title_change',"Journey66");
        this.$store.commit('background_change','/images/w-cycling.jpg');
    }
}
</script>

<style lang="stylus" scoped>

</style>