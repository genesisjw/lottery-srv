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
            name: {
                type: Sequelize.STRING,
            },
            profileImage: {
                type: Sequelize.STRING,
                field: 'profile_image',
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
