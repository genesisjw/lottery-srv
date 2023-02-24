const _ = require('lodash');

module.exports = {
    searchDto: {
        type: 'object',
        properties: {
            productId: {
                type: 'number'
            },
            keyword: {
                type: 'string',
            },
            isMain: {
                type: 'boolean',
                def: true,
                exec: function (schema, post) {
                    if (!post) {
                        return null;
                    } else return post;
                },
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
