
import { getPrevShareLink, forward, getWxConfig } from '@/utils/apis';


let saveData = {
  detailData: null,
  newScode: null,
  newShareUrl: null
};


// 更新分享信息
function updateShareInfo(type, attributes, old_scode) {

  const data = {
    // annual_income: attributes.annual_income.items.value,
    social_security: attributes.social_security.default,
    insured_profession_id: attributes.insured_profession.default.id || '',
    insured_profession_name: attributes.insured_profession.default.name || '',
    insured_profession_code: attributes.insured_profession.default.code || '',
    insured_birthday: attributes.insured_birthday.default,
    insured_gender: attributes.insured_gender.default,
    // applicant_birthday: attributes.applicant_birthday.default,
    // applicant_gender: attributes.applicant_gender.default,
    // applicant_immunity: attributes.applicant_immunity.default,
    insured_personal_address_province: attributes.insured_personal_address_province.default.id,
    insured_personal_address_city: attributes.insured_personal_address_city.default.id,
    insured_personal_address_area: attributes.insured_personal_address_area.default.id,
    guarantee_period: attributes.guarantee_period.default,
    guarantee_quota: attributes.guarantee_quota.default,
    payment_period_value: attributes.payment_period.default.value,
    payment_period_unit: attributes.payment_period.default.unit,
    // insure_for_self: attributes.insure_for_self.default,
    product_id: saveData.detailData.id,
    channel_product_id: saveData.detailData.channel_product_id
  };

  const formData = {
    channel_product_id: saveData.detailData.channel_product_id,
    target: type,
    old_scode,
    scode: saveData.newScode,
    data: JSON.stringify(data)
  }

  forward([], formData)
  .then(res => {
    const new_scode = res.data.data.scode;
    const new_share_link = res.data.data.share_link;
    const old_scode = saveData.newScode;

    saveData.newScode = new_scode;
    saveData.newShareUrl = new_share_link;

    setShareInfo(attributes, old_scode);
  })


}

// 分享
function setShareInfo(attributes, old_scode) {
  try {
    // 好友
    wx.ready(function() {
      wx.onMenuShareAppMessage({
        title: saveData.detailData.title,
        desc: saveData.detailData.share_description,
        imgUrl: saveData.detailData.share_cover,
        link: saveData.newShareUrl,
        success: function() {
          updateShareInfo(1, attributes, old_scode);
        }
      });
      // 朋友圈
      wx.onMenuShareTimeline({
        title: saveData.detailData.title,
        desc: saveData.detailData.share_description,
        imgUrl: saveData.detailData.share_cover,
        link: saveData.newShareUrl,
        success: function() {
          updateShareInfo(2, attributes, old_scode);
        }
      });
    })
  } catch (e) {
    console.log('该功能需要在微信配置已配置的前提下才能使用');
  }
}
// 页面第一次分享
export const firstSharePage = function(detail, old_scode) {

  saveData.detailData = detail;

  getPrevShareLink().then(res => {
    console.log('页面第一次分享成功请求', res.data)
    const { scode, share_link } = res.data.data;
    saveData.newScode = scode;
    saveData.newShareUrl = share_link;
    
    getWxConfig().then(res => {
      console.log('getWxConfig请求', res)
      wx.config(res.data.data);
      setShareInfo(detail.attributes, old_scode);
    })
  })
}
// 页面后续分享
export const sharePage = function(data, old_scode) {
  console.log('后续分享', data, old_scode)
  getWxConfig()
    .then(res => {
      wx.config(res.data.data);
      setShareInfo(data, old_scode);
    })
  // setShareInfo(data, old_scode);
}