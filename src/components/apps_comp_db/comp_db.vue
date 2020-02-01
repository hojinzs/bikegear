<template>
    <div>
        <h2>Component Database</h2>
        <hr>
        <div class="lumi-box">asdf
            <div>
                <input class="lumi-input-liner lumi-liner-white">
            </div>
        </div>
        <button class="lumi-button">asdf</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            sprockets: [],
            cranks: [],
        }
    },
    created(){
        let _this = this

        // sprocket preset update
        axios({
            method: 'GET',
            url: process.env.VUE_APP_COMPDB_SPROCKET_URL,
            headers: { 'secret-key': atob(process.env.VUE_APP_COMPDB_API_KEY) }
        })
            .then(function(res){
                console.log('RESPONSE =>',res.data)
                // update sprocket preset
                _this.sprockets = res.data.sprockets;
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
                _this.cranks = res.data.cranks;
            })
            .catch(function(error){
                console.log('ERROR => ',error,'preset data');
            })
    },
    mounted(){

    }
}
</script>

<style lang="stylus" scoped>

</style>