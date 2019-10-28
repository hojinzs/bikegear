<template>
    <div id="main">
        <h1>Bike Gear Ratio Calculator</h1>
        <hr>
        <div id="input">
            <h2>CHART</h2>
            <div>
                <RatioChart
                    :Gears="GearSettings">
                </RatioChart>
            </div>

            <h2>DATA INPUT</h2>
            <div id="wheel_type">
                <h3>Set Wheel Type</h3>
                <div>
                    <input
                        name="wheel"
                        placeholder="wheel size"
                        v-model.number="wheel">
                    <input
                        name="tire"
                        placeholder="tire size"
                        v-model.number="tire">
                </div>
                <div>
                    {{ calc.calRound(this.wheel,this.tire).toFixed(2) }}
                </div>
            </div>

            <button v-on:click="newGearSetting()">New Setting</button>
            <div class="gear_settings">
                <div class="set_gear"
                v-for="(Setting, index) in GearSettings"
                :key='index'>
                    <SetGear
                        :setting_number="index"
                        :settings="Setting"
                        :preset="Preset"
                        @remove="delGearSetting(index)"
                        >
                    </SetGear>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

// import Components
import Gear from './Gear'
import Chart from './Chart'

// import Classes
import Calc from '../calc'

class GearSetting extends Calc {
    constructor(newColor,newName){
        super(newName,newColor);
        this.name = newName;
        this.color = newColor;
    }
}

export default {
    components: {
        'SetGear' : Gear,
        'RatioChart' : Chart
    },
    methods: {
        newGearSetting(){
            this.GearSettings.push(this.initSetting());
        },
        delGearSetting(index){
            this.GearSettings.splice(index,1);
        },
        initSetting : function(){
            let newSetting = new GearSetting();
            newSetting.color = "red";
            newSetting.name = "newSetting";
            newSetting.crank = [50,34];
            newSetting.sprocket = [11,12,13,14,15,17,19,21,24,27,30];

            return newSetting;
        },
    },
    data: function(){
        return {
            calc : new Calc,
            GearSettings : [],
            wheel : 0,
            tire : 0,
            Preset: {
                crank: [
                    {
                        name: 'mid-compact chainring',
                        chainring: [50,34],
                    }
                ],
                sprocket: [
                    {
                        name: 'CR-R8000 Ultegra (11-30T)',
                        cog: [11,12,13,14,15,17,19,21,24,27,30],
                    }
                ]
            },
        }
    },
    mounted: function(){
        this.newGearSetting();
    }
}
</script>

<style scoped>
#id{
    width: 100%;
}

.gear_settings{
    width: 100%;
    display: flex;
    overflow-x: scroll
}

.gear_settings .set_gear{
    flex: none;
    max-width: 180px;
    overflow: hidden;
    border: 1px black solid;
    margin: 10px;

}

</style>