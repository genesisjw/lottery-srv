const express = require('express');
const inspector = require('schema-inspector');
const Format = require('response-format');
const _ = require('lodash');
const moment = require('moment');
const path = require('path');
const qs = require('qs');
const os = require('os');
const util = require('util');
const exec = require('child_process').exec;

const router = express.Router();

const { validApiToken, requestCombined, sendToBatch, GetValue, mapper, signJWT, validRefreshToken } = require('../lib');
const constants = require('../constants');

const { authClass } = require('../services');
const userClass = require('../services/userClass');

const { createFirebaseToken, checkUid, deleteUid } = require('../lib/firebase');
// const { unlinkKakaoUser } = require('../lib/kakao');

// const redis = require('../lib/redis_client');
// const redisClient = redis.getConnection();

const services = new authClass();

router.post('/getAccessToken', [requestCombined, validRefreshToken], async (req, res) => {
    inspector.sanitize(mapper.request.authMapper.getAccessTokenDto, req.combined).data;
    const { refreshToken } = req.combined;

    try {
        const myRedisKey = util.format(constants.redisPrefix.token, res.refreshed.id);

        const myToken = await redisClient.get(myRedisKey);

        if (myToken !== refreshToken) {
            res.json(Format.unAuthorized());
            return;
        }

        const accessToken = signJWT(_.omit(res.refreshed, ['iat', 'exp']), constants.secret.accessToken.key, constants.secret.accessToken.expiresIn);

        res.json(Format.success(null, { accessToken, refreshToken }));
    } catch (e) {
        res.status(500).json(Format.internalError(e.message));
    }
});

router.post('/signin', [requestCombined], async (req, res) => {
    inspector.sanitize(mapper.request.authMapper.SigninDto, req.combined).data;

    const { firebaseUid, agreement, inviteCode, conninfo, mobileno, name, birthdate } = req.combined;

    try {
        const { isNew, data, errorType } = await services.getBaseByUid({ firebaseUid, conninfo, mobileno, name, birthdate });

        if (!_.isNil(errorType)) {
            res.json(Format.badRequest('19세 이하는 가입이 불가능합니다.'));
            return;
        }

        if (!!isNew) {
        }

        const agreements = _.flatMap(agreement, function (num) {
            return { fkUserId: data.id, section: num };
        });

        if (0 < agreements.length) {
            services.setUserAgreement(agreements);
        }

        const payload = _.pick(data, ['id', 'uid', 'email', 'name']);

        const accessToken = signJWT(payload, constants.secret.accessToken.key, constants.secret.accessToken.expiresIn);
        const refreshToken = signJWT(payload, constants.secret.refreshToken.key, constants.secret.refreshToken.expiresIn);

        redisClient.set(util.format(constants.redisPrefix.token, payload.id), refreshToken, 'ex', 60 * 60 * 24 * 30);

        res.json(Format.success(null, { accessToken, refreshToken, isNew }));
    } catch (e) {
        console.error(e);
        res.status(500).json(Format.internalError(e.message));
    }
});

router.post('/signout', [validApiToken, requestCombined], async (req, res) => {
    try {
        const fbObj = await checkUid(req.combined.user.uid);

        unlinkKakaoUser(fbObj.uid);

        // NOTE: 파이어베이스 삭제
        deleteUid(req.combined.user.uid);

        const userServices = new userClass(req.combined.user);

        userServices.setUserWithdraw(req.combined);

        res.json(Format.success());
    } catch (e) {
        res.status(500).json(Format.internalError(e.message));
    }
});

module.exports = router;
