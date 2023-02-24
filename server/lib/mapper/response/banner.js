const constants = require('../../../constants');
const _ = require('lodash');

module.exports = {
    banners: {
        '[]': [
            {
                key: '[]',
                transform: function(value, all, rows) {
                    let _return_ = _.pick(value.dataValues, [
                        'id',
                        'fileName',
                        'url',
                    ]);

                    _return_.storage = {
                        origin: `${constants.imagePathPrefix.s3}${_return_.fileName}`,
                        thumb: `${constants.imagePathPrefix.s3}${_.split(_return_.fileName, '.')[0]}_thumb.${_.split(_return_.fileName, '.')[1]}`,
                    }

                    delete _return_.fileName;

                    return _return_;
                },
            },
        ],
    },
}