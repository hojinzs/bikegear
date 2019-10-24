<template>
    <div id="gears">
        <h3><b>#{{setting_number + 1}}</b> {{settings.name}}</h3>
        <hr>
        <div id="crank">
            <h3>1. Crank</h3>
            <div
            v-for="(chainring, index) in crank"
            v-bind:key="index">
                <input v-model.number="crank[index]" name="chainring" placeholder="chainring"><button v-on:click="delChainring(index)"> - </button>
            </div>
            <button v-on:click="addChainring()"> + </button>
        </div>
        <div id="sprocket">
            <h3>2. sprocket</h3>
            <div
            v-for="(cog, index) in sprocket"
            v-bind:key="index">
                <input v-model.number="sprocket[index]" name="cog" placeholder="cog"><button v-on:click="delCog(index)"> - </button>
            </div>
            <button v-on:click="addCog()"> + </button>
        </div>
        <div id="gear ratio">
            <h3>2. Gear Ratio</h3>
            <table>
                <tr>
                    <td>
                        <th>
                        Crank / Sprocket
                        </th>
                    </td>
                    <td v-for="(chainring, index) in crank"
                        v-bind:key="index">
                        <th> {{ chainring }}t </th>
                    </td>
                </tr>
                <tr 
                v-for="(cog, index) in sprocket"
                v-bind:key="index">
                    <td>
                        <th>{{ cog }}t </th>
                    </td>
                    <td v-for="(chainring, index) in crank"
                        v-bind:key="index">
                        {{ calRatio(chainring,cog) }}
                    </td>
                </tr>
            </table>
        </div>
        <button @click="remove">Remove</button>
    </div>
</template>
<script>
export default {
    props: [
        'setting_number',
        'settings',
        'crank_preset',
        'sprocket_preset',
    ],
    methods: {
        calRatio(chainring, cog){
            let ratio = chainring / cog
            return ratio.toFixed(2);
        },
        addChainring(_teeth = null){
            this.crank.push(_teeth);
        },
        delChainring(_index){
            this.crank.splice(_index,1);
        },
        setChainring(_array = Array){
            // 향후 validation 규칙 넣을 것
            this.crank = _array;
        },
        addCog(_teeth = null){
            this.sprocket.push(_teeth);
        },
        delCog(_index){
            this.sprocket.splice(_index,1);
        },
        setCog(_array = Array){
            // 나중에 validation 규칙 넣을 것
            this.crank = _array;

        },
        remove(){
            this.$emit('remove');
        }
    },
    data: function(){
        return {
            // crank: [50,34],
            // sprocket: [11,12,13,14,15,17,19,21,24,27,30],
            crank: this.settings.crank,
            sprocket: this.settings.sprocket,
            presets: {
                crank: this.settings.crank_preset,
                sprocket: this.settings.sprocket_preset,
            },
        }
    },
    watch: {
        crank: function(){
            this.$emit('setCrank',this.crank);
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>