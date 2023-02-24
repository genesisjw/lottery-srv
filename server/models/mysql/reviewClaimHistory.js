const Sequelize = require('sequelize');

module.exports = (db) => {
    const reviewClaimHistory = db.define(
        'reviewClaimHistory',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fkReviewId: {
                type: Sequelize.INTEGER,
                field: 'fk_review_id',
            },
            fkUserId: {
                type: Sequelize.INTEGER,
                field: 'fk_user_id',
            },
            reason: {
                type: Sequelize.STRING,
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'review_claim_history',
            timestamps: false,
            underscored: false,
        }
    );

    reviewClaimHistory.associate = (models) => {
        reviewClaimHistory.belongsTo(models.review, { foreignKey: 'fkReviewId' });
        reviewClaimHistory.belongsTo(models.user, { foreignKey: 'fkUserId' });
    };

    return reviewClaimHistory;
};
