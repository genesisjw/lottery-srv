const Sequelize = require('sequelize');

module.exports = (db) => {
    const userDelivery = db.define(
        'userDelivery',
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
            addressHead: {
                type: Sequelize.STRING,
                field: 'address_head',
            },
            addressDetail: {
                type: Sequelize.STRING,
                field: 'address_detail',
            },
            postCode: {
                type: Sequelize.STRING,
                field: 'post_code',
            },
            memo: {
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
            tableName: 'user_delivery',
            timestamps: false,
            underscored: false,
        }
    );

    userDelivery.associate = (models) => {
        userDelivery.belongsTo(models.user, { foreignKey: 'fkUserId' });
    };

    return userDelivery;
};
