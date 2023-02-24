const Sequelize = require('sequelize');

module.exports = (db) => {
    const blog = db.define(
        'blog',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.STRING,
            },
            subTitle: {
                type: Sequelize.STRING,
                field: 'sub_title',
            },
            contents: {
                type: Sequelize.TEXT
            },
            thumb: {
                type: Sequelize.STRING,
            },
            isMain: {
                type: Sequelize.TINYINT,
                field: 'is_main',
            },
            sort: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'blog',
            timestamps: false,
            underscored: false,
        }
    );

    return blog;
};