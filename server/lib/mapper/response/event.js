const constants = require('../../../constants');
const _ = require('lodash');

module.exports = {
    events: {
        '[]': [
            {
                key: '[]',
                transform: function (value, all, rows) {
                    let _return_ = _.pick(value.dataValues, [
                        'id',
                        'sort',
                        'bannerImg',
                        'innerImg',
                        'isMain',
                        'isDoing',
                        'url',
                    ]);
                    _return_.bannerImg = {
                        origin: `${constants.imagePathPrefix.s3}${_return_.bannerImg}`,
                        thumb: `${constants.imagePathPrefix.s3}${_.split(_return_.bannerImg, '.')[0]}_thumb.${_.split(_return_.bannerImg, '.')[1]}`,
                    }

                    _return_.innerImg = {
                        origin: `${constants.imagePathPrefix.s3}${_return_.innerImg}`,
                        thumb: `${constants.imagePathPrefix.s3}${_.split(_return_.innerImg, '.')[0]}_thumb.${_.split(_return_.innerImg, '.')[1]}`,
                    }

                    _return_.bannerImg = !!_.isNil(_return_.bannerImg) ? null : _return_.bannerImg;
                    _return_.innerImg = !!_.isNil(_return_.innerImg) ? null : _return_.innerImg;

                    return _return_;
                },
            },
        ],
    },
    event: {
        id: 'id',
        name: 'name',
        bannerImg: {
            key: 'bannerImg',
            transform: function (value) {
                return {
                    origin: `${constants.imagePathPrefix.s3}${value}`,
                    thumb: `${constants.imagePathPrefix.s3}${_.split(value, '.')[0]}_thumb.${_.split(value, '.')[1]}`,
                };
            },
        },
        innerImg: {
            key: 'innerImg',
            transform: function (value) {
                return {
                    origin: `${constants.imagePathPrefix.s3}${value}`,
                    thumb: `${constants.imagePathPrefix.s3}${_.split(value, '.')[0]}_thumb.${_.split(value, '.')[1]}`,
                };
            },
        },
        desc: 'desc',
        isMain: 'isMain',
        isDoing: 'isDoing',
        url: 'url',
    },
}