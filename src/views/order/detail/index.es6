import yieldGroup from '@/components/yield-group/index.vue';
import footerPremium from '@/components/fixed-footer-premium/index.vue';
import protocol from '@/components/protocol/index.vue';
import loading from '@/components/loading/index.vue';
import wxShareFreeze from '@/utils/freezeShare';

import {
    orderDetailTypeMapData,
    orderStatusMap,
    orderStatusEnum,
    renewalYieldEnum,
    insuranPlanYieldEnum,
    insuranPlanYieldEnum2,
    basicInfoYieldEnum,
    basicInfoYieldEnum2,
    applicantYieldEnum,
    insuredYieldEnum,
    beneficiaryYieldEnum,
    beneficiaryInfoYieldEnum,
    genderEnum,
    certificateTypeEnum,
    beneficiaryTypeEnum,
    relationEnum,
    insuredRelationEnum
} from '@/config/map-data.js';
import {
    matchEnumData,
    matchEnumDataByObject,
    getDateByStr,
    formatDate,
    PxToRem
} from '@/utils/common-utils.js';
import { getOrderDetail, getAgreementContent, getCashierDeskUrl } from '@/utils/apis';

export default {
    data() {
        return {
            detailData: {},
            orderInfo: {
                name: '',
                price: null,
                status: null,
                statusTxt: '',
                info: {
                    basicInfo: {},
                    plan: {},
                    renewal: {},
                    applicant: {},
                    insured: {},
                    beneficiary: {},
                    beneficiaries: []
                }
            },
            protocolLists: [],
            protocolStatus: false,
            loading: true,
            orderStatusEnum,
            shareInfo: {},
            policyFileUrl: '',
            cashierDeskUrl: '',
            switchNames: [],
            switchActive: 'main',
            switchActiveIndex: null,
            type: '',
            configure: ''
        }
    },
    mounted() {
        wxShareFreeze();
        
        const { info } = this.orderInfo;
        const _self = this;
        
        getOrderDetail([], { order_sn: this.$route.query.order_sn }).then((res) => {
            let data = res.data.data
            this.detailData = data;
            data.insurance_plan = data.insurance_plan || {};

            const guaranteeTime = getDateByStr(data.insurance_plan.guarantee_time * 1000);
            const orderTime = getDateByStr(data.insurance_plan.order_time * 1000);
            const finalGuaranteeTime = getDateByStr(data.insurance_plan.final_guarantee_time * 1000);
            data.insurance_plan.guarantee_time = `${guaranteeTime.year}-${guaranteeTime.month}-${guaranteeTime.day} ${guaranteeTime.hour}:${guaranteeTime.minute}:${guaranteeTime.seconds}`;
            data.insurance_plan.order_time = `${orderTime.year}-${orderTime.month}-${orderTime.day} ${orderTime.hour}:${orderTime.minute}:${orderTime.seconds}`;
            data.insurance_plan.guarantee_quota = `${parseInt(data.insurance_plan.guarantee_quota) / 10000}万元`;
            data.insurance_plan.final_guarantee_time = `${finalGuaranteeTime.year}-${finalGuaranteeTime.month}-${finalGuaranteeTime.day} ${finalGuaranteeTime.hour}:${finalGuaranteeTime.minute}:${finalGuaranteeTime.seconds}`;

            const basicInfo = Object.assign({
                order_sn: data.order_sn,
                policy_sn: data.policy_sn || ''
            }, data.insurance_plan);

            if (data.hasOwnProperty('share')) _self.shareInfo = data.share;

            _self.protocolLists = data.policy_clause;

            _self.policyFileUrl = data.policy_file_url;

            _self.orderInfo.name = data.product_name;
            _self.orderInfo.price = data.total_premium;
            _self.orderInfo.status = data.order_status;
            _self.orderInfo.statusTxt = matchEnumData(data.order_status, orderStatusMap);

            data.policy_holder.sex = matchEnumData(data.policy_holder.sex, genderEnum);
            data.policy_holder.certificate_start_time = data.policy_holder.certificate_start_time_string;
            data.policy_holder.certificate_end_time = data.policy_holder.certificate_end_time_string;
            data.policy_holder.certificate_is_long_term = data.policy_holder.certificate_is_long_term_string;
            data.policy_holder.certificate_type = matchEnumData(data.policy_holder.certificate_type, certificateTypeEnum);
            data.policy_holder.area = data.policy_holder.province_name + data.policy_holder.city_name + data.policy_holder.district_name;
            data.policy_holder.birthday = formatDate(data.policy_holder.birthday);

            data.recognizee_policy.sex = matchEnumData(data.recognizee_policy.sex, genderEnum);
            data.recognizee_policy.certificate_type = matchEnumData(data.recognizee_policy.certificate_type, certificateTypeEnum);
            data.recognizee_policy.birthday = formatDate(data.recognizee_policy.birthday);
            data.recognizee_policy.mobile = data.recognizee_policy.mobile;
            data.recognizee_policy.certificate_start_time = data.recognizee_policy.certificate_start_time_string;
            data.recognizee_policy.certificate_end_time = data.recognizee_policy.certificate_end_time_string;
            data.recognizee_policy.certificate_is_long_term = data.recognizee_policy.certificate_is_long_term_string;

            data.beneficiary_info = { type: matchEnumData(data.is_legal_beneficiary, beneficiaryTypeEnum) };

            _self.orderInfo.info.basicInfo = {
                title: '订单信息',
                icon: '<i class="icon iconfont">&#xe602;</i>',
                yield: this.orderInfo.statusTxt === '已支付' ? matchEnumDataByObject(basicInfo, basicInfoYieldEnum2)
                                                            : matchEnumDataByObject(basicInfo, basicInfoYieldEnum)
            };

            if (data.renewal) {
                _self.orderInfo.info.renewal = {
                    title: '续期账户信息',
                    icon: '<i class="icon iconfont">&#xe601;</i>',
                    yield: matchEnumDataByObject(data.renewal, renewalYieldEnum)
                };
            }

            if (data.insurance_plan) {
                _self.orderInfo.info.plan = {
                    title: '保险计划',
                    icon: '<i class="icon iconfont">&#xe604;</i>',
                    yield: matchEnumDataByObject(data.insurance_plan, insuranPlanYieldEnum)
                };
            }

            if (data.policy_holder) {
                _self.orderInfo.info.applicant = {
                    title: '投保人信息',
                    icon: '<i class="icon iconfont">&#xe600;</i>',
                    yield: matchEnumDataByObject(data.policy_holder, applicantYieldEnum)
                };
            }

            if (data.recognizee_policy) {
                data.recognizee_policy.relation = matchEnumData(data.recognizee_policy.relation, insuredRelationEnum);
                data.recognizee_policy.weight = Math.ceil(data.recognizee_policy.weight) > 0 ? data.recognizee_policy.weight : '';
                _self.orderInfo.info.insured = {
                    title: '被保人信息',
                    icon: '<i class="icon iconfont">&#xe603;</i>',
                    yield: matchEnumDataByObject(data.recognizee_policy, insuredYieldEnum)
                };
            }

            if (data.beneficiary_info) {
                _self.orderInfo.info.beneficiary = {
                    title: '受益人信息',
                    icon: '<i class="icon iconfont">&#xe603;</i>',
                    yield: matchEnumDataByObject(data.beneficiary_info, beneficiaryYieldEnum)
                }
            }

            _self.orderInfo.info.beneficiaries = [];
            if (data.beneficiaries.length > 0) {
                data.beneficiaries.map((v, idx) => {
                    v.certificate_type = matchEnumData(v.certificate_type, certificateTypeEnum);
                    v.relation = matchEnumData(v.relation, relationEnum);
                    v.proportion = `${v.proportion}%`;
                    v.certificate_start_time = v.certificate_start_time_string;
                    v.certificate_is_long_term = v.certificate_is_long_term_string;
                    v.certificate_end_time = v.certificate_end_time_string;
                    const enumObj = matchEnumDataByObject(v, beneficiaryInfoYieldEnum);
                    enumObj.certificate_type.type = 'radio';
                    _self.orderInfo.info.beneficiaries.push({
                        title: `受益人${idx + 1}`,
                        icon: '<i class="icon iconfont">&#xe603;</i>',
                        yield: enumObj
                    });
                });
            }

            for (let infoKey in info) {
                if (orderDetailTypeMapData.hasOwnProperty(infoKey)) {
                    for (let yieldKey in info[infoKey]['yield']) {
                        if (orderDetailTypeMapData[infoKey].hasOwnProperty(yieldKey)) {
                            info[infoKey]['yield'][yieldKey]['type'] = orderDetailTypeMapData[infoKey][yieldKey];
                        }
                    }
                }
            }

            _self.loading = false;

            const agreementArr = [];
            _self.protocolLists.map((item) => { agreementArr.push(item.agreement_id) });
            getAgreementContent([], {
                agreements_ids: agreementArr
            }).then(res => {
                let data = res.data.data
                data.map(item => {
                    const target = _self.protocolLists.find((v) => { return v.agreement_id === item.id });
                    target.content = PxToRem(item.content);
                });
            });

            if(_self.orderInfo.status === orderStatusEnum.unpaid) {
                getCashierDeskUrl([], { order_sn: this.$route.query.order_sn }).then((res) => {
                    let data = res.data.data
                    _self.cashierDeskUrl = data.target_url;
                    _self.type = data.type;
                    _self.configure = data.configure;
                });
            }

            // 附加订单
            _self.orderInfo.info.basicInfo.children = [];
            _self.orderInfo.info.plan.children = [];

            if (data.children.length) {

                let childrenInfoEnums = this.orderInfo.statusTxt === '已支付' ? basicInfoYieldEnum2 : basicInfoYieldEnum;
                let childrenPlanEnums = insuranPlanYieldEnum2;

                data.children.forEach(item => {
                    this.switchNames.push(item.order_label);

                    const guaranteeTime = getDateByStr(item.insurance_plan.guarantee_time * 1000);
                    const orderTime = getDateByStr(item.insurance_plan.order_time * 1000);
                    const finalGuaranteeTime = item.insurance_plan.fuarantee_period_date;

                    item.insurance_plan.guarantee_time = `${guaranteeTime.year}-${guaranteeTime.month}-${guaranteeTime.day} ${guaranteeTime.hour}:${guaranteeTime.minute}:${guaranteeTime.seconds}`;
                    item.insurance_plan.order_time = `${orderTime.year}-${orderTime.month}-${orderTime.day} ${orderTime.hour}:${orderTime.minute}:${orderTime.seconds}`;
                    item.insurance_plan.guarantee_quota = `${parseInt(item.insurance_plan.guarantee_quota) / 10000}万元`;

                    
                    _self.orderInfo.info.basicInfo.children.push(matchEnumDataByObject({
                        guarantee_time: `${guaranteeTime.year}-${guaranteeTime.month}-${guaranteeTime.day} ${guaranteeTime.hour}:${guaranteeTime.minute}:${guaranteeTime.seconds}`,
                        order_time: `${orderTime.year}-${orderTime.month}-${orderTime.day} ${orderTime.hour}:${orderTime.minute}:${orderTime.seconds}`,
                        fuarantee_period_date: finalGuaranteeTime,
                        order_sn: item.order_sn,
                        policy_sn: item.policy_sn
                    }, childrenInfoEnums));

                    

                    _self.orderInfo.info.plan.children.push(matchEnumDataByObject(item.insurance_plan, childrenPlanEnums    ));

                });
            }

        });
    },
    methods: {
        switchChange(type, index) {
            this.switchActive = type;
            this.switchActiveIndex = index;
            if (type === 'main') {
                this.policyFileUrl = this.detailData.policy_file_url;
            } else {
                this.policyFileUrl = this.detailData.children[index].policy_file_url;
            }
        },
        changeStatus(status) {
            this.protocolStatus = status;
        },
        goToPay() {
            const { protocolStatus, cashierDeskUrl } = this;
            if(protocolStatus) {
                if (this.type === 'vue' && !cashierDeskUrl) {
                    const productCompany = this.configure.split('.')[1].toLocaleLowerCase();
                    const productName = this.configure.split('.')[2].toLocaleLowerCase();
                    this.$router.replace({
                        path: `/${productCompany}/${productName}/checkstand`,
                        query: { order_sn: this.$route.query.order_sn }
                    });
                } else {
                    location.href = cashierDeskUrl;
                }
                
            } else {
                this.$vux.toast.show({
                    text: '请勾选同意协议',
                    type: 'text'
                });
            }
        }
    },
    components: {
        yieldGroup,
        footerPremium,
        protocol,
        loading
    }
}
