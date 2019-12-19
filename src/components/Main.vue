<template>
    <div id="main">
        <h1>Bike Gear Ratio Calculator</h1>
        <hr>
        <div id="chart" class="boxing">
            <RatioChart
                :Gears="GearSettings">
            </RatioChart>
        </div>

        <h2>DATA INPUT</h2>
        <hr>
        <div>
            <SetBike
                :wheelset="wheelset"
                :cadence="cadence">
            </SetBike>
        </div>

        <div>
            <button
                :disabled="!settingAddStatus"
                v-on:click="newGearSetting()">
                New Setting
            </button>
            <br>
            {{5 - GearSettings.length}} settings remain
        </div>

        <div class="gear_settings">
            <div class="set_gear boxing"
            v-for="(Setting, index) in GearSettings"
            :key='index'>
                <SetGear
                    :setting_number="index"
                    :settings.sync="Setting"
                    :preset="Preset"
                    :settingDelStatus="settingdelStatus"
                    @remove="delGearSetting(index)">
                </SetGear>
            </div>
        </div>
    </div>
</template>

<script>

// import Components
import Gear from './Gear'
import Chart from './Chart'
import Bike from './Bike'

// import Classes
import Calc from '../calc'
import axios from 'axios'

class GearSetting extends Calc {
    constructor(_props = {
        color: String,
        name: String,
    }){
        super(_props);
        this.name = _props.name;
        this.color = _props.color;
    }
}

export default {
    components: {
        'SetGear' : Gear,
        'RatioChart' : Chart,
        'SetBike' : Bike,
    },
    computed: {
        settingAddStatus(){ return this.GearSettings.length < 5}, // 5개 이상 세팅 추가 불가
        settingdelStatus(){ return this.GearSettings.length > 1}, // 1개 이하 세팅 삭제 불가
    },
    methods: {
        newGearSetting(){
            // 리미트 확인
            if(this.settingAddStatus){

                // 향후 deep copy 추가(lodash)
                let newSetting = new GearSetting({
                    color: "red",
                    name: "newSetting",
                    crank: [50,34],
                    sprocket: [11,12,13,14,15,17,19,21,24,27,30],
                    wheelset: this.wheelset,
                    cadence: this.cadence,
                });

                this.GearSettings.push(newSetting);   
            }
        },
        delGearSetting(index){
            this.GearSettings.splice(index,1);
        },
    },
    data: function(){
        return {
            calc : new Calc,
            GearSettings : [],
            wheelset : {
                wheel : 622,
                tire : 30,
            },
            cadence : {
                min: 80,
                max: 90,
            },
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
        axios({
            method: 'GET',
            url: 'https://api.jsonbin.io/b/5dfb11a40bbce135bb5439e6/1',
            headers: { 'secret-key': '$2b$10$f43n1zdglWI0iahcScqZpum658LKAA.sptdNd3DHABAoPFf.tY5ey' }
        })
            .then(function(res){
                console.log('RESPONSE =>', res.data);
            })
            .catch(function(error){
                console.log('ERROR => ',error);
            })

        this.newGearSetting();
    },
}
</script>

<style scoped>
html body {
    width: 100%;
}

#main {
    width: 100%;
}

#id{
    width: 100%;
}

.inputs{
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.inputs .input-boxs{
    flex: none;
    margin-left: 20px;
    margin-right: 20px;
}

.gear_settings{
    width: 100%;
    display: flex;
    justify-content: center;
    overflow-x: scroll
}

.gear_settings .set_gear{
    flex: none;
    max-width: 180px;
    overflow: hidden;
    margin: 10px;

}

.boxing{
    border: 1px black solid;
    border-radius: 5px;
}
</style>