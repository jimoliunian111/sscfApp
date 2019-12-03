<template>
  <div v-transfer-dom class="dialog">
    <x-dialog v-model="isCertificateModalShow">
      <div class="certificate-dialog" v-show="isApplicantShow">
        <div class="certificate-dialog-close" @click="certificateModalClose">&times;</div>
        <div class="certificate-title">上传投保人身份证</div>
        <div class="certificate-upload certificate-upload-front"
             :class="{disabled: isPending}"
             :style="applicantFrontImageStyle">
          <Uploader :images="applicantFrontImage"
                    :uploadUrl="`${uploadDomain}/api/files/upload`"></Uploader>
        </div>
        <div class="certificate-upload certificate-upload-back"
             :class="{disabled: isPending}"
             :style="applicantBackImageStyle">
          <Uploader :images="applicantBackImage"
                    :uploadUrl="`${uploadDomain}/api/files/upload`"></Uploader>
        </div>
        <div class="certificate-upload-tips"></div>
      </div>
      <!-- <div class="certificate-dialog" v-show="isInsuredShow">
        <div class="certificate-dialog-close" @click="certificateModalClose">&times;</div>
        <div class="certificate-title">上传被保人身份证</div>
        <div class="certificate-upload certificate-upload-front"
             :class="{disabled: isPending}"
             :style="insuredFrontImageStyle">
          <Uploader :images="insuredFrontImage"
                    :uploadUrl="`${uploadDomain}/api/files/upload`"></Uploader>
        </div>
        <div class="certificate-upload certificate-upload-back"
             :class="{disabled: isPending}"
             :style="insuredBackImageStyle">
          <Uploader :images="insuredBackImage"
                    :uploadUrl="`${uploadDomain}/api/files/upload`"></Uploader>
        </div>
        <div class="certificate-upload-tips"></div>
      </div> -->
      <!-- <div class="certificate-button"
           :class="{disabled: isPending}"
           v-if="isApplicantShow && !isForSelf"
           @click="nextUpload">
        下一步
      </div> -->
      <div class="certificate-button"
           v-if="isInsuredShow || isForSelf"
           @click="doneUpload">
        完成
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { TransferDom, XDialog } from 'vux';
import Uploader from './uploader';

import certificateType from './certificate-type';

import { getFilePath, uploadOcrFile } from '@/utils/apis';
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
    isCertificateModalShow: { // 显示隐藏
      type: Boolean,
      required: true
    },
    isForSelf: { // 是否单独投保人
      type: Boolean,
      required: true,
    },
    productId: { // 产品id
      required: true
    },
    value: { // 数据模型  即： formValue
      required: true
    }
  },
  data() {
    return {
      isApplicantShow: false,
      isInsuredShow: false,
      isPending: false,
      applicantFrontImage: [],
      applicantBackImage: [],
      insuredFrontImage: [],
      insuredBackImage: [],
      applicantFrontImageStyle: { // 投保人上传图片样式
        background: null,
        border: null
      },
      applicantBackImageStyle: { // 投保人上传框背景
        background: null,
        border: null
      },
      insuredFrontImageStyle: { // 被保人上传图片样式
        background: null,
        border: null
      },
      insuredBackImageStyle: { // 被保人上传图片样式
        background: null,
        border: null
      },
      uploadDomain: process.env.UPLOADDOMAIN // 上传服务器域名

    }
  },
  watch: {
    applicantFrontImage(v) {
      v.length && this.imageUploadHandler(v, 'applicantFrontImage');
    },
    applicantBackImage(v) {
      v.length && this.imageUploadHandler(v, 'applicantBackImage');
    },
    // insuredFrontImage(v) { // 渤海不需要， 注释
    //   v.length && this.imageUploadHandler(v, 'insuredFrontImage');
    // },
    // insuredBackImage(v) { // 渤海不需要， 注释
    //   v.length && this.imageUploadHandler(v, 'insuredBackImage');
    // },
    isCertificateModalShow(v) {
      if (v) {
        this.isApplicantShow = true;
        this.isInsuredShow = false;
      } else {
        this.isApplicantShow = false;
        this.isInsuredShow = false;
      }
    }
  },

  methods: {
    imageUploadHandler(v, type) {
      this.$vux.loading.show('正在识别中');
      this.isPending = true;
      const file_id = v[0].file_id;

      getFilePath([], { file_id }).then(res => {
        this.$vux.loading.hide();
        if (res.data.code === 0) {
          const data = res.data.data;
          const link = `${this.uploadDomain}/${data.link}`;

          this[`${type}Style`].background = `url(${link}) no-repeat`;
          this[`${type}Style`].border = successBorder; // 渤海
          this.isPending = false; // 渤海
          // this.uploadOcrFile(file_id, type); // 渤海不需要， 注释
        } else {
          const data = res.data.data;
          const link = `${this.uploadDomain}/${data.link}`;

          this[`${type}Style`].background = `url(${link}) no-repeat`;
          this[`${type}Style`].border = successBorder;
        }
      })
      .catch(err => {
        console.log(err);
        this.$vux.loading.hide();
      });
    },
    uploadOcrFile(file_id, type) { // 渤海不需要
      const data = {
        file_id,
        type: certificateType[type],
        product_id: this.productId
      }
      uploadOcrFile([], data).then(res => {
        this.$vux.loading.hide();
        this.isPending = false;
        if (res.data.code === 0) {
          const data = res.data.data;
          const state = data.state;

          if (state == 1) {
            if (type === 'applicantFrontImage' || type === 'insuredFrontImage') {
              this.compareWithFormValue(data.info, type);
            } else {
              this[`${type}Style`].border = successBorder;
            }
          } else {
            this[`${type}Style`].border = errorBorder;
            Toast('证件识别失败，请重新上传');
          }

        } else {
          this[`${type}Style`].border = errorBorder;
          Toast('上传失败，请重新上传');
        }
      })
      .catch(err => {
        this[`${type}Style`].border = errorBorder;
        Toast('上传失败，请重新上传');
        this.$vux.loading.hide();
      });
    },
    compareWithFormValue(info, type) { // 如果照片部分重要信息识别失败，则返回错误提示
      if (!info.number || !info.name) {
        this[`${type}Style`].border = errorBorder;
        return Toast('证件识别失败，请重新上传');
      }

      const applicantName = this.value.applicant.name.default;
      const insuredName = this.value.insured.name.default;
      const applicantCertificate = this.value.applicant.certificate.number.default;
      const insuredCertificate = this.value.insured.certificate.number.default;

      if (type === 'applicantFrontImage') {
        if (info.name !== applicantName) {
          this[`${type}Style`].border = errorBorder;
          return Toast('证件姓名与投保人姓名不一致，请重新确认');
        }

        if (info.number !== applicantCertificate) {
          this[`${type}Style`].border = errorBorder;
          return Toast('证件号码与投保人身份证号码不一致，请重新确认');
        }

        this[`${type}Style`].border = successBorder;

      } else if (type === 'insuredFrontImage') {
        if (info.name !== insuredName) {
          this[`${type}Style`].border = errorBorder;
          return Toast('证件姓名与被保人姓名不一致，请重新确认');
        }

        if (info.number !== insuredCertificate) {
          this[`${type}Style`].border = errorBorder;
          return Toast('证件号码与被保人身份证号码不一致，请重新确认');
        }

        this[`${type}Style`].border = successBorder;
      }


      // if (this.value)
    },
    certificateModalClose() { // 关闭模块初始化数据
      this.$emit('close');
      // this.applicantFrontImage = [];
      // this.applicantBackImage = [];
      // this.insuredFrontImage = [];
      // this.insuredBackImage = [];
      // this.applicantFrontImageStyle = { background: null, border: null };
      // this.applicantBackImageStyle = { background: null, border: null  };
      // this.insuredFrontImageStyle = { background: null, border: null  };
      // this.insuredBackImageStyle = { background: null, border: null  };
      Object.assign(this.$data, this.$options.data())
      this.$emit('update:isCertificateModalShow', false)
    },
    nextUpload() { // 下一步上传被保人证件， 即： 只有投保人的时候不使用
      if (!this.applicantFrontImage.length || !this.applicantBackImage.length) {
        return Toast('请上传完整到证件信息');
      }

      if (this.applicantFrontImageStyle.border !== successBorder || this.applicantBackImageStyle.border !== successBorder) {
        return Toast('请确保上传投保人证件正确');
      }

      this.isApplicantShow = false;
      this.isInsuredShow = true;
    },
    doneUpload () { // 点击完成调用的方法
      if (this.isForSelf) {
        if (!this.applicantFrontImage.length || !this.applicantBackImage.length) {
          return Toast('请上传完整的证件信息');
        }

        if (this.applicantFrontImageStyle.border !== successBorder || this.applicantBackImageStyle.border !== successBorder) {
          return Toast('请确保上传投保人证件正确');
        }

        const data = {
          applicant: {
            front: this.applicantFrontImage[0],
            back: this.applicantBackImage[0]
          },
          insured: {
            front: '',
            back: ''
          }
        }

        this.$emit('upload', data); // 对外暴露的方法
      } else {
        if (!this.insuredFrontImage.length || !this.insuredBackImage.length) {
          return Toast('请上传完整的证件信息');
        }

        if (this.insuredFrontImageStyle.border !== successBorder || this.insuredBackImageStyle.border !== successBorder) {
          return Toast('请确保上传被保人证件正确');
        }

        const data = {
          applicant: {
            front: this.applicantFrontImage[0],
            back: this.applicantBackImage[0]
          },
          insured: {
            front: this.insuredFrontImage[0],
            back: this.insuredBackImage[0]
          }
        }

        this.$emit('upload', data);
      }
      // this.certificateModalClose();
    }
  }
}
</script>

<style scoped>
@import url('./index.css');
</style>
