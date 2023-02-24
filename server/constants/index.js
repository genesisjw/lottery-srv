module.exports = {
    secret: {
        accessToken: {
            key: 'e041d8fdec689dad193b296fb36ab7becbf0ad6bbd867454d37ef8d312b227d6c6101c4101a4a801f056bbb3c7a9c7513c8c558d83c795a334e13443250fd83a',
            expiresIn: '30m',
        },
        refreshToken: {
            key: '976668af72f4842e463c83fd926ba291f1838cf35b0beb11240a09cc189c9b12eb0249449bdecb408634a00bd750b8ea5c10a479b1835a3481737fc782ccdac8',
            expiresIn: '30d',
        },
    },
    redisPrefix: {
        user: 'KRACKER:%s:USER',
        token: 'KRACKER:%s:TOKEN',
        ci: 'KRACKER:%s:CI',
        categories: 'KRACKER:CATEGORIES',
        category: 'KRACKER:CATEGORY:%s',
        mainProduct: 'KRACKER:PRODUCT:MAIN',
        channel: {
            all: 'KRACKER:%s',
            push: 'KRACKER:PUSH:%s',
            biztalk: 'KRACKER:BIZTALK:%s',
            slack: 'KRACKER:SLACK:%s',
        },
    },
    hashid: {
        product: {
            salt: 'krackerWorld',
            pad: 10,
        },
    },
    kakao: {
        admin: '0503afd50cd66569d4960210b6bc512b',
    },
    userAgreementSection: {
        adult: 1, //(필수) 만 19세 이상입니다.
        service: 2, //(필수) 서비스 이용약관에 동의
        private: 3, //(필수) 개인정보 수집 이용에 동의
        marketing: 4, //(선택) 마케팅 개인정보 제3자 제공 동의
        night: 5, //(선택) 야간 혜택 수신에 동의
        event: 6, //(선택) 야간 혜택 수신에 동의
    },
    imagePathPrefix: {
        s3: 'https://image.kracker.kr/',
    },
    orderType: {
        test: 1,
        general: 2,
        instancePurchase: 3,
    },
    orderStatus: {
        100: '체험신청완료',
        200: '배송준비중',
        300: '배송중',
        400: '체험중',
        450: '반납신청완료',
        460: '반납수거중',
        470: '반납확인중',
        480: '반납회수거부',
        490: '반납완료',
        500: '구매완료',
        550: '반품신청완료',
        560: '반품수거중',
        570: '반품확인중',
        580: '반품회수거부',
        600: '구매확정',
        999: '환불완료',
    },
    payMethod: {
        card: '신용카드',
        point: '포인트',
        tosspay: '토스간편결제',
        ssgpay: 'SSG페이',
        samsung: '삼성페이',
        lpay: 'LPAY',
        payco: '페이코',
        kakaopay: '카카오페이',
        naverpay: '네이버페이',
        samsungpay: '삼성페이',
        kpay: 'kPay앱 직접호출',
        kbapp: 'kbApp',
    },
    returnType: {
        1: '지정수거',
        2: '직접발송',
    },
    deliveryCorp: {
        '01': '우체국택배',
        '04': 'CJ대한통운',
        '05': '한진택배',
        '06': '로젠택배',
        '08': '롯데택배',
        '24': 'GSPostbox택배',
        '46': 'CU편의점택배',
    },
    deliveryLevel: {
        1: '배송준비',
        2: '집화완료',
        3: '배송진행',
        4: '지점도착',
        5: '배송출발',
        6: '배송완료',
    },
};
