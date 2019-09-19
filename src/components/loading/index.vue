<template>
    <div class="loading-wrapper"><Spinner :type="loadingType"></Spinner></div>
</template>


<script>
import { Spinner } from 'vux';

export default {
    props: {
        loadingType: {
            type: String,
            default: 'lines'
        }
    },
    components: {
        Spinner
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>