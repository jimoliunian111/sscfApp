<template>
	<div class="vocation-module">
    <popup position="right" v-model="show" :hide-on-blur="false">
      <div class="vocation-container">
        <div class="occupation-inquire-title">
          <i class="icon iconfont icon-back"
              v-if="prevVocation && prevVocation.length > 1"
              @click="popupBack(vocationType)">&#xe618;</i>
          <span>职业类别查询</span>
          <i class="icon iconfont icon-close" @click="closePopup">&#xe617;</i>
        </div>
        <div class="vocation-search-box" @click="vocationSearch">
          <div class="vocation-search-input">
            <icon type="search" class="vocaiton-search-icon"></icon>
            <span class="vocation-search-words">请输入关键字</span>
          </div>
        </div>
        <div class="occupation-inquire-choice">
          <span>已选：</span>
          <span v-if="vocationSelected.length" class="occupation-inquire-choice-data">
            <b>{{ vocationSelected.map(item => item.name).join(' - ') }}</b>
          </span>
          <span v-else>
            <b>未选择</b>
          </span>
          <p class="occupation-inquire-choice-notice"
              v-if="vocationSearchNumber === 4
                    && vocationSelected[vocationSelected.length - 1].level <= level">
            类别：{{ vocationSelected[vocationSelected.length - 1].level }}类（符合投保条件）
          </p>
          <p class="occupation-uninquire-choice-notice"
              v-if="vocationSearchNumber === 4
                    && vocationSelected[vocationSelected.length - 1].level > level">
            类别：{{ vocationSelected[vocationSelected.length - 1].level }}类（不符合投保条件）
          </p>
        </div>
        <div class="occupation-inquire-content">
          <div class="occupation-inquire-loading"
                v-if="!vocationList.length && vocationSearchNumber !== 4">
            <load-more></load-more>
          </div>
          <div class="occupation-end" v-if="!vocationList.length && vocationSearchNumber === 4">
            已经到底啦
          </div>
          <div class="occupation-inquire-content-item"
              v-for="(item, index) in vocationList"
              v-if="vocationList.length"
              :key="index"
              @click="vocationFetch(item, vocationType)">
            <span>{{ item.name }}</span>
            <i class="icon iconfont icon-right-arrow" v-if="vocationSearchNumber !== 3">&#xe616;</i>
          </div>
        </div>

        <div v-transfer-dom>
          <popup class="search-container"
                 v-model="isSearchShow"
                 position="right"
                 @on-hide="vocationClose">
            <div class="search-header">
              <icon type="search" class="search-icon"></icon>
              <input v-model="searchWords" ref="searchInput" type="text" class="search-input">
              <span class="search-cancel" @click="back">取消</span>
            </div>
            <div class="search-content">
              <Loading v-if="isLoading"></Loading>
              <div class="search-nothing" v-if="searchTag && !searchList.length">
              <!-- <div class="search-nothing"> -->
                <img src="@/assets/image/unfind.png" alt="搜索不到结果">
                <p class="search-nothing-words">抱歉，未搜索到相关结果!</p>
              </div>
              <div class="search-item"
                   v-for="(item, index) in searchList"
                   :key="index"
                   @click="selectItem(item)">
                <p>{{ item.name }}</p>
                <span class="search-item-success" v-if="item.level <= level">
                  {{ item.level }}类 （符合投保条件）
                </span>
                <span class="search-item-fail" v-if="item.level > level || isNaN(item.level)">
                  {{ item.level }}类 （不符合投保条件）
                </span>
              </div>
            </div>
          </popup>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import { LoadMore, Icon, TransferDom, Popup } from 'vux';
import throttle from '@/utils/throttle';
import Loading from '@/components/loading';

import { FetchVocation, FetchSearchProfession } from '@/utils/apis';
export default {
  name: 'vocation-module',
  directives: {
    TransferDom
  },
  props: {
    vocationType: {
      type: String,
      default: 'applicant' // 两种类型 applicant (投保人) 和 insured(被保人)
    },
    productId: {
      type: Number,
      default: 146
    },
    show: {
      type: Boolean
    },
    funcType: {
      type: String,
      default: 'FetchVocation'
    },
    searchFuncType: {
      type: String,
      default: 'FetchSearchProfession'
    },
    level: {
      type: Number,
      default: 6
    },
    isExport: {
      type: Boolean,
      default: false
    },
    verKey: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      prevVocation: [],
      vocationSelected: [],
      vocationSearchNumber: 0,
      vocationList: [],
      selectable: null,
      searchList: null,
      isSearchShow: false,
      searchWords: '',
      isLoading: false,
      searchTag: null
    }
  },
  components: {
    LoadMore,
    Icon,
    Popup,
    Loading
  },
  methods: {
    // 根据传参 funcType 获取api方法
    getApiFunc (name, params) {
      const apiFunc = {
        FetchVocation: FetchVocation,
        FetchSearchProfession: FetchSearchProfession
      }
      return apiFunc[name || this.funcType]([], params)
    },
    selectItem(item) { // 搜索结果列表点击事件
      if (item.level > this.level || isNaN(item.level)) {
        this.$vux.toast.show({
          text: '该职业不符合本次投保',
          type: 'text'
        });
        return
      };

      this.$emit('selectItem', item, this.verKey);
      this.isSearchShow = false;
      this.closePopup()
    },
    closePopup () { // 关闭浮层方法
      this.$emit('closePopup'); // 对外接口 关闭弹框后执行的方法
      this.$emit('update:show', false) // 对外传输 弹框变量转为false
    },
    popupBack() { // 后退按钮方法
      // this.$emit('popupBack', this.vocationType);
      this.prevVocationFetch(this.prevVocation[this.vocationSearchNumber - 2]);
    },
    vocationFetch(item, type) { // 外部传入的请求数据的方法
      // this.$emit('vocationFetch', item, type);
      this.initGetData(item, type)
    },
    initGetData (parent) {
      if (parent) this.vocationSelected.push(parent);
      const params = parent ? { product_id: this.productId, parent_id: parent.id }
                               : { product_id: this.productId };

      this.vocationList = [];
      this.getApiFunc(this.funcType, params).then(({data}) => {
        this.prevVocation.push(parent);
        this.vocationList = data.data;
        this.vocationSearchNumber += 1;
        if (this.vocationSearchNumber === 4) {
          if (this.isExport) {
            this.$emit('getData', this.vocationSelected, this.verKey, this.vocationSelected.map(item => item.name).join('-'))
            this.closePopup()
          }
        }
      })
    },
    prevVocationFetch(prevParent) { // 按倒退按钮执行的方法
      this.vocationSelected.pop();
      const params = prevParent ? { product_id: this.productId, parent_id: prevParent.id }
                               : { product_id: this.productId };

      this.vocationList = [];
      this.getApiFunc(this.funcType, params).then(({data}) => {
        this.prevVocation.pop();
        this.vocationList = data.data;
        this.vocationSearchNumber -= 1;
      });
    },
    vocationSearch() { // 打开搜索浮层
      this.isSearchShow = true;
    },
    vocationClose() { // 关闭搜索浮层
      this.searchList = [];
      this.searchWords = '';
      this.searchTag = false;
    },
    searchHandler(value) { // 节流方法
      this.isLoading = true;
      if (!value) {
        this.searchList = [];
        this.isLoading = false;
        this.searchTag = false;
        return;
      }

      const data = {
        product_id: this.productId,
        name: value,
        type: this.vocationType === 'applicant' ? 1 : 2
      }
      // FetchSearchProfession([], data)
      this.getApiFunc(this.searchFuncType, data)
        .then(res => {
          this.searchTag = true;
          const data = res.data.data;
          this.searchList = data.map(item => {
            return {
              id: item.id,
              level: item.level,
              origin_name: item.name,
              name: `${item.parent.parent.name} - ${item.parent.name} - ${item.name}`
            }
          })
          this.isLoading = false;
        })
        .catch(err => console.log(err));
    },
    back() { // 取消搜索浮层
      this.isSearchShow = false;
    }
  },
  mounted () {
    // this.$refs['searchInput'].focus();
    this.$nextTick(() => {
      document.querySelector('.search-content').style.height = `${window.innerHeight}px`;
    });

  },
  created () {
    this.vocationFetch()
  },
  watch: {
    searchWords(v) {
      throttle(this.searchHandler, this, 300, v);
    },
    isSearchShow(v) {
      if (v) {
        this.$nextTick(() => {
          this.$refs['searchInput'].focus();
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import './vocation-module.scss';
</style>
