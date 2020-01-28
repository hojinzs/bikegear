<template>
    <div id="main">
        <div id="chart" class="boxing lumi-box lumi-box-border">
            <RatioChart
                :Gears="GearSettings">
            </RatioChart>
        </div>

        <h2>DATA INPUT</h2>
        <div class="lumi-box lumi-box-border section">
            <SetBike
                :wheelset="wheelset"
                :cadence="cadence">
            </SetBike>
        </div>

        <div class="section">
            <button class="lumi-button lumi-button-black"
                :disabled="!settingAddStatus"
                v-on:click="newGearSetting()">
                New Setting
            </button>
            <br>
            {{colors.length - GearSettings.length}} settings remain

            <!-- <div>
                ~~color test~~
                <span 
                    v-for="(color,index) in colorUnused"
                    v-bind:key="index"
                    :style="{
                        color: color.code
                    }">
                    <b> [{{color.name}}] </b>
                </span>
            </div> -->

        </div>

        <div class="gear_settings section">
            <div class="set_gear boxing lumi-box lumi-box-border"
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
// import FlexBox from '../../components/interface/flex-card-list'

// import Classes
import Calc from '../../plugins/calc'
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
        // FlexBox,
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
                min: 85,
                max: 90,
            },
            Preset: {
                cranks: [
                    {
                        name: 'mid-compact chainring',
                        chainring: [50,34],
                    }
                ],
                sprockets: [
                    {
                        name: 'CR-R8000 Ultegra (11-30T)',
                        cog: [11,12,13,14,15,17,19,21,24,27,30],
                    }
                ],
            },
            colors: [
                {
                    index: 0,
                    name: 'Splint Green',
                    code: '#00E679',
                    used: false,
                },
                {
                    index: 1,
                    name: 'Leader Yellow',
                    code: '#ffcc66',
                    used: false,
                },
                {
                    index: 2,
                    name: 'Giro Pink',
                    code: '#ff6699',
                    used: false,
                },
                {
                    index: 3,
                    name: 'Enduro Purple',
                    code: '#9966ff',
                    used: false,
                },
                {
                    index: 4,
                    name: 'Wolf Blue',
                    code: '#0066ff',
                    used: false,
                },
            ],
        }
    },
    computed: {
        settingAddStatus(){ return this.GearSettings.length < this.colors.length}, // 5개 이상 세팅 추가 불가
        settingdelStatus(){ return this.GearSettings.length > 1}, // 1개 이하 세팅 삭제 불가
        colorUnused(){
            return this.colors.filter(x => x.used == false);
        },
    },
    methods: {
        /**
         * 컬러 지정
         */
        asignColor(){
            let index = this.colorUnused[0].index
            this.colors[index].used = true;

            return this.colors[index].code;
        },
        /**
         * 새 세팅 추가
         */
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

                newSetting.color = this.asignColor();

                this.GearSettings.push(newSetting);   
            }
        },
        delGearSetting(index){

            // delete color
            let color_code = this.GearSettings[index].color;
            let color_filtered = this.colors.filter(x=>x.code == color_code);
            this.colors[color_filtered[0].index].used = false;

            // gear setting delete
            this.GearSettings.splice(index,1);
        },
    },
    mounted(){
        let preset = this.Preset;

        // sprocket preset update
        axios({
            method: 'GET',
            url: process.env.VUE_APP_COMPDB_SPROCKET_URL,
            headers: { 'secret-key': atob(process.env.VUE_APP_COMPDB_API_KEY) }
        })
            .then(function(res){
                console.log('RESPONSE =>',res.data)
                // update sprocket preset
                preset.sprockets = res.data.sprockets;
            })
            .catch(function(error){
                console.log('ERROR => ',error,'preset data');
            })
        
        // crank preset update
        axios({
            method: 'GET',
            url: process.env.VUE_APP_COMPDB_CRANK_URL,
            headers: { 'secret-key': atob(process.env.VUE_APP_COMPDB_API_KEY) }
        })
            .then(function(res){
                console.log('RESPONSE =>',res.data)
                // update sprocket preset
                preset.cranks = res.data.cranks;
            })
            .catch(function(error){
                console.log('ERROR => ',error,'preset data');
            })

        this.newGearSetting();
    },
}
</script>

<style lang="stylus" scoped>

@import '../../assets/variable.styl'
@import '../../assets/luminus.styl'

.gear_settings
    width: 100%
    display: flex
    overflow-x: auto
    .set_gear
        flex: 0 0 320px
        overflow: none;
        margin: 0 0 1em 1em
        &:first-child
            margin-left 0px
        $:last-child
            margin-right  0px

.section
    margin-top 1em

@media (max-width: $container_width)
    .gear_settings
        .set_gear
            flex 0 0 70%

</style>