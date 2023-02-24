const constants = require('../../../constants');
const _ = require('lodash');
const __lib__ = require('../../../lib');
const __ = require('lodash/fp/__');

module.exports = {
    product: {
        id: 'id',
        name: 'name',
        brand: 'brand',
        info: 'info',
        desc: 'desc',
        isMain: 'isMain',
        'productStorages[]': [
            {
                key: 'images?',
                transform: function(value) {
                    let _return_ = !!_.isNil(value) ? null : value.map(storage => storage.dataValues['fileName'] = constants.imagePathPrefix.s3 + storage.dataValues['fileName']);

                    return _return_;
                },
            },
        ],
    },

    products: {
        '[]': [
            {
                key: '[]',
                transform: function (value, all, rows) {
                    let _return_ = _.pick(value.dataValues, [
                        'id',
                        'name',
                        'brand',
                        'productStorages',
                        'productOptions',
                        'isMain',
                        'sort',
                    ]);

                    _return_.productStorages = _.map(_return_.productStorages, function (f) {
                        return {
                            id: f.id,
                            origin: `${constants.imagePathPrefix.s3}${f.fileName}`,
                            thumb: `${constants.imagePathPrefix.s3}${_.split(f.fileName, '.')[0]}_thumb.${_.split(f.fileName, '.')[1]}`,
                        };
                    });

                    const cheapestOption = _.chain(_return_.productOptions)
                        .map((option) => _.assign(option.dataValues, {hashToString : __lib__.productHashToString(option.hash)}))
                        .sortBy('price')
                        .first()
                        .value();

                    _return_['cheapestOption'] = !!_.isNil(cheapestOption) ? null: cheapestOption;
                    delete _return_.productOptions;

                    return _return_;
                },
            },
        ],
    },

    productWithOptionToPurchase: {
        id: 'id',
        name: 'name',
        brand: 'brand',
        info: 'info',
        desc: 'desc',
        'productOptions[0]': [
            {
                key: 'hash?',
                transform: function(value) {
                    return value.dataValues.hash;
                },
            },
            {
                key: 'isSold?',
                transform: function(value) {
                    const isSold = (value.dataValues.stock <= 0);

                    return isSold;
                },
            },
            {
                key: 'price?',
                transform: function(value) {
                    return value.dataValues.price;
                },
            },
            {
                key: 'testPrice?',
                transform: function(value) {
                    return value.dataValues.testPrice;
                },
            },
            {
                key: 'testTerm?',
                transform: function(value) {
                    return value.dataValues.testTerm;
                }
            }
        ],
        'optionText': 'optionText',
        'productStorages[]': [
            {
                key: 'images?',
                transform: function(value) {
                    let _return_ = !!_.isNil(value) ? null : value.map(storage => storage.dataValues['fileName'] = constants.imagePathPrefix.s3 + storage.dataValues['fileName']);

                    return _return_;
                },
            },
        ],
    },

    productOptionToCheckStock: {
        'productOptions[0]': [
            {
                key: 'price?',
                transform: function(value) {
                    return value.dataValues.price;
                },
            },
            {
                key: 'testPrice?',
                transform: function(value) {
                    return value.dataValues.testPrice;
                },
            },
            {
                key: 'isSold',
                transform: function(value) {
                    const isSold = (value.dataValues.stock <= 0);

                    return isSold;
                }
            },
        ],
    }

}