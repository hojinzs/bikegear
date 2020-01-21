<template>
    <div class="container">
        <div class="container_wrapper">
            <h2>Apps</h2>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        this.$store.commit('title_change',"Useful Apps")
    }
}
</script>

<style lang="stylus" scoped>

</style>