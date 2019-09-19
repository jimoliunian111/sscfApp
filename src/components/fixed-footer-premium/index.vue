<template>
    <div class="fixed-footer">
        <template v-if="status === statusEnum.unpaid">
            <div class="premium-txt">保费：<span>{{premium}}元</span></div>
            <a class="pay-button" href="javascript:void(0);" @click="goPay">立即支付</a>
        </template>
        <template v-else-if="status === statusEnum.paid && policyFileUrl.length > 0">
            <a class="send-policy" :href="policyFileUrl" target="_blank">打开电子保单</a>
        </template>
    </div>
</template>

<script>
import { orderStatusEnum } from '@/config/map-data.js';

export default {
    props: {
        premium: {
            type: String
        },
        status: {
            type: Number
        },
        policyFileUrl: {
            type: String
        }
    },
    data() {
        return {
            statusEnum: orderStatusEnum
        }
    },
    methods: {
        goPay() {
            this.$emit('toPay');
        }
    }
}

</script>

<style lang="scss">
@import "./index.scss";
</style>
