<template>
    <div :class="['toast-wrapper', mask ? 'mask' : '']" v-if="show">
        <span>{{ msg }}</span>
    </div>
</template>


<script>
export default {
    props: {
        msg: {
            type: String
        },
        show: {
            type: Boolean
        },
        mask: {
            type: Boolean,
            default: false
        }
    }
}

</script>

<style lang="scss">
@import './index.scss';
</style>

