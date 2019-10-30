<template>
    <div id="Chart">
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

                <div
                class="chart_bar"
                v-for="(speeds,index) in sprockets"
                :key="index"
                :min_speed="speeds.minSpeed.toFixed(2)"
                :max_speed="speeds.maxSpeed.toFixed(2)">
                    <b>{{ index }}t</b>
                </div>

            </div>
        </div>
        max-speed :: {{ maxSpeed.toFixed(2) }} Km/h<br>
        min-speed :: {{ minSpeed.toFixed(2) }} Km/h<br>
    </div>
</template>


<script>
export default {
    props:[
        'Gears'
    ],
    data: function(){
        return {
            maxSpeed : 0,
            minSpeed : 0,
        }
    },
    watch: {
        Gears: {
            handler: function(){
                // get Max-Min Speed And calculate width

                // intial speed data
                this.maxSpeed = 0;
                this.minSpeed = 0;

                // get Data
                this.Gears.forEach(gear => {
                    console.log(gear);

                    if(this.maxSpeed < gear.SpeedTable.maxSpeed || this.maxSpeed == 0) this.maxSpeed = gear.SpeedTable.maxSpeed;
                    if(this.minSpeed > gear.SpeedTable.minSpeed || this.minSpeed == 0) this.minSpeed = gear.SpeedTable.minSpeed;


                });

            },
            deep: true,
        }
    }
}
</script>

<style scoped>
.chart-wrapper{
    width: 100%;
    height: 200px;
    position: relative;
}

.chart-line{
    height: 80px;
    height: 80px;
    position: relative;
}

.line-index{
    position: absolute;
    left: 10px;
}

.chart_bar{
    border: 1px solid black;
    display: inline;
    position: absolute;
}
</style>