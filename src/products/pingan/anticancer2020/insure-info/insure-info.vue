<template>
  <div v-if="isInit">
    <div class="scroll-content">
      <div class="main">
        <div class="product-name">
          <span>{{ formValue.product && formValue.product.name }}</span>
        </div>
        <div class="insurance-plan validate-wrap">
          <div class="main-title plan">
            <i class="icon iconfont label-icon">&#xe604;</i>保障计划
          </div>
          <div class="main-content">
            <only-read-module title="保障期限"
            :content="formValue.insure_plan.guarantee_period.items.find(item => item.value === +formValue.insure_plan.guarantee_period.default.value).label"></only-read-module>
            <only-read-module title="保障额度"
            :content="(formValue.insure_plan.guarantee_quota.default / 10000) + '万'"></only-read-module>
            <only-read-module title="缴费期限"
            :content="formValue.insure_plan.payment_period.items.find(item => item.value === +formValue.insure_plan.payment_period.default.value).label"></only-read-module>
            <only-read-module title="起保日期"
            :content="formValue.insure_plan.inception_date.default"></only-read-module>
          </div>
        </div>
        <div class="applicant-info validate-wrap">
          <div class="main-title information">
            <i class="icon iconfont label-icon">&#xe603;</i>投保人信息
          </div>
          <div class="main-content">
            <names-module verityKey="applicant_name" :placeholder="validatePlaceholders.applicant_name"
            :name="formValue.applicant.name" @formChange="formChange"></names-module>

            <papers-type-module :certificate="formValue.applicant.certificate"
            :list="formValue.applicant.certificate.type.items" :useSelect="true"></papers-type-module>

            <papers-num-module :certificate="formValue.applicant.certificate"
            :placeholder="validatePlaceholders.applicant_certificate_number"
            verStr="applicant_certificate_number"
            @getData="paperNumFunc"></papers-num-module>

            <template v-if="formValue.applicant.certificate.type.default !== 1">
              <birthday-module :certificate="formValue.applicant.certificate" :birthday="formValue.applicant.birthday"
              :placeholder="validatePlaceholders.applicant_birthday" :disabled="false"></birthday-module>

              <sex-module :certificate="formValue.applicant.certificate" :gender="formValue.applicant.gender"></sex-module>
            </template>

            <mobile-num-module :mobile="formValue.applicant.mobile" :placeholder="validatePlaceholders.applicant_mobile"
            @formChange="formChange"></mobile-num-module>

            <email-widget :data="formValue.applicant.email" :placeholder="validatePlaceholders.applicant_email"
            verityKey="applicant_email" @formChange="formChange"></email-widget>

            <div class="main-content-item">
              <div class="main-content-item-title">所在地区</div>
              <div class="main-content-item-content"
              :class="{ error: !validatePlaceholders.applicant_personal_address_province.isValidate }"
              @click="showRegionModule('applicant')">
                <span v-if="formValue.applicant.personal_address.province.default.id">
                  {{formValue.applicant.personal_address.province.default.name + '-' + formValue.applicant.personal_address.city.default.name + '-' +
                    formValue.applicant.personal_address.area.default.name
                  }}
                </span>
                <span v-else>请选择所在地区</span>
                <img class="arrow-right-icon" src="../../../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
              </div>
            </div>

            <address-module type="applicant" verifyKey="applicant_personal_address_detail" @formChange="formChange"
            :address="formValue.applicant.personal_address" :placeholder="validatePlaceholders.applicant_personal_address_detail"></address-module>
          </div>
        </div>
        <div class="assurer-info validate-wrap">
          <div class="main-title information">
            <i class="icon iconfont label-icon">&#xe603;</i>被保人信息
          </div>
          <div class="main-content">
            <insure-check-widget title="为谁投保" :checkObj="insured_relation" @getData="relationFunc" verStr="insured_relation"></insure-check-widget>
            <template v-if="formValue.insured.relation.default !== 1">
              <names-module type="insured" verityKey="insured_name" :placeholder="validatePlaceholders.insured_name"
              :name="formValue.insured.name" @formChange="formChange"></names-module>
              <papers-type-module type="insured" :certificate="formValue.insured.certificate"
              :list="formValue.insured.certificate.type.items" :useSelect="true"></papers-type-module>
              <papers-num-module type="insured" :certificate="formValue.insured.certificate"
              :placeholder="validatePlaceholders.insured_certificate_number"
              verStr="insured_certificate_number"
              @getData="paperNumFunc"></papers-num-module>
              <mobile-num-module type="insured" :mobile="formValue.insured.mobile" :placeholder="validatePlaceholders.insured_mobile"
              @formChange="formChange" verifyKey="insured_mobile"></mobile-num-module>
              <template v-if="formValue.insured.certificate.type.default !== 1">
                <birthday-module :certificate="formValue.insured.certificate" :birthday="formValue.insured.birthday"
                :placeholder="validatePlaceholders.insured_birthday" :disabled="false"></birthday-module>

                <sex-module :certificate="formValue.insured.certificate" :gender="formValue.insured.gender"></sex-module>
              </template>
            </template>
          </div>
        </div>
      </div>
      <!-- <div class="main no-padding-top">
        <div class="beneficiary-info validate-wrap">
          <div class="main-title information">
            <i class="icon iconfont label-icon">&#xe603;</i>受益人信息
          </div>
          <div class="main-content">
            <div class="main-content-item">
              <div class="main-content-item-title">受益人</div>
              <div class="main-content-item-content">
                <div class="main-content-item-content-radio" :class="{ cur: item.value === formValue.beneficiary.type.default }"
                  v-for="item in formValue.beneficiary.type.items" :key="item.value" @click="changeBeneficiary(item.value)">
                  {{ item.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <div class="main no-padding-top padding-bottom-footer validate-wrap">
        <div class="agreement-info clearfloat">
          <check-icon class="check-icon" :class="{ disabled: !isResultBack  }" :value.sync="readed"></check-icon>
          <div class="agreement-content">
            我已确定以上信息无误，并已阅读同意
            <span v-for="(item, index) in agreements" :key="index">
              <span class="color-black" v-if="index !== 0 && index !== agreements.length - 1">、</span>
              <span class="color-black" v-if="index === agreements.length - 1">和</span>
              <span class="color-orange" @click="showAgreement(index)">《{{ item.name }}》</span>
            </span>
          </div>
        </div>
      </div>
      <div v-transfer-dom>
        <popup v-model="contentPopupShow" style="overflow-x: hidden;" position="bottom" should-scroll-top-on-show>
          <div class="client-agreement-title">
            <span>{{ popupTitle }}</span>
            <div class="health-notices-close" @click.stop="contentPopupShow = false">
              <img src="../../../../assets/image/sinosig/wddg/close-icon.png">
            </div>
          </div>
          <div class="client-agreement-content" v-html="popupContent" v-lazy-container="{ selector: 'img' }"></div>
        </popup>
      </div>
      <div v-transfer-dom>
        <confirm v-model="isLeave" @on-cancel="onCancel" @on-confirm="onConfirm">
          <p style="text-align:center;">返回后不保存当前页面</p>
        </confirm>
      </div>
    </div>
    <template v-if="regionShow">
      <region-module :show.sync="regionShow" :id="+product_id" @getData="getRegionModule"></region-module>
    </template>

    <template v-if="vocationShow">
      <vocation-module :productId="+product_id" :show.sync="vocationShow" :level="6" :isExport="true" verKey="applicant/profession" @getData="getProfession"
      @selectItem="getProfessionItem"></vocation-module>
    </template>


    <!-- <template>
      <certificate-upload
      :isCertificateModalShow.sync="isCertificateModalShow"
      :isForSelf="true"
      :productId="product_id"
      v-model="formValue"
      @upload="certificateUpload"
      @close="certificateModalClose"></certificate-upload>
    </template> -->

    <div class="fixed-footer">
      <div class="fixed-footer-premium">
        <p>保费：</p>
        <span v-if="amount">{{ amount }}元</span>
        <span v-else>
          <load-more></load-more>
        </span>
      </div>
      <div v-if="isResultBack" class="fixed-footer-insure" @click="insure">立即投保</div>
      <div v-else class="fixed-footer-insure waiting">
        立即投保
        <load-more class="result-loading"></load-more>
      </div>
    </div>

  </div>
</template>
<script>
  import {
    LoadMore,
    XInput,
    TransferDom,
    Popup,
    Datetime,
    PopupPicker,
    Group,
    Cell,
    CheckIcon,
    Confirm
  } from 'vux';
  import { storeInsure } from '@/mixins/insureInfoState.js';
  import { insureInfo } from '../insure-info.js'

  import { getCode } from '@/apis/index.js';

  // import certificateUpload from '../components/certificate-upload/index.vue'

  export default {
    directives: {
      TransferDom
    },
    mixins: [storeInsure, insureInfo],
    components: {
      Popup,
      Datetime,
      PopupPicker,
      Group,
      Cell,
      XInput,
      CheckIcon,
      LoadMore,
      Confirm,
      // certificateUpload
    },
    data () {
      return {
        applicantCertificateValid: {},
        insuredCertificateValid: {},
        readed: false,
        contentPopupShow: false,
        agreements: [],
        popupContent: '',
        bankList: [],
        isAutoComplateShow: false,
        isInsuredCertificatePass: false,
        isApplicationCertificatePass: false,
        popupTitle: '',
        isResultBack: true,
        autoFlag: false,
        vocationType: 'applicant',
        isLeave: false,
        routerLeave: null,
        isCertificateModalShow: false, // 加载上传组件
        applicantCertificate: { // 用装载上传模块组件回传的数据  投保人
          front: {},
          back: {}
        },
        canInsure: true,
      }
    },
    methods: {
      // 页面数据格式化
      totalFormData () {
        let { insure_plan, applicant, insured, renewal_info, beneficiary } = this.formValue;
        return {
          applicant: {
            name: applicant.name.default,
            certificate: {
              type: applicant.certificate.type.default,
              number: applicant.certificate.number.default,
            },
            birthday: applicant.birthday.default,
            gender: applicant.gender.default,
            personal_address: {
              province: applicant.personal_address.province.default.id,
              city: applicant.personal_address.city.default.id,
              area: applicant.personal_address.area.default ? applicant.personal_address.area.default.id : '',
              detail: applicant.personal_address.detail.default,
            },
            email: applicant.email.default,
            mobile: applicant.mobile.default,
          },
          insured: {
            health_inform_no: this.$router.query && this.$router.query.health_inform_no || '',
            health_inform_status: this.$router.query && this.$router.query.health_inform_status || '',
            relation: insured.relation.default,
            name: insured.name.default,
            certificate: {
              type: insured.certificate.type.default,
              number: insured.certificate.number.default,
            },
            birthday: insured.birthday.default,
            gender: insured.gender.default,
            mobile: insured.mobile.default,
            social_security: insured.social_security.default,
            // personal_address: {
            //   province: insured.personal_address.province.default.id,
            //   city: insured.personal_address.city.default.id,
            //   area: insured.personal_address.area.default ? insured.personal_address.area.default.id : '',
            //   detail: insured.personal_address.detail.default
            // }
          },
          insure_plan: {
              guarantee_period: insure_plan.guarantee_period.default,
              guarantee_quota: insure_plan.guarantee_quota.default,
              payment_period: insure_plan.payment_period.default,
              scheme: insure_plan.scheme.default,
              additional_insurance_00003: insure_plan.additional_insurance_00003.default
            },
          product_id: this.product_id
        }
      }
    }
  }
</script>
<style>
  .vux-cell-placeholder {
    color: #999;
  }

  .main-content-item-content .vux-datetime {
    height: 20px;
    width: 100%;
    line-height: 20px;
  }

  .weui-select {
    height: auto !important;
    line-height: inherit !important;
  }

  .error .vux-cell-value {
    color: red !important;
  }

  .error .vux-cell-placeholder {
    color: red !important;
  }

  .vux-popup-dialog {
    background-color: #fff !important;
  }

  .info-datetime .weui-cell__ft {
    text-align: left !important;
  }

  .info-datetime .vux-cell-value {
    color: #000 !important;
  }
</style>
<style scoped>
  @import url('./insure-info.css');
</style>
