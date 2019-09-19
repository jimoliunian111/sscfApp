<template>
  <div class="beneficiary-module">
    <div class="main no-padding-top">
      <div class="beneficiary-info validate-wrap">
        <div class="main-title information">
          <i class="icon iconfont label-icon">&#xe603;</i>受益人信息
        </div>
        <div class="main-content">
          <div class="main-content-item">
            <div class="main-content-item-title">受益人</div>
            <div class="main-content-item-content">
              <div class="main-content-item-content-radio" :class="{ cur: item.value === beneficiary.type.default }"
                v-for="item in beneficiary.type.items" :key="item.value" @click="changeBeneficiary(item.value)">
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
       <template v-if="beneficiary.type.default === 2">
       <div class="beneficiary-item" v-for="(item, index) in beneficiary.default" :key="index">
          <div class="main-title assurer pr">
            <span>受益人{{ index + 1 }}</span>
            <span class="beneficiary-close-button" @click="beneficiaryRemove(index)">&times;</span>
          </div>
          <div class="main-content">
            <div class="main-content-item">
              <div class="main-content-item-title long-title">受益人是被保人</div>
              <div class="main-content-item-content" :class="{ error: !beneficiaryPlaceholdersArray[index].relation.isValidate }">
                <div class="main-content-item-content-select">
                  <select :class="{ selected: item.relation }" v-model="item.relation">
                    <option value="" disabled>请选择</option>
                    <option v-for="item in beneficiary.relation.items" :key="item.value" :value="item.value">
                      {{ item.label }}
                    </option>
                  </select>
                </div>
                <img class="arrow-right-icon" src="../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">受益人姓名</div>
              <div class="main-content-item-content" :class="{ error: !beneficiaryPlaceholdersArray[index].name.isValidate }">
                <input type="text" class="validate-input" @blur="beneficiaryFormChange('name', item.name, index)"
                  v-model="item.name" :placeholder="beneficiaryPlaceholdersArray[index].name.name">
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">证件类型</div>
              <div class="main-content-item-content">
                <div class="main-content-item-content-radio" :class="{ cur: certificateItem.value == item.certificate.type }"
                  v-for="certificateItem in beneficiary.certificate.type.items" :key="certificateItem.value"
                  @click="changeBeneficiaryCertificateType(certificateItem.value, index)">
                  {{ certificateItem.label }}
                </div>
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">证件号码</div>
              <div class="main-content-item-content" :class="{ error: !beneficiaryPlaceholdersArray[index].certificate_number.isValidate }">
                <input type="text" class="validate-input" @blur="beneficiaryRecognize(item.certificate.number, index)"
                  v-model="item.certificate.number" :placeholder="beneficiaryPlaceholdersArray[index].certificate_number.name">
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">起效时间</div>
              <div class="main-content-item-content">
                <datetime v-model="item.certificate.valid_start_at" :class="{ error: !beneficiaryPlaceholdersArray[index].certificate_valid_start_at.isValidate }"
                  class="datetime info-datetime" placeholder="请选择起效时间" @on-change="beneficiaryFormChange('certificate_valid_start_at', item.certificate.valid_start_at, index)"></datetime>
                <img class="arrow-right-icon" src="../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
              </div>
            </div>
    
            <div class="main-content-item">
              <div class="main-content-item-title">失效时期</div>
              <div class="main-content-item-content">
                <div class="main-content-item-content-radio" :class="{ cur: (calcAge(item.birthday) >= 46 && endTime.value === 1) 
                                   || (calcAge(item.birthday) < 46 && endTime.value === 0) }"
                  v-for="(endTime, endTimeIdx) in insuredCertificateValid.is_long_term" :key="endTime.value" @click="changeBeneficiaryEndTimeType(endTime.value, index)">
                  {{ endTime.label }}
                </div>
              </div>
            </div>
    
            <div class="main-content-item" v-if="calcAge(item.birthday) < 46">
              <div class="main-content-item-title">失效时间</div>
              <div class="main-content-item-content" :class="{ error: !beneficiaryPlaceholdersArray[index].certificate_valid_end_at.isValidate }">
                <datetime v-model="item.certificate.valid_end_at" class="datetime info-datetime" placeholder="请选择失效时间"
                  @on-change="beneficiaryFormChange('certificate_valid_end_at', item.certificate.valid_end_at, index)"></datetime>
                <img class="arrow-right-icon" src="../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">受益比例</div>
              <div class="main-content-item-content" :class="{ error: !beneficiaryPlaceholdersArray[index].benefit_percent.isValidate }">
                <div class="main-content-item-content-select">
                  <select v-model="item.benefit_percent">
                    <option value="0" disabled>请选择（受益比例和为100%）</option>
                    <option v-for="item in percentFromat(100 - benefitPercent + item.benefit_percent)" :key="item.value"
                      :value="item.value">
                      {{ item.label }}
                    </option>
                  </select>
                </div>
                <img class="arrow-right-icon" src="../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
              </div>
            </div>
            <!-- <div class="main-content-item" v-if="beneficiaryPlaceholdersArray[index].isCertificatePass">
              <div class="main-content-item-title">出生日期</div>
              <div class="main-content-item-content">
                <span v-if="item.certificate.type == 1">{{ item.birthday }}</span>
              </div> 
            </div> -->
            <!-- <div class="main-content-item" v-if="beneficiaryPlaceholdersArray[index].isCertificatePass">
              <div class="main-content-item-title">性别</div>
              <div class="main-content-item-content">
                <div class="main-content-item-content-radio"
                    :class="{ cur: genderItem.value == item.gender }"
                    v-for="genderItem in formValue.beneficiary.gender.items"
                    :key="genderItem.value">
                    {{ genderItem.label }}
                </div>
              </div> 
            </div> -->
          </div>
        </div>
        <div class="add-beneficiary" v-if="isAddBeneficiary" @click="addBeneficiary">
          <x-icon type="ios-plus-empty" size="20" style="fill: #fff;"></x-icon>
          添加受益人（最多可添加三人）
        </div>
      </template>
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
import { calcAge } from '@/utils/common-utils';
import { wapValidate } from '@/utils/apis';
const beneficiaryPlaceholders = {
  relation: {
    name: '请选择受益人关系',
    isValidate: true
  },
  name: {
    name: '请输入受益人姓名',
    isValidate: true
  },
  certificate_number: {
    name: '请输入证件号码',
    isValidate: true
  },
  birthday: {
    name: '请输入生日',
    isValidate: true
  },
  certificate_valid_start_at: {
    name: '请选择起效时间',
    isValidate: true
  },
  certificate_valid_end_at: {
    name: '请选择失效时间',
    isValidate: true
  },
  benefit_percent: {
    name: '请选择比例',
    isValidate: true
  },
  isCertificatePass: false
};
export default {
  name: 'beneficiary-module',
  props: {
    beneficiary: {
      type: Object
    },
    formData: {
      type: Object
    },
    product_id: {
      type: [Number, String]
    }
  },
  data () {
    return {
      beneficiaryPlaceholdersArray: []
    }
  },
  components: {
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
  },
  methods: {
    calcAge,
    // 受益人身份证校验
    beneficiaryRecognize(value, index) {
      if (!value) return;
      const data = {
        number: value
      };

      wapRecognize([], data)
        .then(res => {
          const data = res.data.data;
          if (data.number) {
            this.beneficiaryPlaceholdersArray[index].certificate_number.name = data.number[0];
            this.beneficiaryPlaceholdersArray[index].certificate_number.isValidate = false;

            this.beneficiaryPlaceholdersArray[index].isCertificatePass = false;

            this.$vux.toast.show({
              text: data.number[0],
              type: 'text'
            });
          } else {
            this.beneficiaryPlaceholdersArray[index].certificate_number.name = beneficiaryPlaceholders.certificate_number
              .name;
            this.beneficiaryPlaceholdersArray[index].certificate_number.isValidate = true;

            this.beneficiary.default[index].birthday = data.birthday;
            this.beneficiary.default[index].gender = data.gender;
            // 华贵新增
            if (calcAge(data.birthday) >= 46) {
              this.beneficiary.default[index].certificate.is_long_term = 1
            } else {
              this.beneficiary.default[index].certificate.is_long_term = 0
            }
            this.beneficiaryFormChange('certificate_number', value, index);
            this.beneficiaryPlaceholdersArray[index].isCertificatePass = true;
          }
        })
        .catch(err => console.log(err));
    },
    // 受益人校验单独控制
    beneficiaryFormChange (type, value, index) {
      console.log('type, value, index', type, value, index)
      if (!value) return;
    
      let data = {
        ...this.formData,
        product_id: this.product_id
      };
    
      wapValidate([], data).then(res => {
        console.log('7777', res.data.data, value, index, type)
        const data = res.data.data;
        const bf = data.beneficiary_items[index][type];
        if (bf && bf.length) {
          this.beneficiaryPlaceholdersArray[index][type].name = bf[0];
          this.beneficiaryPlaceholdersArray[index][type].isValidate = false;
          this.$vux.toast.show({
            text: bf[0],
            type: 'text'
          });
        } else {
          this.beneficiaryPlaceholdersArray[index][type].name = beneficiaryPlaceholders.name.name;
          this.beneficiaryPlaceholdersArray[index][type].isValidate = beneficiaryPlaceholders.certificate_number.name;
          // 华贵新增
          this.beneficiaryPlaceholdersArray[index][type].name = beneficiaryPlaceholders[type].name;
          this.beneficiaryPlaceholdersArray[index][type].isValidate = beneficiaryPlaceholders[type].isValidate;
        }
      })
    },
    // 比例转为比例options
    percentFromat(percent) {
      let data = [];
    
      for (let i = percent; i >= 10; i = i - 10) {
        data.push({
          label: `${i}%`,
          value: i
        });
      }
    
      return data;
    },
    addBeneficiary () { // 添加受益人按钮
      let beneficiaryItem = {
        benefit_percent: 0,
        birthday: '',
        certificate: {
          number: '',
          type: 1,
          is_long_term: 1,
          valid_end_at: '',
          valid_start_at: ''
        },
        gender: 1,
        relation: '',
        name: ''
      }
      this.beneficiary.default.push(beneficiaryItem);
    
      this.beneficiaryPlaceholdersArray.push(JSON.parse(JSON.stringify(beneficiaryPlaceholders)));
    },
    beneficiaryRemove(index) { // 删除受益人按钮
      let self = this;
      console.log('aaaaaaaaaaaaaaaa', index)
      if (this.beneficiary.default.length === 1) {
        this.$vux.confirm.show({
          title: '提示',
          content: '是否重置受益人',
          onConfirm(msg) {
            self.beneficiary.default = [];
            self.beneficiaryPlaceholdersArray = [];
            self.addBeneficiary()
          }
        });
        return
      }
      this.$vux.confirm.show({
        title: '提示',
        content: '是否删除该受益人',
        onConfirm(msg) {
          self.beneficiary.default.splice(index, 1);
          self.beneficiaryPlaceholdersArray.splice(index, 1);
        }
      });
    },
    changeBeneficiary (type) { 
      this.beneficiary.type.default = type;
    
      if (type === 1) {
        this.beneficiary.default = [];
        this.beneficiaryPlaceholdersArray = [];
      } else {
        this.beneficiary.default = [];
        this.beneficiaryPlaceholdersArray = [];
        this.addBeneficiary()
      }
    }
  },
  created () {
    if (this.beneficiary.default.length > 0) {
      for (let i = 0; i < this.beneficiary.default.length; i++) {
        this.beneficiaryPlaceholdersArray.push(JSON.parse(JSON.stringify(beneficiaryPlaceholders)));
      }
    }
  },
  computed: {
    // 是否显示增加受益人
    isAddBeneficiary() {
      if (this.benefitPercent === 100) return false;
      if (this.beneficiary.default.length >= 3) return false;
      return true;
    },
    insuredCertificateValid () {
      let active = this.beneficiary.certificate.type.default;
      return this.beneficiary.certificate.type.items.filter(item => item.value === active)[0];
    },
    // 受益人比例
    benefitPercent() {
      return this.beneficiary.default.reduce((prev, next) => (prev + +next.benefit_percent), 0);
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {

    })
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';
</style>
<style>
@import './index.css'
</style>