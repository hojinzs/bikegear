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

            <!-- <canvas id="speed-chart"></canvas> -->

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
    methods: {
        drawSpeedChart: function(){
            // intial speed data
            this.maxSpeed = 0;
            this.minSpeed = 0;

            // get Min & Max table
            this.Gears.forEach(gear => {
                if(this.maxSpeed < gear.SpeedTable.maxSpeed || this.maxSpeed == 0) this.maxSpeed = gear.SpeedTable.maxSpeed;
                if(this.minSpeed > gear.SpeedTable.minSpeed || this.minSpeed == 0) this.minSpeed = gear.SpeedTable.minSpeed;
            });

            this.Gears.forEach(gear => {

                let SpeedTable = gear.SpeedTable;
                console.log('Get SpeedTable!!>>', SpeedTable);

                for (let i = 0; i < SpeedTable.Crank; i++) {
                    console.log(this.SpeedTable[i]);
                }
            });

            // let canvas = document.getElementById('speed-chart');

            // let bar = canvas.getContext('2d');
            // bar.fillRect(20,25,100,100)

        }
    },
    watch: {
        Gears: {
            handler: function(){
                this.drawSpeedChart();
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

.chart_bar{
    flex: content;
    left: 10px;
    border: 1px solid black;
    display: inline;
    position: absolute;
}
</style>