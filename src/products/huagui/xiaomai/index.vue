<template>
  <div id="huagui_xiaomai">
    <router-view/>
  </div>
</template>

<script>
// import { getWxConfig, getConfigure } from '@/utils/apis';
import { getWxConfig, getConfigure } from '@/apis';
import { setTimeout } from 'timers';

export default {
  name: "huagui_xiaomai",
  created() {
    if (process.env.DEBUG) {
      return
    }
    getWxConfig().then(res => {
      try {
        wx.config(res.data); 
        try {
            wx.ready(function () {
                // wx.showOptionMenu();
                // wx.hideOptionMenu();
            });
          } catch (e) {
              console.log('该功能需要在微信配置已配置的前提下才能使用');
          }
      } catch (e) {
        console.log('该功能需要在微信配置已配置的前提下才能使用');
      }
    })
    .catch(err => {
      this.$vux.toast.show({
        title: err.data.message,
        type: 'text'
      });
    });
  },
  mounted() {
    setTimeout(() => {
      this.productChangeRoute();
    }, 500);
  },
  methods: {
    productChangeRoute() {
      if (this.$route.name != 'index') {
        return
      }
      this.$vux.loading.show({ text: '正在加载中' });

      const data = { id: this.$route.query.product_id };
      // 根据configure返回产品信息，再统一判断，跳转到相应产品页面
      getConfigure(data).then(res => {
        const data = res.data;
        const productCompany = data.configure.split('.')[1].toLocaleLowerCase();
        const productName = data.configure.split('.')[2].toLocaleLowerCase();

        this.$router.replace({
          path: `/${productCompany}/${productName}/detail`,
          query: { scode: this.$route.query.scode }
        });
        // setTimeout(() => {
        //   this.$vux.loading.hide();
        // }, 1000);
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => {
          this.$vux.loading.hide();
        }, 500);
      });
    }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
</style>

<style lang="less">
@import url(./assets/font/iconfont.css);
@import url(./assets/css/normalize.css);
@import url(./assets/styles/common-style.css);
.iconfont {
  font-size: 0.373333rem;
  color: #b3b3b3;
}

.icon-date {
  color: #ffa714;
}
.icon-arrow {
  transform: scale(0.5);
  display: inherit;
}

.vux-toast-middle {
  max-width: 5.893333rem;
  height: auto;
  min-height: auto;
  width: auto!important;
  .weui-toast__content {
    font-size: 0.373333rem;
    border-radius: 0.133333rem;
    padding: 0.28rem 0.533333rem;
    word-wrap: break-word;
    text-align: center;
  }
}
</style>

