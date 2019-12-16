<template>
    <div id="chart">
        <div class="chart-wrapper">
            <div
                v-for="(gear,index) in Gears"
                v-bind:key="index">
                <ChartCanvas
                    :setting = gear
                    :max_speed.sync = maxSpeed
                    :min_speed.sync = minSpeed
                ></ChartCanvas>
            </div>

        </div>

        max-speed :: {{ maxSpeed.toFixed(2) }} Km/h<br>
        min-speed :: {{ minSpeed.toFixed(2) }} Km/h<br>
    </div>
</template>


<script>
import Canvas from './Canvas'

export default {
    components: {
        'ChartCanvas' : Canvas,
    },
    props:[
        'Gears'
    ],
    data: function(){
        return {
            maxSpeed : 0,
            minSpeed : 0,
        }
    },
    methods: {
    },
    watch: {
        Gears: {
            handler: function(){
                // intial speed data
                this.maxSpeed = 0;
                this.minSpeed = 0;

                // get Min & Max data
                this.Gears.forEach(gear => {
                    if(this.maxSpeed < gear.SpeedTable.maxSpeed || this.maxSpeed == 0) this.maxSpeed = gear.SpeedTable.maxSpeed;
                    if(this.minSpeed > gear.SpeedTable.minSpeed || this.minSpeed == 0) this.minSpeed = gear.SpeedTable.minSpeed;
                });
            },
            deep: true,
        }
    },
}
</script>

<style scoped>
#chart{
    width: 100%;
    right: 0px;
    background-color: gray;
    border-radius: 5px;
}

.chart-wrapper{
    width: 100%;
    right: 0px;
    position: relative;
}
</style>