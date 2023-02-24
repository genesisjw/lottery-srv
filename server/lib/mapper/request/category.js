const _ = require('lodash');

module.exports = {
    searchDto: {
        type: 'object',
        properties: {
            isCollection: {
                type: 'boolean',
                def: false,
                exec: function (schema, post) {
                    if (!!_.isNil(post)) {
                        return false;
                    }
                    else return post;
                },
            },
            categoryId: {
                type: 'number'
            },
            orderType: {
                type: 'number',
                def: 0,
                exec: function (schema, post) {
                    if (!!_.isNil(post)) {
                        return 0;
                    }
                    else return post;
                },
            },
        },
    },
};
