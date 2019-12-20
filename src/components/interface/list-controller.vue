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
            min : this.minimum || 0,
            max : this.maximim || 100,
        }
    },
    computed: {
        DelStatus(){ return this.list.length > this.min }, // 체인링 1개 이하라면 삭제 불가
        AddStatus(){ return this.list.length < this.max }, // 체인링 5개 이상 추가 불가
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