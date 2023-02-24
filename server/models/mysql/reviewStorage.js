const Sequelize = require('sequelize');

module.exports = (db) => {
    const reviewStorage = db.define(
        'reviewStorage',
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
            fileName: {
                type: Sequelize.STRING,
                field: 'file_name',
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'review_storage',
            timestamps: false,
            underscored: false,
        }
    );

    reviewStorage.associate = (models) => {
        reviewStorage.belongsTo(models.review, { foreignKey: 'fkReviewId' });
    };

    return reviewStorage;
};
