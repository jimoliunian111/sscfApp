
import { getPrevShareLink, forward, getWxConfig } from '@/utils/apis';


let saveData = {
  detailData: null,
  newScode: null,
  newShareUrl: null
};


// 更新分享信息
function updateShareInfo(type, attributes, old_scode) {

  const data = {
    insure_plan: {
      guarantee_quota: attributes.insure_plan.guarantee_quota.default,
      guarantee_period: attributes.insure_plan.guarantee_period.default,
      scheme: attributes.insure_plan.scheme.default,
      additional_insurance_00003: attributes.insure_plan.additional_insurance_00003.default
    },
    insured: {
      birthday: attributes.insured.birthday.default,
      social_security: attributes.insured.social_security.default,
    },
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
