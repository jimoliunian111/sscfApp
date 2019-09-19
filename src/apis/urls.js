import { ajaxRequest } from '@/utils/net-utils';

const url = {
    order_detail: '/api/v1/insurance/order/distribution/detail',
    agreement_content: '/api/v1/insurance/product/agreements/ids',
    cashier_desk: '/api/v1/insurance/order/distribution/get-cashier-desk'
}

export const getOrderDetail = (data, successCallback) => {
    ajaxRequest({
        url: url.order_detail,
        data,
        successCb(res) { successCallback(res.data); }
    });
};

export const getAgreementContent = (data, successCallback) => {
    ajaxRequest({
        url: url.agreement_content,
        data,
        successCb(res) { successCallback(res.data); }
    });
}

export const getCashierDeskUrl = (data, successCallback) => {
    ajaxRequest({
        url: url.cashier_desk,
        data,
        successCb(res) { successCallback(res.data); }
    });
}