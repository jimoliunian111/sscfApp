<template>
	<div class="region-module">
    <div v-transfer-dom>
      <popup v-model="show"
             position="bottom"
             :hide-on-blur="false"
             @on-hide="selectPlaceHide"
             should-scroll-top-on-show>
        <div class="product-clause-content-popup">
          <div class="region-title">选择地区
          <div class="arrow-right-icon region-module-close-icon" @click="close">
            <img src="../../../../../assets/image/sinosig/wddg/close-icon.png" alt="">
          </div>
          </div>
          <div class="region-selected clearfloat">
            <span :class="{ selected: true, cur: regionLevel === 0 }"
                  @click="regionBack(0)">{{ regionTabs[0] }}</span>
            <span :class="{ selected: regionLevel >= 2, cur: regionLevel === 1 }"
                  @click="regionBack(1)">{{ regionTabs[1] }}</span>
            <span :class="{ selected: regionLevel >= 3, cur: regionLevel === 2 }">{{ regionTabs[2] }}</span>
          </div>
          <div class="region-lists">
            <div v-if="!regionList.length" class="region-lists-loading">
              <load-more></load-more>
            </div>
            <div class="region-list-item"
                 v-for="item in regionList"
                 :key="item.id"
                 @click="regionSelect(item)">
              {{ item.name }}
            </div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { TransferDom, Popup, LoadMore } from 'vux'
import { getWapPlace } from '@/utils/apis';
export default {
  name: 'region-module',
  directives: {
    TransferDom
  },
  props: {
    id: {
      type: Number,
      default: 146
    },
    show: {
      type: Boolean
    },
    verStr: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      regionLevel: null,
      regionList: [],
      regionTabs: ['请选择' , '请选择', '请选择'],
      regionData: [,,],
      regionName: ''
    }
  },
  components: {
    Popup,
    LoadMore
  },
  methods: {
    close () {
      console.log('关闭地区组件')
      this.$emit('update:show', false)
    },
    selectPlaceHide() {
      console.log('2222222222')
      this.regionTabs = ['请选择' , '请选择', '请选择'];
      // this.regionData = [,,];
      this.regionLevel = 0;
      this.close()
    },
    selectPlace() {
      const data = { product_id: this.id };

      this.regionList = [];
      getWapPlace([], data)
      .then(res => {
        if (res.data.code === 0) {
          const data = res.data.data;
          this.regionList = data;
          this.regionLevel = 0;
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            type: 'text'
          });
        }
      })
      .catch(err => {
        this.$vux.toast.show({
          text: err,
          type: 'text'
        });
      })
    },
    regionBack(type) { // 地区选择， 返回上一级
      if (this.regionLevel === type) return;
      if (type === 0) {
        this.selectPlace();
        this.regionTabs = ['请选择', '请选择', '请选择'];
        this.regionLevel = 0;
      } else {
        this.regionTabs = [this.regionTabs[0], '请选择', '请选择'];
        this.regionLevel = 0;
        this.regionSelect(this.regionData[type - 1]);
      }
    },
    regionSelect(item) {
      this.regionTabs[this.regionLevel] = item.name;
      this.regionData[this.regionLevel] = item;
      const data = { product_id: this.id, parent_id: item.id};

      this.regionList = [];
      getWapPlace([], data)
      .then(res => {
        if (res.data.code === 0) {
          const data = res.data.data;
          this.regionList = data;
          if (this.regionLevel === 2) {
            this.regionName = this.regionData.filter(i => i).map(y => y.name).join('-');
            this.$emit('getData', this.regionData, this.regionName, this.verStr)
            this.close()
          } else {
            this.regionLevel += 1;
          }
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            type: 'text'
          });
        }

      })
      .catch(err => {
        this.$vux.toast.show({
          text: err,
          type: 'text'
        });
      })
    }
  },
  created () {
    this.selectPlace()
  }
}
</script>

<style lang="scss" scoped>
@import './region-module.scss';
.region-title {
  position: relative;
}
.region-module-close-icon {
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  width: 0.5rem;
}
.region-module-close-icon img {
  width: 0.4rem;
}
</style>
