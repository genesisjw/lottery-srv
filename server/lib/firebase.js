const firebaseAdmin = require('firebase-admin');
const request = require('request-promise');
const _ = require('lodash');

const serviceAccount = config.firebase;

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

function updateOrCreateUser(token, email, phoneNumber, displayName, photoURL, hasPhoneNumber, hasEmail) {
    const updateParams = { provider: 'kakao', displayName, photoURL };

    if (!!hasEmail) _.assign(updateParams, { email, hasEmail });
    if (!!hasPhoneNumber) _.assign(updateParams, { phoneNumber, hasPhoneNumber });

    return firebaseAdmin
        .auth()
        .updateUser(token, updateParams)
        .catch((error) => {
            if (error.code === 'auth/user-not-found') {
                updateParams['uid'] = token;

                return firebaseAdmin.auth().createUser(updateParams);
            }
            return error;
        });
}
module.exports.updateOrCreateUser = updateOrCreateUser;

async function createFirebaseToken(kakaoProfile) {
    const firebaseInfo = await updateOrCreateUser(
        kakaoProfile.id.toString(),
        !!kakaoProfile.kakao_account.has_email ? kakaoProfile.kakao_account.email : kakaoProfile.id,
        !!kakaoProfile.kakao_account.has_phone_number ? kakaoProfile.kakao_account.phone_number : '',
        kakaoProfile.kakao_account.profile.nickname,
        kakaoProfile.kakao_account.profile.profile_image_url,
        kakaoProfile.kakao_account.has_phone_number,
        kakaoProfile.kakao_account.has_email
    );

    return firebaseAdmin.auth().createCustomToken(firebaseInfo.uid, { provider: 'kakao' });
}
module.exports.createFirebaseToken = createFirebaseToken;

function checkUid(uid) {
    return firebaseAdmin
        .auth()
        .getUser(uid)
        .catch((error) => {
            return error;
        });
}
module.exports.checkUid = checkUid;

function deleteUid(uid) {
    return firebaseAdmin
        .auth()
        .deleteUser(uid)
        .then(() => {
            console.log('Successfully deleted user');
        })
        .catch((error) => {
            console.error(error.message);
            return error;
        });
}
module.exports.deleteUid = deleteUid;
