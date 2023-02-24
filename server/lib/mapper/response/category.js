const constants = require('../../../constants');
const _ = require('lodash');
const __lib__ = require('../../index');

module.exports = {
    categories: {
        '[]': [
            {
                key: '[]',
                transform: function (value, all, rows) {
                    let _return_ = _.pick(value.dataValues, ['id', 'name', 'sort']);
                    const collection = !!_.isNil(value.dataValues.categoryCollection) ? null : value.dataValues.categoryCollection;
                    _return_['thumbNail'] = !!_.isNil(value.dataValues.fileName) ? null : constants.imagePathPrefix.s3 + value.dataValues.fileName;
                    _return_['subName'] = !collection || !!_.isNil(collection.subName) ? null : collection.subName;
                    _return_['subImage'] = !collection || !!_.isNil(collection.subImage) ? null : constants.imagePathPrefix.s3 + collection.subImage;
                    _return_['desc'] = !collection || !!_.isNil(collection.desc) ? null : collection.desc;

                    return _return_;
                },
            },
        ],
    },
    category: {
        id: 'id',
        name: 'name',
        fileName: {
            key: 'thumbNail',
            transform: function (value) {
                return !!_.isNil(value) ? null : constants.imagePathPrefix.s3 + value;
            },
        },
        sort: 'sort',
        'categoryCollection.subName': 'subName?',
        'categoryCollection.subImage': {
            key: 'subImage?',
            transform: function (value) {
                return !!_.isNil(value) ? null : constants.imagePathPrefix.s3 + value;
            },
        },
        'categoryCollection.desc': 'desc?',
        'categoryProducts[]': {
            key: 'products[]',
            transform: function (value) {
                const product = value.product;
                let _return_ = !!_.isNil(product) ? null : _.pick(product, ['id', 'name', 'brand', 'sort']);

                const cheapestOption = product
                    ? _.chain(product.productOptions)
                          .map((option) => _.assign(option, { hashToString: __lib__.productHashToString(option.hash) }))
                          .sortBy('price')
                          .first()
                          .value()
                    : null;

                if (_return_) {
                    _return_['thumbNail'] = 0 === product.productStorages.length ? null : `${constants.imagePathPrefix.s3}${product.productStorages[0].fileName}`;
                    _return_['cheapestOption'] = cheapestOption;
                }

                return _return_;
            },
        },
    },
};
