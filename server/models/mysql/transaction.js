const Sequelize = require('sequelize');

module.exports = (db) => {
    const transaction = db.define(
        'transaction',
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
            impUid: {
                type: Sequelize.STRING,
                field: 'imp_uid',
            },
            merchantUid: {
                type: Sequelize.STRING,
                field: 'merchant_uid',
            },
            response: {
                type: Sequelize.JSON,
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'transaction',
            timestamps: false,
            underscored: false,
        }
    );

    transaction.associate = (models) => {
        transaction.hasOne(models.order, { foreignKey: 'fkTransId' });
        transaction.belongsTo(models.user, { foreignKey: 'fkUserId' });
    };

    return transaction;
};
