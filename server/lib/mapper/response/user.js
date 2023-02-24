const _ = require('lodash');
const moment = require('moment');

const constants = require('../../../constants');
const __lib__ = require('../../../lib');

module.exports = {
    usage: {
        '[]': [
            {
                key: '[]',
                transform: function (value) {
                    const thumbNail = `${_.split(value.productOption.images[0], '.' , 3)}_thumb.${_.split(value.productOption.images[0], '.' , 4)[3]}`
                    let returnObj = {
                        orderId: value.id,
                        productId: value.product.id,
                        productName: value.productOption.name,
                        options: __lib__.productHashToArray(value.hash),
                        productOptions: __lib__.productHashToString(value.hash),
                        productImage: {
                            origin: `${value.productOption.images[0]}`,
                            thumb: _.replace(thumbNail, new RegExp(',', 'g' ), '.')
                        },
                        canCancel: 2 > _.size(value.orderStatusHistories),
                        status: value.status,
                        type: value.transaction.response.type,
                        lastStatus: constants.orderStatus[value.status],
                        testWillEndAt: value.testWillEndAt,
                        deliveryCorp: value.deliveryCorp,
                        invoiceNo: value.invoiceNo,
                        reviewed: 0 === value.reviews.length ? false : true,
                        reviewId: 0 !== value.reviews.length ? _.map(_.filter(value.reviews, (review) => review.fkProductId === value.product.id ), (val) => val.id).pop() : null,
                        createdAt: value.createdAt,
                    };


                    return returnObj;
                },
            },
        ],
    },
    usageInfo: {
        id: 'orderId',
        merchantUid: 'merchantUid',
        'product.id': 'productId',
        'productOption.name': 'productName',
        hash: [
            {
                key: 'productOptions',
                transform: function (value) {
                    return __lib__.productHashToString(value);
                },
            },
        ],
        'productOption.images': [
            {
                key: 'productImage',
                transform: function (value) {
                    const thumbNail = `${_.split(value[0], '.' , 3)}_thumb.${_.split(value[0], '.' , 4)[3]}`
                    return {
                        origin: `${value[0]}`,
                        thumb: _.replace(thumbNail, new RegExp(',', 'g' ), '.')
                    };
                },
            },
        ],
        'productOption.optionText': 'productOptions',
        status: [
            {
                key: 'lastStatus',
                transform: function (value) {
                    return constants.orderStatus[value];
                },
            },
        ],
        testWillEndAt: 'testWillEndAt',
        invoiceNo: 'invoiceNo',
        createdAt: 'createdAt',
        transaction: [
            {
                key: 'orderInfo',
                transform: function (value, all) {
                    return value.response;
                },
            },
        ],
        orderPaymentHistories: [
            {
                key: 'paymentSum',
                transform: function (value, all) {
                    return _.sum(_.map(value, 'amount'));
                },
            },

            {
                key: 'paymentHistories[]',
                transform: function (value, all) {
                    return { type: value.type, amount: value.amount, payMethod: value.payMethod };
                },
            },
        ],
        orderStatusHistories: [
            {
                key: 'statusHistories[]',
                transform: function (value, all) {
                    return value;
                },
            },
        ],
        orderRefundHistories: [
            {
                key: 'refundHistories[]',
                transform: function (value, all) {
                    return value;
                },
            },
        ],
        reviews: [
            {
                key: 'reviewed',
                transform: function (value) {
                    return 0 === value.length ? false : true;
                },
            },
        ],
    },
};
