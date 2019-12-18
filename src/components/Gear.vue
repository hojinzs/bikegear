<template>
    <div id="gears">
        <h3><b>#{{setting_number + 1}}</b></h3>
        <input
            v-model.lazy="settings.name">
        <div>
            <button
                :disabled="!settingDelStatus" 
                @click="remove">remove</button>
        </div>
        <hr>
        <div id="crank">
            <h3>1. Crank</h3>
            <div
            v-for="(chainring, index) in crank"
            v-bind:key="index">
                <input v-model.lazy.number="crank[index]" name="chainring" placeholder="chainring">
                <button
                    :disabled="!ChainringDelStatus" 
                    v-on:click="delChainring(index)"> - </button>
            </div>
            <button
                :disabled="!ChainringAddStatus"
                v-on:click="addChainring()"> + </button>
            <button v-on:click="sortList(crank)"> sort </button>
        </div>
        <div id="sprocket">
            <h3>2. sprocket</h3>
            <div
            v-for="(cog, index) in sprocket"
            v-bind:key="index">
                <input v-model.lazy.number="sprocket[index]" name="cog" placeholder="cog">
                <button
                    :disabled="!CogDelStatus" 
                    v-on:click="delCog(index)"> - </button>
            </div>
            <button
                :disabled="!CogAddStatus"
                v-on:click="addCog()"> + </button>
            <button v-on:click="sortList(sprocket)"> sort </button>
        </div>
        <hr>
        <div id="gear ratio">
            <h3>Gear Ratio</h3>
            <hr>
            <table>
                <tr>
                    <td>
                        <th>
                        Crank / Sprocket
                        </th>
                    </td>
                    <td v-for="(chainring, index) in settings.crank"
                        v-bind:key="index">
                        <th> {{ chainring }}t </th>
                    </td>
                </tr>
                <tr 
                v-for="(cog, index) in settings.sprocket"
                v-bind:key="index">
                    <td>
                        <th>{{ cog }}t </th>
                    </td>
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
import Calc from '../calc'

export default {
    props: [
        'setting_number',
        'settings',
        'preset',
        'settingDelStatus',
    ],
    computed: {
        ChainringDelStatus(){ return this.crank.length > 1 }, // 체인링 1개 이하라면 삭제 불가
        ChainringAddStatus(){ return this.crank.length < 5 }, // 체인링 5개 이상 추가 불가
        CogDelStatus(){ return this.sprocket.length > 1 }, // 코그 1개 이하 삭제 불가
        CogAddStatus(){ return this.sprocket.length < 15 }, // 코그 15개 이상 추가 불가
    },
    methods: {
        addChainring(_teeth = null){
            if(this.CogAddStatus){
                this.crank.push(_teeth);
            }
        },
        delChainring(_index){
            if(this.ChainringDelStatus){
                this.crank.splice(_index,1);
            }
        },
        setChainring(_array = Array){
            this.crank = this.reorderList(_array);
        },
        addCog(_teeth = null){
            if(this.CogAddStatus){
                this.sprocket.push(_teeth);
            }
        },
        delCog(_index){
            if(this.CogDelStatus){
                this.sprocket.splice(_index,1);
            }
        },
        setCog(_array = Array){
            this.sprocket = this.reorderList(_array);                
        },
        remove(){
            this.$emit('remove');
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
         * 배열을 재정렬만 함
         */
        sortList(_List){
            _List.sort();
        }
    },
    mounted(){
        this.setChainring(this.settings.crank.filter((i)=> {return i}));
        this.setCog(this.settings.sprocket.filter((i)=> {return i}));
    },
    data: function(){
        return {
            calc: new Calc,
            crank: Array,
            sprocket: Array,
            presets: {
                crank: this.preset.crank,
                sprocket: this.preset.sprocket,
            },
        }
    },
    watch:{
        crank: function(newCrank){ this.settings.crank = newCrank; },
        sprocket : function(newSprocket){ this.settings.sprocket = newSprocket; },
    }
}
</script>

<style lang="stylus" scoped>

</style>