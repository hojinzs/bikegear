<template>
    <div class="inputs boxing">
        <div id="wheel_type" class="input-boxs">
            <h3>Set Wheel Type</h3>
            <div>
                <input
                    name="wheel"
                    placeholder="wheel size"
                    v-model.lazy.number="wheelset.wheel">
                <input
                    name="tire"
                    placeholder="tire size"
                    v-model.lazy.number="wheelset.tire">
            </div>
            <div>
                {{ calc.calRound(this.wheelset.wheel,this.wheelset.tire).toFixed(2) }}
            </div>
        </div>
        <div id="cadence">
            <h3>Cadence</h3>
            <div>
                <input
                    name="min_cadence"
                    placeholder="minimum_cadence"
                    v-model.lazy.number="cadence.min">
                <input
                    name="max_cadence"
                    placeholder="maximum_cadence"
                    v-model.lazy.number="cadence.max">
            </div>
        </div>
    </div>
</template>

<script>
import Calc from '../../plugins/calc'

export default {
    props: [
        'wheelset',
        'cadence'
    ],
    data: function(){
        return {
            calc: new Calc,
        }
    },
}
</script>
<style lang="stylus" scoped>

@import "../../assets/luminus.styl"

</style>