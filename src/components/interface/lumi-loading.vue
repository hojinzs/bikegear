<template>
    <span>
        <font-awesome-icon ref="icon"
                           class="icon lumi-loader"
                           :class="{ 'loading': loading === true }"
                           icon="sync-alt"
        ></font-awesome-icon>
    </span>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    export default {
        name: "lumi-loading",
        components: {
            'font-awesome-icon': FontAwesomeIcon,
        },
        props: {
            loading: {
                type: Boolean,
                require: true,
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .loading
        animation rotate_image 1s linear infinite

    @keyframes rotate_image {
        100% {
            transform rotate(360deg)
        }
    }
</style>