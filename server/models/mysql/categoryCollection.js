const Sequelize = require('sequelize');

module.exports = (db) => {
    const categoryCollection = db.define(
        'categoryCollection',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fkCategoryId: {
                type: Sequelize.INTEGER,
                field: 'fk_category_id',
            },
            subName: {
                type: Sequelize.STRING,
                field: 'sub_name',
            },
            subImage: {
                type: Sequelize.STRING,
                field: 'sub_image',
            },
            desc: {
                type: Sequelize.TEXT,
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'category_collection',
            timestamps: false,
            underscored: false,
        }
    );

    categoryCollection.associate = (models) => {
        categoryCollection.belongsTo(models.category, { foreignKey: 'fkCategoryId' });
    };

    return categoryCollection;
};