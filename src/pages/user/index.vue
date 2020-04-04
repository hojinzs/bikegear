<template>
    <div class="container">
        <div class="container_wrapper">
            <!-- find user data -->
            <div v-if="userData">
                <menu-user-profile :logout="false" />
                <lumi-tab ref="tab" :tabs="tabs" @toggle="toggleTab" :default="tabSelected.index" />

                <!-- default page -->
                <information v-if="(tabSelected.value == 'information')"/>

                <!-- user sub pages -->
                <router-view v-else />
            </div>

            <!-- if user auth failed -->
            <div v-else>
                <div v-if="(dataLoaded == 'loading' || initialLoading == true)">
                    Loading User Data
                </div>
                <div v-else>
                    Cannot Find user Data {{ dataLoaded }}
                    <br/>
                    <br/>
                    <menu-user-profile :logout="false" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import lumiTab from '@/components/interface/lumi-tab'
import meneUserProfile from '@/components/menu-user-profile'

import information from './information'

export default {
    name: 'userInformation',
    components:
    {
        'menu-user-profile': meneUserProfile,
        'lumi-tab': lumiTab,
        'information' : information,
    },
    data(){
        let tabs = [
                {
                    index: 0,
                    label: '내 정보',
                    value: 'information',
                    route: { name:'User' }
                },
                {
                    index: 1,
                    label: '내 장소',
                    value: 'places',
                    route: { name:'UserPlaces' }
                },
                {
                    index: 2,
                    label: '태깅',
                    value: 'tags',
                    route: { name:'UserTags' }
                },
            ]
        let tabSelected = tabs[0];

        return {
            tabs: tabs,
            tabSelected: tabSelected,
            initialLoading: true,
        }
    },
    methods:
    {
        toggleTab(value){
            this.tabSelected = this.tabs.find( item => item.value == value )
        },
    },
    computed:
    {
        dataLoaded(){
            return this.$store.state.user.loading
        },
        userData(){
            return this.$store.state.user.user_data
        }
    },
    created()
    {
        // Page setting
        this.$store.commit('page/cover_style_change','cover');
        this.$store.commit('page/cover_title_change',"My Page");
        this.$store.commit('page/background_change','/images/bw-bike01.jpg');

        // set default tab
        this.tabSelected = this.tabs.find( tab => tab.route.name == this.$router.currentRoute.name )
    },
    mounted()
    {
        if(this.userData == null){
            setTimeout(() => {
                this.initialLoading = false
            }, 1000)
        }
    },
    watch:{
        tabSelected(tab){
            if(tab.route.name != this.$router.currentRoute.name){
                this.$router.push(tab.route)
            }
        },
    }
}
</script>