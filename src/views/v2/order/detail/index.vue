<template>
    <div class="order-wrapper" v-if="!loading">
        <div class="status">
            <div class="name">{{ orderInfo.name }}</div>
            <div class="price">
                <span>￥{{ orderInfo.price }}</span>
                <span class="status-txt">{{ orderInfo.statusTxt }}</span>
            </div>
        </div>
        <yield-group
            switchable
            :switchActive="switchActive"
            :switchNames="switchNames"
            :switchActiveIndex="switchActiveIndex"
            :sources="orderInfo.info.basicInfo"
            @switchChange="switchChange"
            v-if="Object.keys(orderInfo.info.basicInfo).length > 0"
        ></yield-group>
        <yield-group :sources="orderInfo.info.plan" 
                     switchable
                     :switchActive="switchActive"
                     :switchNames="switchNames"
                     :switchActiveIndex="switchActiveIndex"
                     @switchChange="switchChange"
                     v-if="Object.keys(orderInfo.info.plan).length > 0"></yield-group>
        <yield-group
            :sources="orderInfo.info.applicant"
            v-if="Object.keys(orderInfo.info.applicant).length > 0"
        ></yield-group>
        <yield-group
            :sources="orderInfo.info.insured"
            v-if="Object.keys(orderInfo.info.insured).length > 0"
        ></yield-group>
        <yield-group :sources="orderInfo.info.beneficiary"></yield-group>
        <template v-for="item in orderInfo.info.beneficiaries">
            <yield-group :sources="item" :key="item.title"></yield-group>
        </template>
        <yield-group
            :sources="orderInfo.info.renewal"
            v-if="Object.keys(orderInfo.info.renewal).length > 0"
        ></yield-group>
        <protocol
            :sources="protocolLists"
            :status="protocolStatus"
            @changeStatus="changeStatus"
            v-if="orderInfo.status !== orderStatusEnum.paid"
        ></protocol>
        <footer-premium
            :premium="orderInfo.price"
            :status="orderInfo.status"
            :policyFileUrl="policyFileUrl"
            v-if="(orderInfo.status === orderStatusEnum.unpaid) || (orderInfo.status === orderStatusEnum.paid && policyFileUrl.length > 0)"
            @toPay="goToPay"
        ></footer-premium>
    </div>
    <loading v-else></loading>
</template>

<script>
import orderDetail from "./index.es6";
export default orderDetail;
</script>

<style lang="scss">
@import "./index.scss";
</style>
