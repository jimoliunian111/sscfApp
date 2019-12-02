import { get, post } from './helper';

// wap端接口
const wapBaseUrl = 'http://h5.beta.12354.com' || process.env.DOMAIN;

// const auth = process.env.AUTH ? '?developer=1' : '';
const auth = `?developer=1`


const wapUrls = {
  getConfigure: `${wapBaseUrl}/api/v1/insurance/product/configure${auth}`,
  getDetail: `${wapBaseUrl}/api/v1/insurance/product/distribution/detail${auth}`,
  getCalc: `${wapBaseUrl}/api/v1/insurance/product/premium/calculate${auth}`,
  getPlace: `${wapBaseUrl}/api/v1/insurance/product/district/list${auth}`,
  getVocation: `${wapBaseUrl}/api/v1/insurance/product/profession/list${auth}`,
  getAttribute: `${wapBaseUrl}/api/v1/insurance/product/attributes${auth}`,
  getBank: `${wapBaseUrl}/api/v1/insurance/product/bank/list${auth}`,
  getAgreement: `${wapBaseUrl}/api/v1/insurance/product/agreement/list${auth}`,
  getInsureAttribute: `${wapBaseUrl}/api/v1/insurance/product/distribution/insure/attributes${auth}`,
  recognize: `${wapBaseUrl}/api/v1/insurance/product/id/card/recognize${auth}`,
  validate: `${wapBaseUrl}/api/v1/insurance/order/distribution/store/validate${auth}`,
  getFaqList: `${wapBaseUrl}/api/v1/insurance/product/faq/list${auth}`,
  getFaq: `${wapBaseUrl}/api/v1/insurance/product/faq/detail${auth}`,
  store: `${wapBaseUrl}/api/v1/insurance/order/distribution/store${auth}`,
  payDetail: `${wapBaseUrl}/api/v1/insurance/order/distribution/cashier-desk/attributes${auth}`,
  pay: `${wapBaseUrl}/api/v1/insurance/order/distribution/pay${auth}`,
  uploadOcrFile: `${wapBaseUrl}/api/v1/insurance/order/distribution/upload-ocr-files${auth}`,
  confirmQuery: `${wapBaseUrl}/api/v1/insurance/order/distribution/confirm-query${auth}`,
  getApplicantVocation: `${wapBaseUrl}/api/v1/insurance/product/applicant/profession/list${auth}`,
  queryOrder: `${wapBaseUrl}/api/v1/insurance/order/distribution/info${auth}`,
  orderSuccess: `${wapBaseUrl}/api/v1/insurance/order/distribution/simple-info${auth}`,
  getWxConfig: `${wapBaseUrl}/api/v1/wechat/jssdk/config${auth}`,
  getPrevShareLink: `${wapBaseUrl}/api/v1/product/distribution/user/share/link${auth}`,
  forward: `${wapBaseUrl}/api/v1/product/distribution/detail/forward/user${auth}`,
  searchProfession: `${wapBaseUrl}/api/v1/insurance/product/profession/search-name${auth}`,
  getBankDistrict: `${wapBaseUrl}/api/v1/insurance/product/bank/district/list${auth}`,
  getPayStatus: `${wapBaseUrl}/api/v1/insurance/order/distribution/query-order-status${auth}`,
  getFilePath: `${process.env.UPLOADDOMAIN}/api/files/path`,
  read: `${wapBaseUrl}/trajectory/product/read${auth}`,
  report: `${wapBaseUrl}/trajectory/product/read/report${auth}`,
  order_detail: wapBaseUrl + '/api/v1/insurance/order/distribution/detail',
  agreement_content: wapBaseUrl + '/api/v1/insurance/product/agreements/ids',
  cashier_desk: wapBaseUrl + '/api/v1/insurance/order/distribution/get-cashier-desk',
  visit: `${wapBaseUrl}/api/v1/insurance/order/distribution/visit${auth}`  // 华贵新增回访接口
}

export const getWapDetail = get.bind(null, wapUrls.getDetail);

export const getWapCalc = post.bind(null, wapUrls.getCalc);

export const getWapPlace = get.bind(null, wapUrls.getPlace);

export const getWapVocation = get.bind(null, wapUrls.getVocation);

export const getWapAttribute = post.bind(null, wapUrls.getAttribute);

export const getWapBank = get.bind(null, wapUrls.getBank);

export const getWapAgreement = get.bind(null, wapUrls.getAgreement);

export const getWapInsureAttribute = post.bind(null, wapUrls.getInsureAttribute);

export const wapRecognize = post.bind(null, wapUrls.recognize);

export const wapValidate = post.bind(null, wapUrls.validate);

export const getFaqList = get.bind(null, wapUrls.getFaqList);

export const getFaq = get.bind(null, wapUrls.getFaq);

export const store = post.bind(null, wapUrls.store);

export const payDetail = get.bind(null, wapUrls.payDetail);

export const pay = post.bind(null, wapUrls.pay);

export const confirmQuery = post.bind(null, wapUrls.confirmQuery);

export const getApplicantVocation = get.bind(null, wapUrls.getApplicantVocation);

export const queryOrder = get.bind(null, wapUrls.queryOrder);

export const orderSuccess = get.bind(null, wapUrls.orderSuccess);

export const getWxConfig = get.bind(null, wapUrls.getWxConfig);

export const getPrevShareLink = get.bind(null, wapUrls.getPrevShareLink);

export const forward = post.bind(null, wapUrls.forward);

export const searchProfession = post.bind(null, wapUrls.searchProfession);

export const read = get.bind(null, wapUrls.read);

export const report = post.bind(null, wapUrls.report);

export const getBankDistrict = get.bind(null, wapUrls.getBankDistrict);

export const getPayStatus = get.bind(null, wapUrls.getPayStatus);

export const getConfigure = get.bind(null, wapUrls.getConfigure);

export const getFilePath = get.bind(null, wapUrls.getFilePath);

export const uploadOcrFile = post.bind(null, wapUrls.uploadOcrFile);

export const visit = post.bind(null, wapUrls.visit);

export const getOrderDetail = get.bind(null, wapUrls.order_detail);

export const getAgreementContent = get.bind(null, wapUrls.agreement_content);

export const getCashierDeskUrl = get.bind(null, wapUrls.cashier_desk);
