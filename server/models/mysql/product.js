const Sequelize = require('sequelize');

module.exports = (db) => {
    const product = db.define(
        'product',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
            },
            brand: {
                type: Sequelize.STRING,
            },
            info: {
                type: Sequelize.TEXT,
            },
            desc: {
                type: Sequelize.TEXT,
            },
            keyword: {
                type: Sequelize.TEXT,
            },
            isMain: {
                type: Sequelize.TINYINT,
                field: 'is_main',
            },
            sort: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
            },
            deletedAt: {
                type: Sequelize.DATE,
                field: 'deleted_at',
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'product',
            timestamps: false,
            underscored: false,
        }
    );

    product.associate = (models) => {
        product.hasMany(models.categoryProduct, { foreignKey: 'fkProductId' });
        product.hasMany(models.productOption, { foreignKey: 'fkProductId' });
        product.hasMany(models.productStorage, { foreignKey: 'fkProductId' });
        product.hasMany(models.order, { foreignKey: 'fkProductId' });
    };

    return product;
};