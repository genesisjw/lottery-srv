const _ = require('lodash');
const moment = require('moment');
const userMapper = require('./user');
const authMapper = require('./auth');
const productMapper = require('./product');
const categoryMapper = require('./category');
const orderMapper = require('./order');
const reviewMapper = require('./review');
const eventMapper = require('./event');
const blogMapper = require('./blog');

module.exports = {
    authMapper,
    userMapper,
    productMapper,
    categoryMapper,
    orderMapper,
    reviewMapper,
    eventMapper,
    blogMapper,
    paging: {
        type: 'object',
        properties: {
            page: {
                type: 'number',
                def: 1,
                exec: function (schema, post) {
                    if (!!_.isNil(post)) {
                        return 1;
                    } else {
                        return parseInt(post);
                    }
                },
            },
            limit: {
                type: 'number',
                def: 20,
                exec: function (schema, post) {
                    if (!!_.isNil(post)) {
                        return 20;
                    } else {
                        return parseInt(post);
                    }
                },
            },
        },
    },
    commonIdDto: {
        type: 'object',
        properties: {
            id: {
                type: 'number',
            },
        },
    },
    noticeIdDto: {
        type: 'object',
        properties: {
            noticeId: {
                type: 'number',
            },
        },
    },
    productIdDto: {
        type: 'object',
        properties: {
            productId: {
                type: 'number',
            },
        },
    },
    scheduleIdDto: {
        type: 'object',
        properties: {
            scheduleId: {
                type: 'number',
            },
        },
    },
    hashDto: {
        type: 'object',
        properties: {
            hashids: {
                type: 'string',
            },
        },
    },
    SuggestionPaginationDto: {
        type: 'object',
        properties: {
            proposeStatus: {
                type: 'string',
            },
        },
    },
    keywordDto: {
        type: 'object',
        properties: {
            keywords: {
                type: 'array',
                def: null,
            },
            visited: {
                type: 'array',
                def: null,
            },
        },
    },
    getPdtLstDto: {
        type: 'object',
        properties: {
            startDate: {
                type: 'string',
                optional: false,
                exec: function (schema, post) {
                    if (!!_.isNil(post)) {
                        return new moment().format('YYYY-MM-DD 00:00:00');
                    } else {
                        return new moment(post).format('YYYY-MM-DD 00:00:00');
                    }
                },
            },
            endDate: {
                type: 'string',
                optional: false,
                exec: function (schema, post) {
                    if (!!_.isNil(post)) {
                        return new moment().format('YYYY-MM-DD 23:59:59');
                    } else {
                        return new moment(post).format('YYYY-MM-DD 23:59:59');
                    }
                },
            },
            limit: {
                type: 'number',
                optional: false,
                def: 10,
                exec: function (schema, post) {
                    if (!!_.isNil(post)) {
                        return 10;
                    } else {
                        return parseInt(post);
                    }
                },
            },
            listType: {
                type: 'number',
            },
            classType: {
                type: 'number',
            },
            ageGroup: {
                type: 'number',
            },
            categoryId: {
                type: 'number',
            },
            teacherId: {
                type: 'number',
            },
            classTime: {
                type: 'string',
            },
            classWeek: {
                type: 'string',
            },
        },
    },
    ProductScheduleSearchPaginationDto: {
        type: 'object',
        properties: {
            listType: {
                type: 'string',
            },
            categoryId: {
                type: 'number',
            },
            classType: {
                type: 'array',
            },
            classType1: {
                type: 'array',
                items: {
                    type: 'number',
                },
            },
            classDate: {
                type: 'string',
            },
            timeRange: {
                type: 'string',
            },
            ageRange: {
                type: 'string',
            },
            keyword: {
                type: 'string',
            },
            ageRangeArray: {
                type: 'array',
            },
        },
    },
    ProductSearchDto: {
        type: 'object',
        properties: {
            age: {
                type: 'array',
                items: {
                    type: 'number',
                },
            },
            classType: {
                type: 'array',
                items: {
                    type: 'number',
                },
            },
            category: {
                type: 'number',
            },
            keyword: {
                type: 'string',
            },
            listType: {
                type: 'string',
            },
            price: {
                type: 'number',
            },
            shipping: {
                type: 'boolean',
            },
            membership: {
                type: 'boolean',
            },
            classDay: {
                type: 'array',
                items: {
                    type: 'number',
                },
            },
            classStart: {
                type: 'number',
            },
            clsssEnd: {
                type: 'number',
            },
            isLive: {
                type: 'boolean',
            },
        },
    },
};
