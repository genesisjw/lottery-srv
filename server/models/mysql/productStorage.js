const Sequelize = require('sequelize');

module.exports = (db) => {
    const productStorage = db.define(
        'productStorage',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fkProductId: {
                type: Sequelize.INTEGER,
                field: 'fk_product_id',
            },
            fileName: {
                type: Sequelize.STRING,
                field: 'file_name'
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'product_storage',
            timestamps: false,
            underscored: false,
        }
    );

    productStorage.associate = (models) => {
        productStorage.belongsTo(models.product, { foreignKey: 'fkProductId' });
    };

    return productStorage;
};