<!-- 컴포넌트화 작업 필요 -->
<template>
    <div class="infra-place lumi-box lumi-box-block-white lumi-box-border lumi-box-shadow"
        :class="{
            'infra-place-activate' : ( DisplayItems_toggled == 'item_'+index )
        }"
        :ref="'item_'+index"
        @click.stop="doItemToggle('item_'+index,place)">
                            
        <div class="infra-place-section-1">
            <div class="infra-place-thumbnail thumbnail-wrapper thumbnail-border-radius">
                <div class="thumbnail" v-bind:style="backgroundImage(place.Image)" />
            </div>
            <slot>
            <div class="infra-place-contents">
                <div class="infra-place-title infra-place-contents-blocks">
                    {{place.name}}
                </div>
                <div class="infra-place-description infra-place-contents-blocks">
                    {{place.type}}
                </div>
            </div>
            </slot>
        </div>

        <div class="infra-place-section-2"
            v-if="( DisplayItems_toggled == 'item_'+index )">
            <slot name="expention">
                <button class="lumi-button-liner"
                @click.stop="showDetail()">
                    정보 보기
                </button>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'place_card',
}
</script>

<style lang="stylus" scoped>
@import "../../assets/luminus.styl"
</style>