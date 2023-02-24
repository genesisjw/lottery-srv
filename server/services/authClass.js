const _ = require('lodash');
const Format = require('response-format');
const moment = require('moment');

const { createFirebaseToken, checkUid, deleteUid } = require('../lib/firebase');

const __mySql__ = require('../models');

const authClass = function (params = {}) {
    this.id = params.id;
    this.uid = params.uid;
    this.email = params.email;
    this.name = params.name;
};

authClass.prototype.constructor = authClass;

authClass.prototype.verifyToken = async function (token) {
    try {
        if (!!_.isNil(token)) {
            return Format.unAuthorized();
        } else {
            const fb = await createFirebaseToken(token);

            if (!_.isNil(fb.error)) {
                const e = JSON.parse(fb.error);

                return 401 === fb.statusCode ? Format.unAuthorized(e.msg) : Format.badRequest(e.msg);
            }

            const _decodeToken_ = decodeToken(fb);

            const _verifyExist_ = await this.verifyExist({ uid: _decodeToken_.uid });

            return Format.success(null, { existDB: !!_verifyExist_.error, token: fb });
        }
    } catch (e) {
        Sentry.captureException(e);
        return Format.internalError(e.message);
    }
};
authClass.prototype.verifyExist = async function (params) {
    try {
        const kakaoCheck = await requestMeByAdmin(params.uid);

        if (!_.isNil(kakaoCheck.error)) return Format.badRequest(JSON.parse(kakaoCheck.error).msg, JSON.parse(kakaoCheck.error).code);

        const fbCheck = await checkUid(params.uid.toString());

        if (!_.isNil(fbCheck.errorInfo)) return Format.badRequest(fbCheck.errorInfo.message, fbCheck.errorInfo.code);

        const _user_ = await __mySql__.user.findOne({ where: { uid: fbCheck.uid } });

        if (!_.isNil(_user_)) {
            return Format.badRequest('Duplicated user');
        } else {
            return Format.success(null, _user_);
        }
    } catch (e) {
        Sentry.captureException(e);
        return Format.internalError(e.message);
    }
};
authClass.prototype.createNewUser = async function (base) {
    const _trans_ = await __mySql__.sequelize.transaction();

    try {
        const _userBase_ = await new __mySql__.user(_.assign(base, { inviteCode: hashids.encode(moment().format('x')) })).save({ transaction: _trans_ });

        await _trans_.commit();

        return Format.success(null, _userBase_);
    } catch (e) {
        await _trans_.rollback();
        Sentry.captureException(e);

        throw new Error(e);
    }
};
authClass.prototype.getBaseByUid = async function (obj) {
    try {
        const fbInfo = await checkUid(obj.firebaseUid);

        if (!_.isNil(obj.birthdate)) {
            const age = moment().diff(moment(obj.birthdate), 'years');

            if (age < 19) {
                return { isNew: false, data: null, errorType: 0 };
            }
        }

        const [user, created] = await __mySql__.user.findOrCreate({
            where: { uid: obj.firebaseUid },
            defaults: {
                uid: fbInfo.uid,
                email: fbInfo.email,
                name: obj.name,
                phone: obj.mobileno,
                ci: obj.conninfo,
                birthday: moment(obj.birthdate).format('YYYY-MM-DD'),
                inviteCode: hashids.encode(moment().format('x')),
            },
        });

        return { isNew: created, data: user };
    } catch (e) {
        Sentry.captureException(e);
        throw new Error(e);
    }
};
authClass.prototype.setUserAgreement = async function (agreements) {
    try {
        if (0 < agreements.length) {
            await __mySql__.userAgreement.bulkCreate(agreements);
        }

        return agreements;
    } catch (e) {
        Sentry.captureException(e);
        throw new Error(e);
    }
};
authClass.prototype.setUserInvited = async function (inviteCode, userId) {
    try {
        const friendCode = await __mySql__.user.findOne({ where: { inviteCode } });

        if (_.isNil(friendCode)) {
            return false;
        }

        new __mySql__.userInvited({ fkUserId: userId, inviteCode }).save();

        return true;
    } catch (e) {
        Sentry.captureException(e);
        throw new Error(e);
    }
};

module.exports = authClass;
