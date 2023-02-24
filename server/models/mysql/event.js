const Sequelize = require('sequelize');

module.exports = (db) => {
    const event = db.define(
        'event',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
            },
            bannerImg: {
                type: Sequelize.STRING,
                field: 'banner_img',
            },
            innerImg: {
                type: Sequelize.STRING,
                field: 'inner_img',
            },
            sort: {
                type: Sequelize.SMALLINT,
            },
            isMain: {
                type: Sequelize.TINYINT,
                field: 'is_main',
            },
            isDoing: {
                type: Sequelize.TINYINT,
                field: 'is_doing',
            },
            desc: {
                type: Sequelize.STRING,
            },
            url: {
                type: Sequelize.STRING,
                length: 500,
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'event',
            timestamps: false,
            underscored: false,
        }
    );

    return event;
};
