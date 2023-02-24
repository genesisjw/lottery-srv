const _ = require('lodash');

module.exports = {
    reviewListDto: {
        type: 'object',
        properties: {
            productId: {
                type: 'number',
                gt: 0,
                code: 'id-format',
            },
            orderType: {
                type: 'number',
                def: 0,
                exec: function (schema, post) {
                    if (!post) {
                        return 0;
                    }
                    return 1;
                },
            },
            isMain: {
                type: 'boolean',
                def: false,
                exec: function (schema, post) {
                    if (!!_.isNil(post)) {
                        return false;
                    }
                    return post;
                }
            }
        },
    },
    reviewInfoDto: {
        type: 'object',
        properties: {
            productId: {
                type: 'number',
                gt: 0,
                code: 'id-format',
            },
            reviewId: {
                type: 'number',
                gt: 0,
                code: 'id-format',
            },
        },
    },
    reviewCreateDto: {
        type: 'object',
        properties: {
            productId: {
                type: 'number',
                gt: 0,
                code: 'id-format',
            },
            orderId: {
                type: 'number',
                gt: 0,
                code: 'id-format',
            },
            point1: {
                type: 'number',
                def: 1,
                exec: function (schema, post) {
                    if (!!_.isNil(post)) {
                        return 1;
                    } else {
                        return parseInt(post, 10);
                    }
                },
            },
            point2: {
                type: 'number',
                def: 1,
                exec: function (schema, post) {
                    if (!!_.isNil(post)) {
                        return 1;
                    } else {
                        return parseInt(post, 10);
                    }
                },
            },
            content: {
                type: 'string',
                ne: '',
                code: 'text-format',
            },
        },
    },
    reviewUpdateDto: {
        type: 'object',
        properties: {
            productId: {
                type: 'number',
            },
            reviewId: {
                type: 'number',
            },
            point1: {
                type: 'number',
                def: 1,
                exec: function (schema, post) {
                    if (!!_.isNil(post)) {
                        return 1;
                    } else {
                        return parseFloat(post).toFixed(1);
                    }
                },
            },
            point2: {
                type: 'number',
                def: 1,
                exec: function (schema, post) {
                    if (!!_.isNil(post)) {
                        return 1;
                    } else {
                        return parseFloat(post).toFixed(1);
                    }
                },
            },
            content: {
                type: 'string',
            },
        },
    },
    reviewDeleteDto: {
        type: 'object',
        properties: {
            productId: {
                type: 'number',
            },
            reviewId: {
                type: 'number',
            },
            storageId: {
                type: 'number',
            },
        },
    },
};
