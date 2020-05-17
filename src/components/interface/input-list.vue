<template>
    <div>

        <div class="input-list">

            <div class="input-group"
                 v-for="(item, index) in list"
                 v-bind:key="index"
            >

                <input class="lumi-input-liner input-item"
                       v-if="type == 'number'"
                       v-model.lazy.number="list[index]"
                       :name="'item_'+index"
                       :placeholder="placeholder"
                />

                <input class="lumi-input-liner"
                       v-else
                       v-model.lazy="list[index]"
                       :name="'item_'+index"
                       :placeholder="placeholder"
                />

                <button class="btn-remove lumi-button lumi-button-black"
                    :disabled="!DelStatus" 
                    v-on:click="itemDelete(index)"
                > - </button>

            </div>
        </div>

        <div class="button-group">

            <button class="lumi-button lumi-button-black"
                :disabled="!AddStatus"
                v-on:click="itemInsert()"> + </button>

            <button class="lumi-button lumi-button-black"
                v-on:click="sorting(list)"> sort </button>

        </div>

    </div>
</template>

<script>
export default {
    name: 'input-list',
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
        DelStatus(){
            return this.list.length > this.min
        },
        AddStatus(){
            return this.list.length < this.max
        },
    },
    methods:{
        /**
         * 배열에서 아이템 삭제
         * @param index 삭제할 아이템 배열 번호
         */
        itemDelete(index){
            if(this.DelStatus) {
                this.list.splice(index,1)
            }
        },
        /**
         * 배열에 아이템 추가
         * @param item 추가할 아이템
         */
        itemInsert(item){
            if(this.AddStatus) {
                this.list.push(item)
            }
        },
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
        padding-top 0.5em
        .input-group
            width 100%
            display flex
            padding-top 0.5em
            padding-bottom 0.5em
            input
                flex 1 1 auto
                text-align center
                margin-right 0.5em
                margin-top auto
            button
                flex-basis 10px
                text-align center
                margin-top auto
                padding-left 0
                padding-right 0

    .button-group
        display flex
        button
            flex 1
            margin 0.5em
            &:first-child
                margin-left 0
            &:last-child
                margin-right 0

    .btn-remove
        min-width 2rem

</style>