<template>
    <div class="yield-info font-medium">
      <div class="info-header">
        <div v-html="sources.icon"></div>
        <span>{{sources.title}}</span>
        <div v-if="switchable && switchNames.length" class="switch-box">
          <span class="info-switcher" 
                :class="{ cur: switchActive === 'main' }"
                @click="changeSwitcher('main')">主险</span>
          <span class="info-switcher"
                :class="{ cur: switchActive === item }" 
                v-for="(item, index) in switchNames"
                :key="index"
                @click="changeSwitcher(item, index)">
            {{ item }}
          </span>
        </div>
      </div>
      <div class="info-main">
        <div class="yield-item" v-for="(yieldItem, yieldKey) in switchData" :key="yieldKey" v-if="yieldItem.value !== '-'">
          <div class="yield-name">{{yieldItem.title}}</div>
          <div class="yield-main">
            <template v-if="yieldItem.type !== 'radio' && (yieldItem.title === '订单号' || yieldItem.title === '保单号')">
              <span :id="`copyItem${yieldKey}`">{{yieldItem.value}}</span>
            </template>
            <template v-if="yieldItem.type !== 'radio' && yieldItem.title !== '订单号' && yieldItem.title !== '保单号'">{{yieldItem.value}}</template>
            <div v-if="yieldItem.type === 'radio'">
              <div class="yield-radio">{{yieldItem.value}}</div>
            </div>
            <span v-if="yieldItem.title === '订单号' || yieldItem.title === '保单号'"
                  :class="`copy${yieldKey}`"
                  class="clip-button" 
                  :data-clipboard-target="`#copyItem${yieldKey}`"
                  @click="copySN(yieldKey)">复制</span>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="scss">
@import "./index.scss";
</style>

<script>
import Clipboard from 'clipboard';

export default {
    props: {
        sources: {
            type: Object
        },
        switchable: {
            type: Boolean
        },
        switchNames: {
            type: Array
        },
        switchActive: {
            type: String
        },
        switchActiveIndex: {}
    },
    data() {
        return {
            switchData: null
        }
    },
    watch: {
        switchActive(v) {
            if (!v || v === 'main') {
                this.switchData = this.sources.yield;
            } else {
                this.switchData = this.sources.children.find((item, index) => this.switchActiveIndex == index);
            }


        }
    },
    mounted() {
        this.switchData = this.sources.yield;
    },
    methods: {
        copySN(i) {
            let clipboard = new Clipboard(`.copy${i}`);
            clipboard.on('success', e => {
                this.$vux.toast.show({
                    text: '复制成功',
                    type: 'text'
                });

                e.clearSelection();

                clipboard.destroy();
            });
        },
        changeSwitcher(type, index) {
            this.$emit('switchChange', type, index);
        }
    }
}
</script>
