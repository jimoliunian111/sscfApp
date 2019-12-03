<template>
  <div class="weui-cell">
    <div class="weui-cell__bd">
      <div class="weui-uploader">

        <div class="weui-uploader__bd" :class="{small: size === 'small'}">
          <!-- <div v-show="!readonly && images.length > 0" class="weui-uploader__input-box remove" @click="remove">
          </div>

          <ul class="weui-uploader__files">
            <uploader-item v-for="image in images" :background-image="image.url" :key="image.url" @click.native="preview(image)"></uploader-item>
          </ul> -->
          
          <div class="weui-uploader__input-box" @click="add">
            <input ref="input" class="weui-uploader__input" type="file" accept="image/*" @change="change">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploaderItem from './uploader-item.vue';
import axios from 'axios';
import { setTimeout } from 'timers';

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');

export default {
  props: {
    images: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: 1
    },
    readonly: {
      type: Boolean,
      default: false
    },
    // 是否接管+号的click事件，如果是，点击不弹出选择文件的框
    handleClick: {
      type: Boolean,
      default: false
    },
    // 选择文件后是否自动上传，如果不是，则emit change事件
    autoUpload: {
      type: Boolean,
      default: true
    },
    uploadUrl: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'normal'
    },
    capture: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'img'
    },
    params: {
      type: Object,
      default: null
    }
  },
  components: {
    UploaderItem
  },
  methods: {
    add () {
      if (this.handleClick) {
        this.$emit('add-image');
      }
    },
    // 移除第一张图
    remove () {
      if (this.handleClick) {
        this.$emit('remove-image');
      } else {
        this.images.shift();
      }
    },
    preview (image) {
      // 暂未实现，可以捕捉preview事件自己实现
      this.$emit('preview', image);
    },
    // 压缩图片
    compress(image) {
      let compressRate = .2;

      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      return canvas.toDataURL('image/jpeg', compressRate);

    },
    // 将base64 转换为 file 格式
    dataURLtoFile(dataUrl, filename) {
      let arr = dataUrl.split(',');
      let mime = arr[0].match(/:(.*?);/);
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);  
      while(n--){  
          u8arr[n] = bstr.charCodeAt(n);  
      }  
      return new File([u8arr], filename, {type:mime});
    },
    // 上传file文件至文件服务器
    uploadImage(image) {
      let file = this.dataURLtoFile(image, '1.png');

      // 直接转formData进行传输
      let formData = new window.FormData();

      formData.append(this.name, file);

      if (this.params) {
        for( let key in this.params) {
          formData.append(key, this.params[key]);
        }
      }

      if (this.autoUpload) {
        if (!this.uploadUrl) {
          console.error('uploadUrl不应为空');
        }

        if (this.$vux && this.$vux.loading) {
          this.$vux.loading.show('正在上传');
        }

        axios.post(this.uploadUrl, formData)
        .then((response) => {
          if (this.$vux && this.$vux.loading) {
            this.$vux.loading.hide();
          }
          this.$refs.input.value = '';
          this.images.pop();
          this.images.push(response.data.data);
        }).catch(res => {
          if (this.$vux && this.$vux.loading) {
            this.$vux.loading.hide();
          }
        })
      } else {
        this.$emit('upload-image', formData);
      }
    },
    // 上传图片，如果图片大于1m，则进行压缩，再上传，如果小于1m，则直接上传
    change () {
      if (this.handleClick) {
        return;
      }

      let maxSize = 1000 * 1024;   //1M
      let fr = new FileReader();
      let self = this;

      fr.onload = function() {
        let imageUrl = this.result;

        let image = new Image();

        image.src = imageUrl;

        image.onload = function() {
          if (imageUrl.length < maxSize) {
            self.uploadImage(imageUrl);
          } else {
            self.uploadImage(self.compress(image));
          }
        }
        
      }

      fr.readAsDataURL(this.$refs.input.files[0]);
    }
  },
  computed: {
    showCapture () {
      return this.capture || undefined;
    }
  }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/weui/widget/weui-uploader/index.less';
.remove:before {
  width: 0;
  height: 0;
}
.weui-uploader__bd.small {
  .weui-uploader__input-box {
    margin-right: 5px;
    margin-bottom: 5px;
    width: 58px;
    height: 58px;
  }
  .weui-uploader__file {
    width: 60px;
    height: 60px;
    margin-right: 5px;
    margin-bottom: 5px;
  }
}
</style>
