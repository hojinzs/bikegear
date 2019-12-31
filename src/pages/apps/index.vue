<template>
    <div>
        <h2>Apps</h2>
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