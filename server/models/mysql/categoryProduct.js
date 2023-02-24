const Sequelize = require('sequelize');

module.exports = (db) => {
    const categoryProduct = db.define(
        'categoryProduct',
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
            fkProductId: {
                type: Sequelize.INTEGER,
                field: 'fk_product_id',
            }
        },
        {
            validations: {},
            methods: {},
            tableName: 'category_product',
            timestamps: false,
            underscored: false,
        }
    );

    categoryProduct.associate = (models) => {
        categoryProduct.belongsTo(models.category, { foreignKey: 'fkCategoryId' });
        categoryProduct.belongsTo(models.product, { foreignKey: 'fkProductId' });
    };

    return categoryProduct;
};