<template>
  <div class="vocation-container">
    <div class="occupation-inquire-title">
      <i class="icon iconfont icon-back"
          v-if="prevVocation.length > 1" 
          @click="vocationBack(vocationType)">&#xe618;</i>
      <span>职业类别查询</span>
      <i class="icon iconfont icon-close" @click="vocationShow">&#xe617;</i>
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
          v-if="vocationSearchNumber === 5
                && vocationSelected[vocationSelected.length - 1].level <= 6">
        类别：{{ vocationSelected[vocationSelected.length - 1].level }}类（符合投保条件）
      </p>
      <p class="occupation-uninquire-choice-notice" 
          v-if="vocationSearchNumber === 5
                && vocationSelected[vocationSelected.length - 1].level > 6">
        类别：{{ vocationSelected[vocationSelected.length - 1].level }}类（不符合投保条件）
      </p>
    </div>
    <div class="occupation-inquire-content">
      <div class="occupation-inquire-loading"
            v-if="!vocationList.length && vocationSearchNumber !== 5">
        <load-more></load-more>
      </div>
      <div class="occupation-end" v-if="!vocationList.length && vocationSearchNumber === 5">
        已经到底啦
      </div>
      <div class="occupation-inquire-content-item" 
          v-for="item in vocationList"
          v-if="vocationList.length"
          :key="item.code"
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
            <img src="../../assets/image/unfind.png" alt="搜索不到结果">
            <p class="search-nothing-words">抱歉，未搜索到相关结果!</p>
          </div>
          <div class="search-item" 
               v-for="(item, index) in searchList"
               :key="index"
               @click="selectItem(item)">
            <p>{{ item.name }}</p>
            <span class="search-item-success" v-if="item.level <= 6">
              {{ item.level }}类 （符合投保条件）
            </span>
            <span class="search-item-fail" v-if="item.level > 6">
              {{ item.level }}类 （不符合投保条件）
            </span>
          </div>
        </div>
      </popup> 
    </div>
  </div>
</template>
<script>
import { LoadMore, Icon, TransferDom, Popup } from 'vux';
import throttle from '@/utils/throttle';

import { searchProfession } from '@/apis/index';

import Loading from '@/components/loading';

export default {
  directives: {
    TransferDom
  },
  props: {
    prevVocation: {},
    vocationSelected: {},
    vocationSearchNumber: {},
    vocationList: {},
    vocationType: {},
    productId: {},
    selectable: {}
  },
  data() {
    return {
      isSearchShow: false,
      searchWords: '',
      searchList: [],
      searchTag: false,
      isLoading: false
    }
  },
  components: {
    LoadMore,
    Icon,
    Popup,
    Loading
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
  mounted() {
    // this.$refs['searchInput'].focus();
    this.$nextTick(() => {
      document.querySelector('.search-content').style.height = `${window.innerHeight}px`;
    });

  },
  methods: {
    selectItem(item) {
      if (!this.selectable || item.level > 4) return;

      this.$emit('selectItem', item);
      this.isSearchShow = false;
    },
    vocationShow() {
      this.$emit('vocationShow');
    },
    vocationBack(type) {
      this.$emit('vocationBack', type);
    },
    vocationFetch(item, type) {
      this.$emit('vocationFetch', item, type);
    },
    vocationSearch() {
      this.isSearchShow = true;
    },
    vocationClose() {
      this.searchList = [];
      this.searchWords = '';
      this.searchTag = false;
    },
    searchHandler(value) {
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
        type: this.vocationType === 'applicant' ? 2 : 1
      }
      searchProfession(data).then(res => {
          this.searchTag = true;
          const data = res.data;
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
    back() {
      this.isSearchShow = false;
    }
  }
}
</script>

<style scoped>
@import url(./index.css);
</style>

