<template>
    <div class="protocol-wrap clearfloat">
        <div :class="['protocol-status', status ? 'checked' : 'unchecked']" @click="changeStatus"></div>
            <div class="protocol-lists">我已确定以上信息无误，并已阅读同意
            <template v-for="(v, sIndex) in sources">
                <span :key="v.id" @click="showContent(v)">
                    《{{v.agreement_name}}》
                    <em v-if="sIndex === (sources.length - 2)">和</em>
                    <em v-else-if="sIndex !== (sources.length - 1)">、</em>
                </span>
            </template>
        </div>
        <Popup class="protocol-popup" v-model="popupInfo.status">
            <div class="popup-header">{{popupInfo.title}}<i class="icon iconfont popup-close" @click="closePopup">&#xe606;</i></div>
            <div class="popup-content" v-html="popupInfo.content"></div>
        </Popup>
    </div>
</template>

<script>
import { Popup } from 'vux';

export default {
    props: {
        sources: {
            type: Array,
            default: []
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            popupInfo: {
                title: '',
                content: '',
                status: false
            }
        }
    },
    methods: {
        changeStatus() {
            this.$emit('changeStatus', !this.status);
        },
        showContent(item) {
            this.popupInfo.status = true;
            this.popupInfo.title = item.agreement_name;
            this.popupInfo.content = item.content;
        },
        closePopup() {
            this.popupInfo.status = false;
        }
    },
    components: {
        Popup
    }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
