<template>
    <div id="gears">
        <div class="header lumi-box-header"
            :style='{backgroundColor:settings.color}'>

            <h3><b>#{{setting_number + 1}}</b></h3>

            <div class="input-wrapper">
                <input class="lumi-input-liner lumi-liner-white"
                v-model.lazy="settings.name">
            </div>
        </div>
        
        <div>
            <button class="lumi-button lumi-button-black"
                :disabled="!settingDelStatus" 
                @click="remove">remove</button>
        </div>
        
        
        <div id="crank" class="wrapper">
            <h3>1. Crank</h3>

            <div class="lumi-select">
                <select name="crank_select" class="lumi-input-liner"
                    v-model="crank_select">
                    <option value="" disabled selected>crank select</option>
                    <option
                        v-for="(crank,index) in preset.cranks"
                        v-bind:key="index"
                        v-bind:value="crank.chainring">
                        {{crank.name}}
                    </option>
                </select>
            </div>

            <ListController class="input-list"
                v-model="crank"
                :type="'number'"
                :sort="'asc'"
                :maximim="3">
            </ListController>

        </div>
        <div id="sprocket" class="wrapper">
            <h3>2. sprocket</h3>

            <div class="lumi-select">
                <select name="sprocket_select" class="lumi-input-liner"
                    v-model="sprocket_select">
                    <option value="none"  disabled selected>select sprocket</option>
                    <option
                        v-for="(spr,index) in preset.sprockets"
                        :key="index"
                        :value="spr.cog">
                        {{spr.name}}
                    </option>
                </select>
            </div>

            <ListController
                v-model="sprocket"
                :type="'number'"
                :sort="'desc'"
                :maximim="15">
            </ListController>

        </div>

        <div id="GearRatio" class="wrapper">
            <h3>Gear Ratio</h3>
            <table class="lumi-table">
                <tr>
                    <th></th>
                    <th v-for="(chainring, index) in settings.crank"
                        v-bind:key="index">
                        {{ chainring }}t
                    </th>
                </tr>
                <tr 
                v-for="(cog, index) in settings.sprocket"
                v-bind:key="index">
                    <th>{{ cog }}t </th>
                    <td v-for="(chainring, index) in settings.crank"
                        v-bind:key="index">
                        {{ calc.calGearRatio(chainring,cog).toFixed(2) }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
// import library
import Calc from '../../plugins/calc'


// import components
import list_controller from '../../components/interface/input-list'

export default {
    components: {
        'ListController' : list_controller,
    },
    props: [
        'setting_number',
        'settings',
        'preset',
        'settingDelStatus',
    ],
    data(){
        return {
            calc: new Calc,
            crank: this.settings.crank.filter((i)=> {return i}),
            sprocket: this.settings.sprocket.filter((i)=> {return i}),
            crank_select : null,
            sprocket_select : null,
        }
    },
    methods: {
        setChainring(_array = Array){
            this.crank = this.reorderList(_array);
        },
        setCog(_array = Array){
            this.sprocket = this.reorderList(_array);                
        },
        /**
         * 배열을 재정렬한 새로운 배열을 반환
         */
        reorderList(_array){
            try {
                let newList = [];
                _array.forEach((element = Number) => {
                    newList.push(element);
                });
                return newList;
            } catch (error) {
                throw new Error(error);
            }
        },
        /**
         * 이 세팅을 파괴함 
         */
        remove(){
            this.$emit('remove');
        },
    },
    watch:{
        crank(newCrank){
            this.settings.crank = newCrank;
        },
        sprocket(newSprocket){
            this.settings.sprocket = newSprocket;
        },
        crank_select(_value){
            this.crank = _value.filter(x => x);
        },
        sprocket_select(_value){
            this.sprocket = _value.filter(x => x);
        }
    },
}
</script>

<style lang="stylus" scoped>

@import "../../assets/luminus.styl"

select
    width 100%

#gears
    text-align: center

    .header
        margin-bottom: 10px
        padding-top: 0.5em
        padding-bottom: 0.5em
        h3
            margin: 0px
        .input-wrapper
            width: 90%
            margin: auto
            input
                width: 100%
                text-align: center
                font-size: 100%

    .wrapper
        padding: 5%

table
    width 100%
    text-align center
</style>