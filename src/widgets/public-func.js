export function calculate (data, extra = {}) { // 计算保费所需参数, extra是额外参数
  let base = {
    product_id: data.product_id,
    insured_birthday: data.insured_birthday,
    guarantee_period: +data.guarantee_period,
    payment_period_value: data.payment_period_value,
    payment_period_unit: data.payment_period_unit,
    guarantee_quota: data.guarantee_quota,
    guarantee_period: data.guarantee_period,
    insured_gender: data.insured_gender,
  }
  return {
    ...base,
    ...extra
  }
}