<template>
    <div class="canvas-wrapper">
        <canvas class="this-canvas" ref="this-canvas"></canvas>
    </div>
</template>

<script>
import SpeedChart from '../chart'

export default {
    props: [
        'color',
        'chartName',
        'speedData',
        'maxValue',
        'minValue',
    ],
    data: function(){
        return{
            canvas : Object
        }
    },
    methods:{
        drawChart(){
            this.canvas.setAxisX(this.minValue,this.maxValue);

            let loop = this.speedData;
            let Keys = Object.keys(loop)

            Keys.forEach(element=>{

                let max = loop[element].maxSpeed.toFixed(2)
                let min = loop[element].minSpeed.toFixed(2)

                this.canvas.drawBar(min,max,this.color,element)
                // this.canvas.drawBar(10,20,'blue',element)
            })
        }
    },
    mounted(){
        this.canvas = new SpeedChart({
            canvas : this.$refs['this-canvas'],
            height : this.$refs['this-canvas'].offsetHeight,
        });

        this.drawChart();
    },
    watch:{
        speedData: function(){
            this.drawChart();
        }
    }
}
</script>

<style scoped>
.canvas-wrapper{
    width: 100%;
    height: 100%;
}

.this-canvas{
    width: 100%;
    height: 100%;
    background-color: white;
}


</style>