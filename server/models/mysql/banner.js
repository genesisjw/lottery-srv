const Sequelize = require('sequelize');

module.exports = (db) => {
    const banner = db.define(
        'banner',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
            },
            fileName: {
                type: Sequelize.STRING,
                length: 500,
                field: 'file_name',
            },
            url: {
                type: Sequelize.STRING,
                length: 500,
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
            tableName: 'banner',
            timestamps: false,
            underscored: false,
        }
    );

    return banner;
};
