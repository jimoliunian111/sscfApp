<template>
  <div class="dialog">
      <div class="certificate-dialog">
        <div class="certificate-upload certificate-upload-front"
             :class="{disabled: isPending}"
             :style="applicantFrontImageStyle">
          <Uploader :images="applicantFrontImage"
                    :uploadUrl="`${uploadDomain}/api/files/upload`"></Uploader>
        </div>
      </div>
  </div>
</template>

<script>
import { TransferDom, XDialog } from 'vux';
import Uploader from './uploader';

import certificateType from './certificate-type';

import { getFilePath } from '@/utils/apis';
import Toast from '@/utils/toast';

const errorBorder = `2px solid red`;
const successBorder = `2px solid #04BE02`;

export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog,
    Uploader
  },
  props: {

  },
  data() {
    return {
      isApplicantShow: true,
      isInsuredShow: false,
      isPending: false,
      applicantFrontImage: [],
      applicantFrontImageStyle: {
        background: null,
        border: null
      },
      uploadDomain: process.env.UPLOADDOMAIN
    }
  },
  watch: {
    applicantFrontImage(v) {
      v.length && this.imageUploadHandler(v, 'applicantFrontImage');
    },
  },

  methods: {
    imageUploadHandler(v, type) {
      this.$vux.loading.show('正在识别中');
      this.isPending = true;
      const file_id = v[0].file_id;
      this.$emit('fileId',file_id)
      getFilePath([], { file_id })
      .then(res => {
        const data = res.data.data;
        const link = `${this.uploadDomain}/${data.link}`;
        this.$vux.loading.hide();
        this.isPending = false;
        this[`${type}Style`].background = `url(${link}) no-repeat`;
      })
      .catch(err => {
        console.log(err);
        this.$vux.loading.hide();
      }); 
    },
  }
}
</script>

<style scoped>
@import url('./index.css');
</style>


