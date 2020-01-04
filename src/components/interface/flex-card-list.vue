<template>
    <div class="flex-box-list">
        <div class="flex-box-item">
            
        </div>
    </div>
</template>

<script>
export default {
    props:{
        lentgh: Number
    }
}
</script>

<style lang="stylus" scoped>

.flex-box-list
    width: 100%
    display: flex
    overflow-x: scroll
    .flex-box-list
        overflow: none
        margin: 10px

</style>