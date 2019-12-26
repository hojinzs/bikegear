<template>
    <div>
        <div
        v-for="(item, index) in list"
        v-bind:key="index">

            <input 
                v-if="type == 'number'"
                v-model.lazy.number="list[index]"
                :name="'item_'+index"
                :placeholder="placeholder">
            <input 
                v-if="type != 'number'"
                v-model.lazy="list[index]"
                :name="'item_'+index"
                :placeholder="placeholder">
            <button
                :disabled="!DelStatus" 
                v-on:click="itemDelete(index)"> - </button>
        </div>

        <button
            :disabled="!AddStatus"
            v-on:click="itemInsert()"> + </button>

        <button
            v-on:click="sorting()"> sort </button>
    </div>
</template>

<script>
export default {
    model: {
        prop: 'list',
        event: 'change',
    },
    props: {
        list : Array,
        minimum : Number,
        maximim : Number,
        placeholder : String,
        type : String,
    },
    data(){
        return {
            min : this.minimum || 1,
            max : this.maximim || 100,
        }
    },
    computed: {
        DelStatus(){ return this.list.length > this.min },
        AddStatus(){ return this.list.length < this.max },
    },
    methods:{
        itemDelete(_index){ if(this.DelStatus) this.list.splice(_index,1) },
        itemInsert(_item = null){ if(this.AddStatus) this.list.push(_item) },
        sorting(){ this.list.sort() },
    },
    mounted(){

    },
    watch:{

    }
}
</script>

<style scoped>

</style>