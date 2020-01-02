<template>
    <div>
        <h3>now constructing...</h3>
    </div>
</template>

<script>
export default {
    created(){
        this.$store.commit('title_change',"Journey66")
    }
}
</script>

<style lang="stylus" scoped>

</style>