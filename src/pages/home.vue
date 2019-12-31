<template>
    <div>
        <h1>this is home</h1>
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