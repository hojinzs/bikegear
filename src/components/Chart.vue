<template>
    <div id="Chart">
        <div
            v-for="(gear,index) in Gears"
            :key="index">
            <b> #{{ index + 1}} :: {{gear.name }}</b>
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

<style lang="stylus" scoped>

</style>