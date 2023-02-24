const axios = require('axios');
const jwt = require('jsonwebtoken');

module.exports = {
    client: (function () {
        function client() {
            this.baseUrl = config.iamport.baseUri;
            this.token = ``;

            this.instance = axios.create({
                baseURL: this.baseUrl,
                headers: { Authorization: `${this.token}`, 'Content-type': 'application/json' },
            });
        }
        client.prototype.init = async function () {
            try {
                const payload = {
                    imp_key: config.iamport.apiKey,
                    imp_secret: config.iamport.secretKey,
                };

                const result = await this.instance.post(`/users/getToken`, payload);

                this.token = result.data.response.access_token;

                this.instance = axios.create({
                    baseURL: this.baseUrl,
                    headers: { Authorization: `${this.token}`, 'Content-type': 'application/json' },
                });
            } catch (e) {
                console.error(e.message);
            }
        };
        client.prototype.getPaymentInfo = async function (params) {
            try {
                await this.init();

                const result = await this.instance.get(`/payments/${params}`);

                return result.data.response;
            } catch (e) {
                console.error(`[getPaymentInfo] :: ${e.message}`);
                throw new Error(e);
            }
        };
        client.prototype.requestRefund = async function (params) {
            try {
                await this.init();

                // NOTE: 사용자사이드에서는 전액 환불만 존재함 (amount 제거)
                const payload = {
                    reason: params.reason,
                    imp_uid: params.impUid,
                    // amount: params.amount,
                };

                const result = await this.instance.post(`/payments/cancel`, payload);

                return result.data.response;
            } catch (e) {
                console.error(`[getPaymentInfo] :: ${e.message}`);
                throw new Error(e);
            }
        };

        return client;
    })(),
};
