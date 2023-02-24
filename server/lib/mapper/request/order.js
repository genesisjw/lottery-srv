const _ = require('lodash');

module.exports = {
    iamportWebhookDto: {
        type: 'object',
        properties: {
            impUid: {
                type: 'string',
            },
            merchantUid: {
                type: 'string',
            },
        },
    },
    productInfoDto: {
        type: 'object',
        properties: {
            productId: {
                type: 'number',
            },
            optionIds: {
                type: 'array',
                splitWith: ',',
                items: { type: 'number' },
            },
            purchaseType: {
                type: 'number',
            },
        },
    },
    paymentInfoDto: {
        type: 'object',
        properties: {
            orderId: {
                type: 'number',
            },
        },
    },
    cancelOrderDto: {
        type: 'object',
        properties: {
            orderId: {
                type: 'number',
            },
            cancelReasonGeneral: {
                type: 'number',
            },
            cancelReasonEtc: {
                type: 'string',
            },
        },
    },
    returnOrderDto: {
        type: 'object',
        properties: {
            orderId: {
                type: 'number',
            },
            cancelReasonGeneral: {
                type: 'string',
            },
            cancelReasonEtc: {
                type: 'string',
            },
            returnType: {
                type: 'number',
            },
            addressHead: {
                type: 'string',
            },
            addressDetail: {
                type: 'string',
            },
            postCode: {
                type: 'string',
            },
            deliveryCorp: {
                type: 'string',
            },
            invoiceNo: {
                type: 'string',
            },
        },
    },
    deliveryTrackingInfo: {
        type: 'object',
        properties: {
            secret_value: {
                // 인증키(현재사용안함)
                type: 'string',
            },
            fid: {
                // 식별값
                type: 'string',
            },
            invoice_no: {
                // 운송장번호
                type: 'string',
            },
            level: {
                // 배송단계(1~6), -99 배송 스캔 오류
                type: 'number',
            },
            time_trans: {
                // 택배사 처리시간
                type: 'date',
            },
            time_sweet: {
                // 스윗트래커 등록시간
                type: 'date',
            },
            where: {
                // 택배 위치
                type: 'string',
            },
            telno_office: {
                // 사업소 기반 전화번호
                type: 'string',
            },
            telno_man: {
                // 배송기사 전화번호
                type: 'string',
            },
            details: {
                // 배송상세 정보
                type: 'string',
            },
            recv_addr: {
                // 수취인 주소
                type: 'string',
            },
            recv_name: {
                // 수취인 이름
                type: 'string',
            },
            send_name: {
                // 발신인 이름
                type: 'string',
            },
            man: {
                // 배송기사 이름
                type: 'string',
            },
            estmate: {
                // 배송예정 시간
                type: 'string',
            },
            comcode: {
                // 택배사 코드
                type: 'string',
            },
        },
    },
    deliveryTrackingDto: {
        code: {
            type: 'string',
        },
        invoiceNo: {
            type: 'string',
        },
    },
    orderSatusDto: {
        type: 'object',
        properties: {
            orderId: {
                type: 'number',
            },
            status: {
                type: 'number',
            },
        },
    },
};
