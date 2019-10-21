<template>
    <div id="main">
        <h1>Bike Gear Ratio Calculator</h1>
        <hr>
        <div id="input">
            <h2>#1 DATA INPUT</h2>
            <div id="wheel_type">
                <h3>1. Wheel Type</h3>
                <input name="wheel" placeholder="wheel size">
                <input name="tire" placeholder="tire size">
            </div>
            <div id="Crank">
                <h3>2. Crank</h3>
                <div
                v-for="(chainring, index) in crank"
                v-bind:key="index">
                    <input v-model.number="crank[index]" name="chainring" placeholder="chainring">
                </div>
            </div>
            <div id="wheel_type">
                <h3>3. sprocket</h3>
                <div
                v-for="(cog, index) in sprocket"
                v-bind:key="index">
                    <input v-model.number="sprocket[index]" name="cog" placeholder="cog">
                </div>
            </div>
        </div>
        <div>
            <h2>#2 Calculation</h2>

            <h3>1. Gear Ratio</h3>

            <div id="gear ratio">
                <table>
                    <tr>
                        <td>
                            <th>
                            sprocket / Crank
                            </th>
                        </td>
                        <td v-for="(cog, index) in sprocket"
                            v-bind:key="index">
                            <th> {{ cog }}t </th>
                        </td>
                    </tr>
                    <tr v-for="(chainring, index) in crank"
                    v-bind:key="index">
                        <td>
                            <th>{{ chainring }}t </th>
                        </td>
                        <td v-for="(cog, index) in sprocket"
                            v-bind:key="index">
                            {{ calRatio(chainring,cog) }}
                        </td>
                    </tr>
                </table>
            </div>

            <h3>2. Speed</h3>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        calRatio(chainring, cog){
            var ratio = chainring / cog
            return ratio.toFixed(2);
        },
    },
    data: function(){
        return {
            crank: [50,34],
            sprocket: [11,12,13,14,15,17,19,21,24,27,30],
            crank_preset: [
                {
                    name: 'mid-compact chainring',
                    chainring: [50,34],
                },
            ],
            sporoket_preset: [
                {
                    name: 'CR-R8000 Ultegra (11-30T)',
                    cog: [11,12,13,14,15,17,19,21,24,27,30],
                }
            ]
        }
    },
}
</script>

<style scoped>

</style>