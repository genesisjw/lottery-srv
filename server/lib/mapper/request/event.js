const _ = require('lodash');

module.exports = {
    searchDto: {
        type: 'object',
        properties: {
            eventId: {
                type: 'number',
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
            isDoing: {
                type: 'boolean',
                def: true,
                exec: function (schema, post) {
                    if (!post) {
                        return null;
                    } else return post;
                },
            },
        },
    },
};
