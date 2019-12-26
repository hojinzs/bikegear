<template>
    <div>
        <div
        v-for="(item, index) in list"
        v-bind:key="index">
            <input v-model="list[index]" name="item" :placeholder="placeholder">
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
    mounted() {
        console.log(this.list);
    },
    watch:{
        list(newList){
            console.log(newList)
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>