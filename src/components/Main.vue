<template>
    <div id="main">
        <h1>Bike Gear Ratio Calculator</h1>
        <hr>
        <div id="input">
            <h2>CHART</h2>
            <div>
                chart here!!
            </div>
            <h2>DATA INPUT</h2>
            <div id="wheel_type">
                <h3>Set Wheel Type</h3>
                <input name="wheel" placeholder="wheel size">
                <input name="tire" placeholder="tire size">
            </div>

            <button v-on:click="newGearSetting()">New Setting</button>
            <div 
            v-for="(Setting, index) in GearSettings"
            :key='index'>
                <SetGear
                    :setting_number="index"
                    :settings="Setting"
                    :crank_preset="preset.crank"
                    :sprocket_preset="preset.sprocket"
                    @setName="Setting.setName"
                    @setColor="Setting.setColor"
                    @setCrank="Setting.setCrank"
                    @setSprocket="Setting.setSprocket"
                    @remove="delGearSetting(index)"
                    >
                </SetGear>
            </div>
        </div>
    </div>
</template>

<script>

// import Components
import Gear from './Gear'

export default {
    components: {
        'SetGear' : Gear
    },
    methods: {
        newGearSetting(){
            this.GearSettings.push(new this.initSetting);
        },
        delGearSetting(index){
            this.GearSettings.splice(index,1);
        }
    },
    data: function(){
        return {
            initSetting : function(){
                return {
                    color: "red",
                    name: "newSetting",
                    crank: [50,34],
                    sprocket: [11,12,13,14,15,17,19,21,24,27,30],
                    setName(value){
                        console.log(value);
                    },
                    setColor(value){
                        console.log(value);
                    },
                    setCrank(value){
                        console.log(value);
                        self.crank = value;
                    },
                    setSprocket(value){
                        console.log(value);
                        self.sprocket = value;
                    },
                }
            },
            GearSettings : [],
            preset: {
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
        this.GearSettings.push(new this.initSetting);
    }
}
</script>

<style scoped>

</style>