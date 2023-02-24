const _ = require('lodash');
const objectMapper = require('object-mapper');
const moment = require('moment');
const util = require('util');
const Sentry = require('@sentry/node');

const constants = require('../constants');

const { mapper } = require('../lib');
const redis = require('../lib/redis_client');

const __mySql__ = require('../models');

const userClass = function (params = {}) {
    this.id = params.id;
    this.uid = params.uid;
    this.email = params.email;
    this.name = params.name;
};
userClass.prototype.getMyInfo = async function () {
    try {
        const user = await __mySql__.user.findOne({
            where: {
                id: this.id,
            },
            include: [
                {
                    required: false,
                    model: __mySql__.userAgreement,
                    where: { section: [constants.userAgreementSection.night, constants.userAgreementSection.marketing] },
                },
            ],
        });

        return user;
    } catch (e) {
        Sentry.captureException(e);
        throw new Error(e);
    }
};
userClass.prototype.setMyAgreement = async function (reqObj) {
    try {
        let userAgreement = await __mySql__.userAgreement.findOne({
            where: {
                fkUserId: this.id,
                section: reqObj.section,
            },
        });

        if (!!_.isNil(userAgreement)) {
            userAgreement = await new __mySql__.userAgreement({ fkUserId: this.id, section: reqObj.section }).save();
        } else {
            userAgreement.destroy();
        }

        return userAgreement;
    } catch (e) {
        Sentry.captureException(e);
        throw new Error(e);
    }
};
userClass.prototype.getMyServiceUsageList = async function (reqObj) {
    try {
        let whereObjs = {
            fkUserId: this.id,
        };

        if (!!reqObj.status) {
            whereObjs = _.assign(whereObjs, { status: reqObj.status });
        }

        const order = await __mySql__.order.findAndCountAll({
            distinct: true,
            col: 'id',
            where: whereObjs,
            include: [
                {
                    model: __mySql__.orderPaymentHistory,
                },
                {
                    model: __mySql__.orderStatusHistory,
                },
                {
                    model: __mySql__.transaction,
                },
                {
                    model: __mySql__.review,
                },
                {
                    model: __mySql__.product,
                    include: [
                        {
                            model: __mySql__.productStorage,
                        },
                    ],
                },
            ],
            order: [['id', 'desc']],
            offset: (reqObj.page - 1) * reqObj.limit,
            limit: reqObj.limit,
        });

        order.rows = objectMapper(order.rows, null, mapper.response.userMapper.usage);

        return order;
    } catch (e) {
        Sentry.captureException(e);
        throw new Error(e);
    }
};
userClass.prototype.getMyServiceUsageInfo = async function (reqObj) {
    try {
        const order = await __mySql__.order.findOne({
            where: {
                id: reqObj.orderId,
                fkUserId: this.id,
            },
            include: [
                {
                    model: __mySql__.orderPaymentHistory,
                },
                {
                    model: __mySql__.orderStatusHistory,
                },
                {
                    model: __mySql__.transaction,
                },
                {
                    model: __mySql__.review,
                },
                {
                    model: __mySql__.product,
                    include: [
                        {
                            model: __mySql__.productStorage,
                        },
                    ],
                },
            ],
        });

        const dest = objectMapper(order, null, mapper.response.userMapper.usageInfo);

        return dest;
    } catch (e) {
        Sentry.captureException(e);
        throw new Error(e);
    }
};
userClass.prototype.setUserWithdraw = async function (reqObj) {
    try {
        const redisClient = redis.getConnection();

        const myRedisKey = util.format(constants.redisPrefix.token, this.id);

        redisClient.del(myRedisKey);

        const user = await this.getMyInfo();
        user.uid = `${user.uid}-${moment().format('x')}`;
        user.isWithdrawal = 1;
        user.reason = reqObj.reason;
        user.save();

        return true;
    } catch (e) {
        Sentry.captureException(e);
        throw new Error(e);
    }
};
userClass.prototype.checkStep = async function () {
    try {
        let returnStep = 0;

        const user = await __mySql__.user.findOne({
            where: {
                uid: this.uid,
            },
            include: [
                {
                    model: __mySql__.userAgreement,
                },
            ],
        });

        if (!_.isNil(user) && 0 < user.userAgreements.length) {
            returnStep = 1;
        }

        return returnStep;
    } catch (e) {
        Sentry.captureException(e);
        throw new Error(e);
    }
};
userClass.prototype.getMyReviews = async function (user) {
    try {
        const rows = await __mySql__.review.findAll({
            where: {
                fkUserId: user.id,
            },
            include: [
                {
                    model: __mySql__.user,
                },
                {
                    model: __mySql__.reviewStorage,
                },
                {
                    model: __mySql__.order,
                },
            ],
            order: [['id', 'desc']],
        });

        const reviews = objectMapper(rows, null, mapper.response.reviewMapper.getList);

        return reviews;
    } catch (e) {
        Sentry.captureException(e);
        throw new Error(e);
    }
};

module.exports = userClass;
