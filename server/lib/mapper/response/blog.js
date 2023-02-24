const constants = require('../../../constants');
const _ = require('lodash');

module.exports = {
    blogs: {
        '[]': [
            {
                key: '[]',
                transform: function (value, all, rows) {
                    let _return_ = _.pick(value.dataValues, [
                        'id',
                        'title',
                        'subTitle',
                        'contents',
                        'sort',
                        'thumb',
                        'isMain',
                    ]);

                    _return_['storage'] = {
                        origin: `${constants.imagePathPrefix.s3}${_return_.thumb}`,
                        thumb: `${constants.imagePathPrefix.s3}${_.split(_return_.thumb, '.')[0]}_thumb.${_.split(_return_.thumb, '.')[1]}`,
                    }

                    delete _return_.thumb;

                    return _return_;
                },
            },
        ],
    },
    blog: {
        id: 'id',
        title: 'title',
        subTitle: 'subTitle',
        thumb: {
            key: 'storage',
            transform: function (value) {
                return {
                    origin: `${constants.imagePathPrefix.s3}${value}`,
                    thumb: `${constants.imagePathPrefix.s3}${_.split(value, '.')[0]}_thumb.${_.split(value, '.')[1]}`,
                };
            },
        },
        contents: 'contents',
        isMain: 'isMain',
        createdAt: 'createdAt',
    },
}