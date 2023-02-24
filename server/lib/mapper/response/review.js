const _ = require('lodash');

const constants = require('../../../constants');

module.exports = {
    getList: {
        '[]': [
            {
                key: '[]',
                transform: function (value) {
                    let _return_ = _.pick(value, ['id', 'fkProductId', 'point1', 'point2', 'content', 'reviewStorages', 'sort', 'user.id', 'user.name', 'order.productOption.name', 'order.productOption.optionText', 'createdAt']);

                    _return_.productId = _return_.fkProductId;

                    _return_.userName = _return_.user.name;

                    _return_.reviewStorages = _.map(_return_.reviewStorages, function (f) {
                        return {
                            id: f.id,
                            origin: `${constants.imagePathPrefix.s3}${f.fileName}`,
                            thumb: `${constants.imagePathPrefix.s3}${_.split(f.fileName, '.')[0]}_thumb.${_.split(f.fileName, '.')[1]}`,
                        };
                    });

                    _return_.storage = 0 === _return_.reviewStorages.length ? null : _return_.reviewStorages;

                    _return_.productName = _.replace(`${_return_.order.productOption.name},${_return_.order.productOption.optionText}`, ' - ', ',');

                    delete _return_.fkProductId;
                    delete _return_.reviewStorages;
                    delete _return_.order;
                    delete _return_.user;

                    return _return_;
                },
            },
        ],
    },
    getCreatedList: {
        '[]': [
            {
                key: '[]',
                transform: function (value) {
                    let _return_ = _.pick(value, ['id', 'sort', 'fkProductId', 'userName', 'productName', 'point1', 'point2', 'content', 'storage', 'createdAt']);

                    _return_.productId = _return_.fkProductId;

                    delete _return_.fkProductId;

                    return _return_;
                }
            }
        ]
    },
    getOne: {
        id: 'id',
        point1: 'point1',
        point2: 'point2',
        content: 'content',
        reviewStorages: [
            {
                key: 'storage[]',
                transform: function (value) {
                    return {
                        id: value.id,
                        origin: `${constants.imagePathPrefix.s3}${value.fileName}`,
                        thumb: `${constants.imagePathPrefix.s3}${_.split(value.fileName, '.')[0]}_thumb.${_.split(value.fileName, '.')[1]}`,
                    };
                },
            },
        ],
        user: [
            {
                key: 'user',
                transform: function (value) {
                    return _.pick(value, ['id', 'name', 'phone']);
                },
            },
        ],
    },
};
