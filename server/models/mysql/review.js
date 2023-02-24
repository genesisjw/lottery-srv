const Sequelize = require('sequelize');

module.exports = (db) => {
    const review = db.define(
        'review',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fkUserId: {
                type: Sequelize.INTEGER,
                field: 'fk_user_id',
            },
            fkProductId: {
                type: Sequelize.INTEGER,
                field: 'fk_product_id',
            },
            fkOrderId: {
                type: Sequelize.INTEGER,
                field: 'fk_order_id',
            },
            point1: {
                type: Sequelize.FLOAT,
            },
            point2: {
                type: Sequelize.FLOAT,
            },
            content: {
                type: Sequelize.TEXT,
            },
            sort: {
                type: Sequelize.INTEGER,
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                field: 'is_active',
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'review',
            timestamps: false,
            underscored: false,
        }
    );

    review.associate = (models) => {
        review.belongsTo(models.user, { foreignKey: 'fkUserId' });
        review.belongsTo(models.product, { foreignKey: 'fkProductId' });
        review.belongsTo(models.order, { foreignKey: 'fkOrderId' });
        review.hasMany(models.reviewStorage, { foreignKey: 'fkReviewId' });
        review.hasMany(models.reviewClaimHistory, { foreignKey: 'fkReviewId' });
    };

    return review;
};
