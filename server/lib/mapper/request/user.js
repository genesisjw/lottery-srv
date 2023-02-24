const _ = require('lodash');

module.exports = {
    usageDto: {
        type: 'object',
        properties: {
            status: {
                type: 'array',
                items: { type: 'number' },
            },
        },
    },
};
