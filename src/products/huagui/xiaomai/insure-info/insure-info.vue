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
            <div class="main-content-item">
              <div class="main-content-item-title">保障期限</div>
              <div class="main-content-item-content">
                {{formValue.insure_plan.guarantee_period.items.find(item => item.value === +formValue.insure_plan.guarantee_period.default).label}}
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">保障额度</div>
              <div class="main-content-item-content">{{ formValue.insure_plan && formValue.insure_plan.guarantee_quota.default / 10000}}万</div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">缴费期限</div>
              <div class="main-content-item-content" v-if="formValue.insure_plan && formValue.insure_plan.payment_period.default.unit == 3">
                {{ formValue.insure_plan.payment_period.default.value }}年交
              </div>
              <div class="main-content-item-content" v-if="formValue.insure_plan && formValue.insure_plan.payment_period.default.unit == 4">
                交到{{ formValue.insure_plan && formValue.insure_plan.payment_period.default.value }}周岁
              </div>
              <div class="main-content-item-content" v-if="formValue.insure_plan && formValue.insure_plan.payment_period.default.unit == 5">
                一次性交
              </div>
            </div>

            <div class="main-content-item">
              <div class="main-content-item-title">起保日期</div>
              <div class="main-content-item-content">{{ formValue.insure_plan && formValue.insure_plan.insure_start_at.default }}</div>
            </div>
          </div>
        </div>
        <div class="applicant-info validate-wrap">
          <div class="main-title information">
            <i class="icon iconfont label-icon">&#xe603;</i>投保人信息
          </div>
          <div class="main-content">
            <div class="main-content-item">
              <div class="main-content-item-title">投保人姓名</div>
              <div class="main-content-item-content" :class="{ error: !validatePlaceholders.applicant_name.isValidate }">
                <input type="text" class="validate-input" :class="{ disabled: !isResultBack }" v-if="formValue.applicant"
                  @blur="formChange('applicant_name', formValue.applicant.name.default)" v-model="formValue.applicant.name.default"
                  :placeholder="validatePlaceholders.applicant_name.name">
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">证件类型</div>
              <div class="main-content-item-content">
                <div class="main-content-item-content-radio" :class="{ cur: item.value === formValue.applicant.certificate.type.default, disabled: !isResultBack }"
                  v-if="formValue.applicant" v-for="item in formValue.applicant.certificate.type.items" :key="item.value"
                  @click="certificate_type_change(item.value)">{{ item.label }}</div>
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">证件号码</div>
              <div class="main-content-item-content" :class="{ error: !validatePlaceholders.applicant_certificate_number.isValidate }">
                <input type="text" class="validate-input" v-if="formValue.applicant && formValue.applicant.certificate.type.default === 1"
                  @blur="recognize('applicant_certificate_number', formValue.applicant.certificate.number.default)"
                  v-model="formValue.applicant.certificate.number.default" :placeholder="validatePlaceholders.applicant_certificate_number.name">
                <input type="text" class="validate-input" v-if="formValue.applicant && formValue.applicant.certificate.type.default !== 1"
                  @blur="formChange('applicant_certificate_number', formValue.applicant.certificate.number.default)"
                  v-model="formValue.applicant.certificate.number.default" :placeholder="validatePlaceholders.applicant_certificate_number.name">
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">起效时间</div>
              <div class="main-content-item-content" :class="{ error: !validatePlaceholders.applicant_certificate_valid_start_at.isValidate }">
                <datetime placeholder="请选择起效时间" class="datetime info-datetime" :class="{ disabled: !isResultBack }"
                  v-model="formValue.applicant.certificate.valid_start_at.default" :start-date="applicantCertificateValid.valid_start_at.min"
                  :end-date="applicantCertificateValid.valid_start_at.max" @on-change="dateChange('applicant_certificate_valid_start_at')"></datetime>
                <img class="arrow-right-icon" src="../../../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">失效时期</div>
              <div class="main-content-item-content">
                <div class="main-content-item-content-radio certificate-default-radio" v-for="item in applicantCertificateValid.is_long_term"
                  :key="item.value" :class="{ cur:  formValue.applicant.certificate.is_long_term.default === item.value }"
                  @click="change_failure_time_type(item.value, 'applicant')">{{ item.label }}</div>
              </div>
            </div> 
            <div class="main-content-item" v-if="calcAge(formValue.applicant.birthday.default) < 46 && formValue.applicant.certificate.type.default === 1">
              <div class="main-content-item-title">失效时间</div>
              <div class="main-content-item-content" :class="{ error: !validatePlaceholders.applicant_certificate_valid_end_at.isValidate}">
                <datetime class="datetime info-datetime" :class="{ disabled: !isResultBack }" v-model="formValue.applicant.certificate.valid_end_at.default"
                  :start-date="applicantCertificateValid.valid_end_at.min" :end-date="applicantCertificateValid.valid_end_at.max"
                  placeholder="请选择失效时间" @on-change="dateChange('applicant_certificate_valid_end_at')"></datetime>
                <img class="arrow-right-icon" src="../../../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
              </div>
            </div>
            <div class="main-content-item">
              <!--  v-if="formValue.applicant.birthday.default && isApplicationCertificatePass" -->
              <div class="main-content-item-title">出生日期</div>
              <div class="main-content-item-content" :class="{ error: !validatePlaceholders.applicant_birthday.isValidate }">
                <span v-if="!validatePlaceholders.applicant_birthday.isValidate">{{validatePlaceholders.applicant_birthday.name}}</span>
                <span v-else>{{ formValue.applicant.birthday.default }}</span>
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">性别</div>
              <div class="main-content-item-content">
                <!-- 分为两种情况： 身份证 和 护照 -->
                <div class="main-content-item-content-radio" v-if="formValue.applicant.certificate.type.default === 1"
                  v-for="item in formValue.applicant.gender.items" :key="item.value" :class="{ cur: item.value == formValue.applicant.gender.default }">{{ item.label }}</div>
                <div class="main-content-item-content-radio" v-if="formValue.applicant.certificate.type.default !== 1"
                  v-for="item in formValue.applicant.gender.items" :key="item.value" :class="{ cur: item.value == formValue.applicant.gender.default }"
                  @click="changeGender(item.value)">{{ item.label }}</div>
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">手机号码</div>
              <div class="main-content-item-content" :class="{ error: !validatePlaceholders.applicant_mobile.isValidate }">
                <input type="text" class="validate-input" :class="{ disabled: !isResultBack }" v-if="formValue.applicant"
                  @blur="formChange('applicant_mobile', formValue.applicant.mobile.default)" v-model="formValue.applicant.mobile.default"
                  :placeholder="validatePlaceholders.applicant_mobile.name">
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">所在地区</div>
              <div class="main-content-item-content" @click="showRegionModule">
                <!-- <span>{{ applicantyCityBelone }}</span> -->
                <span v-if="formValue.applicant.personal_address.province.default.id">
                  {{formValue.applicant.personal_address.province.default.name + '-' + formValue.applicant.personal_address.city.default.name + '-' + 
                    formValue.applicant.personal_address.area.default.name
                  }}
                </span>
                <span v-else>请选择所在地区</span>
                <img class="arrow-right-icon" src="../../../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">详细地址</div>
              <div class="main-content-item-content" :class="{ error: !validatePlaceholders.applicant_personal_address_detail.isValidate }">
                <input type="text" class="validate-input" :class="{ disabled: !isResultBack  }" v-if="formValue.applicant"
                  @blur="formChange('applicant_personal_address_detail', formValue.applicant.personal_address.detail.default)"
                  v-model="formValue.applicant.personal_address.detail.default" :placeholder="validatePlaceholders.applicant_personal_address_detail.name">
              </div>
            </div>

            <div class="main-content-item">
              <div class="main-content-item-title">通讯邮编</div>
              <div class="main-content-item-content" :class="{ error: !validatePlaceholders.applicant_personal_address_zip_code.isValidate }">
                <input type="text" class="validate-input" :class="{ disabled: !isResultBack  }" v-if="formValue.applicant"
                  @blur="formChange('applicant_personal_address_zip_code', formValue.applicant.personal_address.zip_code.default)"
                  v-model="formValue.applicant.personal_address.zip_code.default" :placeholder="validatePlaceholders.applicant_personal_address_zip_code.name">
              </div>
            </div>
            <div class="main-content-item pr">
              <div class="main-content-item-title">电子邮箱</div>
              <div class="main-content-item-content" :class="{ error: !validatePlaceholders.applicant_email.isValidate }">
                <input type="text" class="validate-input" :class="{ disabled: !isResultBack  }" v-if="formValue.applicant"
                  @blur="autoChange('applicant_email', formValue.applicant.email.default)" @input="emailTaping" v-model="formValue.applicant.email.default"
                  :placeholder="validatePlaceholders.applicant_email.name">
              </div>
              <ul class="email-lists" v-if="isAutoComplateShow" style="display: block;">
                <li class="email-lists-item" v-for="(item, index) in emailSuffix" :key="index" @click="autoComplate($event, item)">{{ formValue.applicant.email.default }}{{ item }}</li>
              </ul>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">职业</div>
              <div class="main-content-item-content" @click="searchVocation('applicant')" :class="{ error: !validatePlaceholders.applicant_profession_name.isValidate }">
                <span v-if="!formValue.applicant.profession.default.id" class="placeholder">请选择，仅限可选职业投保</span>
                <span v-else>{{ formValue.applicant.profession.default.name }}</span>
                <img class="arrow-right-icon" src="../../../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="assurer-info validate-wrap">
          <div class="main-title information">
            <i class="icon iconfont label-icon">&#xe603;</i>被保人信息
          </div>
          <div class="main-content">
            <div class="main-content-item">
              <div class="main-content-item-title">为谁投保</div>
              <div class="main-content-item-content" :class="{ error: !validatePlaceholders.insured_relation.isValidate }">
                <div class="main-content-item-content-select">
                  <!-- @change="relationChange('insured_relation', formValue.insured.relation.default)" -->
                  <!-- @change="relationFunc(formValue.insured.relation.default, 'insured_relation')" -->
                  <select :class="{ selected: formValue.insured.relation.default }"
                    @change="relationFunc(formValue.insured.relation.default, 'insured_relation')"
                    v-model="formValue.insured.relation.default">
                    <option value="" disabled>请选择为谁投保</option>
                    <option v-for="item in formValue.insured.relation.items" :key="item.value" :value="item.value">
                      {{ item.label }}
                    </option>
                  </select>
                </div>
                <img class="arrow-right-icon" src="../../../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
              </div>

            </div>
            <template v-if="formValue.insured.relation.default !== 1">
              <div class="main-content-item">
                <div class="main-content-item-title">被保人姓名</div>
                <div class="main-content-item-content" :class="{ error: !validatePlaceholders.insured_name.isValidate }">
                  <input type="text" class="validate-input" :class="{ disabled: !isResultBack }" v-if="formValue.insured"
                    @blur="formChange('insured_name', formValue.insured.name.default)" v-model="formValue.insured.name.default"
                    :placeholder="validatePlaceholders.insured_name.name">
                </div>
              </div>
              <div class="main-content-item" v-if="formValue.insured.relation.default != 1">
                <div class="main-content-item-title">证件类型</div>
                <div class="main-content-item-content">
                  <div class="main-content-item-content-radio" :class="{ cur: item.value === formValue.insured.certificate.type.default, disabled: !isResultBack }"
                    v-if="formValue.insured" v-for="item in formValue.insured.certificate.type.items" :key="item.value"
                    @click="insured_certificate_type_change(item.value)">{{ item.label }}</div>
                </div>
              </div>
              <div class="main-content-item" v-if="formValue.insured.relation.default != 1">
                <div class="main-content-item-title">证件号码</div>
                <div class="main-content-item-content" :class="{ error: !validatePlaceholders.insured_certificate_number.isValidate }">
                  <input type="text" class="validate-input" :class="{ disabled: !isResultBack  }" v-if="formValue.insured && formValue.insured.certificate.type.default === 1"
                    @blur="recognize('insured_certificate_number', formValue.insured.certificate.number.default)"
                    v-model="formValue.insured.certificate.number.default" :placeholder="validatePlaceholders.insured_certificate_number.name">
                  <input type="text" class="validate-input" :class="{ disabled: !isResultBack  }" v-if="formValue.insured && formValue.insured.certificate.type.default !== 1"
                    @blur="formChange('insured_certificate_number', formValue.insured.certificate.number.default)"
                    v-model="formValue.insured.certificate.number.default" :placeholder="validatePlaceholders.insured_certificate_number.name">
                </div>
              </div>
              <div class="main-content-item" v-if="formValue.insured.certificate.type.default === 1 && formValue.insured.relation.default != 1">
                <div class="main-content-item-title">起效时间</div>
                <div class="main-content-item-content" :class="{ error: !validatePlaceholders.insured_certificate_valid_start_at.isValidate, disabled: !isResultBack  }">
                  <datetime v-model="formValue.insured.certificate.valid_start_at.default" class="datetime info-datetime"
                    :start-date="insuredCertificateValid.valid_start_at.min" :end-date="insuredCertificateValid.valid_start_at.max"
                    placeholder="请选择起效时间" @on-change="dateChange('insured_certificate_valid_start_at')"></datetime>
                  <img class="arrow-right-icon" src="../../../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
                </div>
              </div>
              <div class="main-content-item">
                <div class="main-content-item-title">失效时期</div>
                <div class="main-content-item-content">
                  <div class="main-content-item-content-radio certificate-default-radio" v-for="item in insuredCertificateValid.is_long_term"
                    :key="item.value" :class="{ cur: formValue.insured.certificate.is_long_term.default === item.value }"
                    @click="change_failure_time_type(item.value, 'insured')">{{ item.label }}</div>
                </div>
              </div>
              <div class="main-content-item" v-if="formValue.insured.certificate.type.default === 1 && 
                 formValue.insured.certificate.is_long_term.default !== 1 &&
                 formValue.insured.relation.default != 1">
                <div class="main-content-item-title">失效时间</div>
                <div class="main-content-item-content" :class="{ error: !validatePlaceholders.insured_certificate_valid_end_at.isValidate }">
                  <datetime v-model="formValue.insured.certificate.valid_end_at.default" class="datetime info-datetime"
                    :class="{ disabled: !isResultBack  }" :start-date="insuredCertificateValid.valid_end_at.min"
                    :end-date="insuredCertificateValid.valid_end_at.max" placeholder="请选择失效时间" @on-change="dateChange('insured_certificate_valid_end_at')"></datetime>
                  <img class="arrow-right-icon" src="../../../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
                </div>
              </div>
              <div class="main-content-item">
                <div class="main-content-item-title">出生日期</div>
                <div class="main-content-item-content" :class="{ error: !validatePlaceholders.insured_birthday.isValidate}">
                  <span v-if="formValue.insured.certificate.type.default === 1">{{ formValue.insured.birthday.default }}</span>
                  <datetime v-model="formValue.insured.birthday.default" class="datetime info-datetime" :class="{ disabled: !isResultBack  }"
                    v-else :start-date="formValue.insured.birthday.max" :end-date="formValue.insured.birthday.min"
                    placeholder="请选择出生日期" @on-change="dateChange('insured_birthday')"></datetime>
                  <img class="arrow-right-icon" v-if="formValue.insured.certificate.type.default !== 1" src="../../../../assets/image/sinosig/wddg/arr-right-icon.png"
                    alt="">
                </div>
              </div>
              <div class="main-content-item">
                <div class="main-content-item-title">性别</div>
                <div class="main-content-item-content">
                  <div class="main-content-item-content-radio" v-if="formValue.insured.certificate.type.default === 1"
                    v-for="item in formValue.insured.gender.items" :key="item.value" :class="{ cur: item.value == formValue.insured.gender.default }">{{ item.label }}</div>
                  <div class="main-content-item-content-radio" v-if="formValue.insured.certificate.type.default !== 1"
                    v-for="item in formValue.insured.gender.items" :key="item.value" :class="{ cur: item.value == formValue.insured.gender.default, disabled: !isResultBack  }"
                    @click="changeGender(item.value)">{{ item.label }}</div>
                </div>
              </div>
              <div class="main-content-item">
                <div class="main-content-item-title">手机号码</div>
                <div class="main-content-item-content" :class="{ error: !validatePlaceholders.insured_mobile.isValidate }">
                  <input type="text" class="validate-input" v-if="formValue.insured" @blur="formChange('insured_mobile', formValue.insured.mobile.default)"
                    v-model="formValue.insured.mobile.default" :placeholder="validatePlaceholders.insured_mobile.name">
                </div>
              </div>
              <div class="main-content-item">
                <div class="main-content-item-title">所在地区</div>
                <div class="main-content-item-content">
                  <span>{{ cityBelone }}</span>
                </div>
              </div>
              <div class="main-content-item">
                <div class="main-content-item-title">详细地址</div>
                <div class="main-content-item-content" :class="{ error: !validatePlaceholders.insured_personal_address_detail.isValidate }">
                  <input type="text" class="validate-input" v-if="formValue.insured" @blur="formChange('insured_personal_address_detail', formValue.insured.personal_address.detail.default)"
                    v-model="formValue.insured.personal_address.detail.default" :placeholder="validatePlaceholders.insured_personal_address_detail.name">
                </div>
              </div>
            </template>
            <div class="main-content-item">
              <div class="main-content-item-title">有无社保</div>
              <div class="main-content-item-content">
                <div class="main-content-item-content-radio" v-if="formValue.insured.certificate.type.default === 1"
                  v-for="item in formValue.insured.social_security.items" :key="item.value" :class="{ cur: item.value == formValue.insured.social_security.default }">{{ item.label }}</div>
                <div class="main-content-item-content-radio" v-if="formValue.insured.certificate.type.default !== 1"
                  v-for="item in formValue.insured.social_security.items" :key="item.value" :class="{ cur: item.value == formValue.insured.social_security.default }"
                  @click="changeInsuredSocial(item.value)">{{ item.label }}</div>
              </div>
            </div>
            <div class="main-content-item" v-if="formValue.insured.relation.default !== 1">
              <div class="main-content-item-title">职业</div>
              <div class="main-content-item-content">
                <span>{{ formValue.insured.profession.default.name || '' }}</span>
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">身高(cm)</div>
              <div class="main-content-item-content" :class="{ error: !validatePlaceholders.insured_height.isValidate }">
                <input type="text" class="validate-input" v-if="formValue.insured" @blur="formChange('insured_height', formValue.insured.height.default)"
                  v-model="formValue.insured.height.default" :placeholder="validatePlaceholders.insured_height.name">
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">体重(kg)</div>
              <div class="main-content-item-content" :class="{ error: !validatePlaceholders.insured_weight.isValidate }">
                <input type="text" class="validate-input" v-if="formValue.insured" @blur="formChange('insured_weight', formValue.insured.weight.default)"
                  v-model="formValue.insured.weight.default" :placeholder="validatePlaceholders.insured_weight.name">
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">年收入(万元)</div>
              <div class="main-content-item-content" :class="{ error: !validatePlaceholders.insured_annual_income.isValidate }">
                <input type="text" class="validate-input" v-if="formValue.insured" @blur="formChange('insured_annual_income', formValue.insured.annual_income.default)"
                  v-model="formValue.insured.annual_income.default" :placeholder="validatePlaceholders.insured_annual_income.name">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main no-padding-top">
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
        <template v-if="formValue.beneficiary.type.default === 2">
          <div class="beneficiary-item" v-for="(item, index) in formValue.beneficiary.default" :key="index">
            <div class="main-title assurer pr">
              <span>受益人{{ index + 1 }}</span>
              <span class="beneficiary-close-button" @click="beneficiaryRemove(index)">&times;</span>
            </div>
            <div class="main-content">
              <div class="main-content-item">
                <div class="main-content-item-title long-title">受益人是被保人</div>
                <div class="main-content-item-content" :class="{ error: !beneficiaryPlaceholdersArray[index].relation.isValidate }">
                  <div class="main-content-item-content-select">
                    <!-- @change="beneficiaryFormChange('relation', item.relation, index)" -->
                    <select :class="{ selected: item.relation, disabled: !isResultBack  }" v-model="item.relation">
                      <option value="" disabled>请选择</option>
                      <option v-for="item in formValue.beneficiary.relation.items" :key="item.value" :value="item.value">
                        {{ item.label }}
                      </option>
                    </select>
                  </div>
                  <img class="arrow-right-icon" src="../../../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
                </div>
              </div>
              <div class="main-content-item">
                <div class="main-content-item-title">受益人姓名</div>
                <div class="main-content-item-content" :class="{ error: !beneficiaryPlaceholdersArray[index].name.isValidate }">
                  <input type="text" class="validate-input" :class="{ disabled: !isResultBack  }" @blur="beneficiaryFormChange('name', item.name, index)"
                    v-model="item.name" :placeholder="beneficiaryPlaceholdersArray[index].name.name">
                </div>
              </div>
              <div class="main-content-item">
                <div class="main-content-item-title">证件类型</div>
                <div class="main-content-item-content">
                  <div class="main-content-item-content-radio" :class="{ cur: certificateItem.value == item.certificate.type }"
                    v-for="certificateItem in formValue.beneficiary.certificate.type.items" :key="certificateItem.value"
                    @click="changeBeneficiaryCertificateType(certificateItem.value, index)">
                    {{ certificateItem.label }}
                  </div>
                </div>
              </div>
              <div class="main-content-item">
                <div class="main-content-item-title">证件号码</div>
                <div class="main-content-item-content" :class="{ error: !beneficiaryPlaceholdersArray[index].certificate_number.isValidate }">
                  <input type="text" class="validate-input" :class="{ disabled: !isResultBack  }" @blur="beneficiaryRecognize(item.certificate.number, index)"
                    v-model="item.certificate.number" :placeholder="beneficiaryPlaceholdersArray[index].certificate_number.name">
                </div>
              </div>
              <div class="main-content-item">
                <div class="main-content-item-title">起效时间</div>
                <div class="main-content-item-content">
                  <datetime v-model="item.certificate.valid_start_at" :class="{ error: !beneficiaryPlaceholdersArray[index].certificate_valid_start_at.isValidate }"
                  :end-date="item.certificate.valid_start_at_max"
                    class="datetime info-datetime" placeholder="请选择起效时间" @on-change="beneficiaryFormChange('certificate_valid_start_at', item.certificate.valid_start_at, index)"></datetime>
                  <img class="arrow-right-icon" src="../../../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
                </div>
              </div>

              <div class="main-content-item">
                <div class="main-content-item-title">失效时期</div>
                <div class="main-content-item-content">
                  <!-- :class="{ cur: endTime.value == item.certificate.is_long_term }" -->
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
                    :start-date="item.certificate.valid_end_at_min"
                    @on-change="beneficiaryFormChange('certificate_valid_end_at', item.certificate.valid_end_at, index)"></datetime>
                  <img class="arrow-right-icon" src="../../../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
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
              <div class="main-content-item">
                <div class="main-content-item-title">受益比例</div>
                <div class="main-content-item-content" :class="{ error: !beneficiaryPlaceholdersArray[index].benefit_percent.isValidate }">
                  <div class="main-content-item-content-select">
                    <select :class="{ disabled: !isResultBack  }" v-model="item.benefit_percent" @change="percentChange(index)">
                      <option value="0" disabled>请选择（受益比例和为100%）</option>
                      <option v-for="item in percentFromat(100 - benefitPercent + item.benefit_percent)" :key="item.value"
                        :value="item.value">
                        {{ item.label }}
                      </option>
                    </select>
                  </div>
                  <img class="arrow-right-icon" src="../../../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="add-beneficiary" v-if="isAddBeneficiary" @click="addBeneficiary">
            <x-icon type="ios-plus-empty" size="20" style="fill: #fff;"></x-icon>
            添加受益人（最多可添加三人）
          </div>
        </template>
      </div>
      <div class="main no-padding-top padding-bottom-footer validate-wrap">
        <div class="renewal-account">
          <div class="main-title renewal">
            <i class="icon iconfont label-icon">&#xe601;</i>
            续期账户信息</div>
          <div class="main-content">
            <div class="main-content-item">
              <div class="main-content-item-title">账户开户名</div>
              <div class="main-content-item-content" :class="{error: !validatePlaceholders.renewal_info_account_name.isValidate}">
                <input type="text" class="validate-input" v-if="formValue.renewal_info" :class="{disabled: true}"
                  @blur="formChange('renewal_info_account_name', formValue.renewal_info.account_name.default)" v-model="formValue.renewal_info.account_name.default"
                  :placeholder="validatePlaceholders.renewal_info_account_name.name">
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">身份证号</div>
              <div class="main-content-item-content" :class="{ error: !validatePlaceholders.renewal_info_id_card_number.isValidate }">
                <input type="text" class="validate-input" v-if="formValue.renewal_info" :class="{disabled: true}"
                  @blur="formChange('renewal_info_id_card_number', formValue.renewal_info.id_card_number.default)"
                  v-model="formValue.renewal_info.id_card_number.default" :placeholder="validatePlaceholders.renewal_info_id_card_number.name">
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">开户银行</div>
              <div class="main-content-item-content" :class="{ error: !validatePlaceholders.renewal_info_account_bank_code.isValidate }">
                <div class="main-content-item-content-select" v-if="bankList.length > 0">
                  <select @change="formChange('renewal_info_account_bank_code', formValue.renewal_info.account_bank.default.code)"
                    v-model="formValue.renewal_info.account_bank.default.code"
                    class="account-bank-select"
                    :class="{ selected: formValue.renewal_info.account_bank.default.code, disabled: !isResultBack  }">
                    <option value="">请选择开户银行</option>
                    <option v-for="item in formValue.renewal_info.account_bank.items" :key="item.code" :value="item.code">{{ item.name }}</option>
                  </select>
                </div>
                <img class="arrow-right-icon" src="../../../../assets/image/sinosig/wddg/arr-right-icon.png" alt="">
              </div>
            </div>
            <div class="main-content-item">
              <div class="main-content-item-title">借记卡卡号</div>
              <div class="main-content-item-content" :class="{ error: !validatePlaceholders.renewal_info_debit_card_number.isValidate }">
                <input class="validate-input debit-card-input" :class="{ disabled: !isResultBack  }" type="text" v-if="formValue.renewal_info"
                  @blur="formChange('renewal_info_debit_card_number', formValue.renewal_info.debit_card_number.default)"
                  v-model="formValue.renewal_info.debit_card_number.default" :placeholder="validatePlaceholders.renewal_info_debit_card_number.name">
              </div>
            </div>
          </div>
        </div>
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
      <!-- <certificate-upload :isCertificateModalShow="isCertificateModalShow"
                          :isForSelf="!!+formValue.insure_plan.insure_for_self.default"
                          :productId="product_id"
                          v-model="formValue"
                          @upload="certificateUpload"
                          @close="certificateModalClose">
      </certificate-upload>  -->
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
        <popup v-model="isVocationShow" position="right" @on-hide="vocationClose">
          <vocation :prevVocation="prevVocation" :vocationSelected="vocationSelected" :vocationSearchNumber="vocationSearchNumber" :maxLeval="10000"
            :vocationList="vocationList" :vocationType="vocationType" :productId="product_id" selectable=true
            @vocationFetch="vocationFetch" @vocationShow="vocationShow" @vocationBack="vocationBack" @selectItem="selectItem"></vocation>
        </popup>
      </div>
      <div v-transfer-dom>
        <confirm v-model="isLeave" @on-cancel="onCancel" @on-confirm="onConfirm">
          <p style="text-align:center;">返回后不保存当前页面</p>
        </confirm>
      </div>
      <div v-transfer-dom>
        <popup v-model="selectPlaceShow" position="bottom" @on-hide="selectPlaceHide" should-scroll-top-on-show>
          <div class="product-clause-content-popup">
            <div class="region-title">选择地区</div>
            <div class="region-selected clearfloat">
              <span :class="{ selected: true, cur: regionLevel === 0 }" @click="regionBack(0)">{{ regionTabs[0] }}</span>
              <span :class="{ selected: regionLevel >= 2, cur: regionLevel === 1 }" @click="regionBack(1)">{{ regionTabs[1] }}</span>
              <span :class="{ selected: regionLevel >= 3, cur: regionLevel === 2 }">{{ regionTabs[2] }}</span>
            </div>
            <div class="region-lists">
              <div v-if="!regionList.length" class="region-lists-loading">
                <load-more></load-more>
              </div>
              <div class="region-list-item" v-for="item in regionList" :key="item.id" @click="regionSelect(item)">
                {{ item.name }}
              </div>
            </div>
          </div>
        </popup>
      </div>
    </div>
    <template v-if="regionModuleShow">
      <region-module :id="+product_id" :show.sync="regionModuleShow" @getData="getRegionData"></region-module>
    </template>
    
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
  import validatePlaceholders from '@/config/huagui/damai/validatePlaceholders';
  import {
    calcAge
  } from '@/utils/common-utils';
  import {
    bindFreeze,
    unbindFreeze
  } from '@/utils/bodyScrollFreeze';
  import wxShareFreeze from '@/utils/freezeShare';

  import vocation from '../components/vocation-selector';
  import certificateUpload from '@/components/certificate-upload';
  import regionModule from '../components/region-module/region-module';

  import relationEnum from '@/config/relation-enum';
  import { isEmpty, isBeneficiaryPass } from './verify-config.js';

  import {
    getWapBank,
    getWapAgreement,
    getWapInsureAttribute,
    getWapCalc,
    wapRecognize,
    wapValidate,
    getWapVocation,
    store,
    pay,
    getApplicantVocation,
    getBankDistrict
  } from '@/utils/apis';

  const requestParams = ['insured_birthday', 'guarantee_period', 'payment_period_value', 'payment_period_unit',
    'guarantee_quota',
    'insured_gender', 'applicant_immunity',
    'applicant_gender', 'applicant_birthday', 'applicant_personal_address_area', 'applicant_personal_address_city',
    'applicant_personal_address_province', 'scode'
  ];

  const emailSuffix = ['@qq.com', '@sina.com', '@163.com', '@139.com', '@126.com'];

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
    directives: {
      TransferDom
    },
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
      vocation,
      certificateUpload,
      regionModule
    },
    data () {
      return {
        relationEnum,
        saveValidatePlaceholders: validatePlaceholders,
        validatePlaceholders,
        // benefitPercent: 0,
        applicantCertificateValid: {},
        insuredCertificateValid: {},
        emailSuffix,
        amount: '',
        readed: false,
        source: {},
        formValue: {},
        contentPopupShow: false,
        agreements: [],
        popupContent: '',
        bankList: [],
        prevParamsSave: {},
        isAutoComplateShow: false,
        isInsuredCertificatePass: false,
        isApplicationCertificatePass: false,
        popupTitle: '',
        channel_product_id: null,
        product_id: null,
        scode: null,
        isVocationShow: false,
        vocationSearchNumber: 0,
        vocationSelected: [],
        vocationList: [],
        prevVocation: [],
        order_sn: null,
        isResultBack: true,
        autoFlag: false,
        vocationType: 'applicant',
        isLeave: false,
        routerLeave: null,
        isInit: false,
        selectPlaceShow: false,
        regionLevel: null,
        regionTabs: ['请选择', '请选择'],
        regionData: [, ],
        regionList: [],
        regionName: '',
        beneficiaryPlaceholdersArray: [],
        isCertificateModalShow: false,
        applicantCertificate: {
          front: '',
          back: ''
        },
        insuredCertificate: {
          front: '',
          back: ''
        },
        canInsure: true,
        localProfession: {},
        regionModuleShow: false
      }
    },
    computed: {
      // 被保人地区
      cityBelone () {
        const address = this.formValue.insured.personal_address;
        const array = [address.province.default.name, address.city.default.name, address.area.default ? address.area.default
          .name : ''
        ];
        return array.filter(i => i).join('-');
      },
      // 是否显示增加受益人
      isAddBeneficiary () {
        if (this.benefitPercent === 100) return false;
        if (this.formValue.beneficiary.default.length >= 3) return false;
        return true;
      },
      // 受益人比例
      benefitPercent() {
        return this.formValue.beneficiary.default.reduce((prev, next) => (prev + +next.benefit_percent), 0);
      }
    },
    watch: {
      isVocationShow(v) {
        this.shouldBodyFreeze(v);
      },
      contentPopupShow(v) {
        this.shouldBodyFreeze(v);
      },
      selectPlaceShow(v) {
        this.shouldBodyFreeze(v);
      },
      isCertificateModalShow(v) {
        this.shouldBodyFreeze(v);
      }
    },
    created() {

      // 禁止分享
      wxShareFreeze();
      let prevParamsSave = {};
      requestParams.forEach(item => {
        prevParamsSave[item] = window.sessionStorage.getItem(item);
      });
      this.channel_product_id = window.sessionStorage.getItem('channel_product_id');
      this.product_id = window.sessionStorage.getItem('product_id');
      this.scode = window.sessionStorage.getItem('scode');
      this.prevParamsSave = prevParamsSave;
      getWapAgreement([], {
          product_id: this.product_id,
          insured_birthday: window.sessionStorage.getItem('insured_birthday')
        })
        .then(res => {
          this.agreements = res.data.data;
        })
        .catch(err => console.log(err));

    },
    mounted() {
      this.validatePlaceholders = JSON.parse(JSON.stringify(this.saveValidatePlaceholders));
      // 获取页面属性
      this.fetchAttributes();
      // ios 底端键盘bug兼容
      this.resizeControl();
    },
    // 如果页面跳转到详情页，则提示弹窗
    beforeRouteLeave(to, from, next) {
      this.isCertificateModalShow = false;
      if (to.name !== 'tongfang_bbd_detail') {
        next();
      } else {
        this.isLeave = true;
        this.routerLeave = next;
      }
    },
    methods: {
      calcAge,
      resizeControl() {
        (/iphone|ipod|ipad/i.test(navigator.appVersion)) && document.addEventListener('blur', (e) => {
          ~e.target.className.indexOf('debit-card-input') && e.target.scrollIntoView(false);
        }, true);

      },
      showRegionModule () {
        this.regionModuleShow = true
      },
      getRegionData (val) {
        console.log('获取返回的地区数据', val)
        this.formValue.applicant.personal_address.province.default.id = val[0].id
        this.formValue.applicant.personal_address.province.default.name = val[0].name
        this.formValue.applicant.personal_address.province.default.code = val[0].code
        
        this.formValue.applicant.personal_address.city.default.id = val[1].id
        this.formValue.applicant.personal_address.city.default.name = val[1].name
        this.formValue.applicant.personal_address.city.default.code = val[1].code
        
        this.formValue.applicant.personal_address.area.default.id = val[2].id
        this.formValue.applicant.personal_address.area.default.name = val[2].name
        this.formValue.applicant.personal_address.area.default.code = val[2].code
      },
      relationFunc (val) {
        if (this.formValue.insured.relation.default === 1) {
          this.formValue.insured.profession.default.id = this.formValue.applicant.profession.default.id
          this.formValue.insured.profession.default.code = this.formValue.applicant.profession.default.code
          this.formValue.insured.profession.default.name = this.formValue.applicant.profession.default.name
          
          this.formValue.insured.certificate.number.default = this.formValue.applicant.certificate.number.default
          this.formValue.insured.birthday.default = this.formValue.applicant.birthday.default
          this.formValue.insured.gender.default = this.formValue.applicant.gender.default
          
          this.recognize('insured_certificate_number', this.formValue.insured.certificate.number.default)
          
        } else {
          this.formValue.insured.profession.default.id = this.localProfession.id
          this.formValue.insured.profession.default.code = this.localProfession.code
          this.formValue.insured.profession.default.name = this.localProfession.name
        }
        this.relationChange('insured_relation', this.formValue.insured.relation.default)
        this.fetchCalc();
      },
      // 身份证上传
      certificateUpload(v) {
        this.applicantCertificate.front = v.applicant.front.file_id;
        this.applicantCertificate.back = v.applicant.back.file_id;
        this.insuredCertificate.front = v.insured.front.file_id;
        this.insuredCertificate.back = v.insured.back.file_id;
        // 再次请求校验
        this.insure();
      },
      showCertificateModal() {
        this.isCertificateModalShow = true;
      },
      certificateModalClose() {
        this.isCertificateModalShow = false;
      },
      // 受益人身份证校验
      beneficiaryRecognize(value, index) {
        if (!value) return;
        this.formValue.beneficiary.default[index].certificate.number = this.formValue.beneficiary.default[index].certificate.number.toLocaleUpperCase()
        const data = {
          number: value.toLocaleUpperCase()
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

              this.formValue.beneficiary.default[index].birthday = data.birthday;
              this.formValue.beneficiary.default[index].gender = data.gender;
              // 华贵新增
              if (calcAge(data.birthday) >= 46) {
                this.formValue.beneficiary.default[index].certificate.is_long_term = 1
              } else {
                this.formValue.beneficiary.default[index].certificate.is_long_term = 0
              }
              this.beneficiaryFormChange('certificate_number', value, index);
              this.beneficiaryPlaceholdersArray[index].isCertificatePass = true;
            }
          })
          .catch(err => console.log(err));
      },
      // 页面数据格式化
      totalFormData () {
        let {
          insure_plan,
          applicant,
          insured,
          renewal_info,
          beneficiary
        } = this.formValue;
        let account_bank_item = renewal_info.account_bank.items.find(item => renewal_info.account_bank.default.code == item.code) || {}
        return {
          applicant: {
            name: applicant.name.default,
            certificate: {
              type: applicant.certificate.type.default,
              number: applicant.certificate.number.default,
              is_long_term: applicant.certificate.is_long_term.default,
              valid_end_at: applicant.certificate.valid_end_at.default,
              valid_start_at: applicant.certificate.valid_start_at.default
              // front: this.applicantCertificate.front,
              // back: this.applicantCertificate.back
            },
            birthday: applicant.birthday.default,
            gender: applicant.gender.default,
            profession: applicant.profession.default.id,
            // 华贵新增
            profession_code: applicant.profession.default.code,
            profession_id: applicant.profession.default.id,
            profession_name: applicant.profession.default.name,
            personal_address: {
              province: applicant.personal_address.province.default.id,
              city: applicant.personal_address.city.default.id,
              area: applicant.personal_address.area.default ? applicant.personal_address.area.default.id : '',
              detail: applicant.personal_address.detail.default,
              zip_code: applicant.personal_address.zip_code.default
            },
            email: applicant.email.default,
            mobile: applicant.mobile.default
          },
          insured: {
            relation: insured.relation.default,
            name: insured.name.default,
            certificate: {
              type: insured.certificate.type.default,
              number: insured.certificate.number.default,
              is_long_term: insured.certificate.is_long_term.default,
              valid_end_at: insured.certificate.valid_end_at.default,
              valid_start_at: insured.certificate.valid_start_at.default
            },
            birthday: insured.birthday.default,
            gender: insured.gender.default,
            profession: insured.profession.default.id,
            // 华贵新增
            profession_code: insured.profession.default.code,
            profession_id: insured.profession.default.id,
            profession_name: insured.profession.default.name,
            mobile: insured.mobile.default,
            height: insured.height.default,
            weight: insured.weight.default,
            annual_income: insured.annual_income.default,
            personal_address: {
              province: insured.personal_address.province.default.id,
              city: insured.personal_address.city.default.id,
              area: insured.personal_address.area.default ? insured.personal_address.area.default.id : '',
              detail: insured.personal_address.detail.default,
              zip_code: insured.personal_address.zip_code.default
            },
            social_security: insured.social_security.default
          },
          insure_plan: {
            guarantee_period: insure_plan.guarantee_period.default,
            guarantee_quota: insure_plan.guarantee_quota.default,
            payment_period_unit: insure_plan.payment_period.default.unit,
            payment_period_value: insure_plan.payment_period.default.value
          },
          beneficiary: {
            type: beneficiary.type.default,
            items: beneficiary.default
          },
          renewal_info: {
            account_name: renewal_info.account_name.default,
            bank_district: {
              province: renewal_info.bank_district.province.default.id,
              city: renewal_info.bank_district.city.default.id
            },
            id_card_number: renewal_info.id_card_number.default,
            account_bank: renewal_info.account_bank.default.code,
            debit_card_number: renewal_info.debit_card_number.default,
            account_bank_code: account_bank_item.code,
            account_bank_name: account_bank_item.name
          }
        }
      },
      // 受益人校验单独控制
      beneficiaryFormChange (type, value, index) {
        if (!value) return;

        let data = {
          ...this.totalFormData(),
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
      changeBeneficiaryCertificateType(value, index) { //  受益人证件类型
        console.log('555555', value, index)
        this.formValue.beneficiary.default[index].certificate.type = value;
      },
      relationChange(type, value) {
        if (!value) return;
        this.fetchCalc();
        this.validatePost(type);
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
      percentChange (idx) {
        console.log('6666666', idx, this.formValue.beneficiary.default[idx])
        if (this.formValue.beneficiary.default[idx].benefit_percent === 100) {
          let objActive = this.formValue.beneficiary.default[idx]
          let beneficiaryActive = this.beneficiaryPlaceholdersArray[idx]
          this.formValue.beneficiary.default = [];
          this.beneficiaryPlaceholdersArray = [];
          this.formValue.beneficiary.default.push(objActive);
          this.beneficiaryPlaceholdersArray.push(beneficiaryActive);
        }
      },
      addBeneficiary () { // 添加受益人按钮
        let date = new Date(new Date().getTime() + 24*60*60*1000)
        let year = date.getFullYear()
        let month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth()
        let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        let beneficiaryItem = {
          benefit_percent: 0,
          birthday: '', 
          certificate: {
            number: '',
            type: 1,
            is_long_term: 1,
            valid_end_at: '',
            valid_start_at: '',
            valid_start_at_max: `${year}-${month}-${day}`,
            valid_end_at_min: `${year}-${month}-${day}`
          },
          gender: 1,
          relation: '',
          name: ''
        }
        this.formValue.beneficiary.default.push(beneficiaryItem);

        this.beneficiaryPlaceholdersArray.push(JSON.parse(JSON.stringify(beneficiaryPlaceholders)));
      },
      changeBeneficiaryEndTimeType(val, index) {
        this.formValue.beneficiary.default[index].certificate.is_long_term = val
      },
      beneficiaryRemove(index) { // 删除受益人按钮
        let self = this;
        console.log('aaaaaaaaaaaaaaaa', index, this.formValue)
        if (this.formValue.beneficiary.default.length === 1) {
          this.$vux.confirm.show({
            title: '提示',
            content: '是否重置受益人',
            onConfirm(msg) {
              self.formValue.beneficiary.default = [];
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
            self.formValue.beneficiary.default.splice(index, 1);
            self.beneficiaryPlaceholdersArray.splice(index, 1);
          }
        });
      },
      selectPlaceHide() {
        this.regionTabs = ['请选择', '请选择'];
        // this.regionData = [,,];
        this.regionLevel = 0;
      },
      selectPlace() {
        this.selectPlaceShow = true;
        const data = {
          product_id: this.product_id
        };
        this.regionList = [];

        getBankDistrict([], data)
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
      regionBack(type) {
        if (this.regionLevel === type) return;
        if (type === 0) {
          this.selectPlace();
          this.regionTabs = ['请选择', '请选择'];
          this.regionLevel = 0;
        } else {
          this.regionTabs = [this.regionTabs[0], '请选择'];
          this.regionLevel = 0;
          this.regionSelect(this.regionData[type - 1]);
        }
      },
      regionSelect(item) {
        this.regionTabs[this.regionLevel] = item.name;
        this.regionData[this.regionLevel] = item;
        const data = {
          product_id: this.product_id,
          parent_id: item.id
        };

        this.regionList = [];
        getBankDistrict([], data)
          .then(res => {
            if (res.data.code === 0) {
              const data = res.data.data;
              this.regionList = data;
              if (this.regionLevel === 1) {
                this.regionName = this.regionData.filter(i => i).map(y => y.name).join('-');

                this.formValue.renewal_info.bank_district.province.default = this.regionData[0];
                this.formValue.renewal_info.bank_district.city.default = this.regionData[1];

                this.formValue.renewal_info.account_bank.default.id = '';
                this.formValue.renewal_info.account_bank.default.name = '';

                this.validatePost('renewal_info_bank_district_province');

                this.getBankList();
                this.selectPlaceShow = false;
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
      },
      getBankList() {
        const data = {
          product_id: this.product_id
          // province_code: this.formValue.renewal_info.bank_district.province.default.code,
          // city_code: this.formValue.renewal_info.bank_district.city.default.code
        }
        getWapBank([], data)
          .then(res => {
            this.bankList = res.data.data;
          })
          .catch(err => {
            this.$vux.toast.show({
              text: err,
              type: 'text'
            });
          })
      },
      shouldBodyFreeze(v) {

        if (v) {
          this.bodyTop = document.documentElement.scrollTop || document.body.scrollTop;
          bindFreeze();
        } else {
          unbindFreeze();
          document.documentElement.scrollTop = this.bodyTop;
          document.body.scrollTop = this.bodyTop;
        }
      },
      onCancel() {
        this.isLeave = false;
        this.routerLeave(false);
      },
      onConfirm () {
        this.routerLeave();
        this.$nextTick(() => {
          this.$router.push({
            name: 'huagui_damaiDetail',
            query: {
              scode: this.scode
            }
          });
        });
      },
      insure () { // 投保方法
        console.log('111111111', isEmpty(this.totalFormData()))
        if (!isEmpty(this.totalFormData())) {
          return
        }
        if (!isBeneficiaryPass(this.totalFormData())) {
          return
        }
        if (this.formValue.payment_period_value) {
          if ((+this.amount * this.formValue.payment_period_value) >= 200000) {
            this.$vux.toast.show({
              text: '单笔订单总保费(交费期间*首期保费)不能大于20万，请拆分保单投保',
              type: 'text'
            });
            return
          }
        } else {
          let active = +this.formValue.insure_plan.payment_period.default.value
          if ((+this.amount * active) >= 200000) {
            this.$vux.toast.show({
              text: '单笔订单总保费(交费期间*首期保费)不能大于20万，请拆分保单投保',
              type: 'text'
            });
            return
          }
        }
        if (!this.readed) {
          return this.$vux.toast.show({
            text: '请先勾选协议',
            type: 'text'
          })
        }

        this.isResultBack = false;

        const data = {
          ...this.totalFormData(),
          scode: this.scode
        }

        store([], data).then(res => {
          const data = res.data;
          if (data.code === 0) {
            this.order_sn = data.data.order_sn;

            this.$router.push({
              name: 'huagui_damaiDetail_checkstand',
              query: {
                order_sn: this.order_sn
              }
            });
          } else if (data.code === 200004) {
            Object.keys(data.data).map(item => {
              if (this.validatePlaceholders[item]) {

                // 特殊处理 为谁投保
                if (this.formValue.insured.relation.default) {
                  this.$vux.toast.show({
                    text: data.data[item][0],
                    type: 'text'
                  });
                }
                this.validatePlaceholders[item].name = data.data[item][0] || this.saveValidatePlaceholders[item].name;
                this.validatePlaceholders[item].isValidate = false;
              } else {
                console.log('rrrrrr', data.data[Object.keys(data.data)[0]][0])
                let idx = Object.keys(data.data[Object.keys(data.data)[0]][0])[0]
                this.$vux.toast.show({
                  text: data.data[Object.keys(data.data)[0]][0][idx][0] || '投保失败',
                  type: 'text'
                });
              }
            });
            
            // 受益人信息判断
            // if (data.data.beneficiary_items) {
            //   Object.keys(data.data.beneficiary_items).forEach((item, index) => {
            //     Object.keys(data.data.beneficiary_items[item]).forEach(y => {
            //       this.beneficiaryPlaceholdersArray[item][y].name = data.data.beneficiary_items[item][y][0];
            //       this.beneficiaryPlaceholdersArray[item][y].isValidate = false;
            //     });
            //   });
            // }
            if (data.data.beneficiary_items) {
              data.data.beneficiary_items.map((item, index) => {
                Object.keys(data.data.beneficiary_items[index]).map(key => {
                  this.beneficiaryPlaceholdersArray[index][key].name = data.data.beneficiary_items[index][key][0]
                  this.beneficiaryPlaceholdersArray[index][key].isValidate = false;
                })
              })
            }

            this.isResultBack = true;

            // this.$nextTick(() => {
            //   document.querySelector('.error').parentElement.scrollIntoView();
            // });
          } else if (data.code === 350004) {
            this.isCertificateModalShow = true;
            this.isResultBack = true;
          } else if (data.code === 350005 || data.code === 350006) {
            // 清除身份证图片
            this.applicantCertificate.front = '';
            this.applicantCertificate.back = '';
            this.insuredCertificate.front = '';
            this.insuredCertificate.back = '';

            this.$vux.toast.show({
              text: data.message,
              time: 3000,
              type: 'text'
            });
            this.isResultBack = true;
          } else {
            this.$vux.toast.show({
              text: data.message,
              time: 3000,
              type: 'text'
            });
            this.isResultBack = true;
          }
        }).catch(err => {
          this.$vux.toast.show({
            text: err,
            type: 'text'
          })
          this.isResultBack = true;
        })


      },
      changeBeneficiary (type) {
        this.formValue.beneficiary.type.default = type;

        if (type === 1) {
          this.formValue.beneficiary.default = [];
          this.beneficiaryPlaceholdersArray = [];
        } else {
          this.formValue.beneficiary.default = [];
          this.beneficiaryPlaceholdersArray = [];
          this.addBeneficiary()
        }
      },
      searchVocation (type) {
        this.isVocationShow = true;
        this.vocationType = type;
        this.vocationFetch(null, type);
      },
      vocationBack(type) {
        this.prevVocationFetch(this.prevVocation[this.vocationSearchNumber - 2], type);
      },
      vocationFetch (parent, type) {
        if (parent) this.vocationSelected.push(parent);
        const params = parent ? {
            product_id: this.product_id,
            parent_id: parent.id
          } :
          {
            product_id: this.product_id
          };

        this.vocationList = [];
        getApplicantVocation([], params)
          .then(({
            data
          }) => {
            this.prevVocation.push(parent);
            this.vocationList = data.data;
            this.vocationSearchNumber += 1;
            if (this.vocationList.length === 0 && this.vocationSearchNumber === 4) {
              let str = ''
              this.vocationSelected.map((item, idx) => str += item.name + (idx + 1 === this.vocationSelected.length ?
                '' : '-'))
              this.formValue[type].profession.default.id = this.vocationSelected[2].id;
              this.formValue[type].profession.default.name = str;
              this.formValue[type].profession.default.code = this.vocationSelected[2].code;
              this.isVocationShow = false;
              this.validatePost(`${type}_profession_name`);
              if (this.formValue.insured.relation.default === 1) { // 如果投保人选择职业后被保人关系为本人， 则把投保人职业复制到被保人
                this.formValue.insured.profession.default.id = this.vocationSelected[2].id;
                this.formValue.insured.profession.default.name = str;
                this.formValue.insured.profession.default.code = this.vocationSelected[2].code;
              }
            }
          })
          .catch(err => console.log(err));
      },
      selectItem (value) {
        this.formValue[this.vocationType].profession.default.id = value.id;
        this.formValue[this.vocationType].profession.default.name = value.name;
        this.formValue[this.vocationType].profession.default.code = value.code;

        this.isVocationShow = false;
        this.validatePost(`${this.vocationType}_profession`);
      },
      prevVocationFetch(prevParent, type) {
        this.vocationSelected.pop();
        const params = prevParent ? {
            product_id: this.product_id,
            parent_id: prevParent.id
          } :
          {
            product_id: this.product_id
          };

        this.vocationList = [];
        getApplicantVocation([], params)
          .then(({
            data
          }) => {
            this.prevVocation.pop();
            this.vocationList = data.data;
            this.vocationSearchNumber -= 1;
          })
          .catch(err => console.log(err));
      },
      vocationClose() {
        this.vocationSearchNumber = 0;
        this.vocationSelected = [];
        this.prevVocation = [];
      },
      change_failure_time_type(type, v) {

        // 当前年龄大于46岁时，证件类型只能选择长期
        // 小于46岁时，证件类型只能选择有效期
        const birthday = this.formValue[v].birthday.default;

        if (calcAge(birthday) >= 46 && type === 0) return;
        if (calcAge(birthday) < 46 && type === 1) return;

        this.formValue[v].certificate.is_long_term.default = type;

        type === 0 && (this.formValue[v].certificate.valid_end_at.default = '');
      },
      dateChange(type) {
        if (type === 'insured_birthday' || type === 'applicant_birthday') {
          this.fetchCalc();
          this.validatePost(type);
        } else {
          this.validatePost(type);
        }

      },
      compareDate (str) {
        let todayInt = new Date(new Date().toLocaleDateString()).getTime() // 取当天零点时间
        let oneDay = 86400000 // 一天的时间戳
        let num = todayInt + oneDay // 明天时间戳 
        let month = ('0' + (new Date(num).getMonth() + 1)).slice(-2) // 月
        let day = ('0' + (new Date(num).getDate())).slice(-2) // 日
        if (str.split('-')[1] == month && str.split('-')[2] == day) { // 对比
          let date = new Date() // 一下格式化日期以供显示
          let y = date.getFullYear()
          let m = ('0' + (date.getMonth() + 1)).slice(-2)
          let d = ('0' + date.getDate()).slice(-2)
          this.formValue.insure_plan.insure_start_at.default = `${y}-${m}-${d}`
        }
      },
      recognize(type, value) {
        // if (!value) return;

        const typeArray = type.split('_');
        const groupName = typeArray[0];

        if (!value) {
          this.formValue[groupName].certificate.number.default = '';
          this.formValue[groupName].birthday.default = '';
          this.formValue[groupName].gender.default = '';

          return;
        }
        if (type === 'applicant_certificate_number') {
          this.formValue.renewal_info.id_card_number.default = this.formValue.applicant.certificate.number.default.toLocaleUpperCase()
        }
        
        this.formValue[groupName].certificate.number.default = this.formValue[groupName].certificate.number.default.toLocaleUpperCase()
        const data = {
          number: this.formValue[groupName].certificate.number.default.toLocaleUpperCase()
        }
        wapRecognize([], data)
          .then(res => {
            console.log('sdsadas', res)
            if (res.data.code === 0) {
              if (type === 'insured_certificate_number' || this.formValue.insured.relation.default === 1) {
                this.compareDate(res.data.data.birthday)
              }
            }
            
            const data = res.data.data;
            if (data.number) {
              this.validatePlaceholders[type].name = data.number[0];
              this.validatePlaceholders[type].isValidate = false;
              // 被保人身份证判断联动
              if (type === 'insured_certificate_number') {
                this.isInsuredCertificatePass = false;
              } else {
                this.isApplicationCertificatePass = false;
              }
              this.$vux.toast.show({
                text: data.number[0],
                type: 'text'
              });
            } else {
              this.validatePlaceholders[type].name = validatePlaceholders[type].name;
              this.validatePlaceholders[type].isValidate = true;
              this.formValue[groupName].birthday.default = data.birthday;
              this.formValue[groupName].gender.default = data.gender;
              
              if (this.formValue.insured.relation.default === 1) {
                this.formValue.applicant.birthday.default = data.birthday
                this.formValue.insured.birthday.default = data.birthday
                
                this.formValue.applicant.gender.default = data.gender
                this.formValue.insured.gender.default = data.gender
              }
              this.validatePost(type);
              this.validatePost(`${groupName}_birthday`);
              this.validatePost(`${groupName}_gender`);

              this.formValue[groupName].certificate.valid_end_at.default = '';

              // 身份证改动后自动判断年龄从而自动选择证件失效时期类型
              if (calcAge(data.birthday) >= 46) {
                this.formValue[groupName].certificate.is_long_term.default = 1;
              } else {
                this.formValue[groupName].certificate.is_long_term.default = 0;
              }

              // 如果被保人为本人，则需校验被保人日期及性别
              if (type === 'applicant_certificate_number' && this.formValue.insured.relation.default === relationEnum
                .SELF) {
                this.validatePost('insured_birthday');
                this.validatePost(`insured_gender`);
              }

              this.fetchCalc();

              if (type === 'insured_certificate_number') {
                this.isInsuredCertificatePass = true;
              } else {
                this.isApplicationCertificatePass = true;
              }
            }
          })
      },
      vocationShow() {
        this.isVocationShow = false;
      },
      autoChange(type, value) {
        if (!value) return;
        this.isAutoComplateShow = false;
        setTimeout(() => {
          this.formChange(type, value);
        }, 300);
      },
      formChange (type, value) {
        if (!value) return;
        if (type === 'applicant_name') {
          this.formValue.renewal_info.account_name.default = this.formValue.applicant.name.default
        }

        // 键盘顶起bug兼容
        (/iphone|ipod|ipad/i.test(navigator.appVersion)) &&
        type === 'renewal_info_account_bank' &&
          document.querySelector('.account-bank-select').scrollIntoView(false);


        this.validatePost(type);
      },
      emailTaping() {
        const email = this.formValue.applicant.email.default;

        if (email && !~email.indexOf('@')) return this.isAutoComplateShow = true;
        return this.isAutoComplateShow = false;
      },
      autoComplate(e, emailSuffix) {
        this.isAutoComplateShow = false;
        const complateWords = `${this.formValue.applicant.email.default}${emailSuffix}`;
        this.formValue.applicant.email.default = complateWords;
        this.autoChange('applicant_email', this.formValue.applicant.email.default);
      },
      validatePost (type) {
        if (this.formValue.insured.relation.default === 1) {
          this.formValue.insured.birthday.default = this.formValue.applicant.birthday.default
        }
        if (this.formValue.applicant.certificate.number.default) {
          this.formValue.applicant.certificate.number.default = this.formValue.applicant.certificate.number.default.toLocaleUpperCase()
        }
        // this.formValue.renewal_info.debit_card_number.default = this.formValue.renewal_info.debit_card_number.default.toLocaleUpperCase()
        
        this.canInsure = false
        let data = {
          ...this.totalFormData(),
          product_id: this.product_id
        };

        wapValidate([], data).then(res => {
          console.log('wapValidate', res)
          this.canInsure = true
          const data = res.data.data
          if (data && data[type] && data[type].length) {
            this.validatePlaceholders[type].name = data[type][0];
            this.validatePlaceholders[type].isValidate = false;
            this.$vux.toast.show({
              text: data[type][0],
              type: 'text'
            });

            // 特殊处理 当被保人为本人，填写投保人身份证大于规定年龄，则投保人身份证项显示红色
            // if (this.formValue.insured.relation.default == relationEnum.SELF && type === 'insured_birthday') {
            //   this.validatePlaceholders.applicant_certificate_number.isValidate = false;
            // }

          } else {
            this.validatePlaceholders[type].name = validatePlaceholders[type].name;
            this.validatePlaceholders[type].isValidate = true;
          }
        }).catch(err => {
          this.canInsure = true
          this.$vux.toast.show({
            text: '网络异常',
            type: 'text'
          });
        })
      },
      changeGender(type) {
        this.formValue.insured.gender.default = type;
        this.validatePost('insured_gender');
        this.fetchCalc();
      },
      certificate_type_change(type) {
        this.formValue.applicant.certificate.type.default = type;

        this.formValue.applicant.certificate.type.item;
      },
      insured_certificate_type_change(type) {
        this.formValue.insured.certificate.type.default = type;
        if (type === 1 && this.formValue.insured.certificate.number.default) {
          this.recognize('insured_certificate_number', this.formValue.insured.certificate.number.default);
        } else {
          this.formChange('insured_certificate_number', this.formValue.insured.certificate.number.default)
          this.formValue.insured.birthday.default = '';
        }

        if (type !== 1) {
          this.formValue.insured.certificate.failure_time.type.default = 1;
        }
      },
      fetchCalc() {
        this.amount = null;
        const {
          insured,
          insure_plan,
          applicant
        } = this.formValue;
        const data = {
          insured_birthday: insured.birthday.default,
          guarantee_period: insure_plan.guarantee_period.default,
          payment_period_value: insure_plan.payment_period.default.value,
          payment_period_unit: insure_plan.payment_period.default.unit,
          guarantee_quota: insure_plan.guarantee_quota.default,
          insured_gender: insured.gender.default,
          insured_relation: insured.relation.default,
          // applicant_gender: applicant.gender.default,
          // applicant_birthday: applicant.birthday.default,
          // applicant_immunity: insure_plan.applicant_immunity.default,
          social_security: insured.social_security.default, // 华贵新增参数 ： 有无社保
          product_id: this.product_id
        }
        getWapCalc([], data)
          .then(res => {
            if (res.data.data) {
              this.amount = res.data.data.amount;
            } else {
              this.amount = '-- --';
            }
          })
          .catch(err => {
            this.amount = '-- --';
            this.$vux.toast.show({
              text: res.data.message,
              type: 'text'
            });
          });
      },
      fetchAttributes () {
        this.$vux.loading.show({
          text: '正在加载中'
        });

        const insured_birthday = window.sessionStorage.getItem('insured_birthday');
        const insured_gender = window.sessionStorage.getItem('insured_gender');
        // const applicant_birthday = window.sessionStorage.getItem('applicant_birthday');
        // const applicant_gender = window.sessionStorage.getItem('applicant_gender');
        // const applicant_immunity = window.sessionStorage.getItem('applicant_immunity');
        const insured_personal_address_area = +window.sessionStorage.getItem('insured_personal_address_area');
        const insured_personal_address_city = +window.sessionStorage.getItem('insured_personal_address_city');
        const insured_personal_address_province = +window.sessionStorage.getItem('insured_personal_address_province');
        const insured_personal_address_area_name = window.sessionStorage.getItem('insured_personal_address_area_name');
        const insured_personal_address_city_name = window.sessionStorage.getItem('insured_personal_address_city_name');
        const insured_personal_address_province_name = window.sessionStorage.getItem('insured_personal_address_province_name');
        const guarantee_period = window.sessionStorage.getItem('guarantee_period');
        const guarantee_quota = window.sessionStorage.getItem('guarantee_quota');
        const payment_period_unit = window.sessionStorage.getItem('payment_period_unit');
        const payment_period_value = window.sessionStorage.getItem('payment_period_value');
        const insured_profession_name = window.sessionStorage.getItem('insured_profession_name');
        const insured_profession_code = window.sessionStorage.getItem('insured_profession_code');
        const insured_profession_id = window.sessionStorage.getItem('insured_profession_id');
        const social_security = window.sessionStorage.getItem('social_security'); 
        const annual_income = window.sessionStorage.getItem('annual_income');
        // const insure_for_self = window.sessionStorage.getItem('insure_for_self');

        const data = {
          scode: this.scode,
          insured: {
            birthday: insured_birthday,
            gender: insured_gender,
            profession_code: insured_profession_code,
            profession_id: insured_profession_id,
            profession_name: insured_profession_name,
            social_security: social_security,
            // annual_income: annual_income,
            personal_address: {
              province: insured_personal_address_province,
              city: insured_personal_address_city,
              area: insured_personal_address_area
            }
          },
          insure_plan: {
            guarantee_period,
            payment_period_value,
            payment_period_unit,
            guarantee_quota
          }
        }

        getWapInsureAttribute([], data).then(res => {
            console.log('aaaaa', res.data.data)
            this.formValue = res.data.data;
            this.getBankList()
            // if (applicant_personal_address_area) {
            //   this.formValue.applicant.personal_address.area.default = {};
            //   this.formValue.applicant.personal_address.area.default.id = applicant_personal_address_area;
            //   this.formValue.applicant.personal_address.area.default.name = applicant_personal_address_area_name;
            // }
            // if (applicant_personal_address_city) {
            //   this.formValue.applicant.personal_address.city.default = {};
            //   this.formValue.applicant.personal_address.city.default.id = applicant_personal_address_city;
            //   this.formValue.applicant.personal_address.city.default.name = applicant_personal_address_city_name;
            // }
            // if (applicant_personal_address_province) {
            //   this.formValue.applicant.personal_address.province.default = {};
            //   this.formValue.applicant.personal_address.province.default.id = applicant_personal_address_province;
            //   this.formValue.applicant.personal_address.province.default.name =
            //     applicant_personal_address_province_name;
            // }

            if (guarantee_period) {
              this.formValue.insure_plan.guarantee_period.default = guarantee_period;
            }

            if (guarantee_quota) {
              this.formValue.insure_plan.guarantee_quota.default = guarantee_quota;
            }

            if (insured_birthday) {
              this.formValue.insured.birthday.default = insured_birthday;
            }

            if (insured_gender) {
              this.formValue.insured.gender.default = insured_gender;
            }

            if (payment_period_unit) {
              this.formValue.insure_plan.payment_period.default = {};
              this.formValue.insure_plan.payment_period.default.unit = payment_period_unit;
              this.formValue.insure_plan.payment_period.default.value = payment_period_value;
            }
            
            // 存储详情带过来的被保人的职业
            this.localProfession = JSON.parse(JSON.stringify(this.formValue.insured.profession.default))
            
            // 投保人身份证相关信息
            let defaultAppliationCertificateType = this.formValue.applicant.certificate.type.default;
            this.applicantCertificateValid = this.formValue.applicant.certificate.type.items.filter(item => item.value ===
              defaultAppliationCertificateType)[0];

            // 被保人身份证相关信息
            let defaultInsuredCertificateType = this.formValue.insured.certificate.type.default;
            this.insuredCertificateValid = this.formValue.insured.certificate.type.items.filter(item => item.value ===
              defaultInsuredCertificateType)[0];

            // 当被保人为成年人，即为本人时，需要将被保人的出生和性别覆盖到投保人信息中
            if (this.formValue.insured.relation.default === relationEnum.SELF) {
              this.formValue.applicant.birthday.default = insured_birthday;
              this.formValue.applicant.gender.default = insured_gender;
            }

            // 银行开户地区
            let bank_district_province = this.formValue.renewal_info.bank_district.province.default.name;
            let bank_district_city = this.formValue.renewal_info.bank_district.city.default.name;

            if (bank_district_province) {
              this.regionName = `${bank_district_province}-${bank_district_city}`;
              this.getBankList();
            }

            // 被保人判断初始身份证是否已经校验通过
            const insuredCertificatePass = this.formValue.insured.certificate.number.default;
            const isApplicationCertificatePass = this.formValue.applicant.certificate.number.default;

            if (insuredCertificatePass) {
              this.isInsuredCertificatePass = true;
            }

            if (isApplicationCertificatePass) {
              this.isApplicationCertificatePass = true;
            }

            // 受益人相关身份证是否已经校验通过
            this.formValue.beneficiary.default.forEach((item, index) => {
              let data = JSON.parse(JSON.stringify(beneficiaryPlaceholders));
              if (this.formValue.beneficiary.default[index].certificate.number) {
                data.isCertificatePass = true;
              }
              this.beneficiaryPlaceholdersArray.push(data);
            });



            this.isInit = true;
            this.fetchCalc();
            this.$vux.loading.hide();

          })
          .catch(err => console.log('初始化失败', err));
      },
      letslazyload (contentp) {
          let regexp1 = new RegExp(/(\<img )([^>]*)(src=")([^"]*")([^>]*)(\>)/, 'g');
          contentp = contentp.replace(regexp1, function(match, p1, p2, p3, p4, p5, p6) {
              return p1 + p2 + 'data-src="' + p4 + p5 + p6;
          });
          return contentp;
      },
      showAgreement(type) {
        this.contentPopupShow = true;
        this.popupTitle = this.agreements[type].name;
        // this.popupContent = this.agreements[type].content;
        this.popupContent = this.letslazyload(this.agreements[type].content)

        this.$nextTick(() => {
          document.querySelector('.client-agreement-content').scrollTop = 0;
        });
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
