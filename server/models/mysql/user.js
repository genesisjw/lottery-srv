const Sequelize = require('sequelize');

module.exports = (db) => {
    const user = db.define(
        'user',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uid: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.STRING,
            },
            inviteCode: {
                type: Sequelize.STRING,
                field: 'invite_code',
            },
            ci: {
                type: Sequelize.STRING,
            },
            birthday: {
                type: Sequelize.DATE,
            },
            isWithdrawal: {
                type: Sequelize.INTEGER,
                field: 'is_withdrawal',
            },
            reason: {
                type: Sequelize.TEXT,
            },
            updatedAt: {
                type: Sequelize.DATE,
                field: 'updated_at',
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'user',
            timestamps: false,
            underscored: false,
        }
    );

    user.associate = (models) => {
        user.hasMany(models.userAgreement, { foreignKey: 'fkUserId' });
        user.hasMany(models.userInvited, { foreignKey: 'fkUserId' });
        user.hasMany(models.userDelivery, { foreignKey: 'fkUserId' });
        user.hasMany(models.order, { foreignKey: 'fkUserId' });
    };

    return user;
};
