const constants = require('../../../constants');
const _ = require('lodash');
const moment = require('moment');

module.exports = {
    paymentData: {
        imp_uid: 'impUid',
        merchant_uid: 'merchantUid',
        amount: 'amount',
        status: [
            {
                key: 'statusToBe',
                transform: function (value, all) {
                    switch (Number(all.type)) {
                        case constants.orderType.test:
                            return Number(_.findKey(constants.orderStatus, (value) => value === '체험신청완료'));
                        default:
                            return Number(_.findKey(constants.orderStatus, (value) => value === '구매완료'));
                    }
                },
            },
            {
                key: 'currentStatus?',
                transform: function (value, all) {
                    switch (Number(all.type)) {
                        case constants.orderType.general:
                            return Number(_.findKey(constants.orderStatus, (value) => value === '체험중'));
                        default:
                            return null;
                    }
                }
            }
        ],
        userId: {
            key: 'fkUserId?',
            transform: function (value) {
                return Number(value);
            },
        },
        productId: {
            key: 'fkProductId?',
            transform: function (value) {
                return Number(value);
            },
        },
        orderId: {
            key: 'orderId?',
            transform: function (value) {
                return !!_.isNil(value) ? value : Number(value);
            }
        },
        addressHead: [
            {
                key: 'addressHead?',
                transform: function (value) {
                    return value;
                },
            },
            {
                key: 'address?',
                transform: function (value, all) {
                    const addressHead = !!_.isNil(value) ? '주소1 정보없음' : value;
                    const addressDetail = !!_.isNil(all.addressDetail) ? '주소2 정보없음' : all.addressDetail;
                    const address = `${addressHead}, ${addressDetail}`;

                    return address;
                },
            },
        ],
        addressDetail: 'addressDetail?',
        postCode: 'postCode?',
        memos: 'memos?',
        memo: 'memo',
        hash: 'hash?',
        type: {
            key: 'type?',
            transform: function (value) {
                return Number(value);
            },
        },
        pay_method: {
            key: 'payMethod?',
            transform: function (value, all) {
                const providerCode = all.emb_pg_provider;
                const payMethod = !!_.isNil(providerCode) ? constants.payMethod[value] : `${constants.payMethod[value]} - ${constants.payMethod[providerCode]}`;

                return payMethod;
            },
        },
        channel: 'channel',
        pg_provider: 'pg_provider',
        emb_pg_provider: 'emb_pg_provider',
        pg_tid: 'pg_tid',
        pg_id: 'pg_id',
        escrow: 'escrow',
        apply_num: 'apply_num',
        bank_code: 'bank_code',
        bank_name: 'bank_name',
        card_code: 'card_code',
        card_name: 'card_name',
        card_quota: 'card_quota',
        card_number: 'card_number',
        card_type: 'card_type',
        vbank_code: 'vbank_code',
        vbank_name: 'vbank_name',
        vbank_num: 'vbank_num',
        vbank_holder: 'vbank_holder',
        vbank_date: 'vbank_date',
        vbank_issued_at: 'vbank_issued_at',
        name: 'name',
        cancel_amount: 'cancel_amount',
        currency: 'currency',
        buyer_name: 'buyer_name',
        buyer_email: 'buyer_email',
        buyer_tel: 'buyer_tel',
        buyer_postcode: 'postCode',
        user_agent: 'user_agent',
        started_at: {
            key: 'startedAt?',
            transform: function (value) {
                const startedAt = !value ? null : moment.unix(value);

                return startedAt;
            },
        },
        paid_at: {
            key: 'paidAt?',
            transform: function (value) {
                const paidAt = !value ? null : moment.unix(value);

                return paidAt;
            },
        },
        failed_at: {
            key: 'failedAt?',
            transform: function (value) {
                const failedAt = !value ? null : moment.unix(value);

                return failedAt;
            },
        },
        cancelled_at: {
            key: 'canceledAt?',
            transform: function (value) {
                const cancelledAt = !value ? null : moment.unix(value);

                return cancelledAt;
            },
        },
        fail_reason: 'fail_reason',
        cancel_reason: 'cancel_reason',
        receipt_url: 'receipt_url',
        cancel_history: 'cancel_history',
        cancel_receipt_urls: 'cancel_receipt_urls',
        cash_receipt_issued: 'cash_receipt_issued',
        customer_uid: 'customer_uid',
        customer_uid_usage: 'customer_uid_usage',
    },

    refundInfo: {
        imp_uid: 'impUid',
        merchant_uid: 'merchantUid',
        fkOrderId: {
            key: 'fkOrderId?',
            transform: function (value) {
                return Number(value);
            },
        },
        fkUserId: {
            key: 'fkUserId?',
            transform: function (value) {
                return Number(value);
            },
        },
        fkProductId: {
            key: 'fkProductId?',
            transform: function (value) {
                return Number(value);
            },
        },
        hash: 'hash',
        type: {
            key: 'type?',
            transform: function (value) {
                return Number(value);
            },
        },
        amount: {
            key: 'amount',
            transform: function (value) {
                return -value;
            },
        },
        payMethod: 'payMethod',
        isRefund: {
            key: 'isRefund?',
            transform: function (value) {
                return true;
            },
        },
        status: 'status',
        reason: {
            key: 'reason?',
            transform: function (value) {
                return {
                    contents: value,
                    workUser: 'user',
                    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                };
            },
        },
    },
    orderInfo: {
        id: 'id',
        merchantUid: 'merchantUid',
        fkUserId: 'fkUserId',
        fkProductId: 'fkProductId',
        address: 'address',
        hash: 'hash',
        status: 'status',
        statusText: {
            key: 'statusText?',
            transform: function (value, all) {
                const statusText = !!_.isNil(all) ? null : constants.orderStatus[all.status];

                return statusText;
            },
        },
        'orderPaymentHistories[]': [
            {
                key: 'orderPaymentHistories?',
                transform: function (value) {
                    let _return_ = !!_.isNil(value) ? null : value.map((val) => _.omit(val.dataValues, ['createdAt']));

                    return _return_;
                },
            },
        ],
        testTerm: 'testTerm?',
        testWillEndAt: {
            key: 'testWillEndAt?',
            transform: function (value) {
                const testWillEndAt = !!_.isNil(value) ? null : moment(value).format('YYYY-MM-DD 23:59:59');

                return testWillEndAt;
            },
        },
        fid: 'fid?',
        invoiceNo: 'invoiceNo?',
        memos: 'memos?',
        createdAt: {
            key: 'createdAt',
            transform: function (value) {
                return moment(value).format('YYYY-MM-DD HH:mm:ss');
            },
        },
    },

    orderDeliveryDone: {
        id: 'orderId',
        status: [
            {
                key: 'status',
                transform: function (value) {
                    return value;
                },
            },
            {
                key: 'statusToBe',
                transform: function (value) {
                    switch (true) {
                        case value < 400:
                            // 체험중으로 처리
                            return _.findKey(constants.orderStatus, (value) => value === '체험중');
                        case value < 500:
                            // 반납확인중으로 처리
                            return _.findKey(constants.orderStatus, (value) => value === '반납확인중');
                        case value < 600:
                            // 반품확인중으로 처리
                            return _.findKey(constants.orderStatus, (value) => value === '반품확인중');
                        default:
                            return value;
                    }
                },
            },
        ],
        fid: 'fid?',
        invoice_no: 'invoiceNo?',
        testTerm: 'testTerm?',
        time_trans: 'timeTrans?',
        testWillEndAt: {
            key: 'testWillEndAt',
            transform: function (value, all) {
                let _return_ = null;
                const testDays = all.testTerm;
                const deliveryDoneAt = all.time_trans;
                const status = all.status;

                if (status < 400) {
                    // testWillEndAt이 값이 있어야되는 상태
                    _return_ = moment(deliveryDoneAt).add(testDays, 'days');
                }

                return _return_;
            },
        },
    },

    orderPaymentHistory: {
        id: 'id',
        fkOrderId: 'fkOrderId',
        fkUserId: 'fkUserId',
        imp_uid: 'impUid',
        merchant_uid: 'merchantUid',
        type: 'type',
        amount: 'amount',
        payMethod: 'payMethod',
        createdAt: {
            key: 'createdAt',
            transform: function (value) {
                return moment(value).format('YYYY-MM-DD HH:mm:ss');
            },
        },
    },

    userAddress: {
        addressHead: 'addressHead',
        addressDetail: 'addressDetail',
        postCode: 'postCode',
    },

    returnOrderInfo: {
        orderId: 'orderId',
        cancelReasonGeneral: {
            key: 'reason?',
            transform: function (value, all) {
                const _return_ = {
                    contents: !!_.isNil(all.cancelReasonEtc) ? value : `${value} - ${all.cancelReasonEtc}`,
                    type: !!_.isNil(all.returnType) ? null : constants.returnType[all.returnType],
                    workUser: "user",
                    createdAt: moment().utc().add(9, 'hour').format("YYYY-MM-DD HH:mm:ss"),
                }

                return _return_;
            },
        },
        returnType: [
            {
                key: 'returnType',
                transform: function (value) {
                    return value;
                },
            },
            {
                key: 'returnTypeText',
                transform: function (value) {
                    const returnTypeText = !!_.isNil(value) ? null : constants.returnType[value];

                    return returnTypeText;
                },
            },
        ],
        addressHead: {
            key: 'address?',
            transform: function (value, all) {
                const address = !!_.isNil(value) ? null : `${value}, ${all.addressDetail}`;

                return address;
            },
        },
        postCode: 'postCode?',
        deliveryCorp: 'deliveryCorp?',
        status: [
            {
                key: 'status',
                transform: function (value) {
                    return value;
                },
            },
            {
                key: 'statusToBe',
                transform: function (value) {
                    return value + 50;
                },
            },
        ],
        fid: {
            key: 'fid',
            transform: function () {
                return moment().format('X');
            },
        },
        invoiceNo: 'invoiceNo?',
        testTerm: 'testTerm',
        testWillEndAt: 'testWillEndAt?',
    },
    trackingBody: {
        invoiceNo: 'num',
        deliveryCorp: 'code',
        fid: 'fid',
        callbackUrl: {
            key: 'callback_url',
            transform: function (value) {
                return config.sweetTracker.callbackUri;
            },
        },
        callbackType: {
            key: 'callback_type',
            transform: function (value) {
                return config.sweetTracker.callbackType;
            },
        },
        tier: {
            key: 'tier',
            transform: function (value) {
                return config.sweetTracker.tier;
            },
        },
        key: {
            key: 'key',
            transform: function (value) {
                return config.sweetTracker.apiKey;
            },
        },
    },
    trackingResponse: {
        success: 'success',
        num: 'num',
        fid: 'fid',
    },
    sweetTrackerResponse: {
        code: 'code',
        message: 'message',
    },
};
