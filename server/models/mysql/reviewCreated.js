const Sequelize = require('sequelize');

module.exports = (db) => {
    const reviewCreated = db.define(
        'reviewCreated',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userName: {
                type: Sequelize.STRING,
                field: 'user_name',
            },
            content: {
                type: Sequelize.TEXT,
            },
            point1: {
                type: Sequelize.FLOAT,
            },
            point2: {
                type: Sequelize.FLOAT,
            },
            fkProductId: {
                type: Sequelize.INTEGER,
                field: 'fk_product_id',
            },
            productName: {
                type: Sequelize.INTEGER,
                field: 'product_name',
            },
            storage: {
                type: Sequelize.JSON,
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
            tableName: 'review_created',
            timestamps: false,
            underscored: false,
        }
    );

    return reviewCreated;
};
