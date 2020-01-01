<template>
    <div>
        <h1>this is home</h1>
    </div>
</template>

<script>
export default {
    created(){
        this.$store.commit('title_change',"Journey66")
        this.$store.commit('height_change',240)
    }
}
</script>

<style lang="stylus" scoped>

</style>