const _ = require('lodash');

module.exports = {
    searchDto: {
        type: 'object',
        properties: {
            blogId: {
                type: 'number',
            },
            isMain: {
                type: 'boolean',
                def: true,
                exec: function (schema, post) {
                    if (!!_.isNil(post)) {
                        return null;
                    } else return post;
                },
            },
        },
    },
};
