<template>
    <div id="chart">
        <div class="chart-wrapper">

            <div
                class="chart-wrapper"
                v-for="(gear,index) in Gears"
                :key="index">

                <b> #{{ index + 1}} :: {{gear.name }}</b>
                <div 
                class="chart-line"
                v-for="(sprockets,index) in gear.SpeedTable.Cranks"
                :key="index">

                    <span class="line-index"> {{ index }} </span>

                    <chartCanvas
                        ref="chartcanvas"
                        :color='gear.color'
                        :chartName='index'
                        :speedData='sprockets'
                        :maxValue='maxSpeed'
                        :minValue='minSpeed'>
                    </chartCanvas>

                </div>
            </div>

        </div>
        max-speed :: {{ maxSpeed.toFixed(2) }} Km/h<br>
        min-speed :: {{ minSpeed.toFixed(2) }} Km/h<br>
    </div>
</template>


<script>

import Canvas from './Canvas.vue';

export default {
    components:{
        chartCanvas: Canvas
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

                // get Min & Max table
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

#speed-chart{
    width: 100%;
    background: white;
}

.chart-wrapper{
    width: 100%;
    right: 0px;
    position: relative;
}

.chart-line{
    height: 50px;
    display: flex;
    align-items: center;
    border: 1px solid black;
}

.line-index{
    position: absolute;
    left: -20px;
    flex: content;
}
</style>