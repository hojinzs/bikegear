<template>
    <div>
    <span>{{setting.name}}</span>
    <div class="canvas-wrapper" ref="canvas-wrapper">
        <canvas
            class="this-canvas" ref="this-canvas">
        </canvas>
    </div>
    </div>
</template>

<script>
import SpeedChart from '../chart'

export default {
    props: [
        'setting',
        'max_speed',
        'min_speed',
    ],
    data: function(){
        return{
            canvas : Object,
            bar_height : 50,
            barStyle : {
                height : 500,
            }
        }
    },
    methods: {
        drawChart(){
            this.canvas.setData(this.convertData);
            this.canvas.setAxisX(this.min_speed,this.max_speed);
            this.canvas.drawAll();
        },
    },
    computed: {
        convertData: function(){
            let converted = {}
            
            converted.name = this.setting.name;
            converted.max_speed = this.setting.SpeedTable.maxSpeed;
            converted.min_speed = this.setting.SpeedTable.minSpeed;
            converted.crank = [];

            Object.keys(this.setting.SpeedTable.Cranks).forEach(chainring => {
                let crank = {}

                crank.chainring = chainring;
                crank.sprocket = [];

                Object.keys(this.setting.SpeedTable.Cranks[chainring]).forEach(sprocket => {
                    crank.sprocket.push({
                        cog: sprocket,
                        max_speed: this.setting.SpeedTable.Cranks[chainring][sprocket].maxSpeed,
                        min_speed: this.setting.SpeedTable.Cranks[chainring][sprocket].minSpeed,
                    })
                });

                converted.crank.push(crank);
            });
            
            return converted;
        },
        chartHeight(){
            return this.setting.crank.length * this.bar_height
        }
    },
    mounted(){
        console.log(this.barStyle.height);
        this.canvas = new SpeedChart({
            canvas : this.$refs['this-canvas'],
            height : this.chartHeight,
        });
        this.drawChart();
    },
    watch: {
        setting: {
            handler:function(){
                this.canvas.Height = this.chartHeight;
                this.drawChart();
            },
            deep: true,
        },
        max_speed : function(){
            this.drawChart();
        },
        min_speed : function(){
            this.drawChart();
        }
    }
}
</script>

<style scoped>
.canvas-wrapper{
    width: 100%;
}

.this-canvas{
    width: 100%;
    background-color: white;
}


</style>