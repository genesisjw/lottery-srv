const Sequelize = require('sequelize');

module.exports = (db) => {
    const order = db.define(
        'order',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            merchantUid: {
                type: Sequelize.STRING,
                unique: true,
                field: 'merchant_uid',
            },
            fkUserId: {
                type: Sequelize.INTEGER,
                field: 'fk_user_id',
            },
            fkProductId: {
                type: Sequelize.INTEGER,
                field: 'fk_product_id',
            },
            fkTransId: {
                type: Sequelize.INTEGER,
                field: 'fk_trans_id',
            },
            address: {
                type: Sequelize.STRING,
            },
            hash: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.SMALLINT,
            },
            productOption: {
                type: Sequelize.JSON,
                field: 'product_option',
            },
            testTerm: {
                type: Sequelize.TINYINT,
                field: 'test_term',
            },
            testWillEndAt: {
                type: Sequelize.DATE,
                field: 'test_will_end_at',
            },
            fid: {
                type: Sequelize.STRING,
            },
            deliveryCorp: {
                type: Sequelize.STRING,
                field: 'delivery_corp',
            },
            invoiceNo: {
                type: Sequelize.STRING,
                field: 'invoice_no',
            },
            memos: {
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
            tableName: 'order',
            timestamps: false,
            underscored: false,
        }
    );

    order.associate = (models) => {
        order.belongsTo(models.user, { foreignKey: 'fkUserId' });
        order.belongsTo(models.product, { foreignKey: 'fkProductId' });
        order.belongsTo(models.transaction, { foreignKey: 'fkTransId' });

        order.hasMany(models.orderPaymentHistory, { foreignKey: 'fkOrderId' });
        order.hasMany(models.orderStatusHistory, { foreignKey: 'fkOrderId' });
        order.hasMany(models.review, { foreignKey: 'fkOrderId' });
    };

    return order;
};
