<template>
  <div class="uploading-widget">
    <div class="upload-box">
      <div class="upload-box-header">
        <p class="upload-box-header-left"></p>
        <p class="upload-box-header-title">上传投保人身份证</p>
        <p class="upload-box-header-close">
          <i class="icon iconfont icon-guanbi_toubaoye"></i>
        </p>
      </div>
      <div class="upload-box-content">
        <div class="upload-img-box">
          <div class="upload-img-box-click">
            <p class="click-btn"><span>+</span></p>
            <p class="click-btn-word">上传身份证正面</p>
          </div>
          <input type="file" class="input-upload-style" @change="getFile($event)" accept="image/*"/>
        </div>
        <div class="upload-img-box">
          <div class="upload-img-box-click">
            <p class="click-btn"><span>+</span></p>
            <p class="click-btn-word">上传身份证背面</p>
          </div>
          <input type="file" class="input-upload-style" @change="getFile($event)" accept="image/*"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'uploading-widget',
  data () {
    return {

    }
  },
  methods: {
    getFile (event) {
      console.log('11111111111111111', event.target.files)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
.uploading-widget {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 500;
}
.upload-box {
  width: rem(600);
  height: rem(1000);
  margin: rem(60) auto 0 auto;
  border-radius: rem(25);
  background: #fff;
}
.upload-box-header {
  display: flex;
  felx-flow: row nowap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: 100%;
  height: rem(80);
  border-bottom: rem(1) solid #EFEFEF;
}
.upload-box-header-left, .upload-box-header-close {
  width: rem(75);
  height: 100%;
  line-height: rem(80);
  text-align: center;
  .icon-guanbi_toubaoye {
    text-align: center;
  }
}
.upload-box-header-title {
  flex: 1;
  font-size: rem(28);
  text-align: center;
}
.upload-box-content {
  width: 100%;
}
.upload-img-box {
  position: relative;
  width: rem(520);
  height: rem(320);
  margin: rem(20) auto 0 auto;
  border: 1px solid #ff9900;
  box-sizing: border-box;
}
.upload-img-box-click {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255,255,255, 0.2);
  .click-btn {
    width: rem(80);
    height: rem(80);
    margin: rem(80) auto rem(20) auto;
    border-radius: 100%;
    line-height: rem(80);
    background: #ff9900;
    color: #fff;
    text-align: center;
    span {
      font-size: rem(58);
    }
  }
  .click-btn-word {
    width: 100%;
    font-size: rem(28);
    text-align: center;
  }
}
.upload-img-box .input-upload-style {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
