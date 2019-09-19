import { get, post } from '../utils/helper';

// wap端接口
const wapBaseUrl = process.env.DOMAIN;

const auth = process.env.AUTH ? '?developer=1' : '';

const wapUrls = {
  getSituationList: `${wapBaseUrl}/api/v1/insurance/health/situation/list${auth}`,
  getSituationAnswer: `${wapBaseUrl}/api/v1/insurance/health/situation/answer${auth}`,
  getConfigure: `${wapBaseUrl}/api/v1/insurance/product/configure${auth}`,
  getHealthSerial: `${wapBaseUrl}/api/v1/insurance/health/health-serial${auth}`,
  getCategoryList: `${wapBaseUrl}/api/v1/insurance/health/category/list${auth}`,
  getCategorySubject: `${wapBaseUrl}/api/v1/insurance/health/category/subject${auth}`,
  getHealthSubject: `${wapBaseUrl}/api/v1/insurance/health/subject${auth}`,
  saveSubjectAnswer: `${wapBaseUrl}/api/v1/insurance/health/save-subject-answer${auth}`,
  checkSerial: `${wapBaseUrl}/api/v1/insurance/health/check-serial${auth}`,
  saveCategoryAnswer: `${wapBaseUrl}/api/v1/insurance/health/save-category-answer${auth}`,
  saveConclusion: `${wapBaseUrl}/api/v1/insurance/health/save-conclusion${auth}`,
  refuseConclusion: `${wapBaseUrl}/api/v1/insurance/health/refuse-conclusion${auth}`
}

export const getSituationList = post.bind(null, wapUrls.getSituationList);

export const getConfigure = get.bind(null, wapUrls.getConfigure);

export const getHealthSerial = get.bind(null, wapUrls.getHealthSerial);

export const getSituationAnswer = post.bind(null, wapUrls.getSituationAnswer);

export const getCategoryList = post.bind(null, wapUrls.getCategoryList);

export const getCategorySubject = post.bind(null, wapUrls.getCategorySubject);

export const getHealthSubject = post.bind(null, wapUrls.getHealthSubject);

export const saveSubjectAnswer = post.bind(null, wapUrls.saveSubjectAnswer);

export const checkSerial = post.bind(null, wapUrls.checkSerial);

export const saveCategoryAnswer = post.bind(null, wapUrls.saveCategoryAnswer);

export const saveConclusion = post.bind(null, wapUrls.saveConclusion);

export const refuseConclusion = post.bind(null, wapUrls.refuseConclusion);


