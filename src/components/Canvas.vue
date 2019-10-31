<template>
    <div>
        <canvas></canvas>
    </div>
</template>

<script>
export default {
    props: [
        'chartName',
        'dementions',
        'maxValue',
        'minValue',
    ],
    methods:{
        drawChart(_id){
            let canvas = new this.SpeedChart({
                id : _id,
                height : 80,
            })

            canvas.setAxisX(this.maxValue,this.minValue);

            this.Gears.forEach(gear => {

                let SpeedTable = gear.SpeedTable;
                console.log('Get SpeedTable!!>>', SpeedTable);

                for (let i = 0; i < SpeedTable.Crank; i++) {
                    console.log(this.SpeedTable[i]);
                }
            });

            canvas.drawBar(12.23,20.12,"#FF0000",'11T')
            canvas.drawBar(25.23,32.12,"#FF0000",'13T')
            canvas.drawBar(36.23,50.12,"#FF0000",'15T')
            canvas.drawBar(70.23,90.12,"#FF0000",'30T')
        }
    }
}
</script>

<style scoped>

</style>