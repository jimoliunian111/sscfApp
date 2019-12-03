<template>
  <div v-transfer-dom>
    <popup v-model="show" position="bottom" should-scroll-top-on-show :hide-on-blur="false">
      <div class="product-clause-content-popup">
        <div class="health-notices-title">
          {{title}}
          <div class="health-notices-close" @click.stop="close">
            <img src="@/assets/image/sinosig/wddg/close-icon.png">
          </div>
        </div>
        <!-- healthAdvice -->
        <div class="health-notices-content"
             v-html="data"></div>
        <div class="health-notices-operate">
            <div class="health-notices-reject button" @click="warn">
              <div>
                <p>部分为是</p>
              </div>
            </div>
            <div class="health-notices-accept button" @click="jump2InsureInfo"><span>全部为否</span></div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import { TransferDom, Popup } from 'vux';
export default {
  name: 'health-module',
  directives: {
    TransferDom
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    data: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: '健康告知'
    },
    extra: { // 导出的数据
      type: Object,
      default: () => {
        return {
          isMore: false // 是否要显示下一个健告， 为true的话表明还有下一个健告，为false就是没有
        }
      }
    }
  },
  data () {
    return {
    }
  },
  components: {
    Popup
  },
  methods: {
    warn () {
      this.close()
      this.$emit('atLeastOne', this.extra)
    },
    jump2InsureInfo () {
      this.close()
      this.$emit('allNot', this.extra)
    },
    close () {
      console.log('1222222')
      this.$emit('update:show', false)
    }
  }
}
</script>

<style>
</style>
