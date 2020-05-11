<template>
    <div class="app-container">
        <div class="container_wrapper">
            <h3>now constructing...</h3>

            <!-- Using utilities: -->
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Button
            </button>

            <div class="bg-purple text-white sm:bg-green md:bg-blue md:text-yellow lg:bg-red xl:bg-orange ...">
                Test
            </div>

        </div>
    </div>
</template>

<script>
export default {
    created(){
        this.$store.commit('page/cover_style_change','cover');
        this.$store.commit('page/cover_title_change',"Journey66");
        this.$store.commit('page/background_change','/images/w-cycling.jpg');
    }
}
</script>

<style lang="stylus" scoped>

</style>