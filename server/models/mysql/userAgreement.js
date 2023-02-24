const Sequelize = require('sequelize');

module.exports = (db) => {
    const userAgreement = db.define(
        'userAgreement',
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
            section: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'user_agreement',
            timestamps: false,
            underscored: false,
        }
    );

    userAgreement.associate = (models) => {
        userAgreement.belongsTo(models.user, { foreignKey: 'fkUserId' });
    };

    return userAgreement;
};
