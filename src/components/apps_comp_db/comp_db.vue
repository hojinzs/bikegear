<template>
    <div>
        <h2>Component Database</h2>
        <hr>
        <div id="CompDB">

            <div class="flex-wrapper">

                <!-- Mobile Selector -->
                <div v-if="isMobile" id="CompSelect_Mobile" class="lumi-flex-slier-wrapper">
                    <b>Component</b>

                    <ul class="lumi-flex-slider">
                        <!-- Before Loading -->
                        <li class="lumi-flex-slider-item"
                            v-if="component_list.length == 0">
                            <div class="lumi-box">
                                Loading...
                            </div>
                        </li>
                        <!-- Before Loading End -->

                        <li class="lumi-flex-slider-item"
                            v-for="(component,index) in component_list" 
                            :key="index">
                            <button class="lumi-button"
                                :class="{'selected': (component == item_selected.name)}"
                                @click="comp_select(component)">
                                {{component}}
                            </button>
                        </li>

                        <li class="lumi-flex-slider-item">
                            <button class="lumi-button">
                                TEST DUMMY
                            </button>
                        </li>

                        <li class="lumi-flex-slider-item">
                            <button class="lumi-button">
                                TEST DUMMY
                            </button>
                        </li>

                        <li class="lumi-flex-slider-item">
                            <button class="lumi-button">
                                TEST DUMMY
                            </button>
                        </li>

                    </ul>
                </div>

                <!-- PC Selector -->
                <div v-if="!isMobile" id="CompSelect_PC" class="flex-sidemenu">
                    <div class="lumi-box">
                        <b>Component</b>
                        
                        <ul class="lumi-list-select-group">

                            <!-- Before Loading -->
                            <div v-if="component_list.length == 0">
                                Loading...
                            </div>
                            <!-- Before Loading End -->

                            <li class="lumi-list-select-item"
                                v-for="(component,index) in component_list" 
                                :key="index"
                                :class="{'selected': (component == item_selected.name)}"
                                @click="comp_select(component)">
                                {{component}}
                            </li>
                        </ul>
                    </div>
                </div>

                <div id="CompList" class="flex-contents">
                    <h3>{{item_selected.name}}</h3>
                    <ul>
                        <li class="items"
                            v-for="(item,index) in item_selected.items"
                            :key="index">
                            <div class="lumi-box lumi-box-block-white lumi-box-shadow">
                                <div class="name">{{item.name}}</div>
                                <ul>
                                    <li v-for="prop in Object.keys(item)" :key="prop">
                                        <span v-if="prop != 'name'"><b>{{prop}} :</b> {{item[prop]}}</span>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
import axios from 'axios'
import { vueWindowSizeMixin } from 'vue-window-size';
import StyleVariable from '../../assets/variable.styl'

export default {
    mixins: [vueWindowSizeMixin],
    data(){
        return {
            StyleVariable,
            datas: {},
            component_list: [],
            item_selected: {
                name: '',
                items: []
            },
        }
    },
    computed:{
        isMobile() {return this.windowWidth < Number(this.StyleVariable.containerWidth.replace("px",""))}
    },
    methods:{
        comp_select(_key){
            this.item_selected.name = _key
            this.item_selected.items = this.datas[_key];
        },
    },
    created(){

        // Get Component Database JSON
        let _this = this
        axios({
            method: 'GET',
            url: process.env.VUE_APP_COMPDB_ALL_URL,
            headers: { 'secret-key': atob(process.env.VUE_APP_COMPDB_API_KEY) }
        })
            .then(function(res){
                console.log('RESPONSE =>',res.data)

                // update sprocket preset
                _this.datas = res.data;
                _this.component_list = Object.keys(res.data);
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
@import "../../assets/variable.styl"
@import "../../assets/lumigrid.styl"

#CompDB
    text-align left

#CompSelect_PC
    text-align center

#CompList
    .items
        margin-top 1.2em
        .name
            font-weight 800
            padding 0px 0px 10px 0px


@media (min-width: $container_width)
    .flex-wrapper
        display flex
        .flex-sidemenu
            flex 0
            flex-basis 250px
        .flex-contents
            margin-left 1.2em
            flex-grow 1
            flex-basis auto

</style>