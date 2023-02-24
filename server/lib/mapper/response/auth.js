const _ = require('lodash');
const moment = require('moment');

module.exports = {
    userToken: {
        id: 'id',
        uid: 'uid',
        name: 'name',
    },
    userBase: {
        id: 'id',
        uid: 'uid',
        name: 'name',
        profile: 'profile',
        recommendCode: 'recommendCode',
        isAgree: 'isAgree',
        isLeft: 'isLeft',
    },
    userChildren: {
        '[].id': '[].id',
        '[].userId': '[].userId',
        '[].name': '[].name',
        '[].gender': '[].gender',
        '[].birthday': '[].birthday',
        '[].meta': '[].meta',
    },
    userDevice: {
        '[].id': '[].id',
        '[].userId': '[].userId',
        '[].service': '[].service',
        '[].value': '[].value',
        '[].isAgree': '[].isAgree',
    },
    findFavoriteAll: {
        '[]': [
            {
                key: '[]',
                transform: function (value, all, rows) {
                    // let _return_ = _.pick(value.dataValues, [
                    //     'id',
                    //     'classDate',
                    //     'classDayOfWeek',
                    //     'classTimeEnd',
                    //     'classTimeStart',
                    //     'groupNo',
                    //     'isDirectClose',
                    //     'isGroup',
                    //     'isOpen',
                    //     'joinedCount',
                    //     'maxCount',
                    //     'memo',
                    //     'meta',
                    //     'minCount',
                    //     'subject',
                    // ]);

                    return value;
                },
            },
        ],
    },
    findTeacherSchedule: {
        '[]': [
            {
                key: '[]',
                transform: function (value, all, rows) {
                    let _return_ = _.pick(value.dataValues, [
                        'id',
                        'classDate',
                        'classDayOfWeek',
                        'classTimeEnd',
                        'classTimeStart',
                        'groupNo',
                        'isDirectClose',
                        'isGroup',
                        'isOpen',
                        'joinedCount',
                        'maxCount',
                        'memo',
                        'meta',
                        'minCount',
                        'subject',
                    ]);

                    _return_['meta'] = JSON.parse(_return_['meta']);
                    _return_['product'] = _.pick(value.dataValues.product, ['id', 'title', 'classAge', 'classScale', 'isPrivate']);

                    if (!!value.dataValues.isGroup) {
                        _return_['sortNum'] = _.pick(value.dataValues, ['sortNum']);
                    }
                    return _return_;
                },
            },
        ],
    },
    getTeacherDetail: {
        teacher: [
            {
                key: 'teacher',
                transform: function (value, all, rows) {
                    let _return_ = _.omit(value.dataValues, ['updateAt', 'createAt']);
                    _return_.meta = !!_.isNil(value.dataValues.meta) ? null : JSON.parse(value.dataValues.meta);
                    _return_.career = !!_.isNil(value.dataValues.career) ? null : JSON.parse(value.dataValues.career);

                    return _return_;
                },
            },
        ],
        'review.count': 'review.count',
        'review.score': 'review.score',
    },
    getTeacherProduct: {
        '[]': [
            {
                key: '[]',
                transform: function (value, all, rows) {
                    // let _return_ = _.pick(value.dataValues, ['id', 'title', 'classAge', 'classScale']);

                    return value;
                },
            },
        ],
    },
    findAllTeachers: {
        '[]': [
            {
                key: '[]',
                transform: function (value, all, rows) {
                    // let _return_ = _.pick(value.dataValues, ['id', 'title', 'classAge', 'classScale']);

                    return value;
                },
            },
        ],
    },
    findTeacherCalculate: {
        calculate: [
            {
                key: 'calculate',
                transform: function (value, all, rows) {
                    let _return_ = !!_.isNil(value[0]) ? null : _.pick(value[0].dataValues, ['id', 'year', 'month', 'executeDate', 'pdfUrl', 'status']);

                    return _return_;
                },
            },
        ],
        data: [
            {
                key: 'data',
                transform: function (value, all, rows) {
                    let _return_ = new Array();

                    _.forEach(_.keys(value), function (key) {
                        let _row_ = value[key];
                        if (0 < _row_.length) {
                            _return_.push({
                                productId: _row_[0].productId,
                                productTitle: _row_[0].productTitle,
                                classDate: _row_[0].classDate,
                                classTimeStart: _row_[0].classTimeStart,
                                classTimeEnd: _row_[0].classTimeEnd,
                                childrenCount: _row_.length,
                                totalPrice: _.sum(_.map(_row_, 'calculatePrice')),
                            });
                        }
                    });

                    return _return_;
                },
            },
        ],
    },
    favoriteUserList: {
        '[]': [
            {
                key: '[]',
                transform: function (value, all, rows) {
                    let _return_ = {};
                    _return_.userObj = {};
                    _return_.obj = {};

                    _return_.userObj = _.pick(value.dataValues.user, ['name', 'phone', 'email']);
                    _return_.obj.productId = value.dataValues.product.id;
                    _return_.obj.productTitle = value.dataValues.product.title;

                    return _return_;
                },
            },
        ],
    },
    findTeacherNotice: {
        '[]': [
            {
                key: '[]',
                transform: function (value, all, rows) {
                    return value;
                },
            },
        ],
    },
    findTeacherProductAll: {
        '[]': [
            {
                key: '[]',
                transform: function (value, all, rows) {
                    const _return_ = !!_.isNil(value.dataValues) ? null : _.omit(value.dataValues, ['teacher', 'updateAt']);
                    _return_.contents = value.contents;
                    _return_.thumbnailTag = value.thumbnailTag;
                    _return_.meta = value.meta;
                    _return_.materials = value.materials;
                    _return_.classMaterials = value.classMaterials;
                    _return_.classGoal = value.classGoal;
                    _return_.description = value.description;

                    return _return_;
                },
            },
        ],
    },
    findTeacherSuggestion: {
        '[]': [
            {
                key: '[]',
                transform: function (value, all, rows) {
                    const _return_ = !!_.isNil(value.dataValues) ? null : _.pick(value, ['id', 'status', 'intro', 'view', 'vote', 'message', 'voteDate', 'updateAt', 'createAt']);

                    return _return_;
                },
            },
        ],
    },
    findOneTeacherSuggestion: {
        id: 'id',
        status: 'status',
        description: 'description',
        selfIntro: 'selfIntro',
        intro: 'intro',
        view: 'view',
        vote: 'vote',
        message: 'message',
        isVote: 'isVote',
        voteDate: 'voteDate',
        updateAt: 'updateAt',
        createAt: 'createAt',
    },
    findTeacherProductArchive: {
        '[]': [
            {
                key: '[]',
                transform: function (value, all, rows) {
                    return value;
                },
            },
        ],
    },
    findTeacherPlanAll: {
        '[]': [
            {
                key: '[]',
                transform: function (value, all, rows) {
                    return value;
                },
            },
        ],
    },
};
