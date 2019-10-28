<template>
    <div id="Chart">
        <div
            v-for="(gear,index) in Gears"
            :key="index">
            <b> #{{ index + 1}} :: {{gear.name }}</b>

            <table>
                
            </table>
            {{ gear.RatioTable }}
        </div>
    </div>
</template>


<script>
export default {
    props:[
        'Gears'
    ],
}
</script>

<style lang="stylus" scoped>

</style>