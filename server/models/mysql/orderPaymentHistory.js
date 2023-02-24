const Sequelize = require('sequelize');

module.exports = (db) => {
    const orderPaymentHistory = db.define(
        'orderPaymentHistory',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fkOrderId: {
                type: Sequelize.INTEGER,
                field: 'fk_order_id',
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
                unique: true,
                field: 'merchant_uid',
            },
            type: {
                type: Sequelize.TINYINT,
            },
            amount: {
                type: Sequelize.INTEGER,
            },
            payMethod: {
                type: Sequelize.STRING,
                field: 'pay_method',
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'order_payment_history',
            timestamps: false,
            underscored: false,
        }
    );

    orderPaymentHistory.associate = (models) => {
        orderPaymentHistory.belongsTo(models.order, { foreignKey: 'fkOrderId' });
        orderPaymentHistory.belongsTo(models.user, { foreignKey: 'fkUserId' });
    };

    return orderPaymentHistory;
}