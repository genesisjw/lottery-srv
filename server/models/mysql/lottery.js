const Sequelize = require('sequelize');

module.exports = (db) => {
    const lottery = db.define(
        'lottery',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            round: {
                type: Sequelize.INTEGER,
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'banner',
            timestamps: false,
            underscored: false,
        }
    );

    return lottery;
};
