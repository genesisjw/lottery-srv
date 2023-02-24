const _ = require('lodash');

module.exports = {
    getAccessTokenDto: {
        type: 'object',
        strict: true,
        properties: {
            refreshToken: {
                type: 'string',
            },
        },
    },
    createCustomTokenDto: {
        type: 'object',
        strict: true,
        properties: {
            authorizationCode: {
                type: 'string',
            },
            accessToken: {
                type: 'string',
            },
        },
    },
    findStepDto: {
        type: 'object',
        strict: true,
        properties: {
            firebaseUid: {
                type: 'string',
            },
        },
    },

    SignupDto: {
        type: 'object',
        strict: true,
        properties: {
            uid: {
                type: 'string',
            },
            email: {
                type: 'string',
            },
            name: {
                type: 'string',
            },
            phone: {
                type: 'string',
            },
            pushToken: {
                type: 'string',
            },
            inviteCode: {
                type: 'string',
            },
        },
    },
    SigninDto: {
        type: 'object',
        properties: {
            pushToken: {
                type: 'string',
            },
            firebaseUid: {
                type: 'string',
            },
            agreement: {
                type: 'array',
                splitWith: ',',
                items: { type: 'number' },
            },
            inviteCode: {
                type: 'string',
            },
            sessionid: {
                type: 'string',
            },
        },
    },
    SignoutDto: {
        type: 'object',
        properties: {
            reasons: {
                type: 'array',
                items: { type: 'string' },
            },
            text: {
                type: 'string',
            },
        },
    },
};
