<template>
    <div class="input-list">

        <div class="input-list">

            <div class="input-group"
            v-for="(item, index) in list"
            v-bind:key="index">

                <input class="input-item"
                v-if="type == 'number'"
                v-model.lazy.number="list[index]"
                :name="'item_'+index"
                :placeholder="placeholder">
                <input 
                v-else
                v-model.lazy="list[index]"
                :name="'item_'+index"
                :placeholder="placeholder">

                <button
                :disabled="!DelStatus" 
                v-on:click="itemDelete(index)"> - </button>

            </div>
        </div>

        <div class="button-group">

            <button
            :disabled="!AddStatus"
            v-on:click="itemInsert()"> + </button>

            <button
            v-on:click="sorting(list)"> sort </button>

        </div>

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
        sort : {
            type : String,
            defalt : 'desc'
        },
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
        sorting(_data,_sort = this.sort){ 

            // _data를 복제한 새로운 배열을 만듬
            let mapped = _data.filter(x => x);

            switch (_sort) {
                case 'desc':
                    mapped.sort((a,b) => a - b);
                    break;

                case 'asc':
                    mapped.sort((a,b) => b - a);
                    break;

                default:
                    mapped.sort();
                    break;
            }

            // _data 배열 초기화
            _data.splice(0,_data.length);

            // _data 배열에 데이터를 다시 집어넣음
            mapped.forEach(element => {
                _data.push(element);
            });
        },
    },
}
</script>

<style lang="stylus" scoped>

.input-list
    .input-group
        width 100%
        display flex
        padding-top 0.5em
        padding-bottom 0.5em
        // &:first-child
        //     padding-top 0px
        // $:last-child
        //     padding-bottom 0px

        input
            width 100%
            left 0
            text-align center
            margin-right 0.5em

        button
            flex 1
            right  0

</style>