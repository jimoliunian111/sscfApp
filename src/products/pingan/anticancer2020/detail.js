import { FetchCalc, FetchAttribute, FetchDetail } from '@/utils/apis';
import { PxToRem, calcAge } from '@/utils/common-utils';
import eventBus from '@/utils/eventBus';
import report from '@/utils/report';
import { bindFreeze, unbindFreeze } from '@/utils/bodyScrollFreeze';
import { firstSharePage, sharePage } from './sharePage';

// 组件集合
import detailReadModule from '@/widgets/detail-read-module/index.vue'
import selectWidget from '@/widgets/v2/form-item-module/select-widget.vue'
import checkWidget from '@/widgets/v2/form-item-module/check-widget.vue'
import vocationModule from './components/vocation-module/vocation-module.vue'
import datetimeWidget from '@/widgets/v2/form-item-module/datetime-widget.vue'
import detailChooseWidget from '@/widgets/v2/detail-choose-widget.vue'

// 模拟数据
import pageConf from './detail/pageConf.json'
import accordingData from './detail/accordingData.js'


export const detailMixin = {
  data () {
    return {
      // 通用数据
      channel_product_id: null,
      product_id: null,
      source: {},
      formValue: {},
      // 渤海的数据
      dataObj: pageConf.data,
      vocationShow: false,
      pageConf: {
        ensureInviolable: [],
        insureBirthday: {},
        payment_period: {},
        guarantee_period: {},
        guarantee_quota: {},
        scheme: {},
        social_security: {},
        additional_insurance_00003: {}
      },
      ensureInviolable: accordingData
    }
  },
  components: {
    detailReadModule,
    selectWidget,
    checkWidget,
    vocationModule,
    datetimeWidget,
    detailChooseWidget
  },
  methods: {
    init () {
      this.wapInit()
    },
    getBirthdayData (val, str) {
      console.log('获取时间模块数据', val, str)
      let arr = str.split('/')
      this.formValue[arr[0]].birthday = val
      this.fetchAttributes()
    },
    chooseProfression () {
      console.log('点击了职业模块')
      this.vocationShow = true
    },
    getSelectData (val, str) {
      console.log('获取select模块数据', val, str)
      let arr = str.split('/')
      this.formValue[arr[0]][arr[1]] = val.value
      this.fetchAttributes()
    },
    getCheckData (val, str) {
      console.log('获取check模块数据', val, str)
      let arr = str.split('/')
      this.formValue[arr[0]][arr[1]] = val.value
      this.fetchAttributes()
    },
    getProfession (arr, str, name) {
      console.log('获取职业信息', arr, str, name)
      this.pageConf.profession = arr[2].name
      this.formValue.insured.profession = arr[2]
      this.fetchAttributes()
    },
    getProfessionItem (item, str) {
      this.pageConf.profession = item.name
      this.formValue.insured.profession = item
      this.fetchAttributes()
    },
    pageInit() {
      if (this.$route.query.health_inform_status == 'H' && !JSON.parse(sessionStorage.getItem('isShowWarn'))) {
        this.showWarn = true
      	sessionStorage.setItem('isShowWarn', true)
      }
      this.isLoading = true;
      this.$vux.loading.show({
        text: '正在加载中'
      });
      // 获取页面初始化参数
      FetchDetail([], { scode: this.scode }).then(({data}) => {

        if (data.code === 0) {
          this.$vux.loading.hide();
          this.isLoading = false;
          this.source = data.data;
          this.product_id = data.data.id;
          this.channel_product_id = data.data.channel_product_id;

          this.valueFormat(data.data.attributes);
          this.calcValue();

          // 设置微信分享
          firstSharePage(data.data, this.scode);

          setTimeout(() => {
            this.isInit = true;
          }, 300);

          // 等待页面渲染队列加载完毕，tabTop能获取到正确位置
          setTimeout(() => {
            const tab = document.querySelector('.main-tabs');

            this.tabLocation = tab.offsetTop;

            window.addEventListener('scroll', () => {
              const windowScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

              if (windowScrollTop > this.tabLocation) {
                tab.classList.add('tab-fixed');
              } else {
                tab.classList.remove ('tab-fixed');
              }
            });
          }, 500);
        } else {
          this.$vux.toast.show({
            text: data.message,
            type: 'text'
          });
        }

      })
      .catch(err => {
        this.$vux.toast.show({
          text: err,
          type: 'text'
        });
      });
    },
    forSelfFunc (value) {
    },
    // 格式化页面属性数据
    valueFormat (value) {
      console.log('初始化属性赋值', value)
      this.formValue = Object.assign({}, this.formValue, {
        product_id: this.product_id,
        insure_plan: {
          guarantee_quota: value.insure_plan.guarantee_quota.default,
          guarantee_period: value.insure_plan.guarantee_period.default,
          scheme: value.insure_plan.scheme.default,
          additional_insurance_00003: value.insure_plan.additional_insurance_00003.default
        },
        insured: {
          birthday: value.insured.birthday.default,
          social_security: value.insured.social_security.default,
        }
      });
      this.pageConf = { // 页面配置
        insureBirthday: {
          date: value.insured.birthday.default,
          start_date: value.insured.birthday.max,
          end_date: value.insured.birthday.min
        },
        social_security: {
          checked: {
            value: value.insured.social_security.default
          },
          list: value.insured.social_security.items
        },
        guarantee_quota: {
          selected: {
            value: value.insure_plan.guarantee_quota.default
          },
          list: value.insure_plan.guarantee_quota.items
        },
        guarantee_period: {
          selected: {
            value: value.insure_plan.guarantee_period.default.value
          },
          list: value.insure_plan.guarantee_period.items
        },
        scheme: {
          selected: {
            value: value.insure_plan.scheme.default
          },
          list: value.insure_plan.scheme.items
        },
        additional_insurance_00003: {
          checked: {
            value: value.insure_plan.additional_insurance_00003.default
          },
          list: value.insure_plan.additional_insurance_00003.items
        }
      }
      if (this.formValue.insure_plan.additional_insurance_00003 === 1) {
        this.ensureInviolable[this.ensureInviolable.length - 1].show = true
      } else {
        this.ensureInviolable[this.ensureInviolable.length - 1].show = false
      }
    },
    // 返回页面属性所需数据
    attribution() {
      return {
          ...this.formValue
        }
    },
    // 获取页面属性
    fetchAttributes() {
      if (this.isInit) {
        this.$vux.loading.show({
          text: '正在加载中'
        });

        FetchAttribute([], this.attribution()).then(res => {
          if (res.data.code === 0) {
            this.$vux.loading.hide();
            const data = res.data.data;
            this.valueFormat(data);
            this.calcValue();

            this.$nextTick(() => {
              this.tabLocation = document.querySelector('.main-tabs').offsetTop;
            });

            // 分享 刷新页面参数
            sharePage(res.data.data, this.scode);
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
      }
    },
    // 返回保费计算所需数据
    calculate() {
      return {
        product_id: this.product_id,
        ...this.formValue
      }
    },
    // 计算保费
    calcValue() {
      this.amount = null;

      FetchCalc([], this.calculate()).then(res => {
        if (res.data.code === 0) {
          this.amount = res.data.data.amount;
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            type: 'text'
          });
          this.amount = '--'
        }
      })
      .catch(err => {
        this.$vux.toast.show({
          text: err,
          type: 'text'
        });
      });
    },
    // 保障权益列表点击事件
    ensureTitleClick(type) {
      const titleGroup = document.querySelectorAll('.ensure-inviolable-content-item-title');
      const isCurrent = titleGroup[type].classList.contains('cur');

      [...titleGroup].forEach(item => {
        item.querySelector('.icon').innerHTML = '&#xe60e;';
        item.querySelector('.icon').style.color = '#B3B3B3';
        item.classList.remove('cur');
        item.nextElementSibling.classList.remove('cur');
      })

      if (!isCurrent) {
        titleGroup[type].querySelector('.icon').innerHTML = '&#xe608;';
        titleGroup[type].querySelector('.icon').style.color = '#ffa714';
        titleGroup[type].classList.add('cur');
        titleGroup[type].nextElementSibling.classList.add('cur');
      }

      this.$nextTick(() => {
        this.tabLocation = document.querySelector('.main-tabs').offsetTop;
      });
    },
    // showHealthAdvice() {
    //   if (!this.formValue.insured.profession.name) {
    //     this.$vux.toast.show({
    //       text: '请先选择职业',
    //       type: 'text'
    //     });
    //     return
    //   }
    //   this.healthAdviceShow = true;
    //   // this.jump2InsureInfo(); // 渤海不适用
    // },
    showApplicantHealthAdvice () {
      this.applicantHealthAdviceShow = true;
    },
    infoStorage () {
      window.sessionStorage.setItem('formValue', JSON.stringify(this.formValue));
      window.sessionStorage.setItem('product_id', this.product_id);

      window.sessionStorage.setItem('channel_product_id', this.channel_product_id);
      window.sessionStorage.setItem('scode', this.scode);

      window.sessionStorage.setItem('share_cover', this.source.share_cover);
      window.sessionStorage.setItem('share_description', this.source.share_description);
      window.sessionStorage.setItem('share_title', this.source.title);
    },
    jump2InsureInfo() {
      this.infoStorage()
      this.$router.push({ name: 'pingan_anticancer2020_insureInfo'});
      unbindFreeze();
    },
    calcAge,
    PxToRem,
    // 固定页面
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
    // 健康告知警告
    warn () {
      this.infoStorage()
      let params = {
        product_id: this.product_id,
        channel_product_id: this.channel_product_id,
        scode: this.scode
      }
      let url = this.seturl(process.env.HEALTH_HOST + '/pingan/health-inform', params)
      window.location.href = url
      // this.showWarn = true;
    },
    seturl (path, obj) {
      return path + '?' + Object.entries(obj).map(item => item.join('=')).join('&')
    },
    // --------------wap独有的方法------------------
    // 问题页面跳转
    jump2FaqList () {
      console.log('11122')
      this.$router.push({ name: 'faq_list', query: { product_id: this.product_id }});
      unbindFreeze();
    },
    // 当前页面菜单栏微信配置，每个页面单独配置
    wxConfig () {
      try {
        wx.ready(function () {
            wx.showOptionMenu();
            wx.hideMenuItems({
             menuList: ['menuItem:copyUrl', 'menuItem:editTag', 'menuItem:delete',
                        'menuItem:openWithQQBrowser', 'menuItem:originPage',
                        'menuItem:favorite', 'menuItem:openWithSafari']
            });
        });
      } catch (e) {
          console.log('该功能需要在微信配置已配置的前提下才能使用');
      }
    },
    wapInit () {
      this.scode = this.$route.query.scode;
      // 微信设置
      this.wxConfig();
      const self = this;
      this.pageInit();
      console.log('process', process.env)
      if (process.env.DOMAIN !== 'http://m.proxy.cfb.com') {
        report(this);
      }

      window['openInformationPopup'] = function() {
        self.claimsServiceShow = true;
      }
    }
  },
  computed: {

  },
  watch: {
    // 解决滚动穿透问题
    contentPopupShow(v) {
      this.shouldBodyFreeze(v);
    },
    claimsServiceShow(v) {
      this.shouldBodyFreeze(v);
    },
    healthAdviceShow(v) {
      this.shouldBodyFreeze(v);
    }
  },
  created () {
    this.init()
  }
}
