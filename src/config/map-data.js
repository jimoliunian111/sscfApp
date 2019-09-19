export const orderDetailTypeMapData = {
    applicant: {
        certificate_type: 'radio',
        sex: 'radio'
    },
    insured: {
        certificate_type: 'radio',
        sex: 'radio'
    },
    beneficiary: {
        type: 'radio'
    }
}

export const orderStatusMap = {
    1: '待支付',
    2: '已支付',
    3: '已关闭'
}

export const orderStatusEnum = {
    unpaid: 1,
    paid: 2,
    close: 3
}

export const genderEnum = {
    1: '男',
    2: '女'
}

export const certificateTypeEnum = {
    1: '身份证',
    2: '护照'
}

export const beneficiaryTypeEnum = {
    1: '法定受益人',
    2: '指定受益人'
}

export const renewalYieldEnum = {
    account_name: '账户开户名',
    id_card_number: '身份证号',
    payment_bank_name: '开户银行',
    payment_account: '借记卡卡号',
    mobile: '电话号码'
}

export const insuranPlanYieldEnum = {
    guarantee_period_desc: '保障期限',
    payment_period_str: '缴费期限',
    guarantee_quota: '保障额度',
    // guarantee_time: '起保日期'
}

export const insuranPlanYieldEnum2 = {
    guarantee_period_desc: '保障期限',
    guarantee_quota: '保障额度'
}

export const basicInfoYieldEnum = {
    order_sn: '订单号',
    order_time: '订单时间',
    guarantee_time: '起保日期',
    fuarantee_period_date: '终保日期'
}

export const basicInfoYieldEnum2 = {
    order_sn: '订单号',
    policy_sn: '保单号',
    order_time: '订单时间',
    guarantee_time: '起保日期',
    fuarantee_period_date: '终保日期'
}

export const applicantYieldEnum = {
    name: '投保人姓名',
    certificate_type: '证件类型',
    certificate_number: '证件号码',
    certificate_start_time: '起效时间',
    certificate_is_long_term: '失效时期',
    certificate_end_time: '失效时间',
    birthday: '出生日期',
    sex: '性别',
    mobile: '手机号码',
    area: '所在城市',
    addr: '详细地址',
    email: '电子邮箱',
    insurance_area: '投保地区'
}

export const insuredYieldEnum = {
    relation: '为谁投保',
    name: '被保人姓名',
    certificate_type: '证件类型',
    certificate_number: '证件号码',
    certificate_start_time: '起效时间',
    certificate_is_long_term: '失效时期',
    certificate_end_time: '失效时间',
    birthday: '出生日期',
    sex: '性别',
    mobile: '手机号码',
    occupation_name: '职业',
    height: '身高（cm）',
    weight: '体重（kg）'
}

export const beneficiaryYieldEnum = {
    type: '受益人'
}

export const beneficiaryInfoYieldEnum = {
    relation: '受益人是被保人',
    name: '受益人姓名',
    certificate_type: '证件类型',
    certificate_number: '证件号',
    certificate_start_time: '起效时间',
    certificate_is_long_term: '失效时期',
    certificate_end_time: '失效时间',
    proportion: '受益比例'
}

export const insuredRelationEnum = {
  1: '本人',
  2: '父母',
  3: '配偶',
  4: '子女',
}

export const relationEnum = {
    1: '父母',
    2: '子女',
    3: '配偶'
}
