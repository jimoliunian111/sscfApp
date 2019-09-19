export default function() {
  try {
    wx.ready(function () {
            wx.hideOptionMenu();
        });
    } catch (e) {
        console.log('该功能需要在微信配置已配置的前提下才能使用');
    }
}