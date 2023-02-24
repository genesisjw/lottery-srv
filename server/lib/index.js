const jwt = require('jsonwebtoken');
const Format = require('response-format');
const _ = require('lodash');
const path = require('path');
const exec = require('child_process').exec;
const os = require('os');

const constants = require('../constants');

const moment = require('moment');

const signJWT = function (_param_, _secret_, _expires_) {
    try {
        let token = jwt.sign(_param_, _secret_, { expiresIn: _expires_ });

        return token;
    } catch (e) {
        throw new Error(e);
    }
};
module.exports.signJWT = signJWT;

const validAny = async function (req, res, next) {
    try {
        jwt.verify(req.token, constants.secret.accessToken.key, async function (err, decoded) {
            if (!!err) {
                res.user = null;
            } else {
                res.user = decoded;
            }
            next();
        });
    } catch (e) {
        next();
    }
};
module.exports.validAny = validAny;

const validApiToken = async function (req, res, next) {
    try {
        jwt.verify(req.token, constants.secret.accessToken.key, async function (err, decoded) {
            if (!!err) {
                res.json(Format.unAuthorized());
                return;
            } else {
                res.user = decoded;
                next();
            }
        });
    } catch (e) {
        res.json(Format.unAuthorized(e.message));
        return;
    }
};
module.exports.validApiToken = validApiToken;

const randomNum = function () {
    try {
        let value = '';
        for (let i = 0; i < 6; i++) {
            value += parseInt(Math.random() * 10, 10);
        }
        return value;
    } catch (e) {
        console.error(e);
        return;
    }
};
module.exports.randomNum = randomNum;

const requestCombined = function (req, res, next) {
    console.info(`[${req.method}][${req.originalUrl}][${req.clientIp}]`);

    try {
        let _combinedReq_ = _.assign({}, req.query, req.params, req.body, { user: res.user || req.user }, { ip: req.clientIp });

        req.combined = _combinedReq_;

        next();
    } catch (e) {
        console.error(e);
        return;
    }
};
module.exports.requestCombined = requestCombined;

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};
module.exports.sleep = sleep;

module.exports.mapper = require('../lib/mapper');
