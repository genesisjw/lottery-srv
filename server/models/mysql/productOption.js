const Sequelize = require('sequelize');

module.exports = (db) => {
    const productOption = db.define(
        'productOption',
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
            hash: {
                type: Sequelize.STRING,
            },
            stock: {
                type: Sequelize.INTEGER,
            },
            price: {
                type: Sequelize.INTEGER,
            },
            testPrice: {
                type: Sequelize.INTEGER,
                field: 'test_price'
            },
            testTerm: {
                type: Sequelize.TINYINT,
                field: 'test_term',
            },
            isActive: {
                type: Sequelize.TINYINT,
                field: 'is_active',
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'product_option',
            timestamps: false,
            underscored: false,
        }
    );

    productOption.associate = (models) => {
        productOption.belongsTo(models.product, { foreignKey: 'fkProductId' });
    };

    return productOption;
};