const Sequelize = require('sequelize');

module.exports = (db) => {
    const code = db.define(
        'code',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
            },
            depthLevel: {
                type: Sequelize.STRING,
                field: 'depth_level',
            },
            parentId: {
                type: Sequelize.INTEGER,
                field: 'parent_id',
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'code',
            timestamps: false,
            underscored: false,
        }
    );

    code.associate = (models) => {
        code.belongsTo(models.code, { as: 'parent', through: 'parentId' });
    };

    return code;
};