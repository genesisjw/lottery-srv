const Sequelize = require('sequelize');

module.exports = (db) => {
    const orderStatusHistory = db.define(
        'orderStatusHistory',
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
            status: {
                type: Sequelize.SMALLINT,
            },
            reason: {
                type: Sequelize.JSON,
                field: 'reason',
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'order_status_history',
            timestamps: false,
            underscored: false,
        }
    );

    orderStatusHistory.associate = (models) => {
        orderStatusHistory.belongsTo(models.order, { foreignKey: 'fkOrderId' });
        orderStatusHistory.belongsTo(models.user, { foreignKey: 'fkUserId' });
    };

    return orderStatusHistory;
};
