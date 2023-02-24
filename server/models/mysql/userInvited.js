const Sequelize = require('sequelize');

module.exports = (db) => {
    const userInvited = db.define(
        'userInvited',
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
            inviteCode: {
                type: Sequelize.STRING,
                field: 'invite_code',
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'user_invited',
            timestamps: false,
            underscored: false,
        }
    );

    userInvited.associate = (models) => {
        userInvited.belongsTo(models.user, { foreignKey: 'fkUserId' });
    };

    return userInvited;
};
