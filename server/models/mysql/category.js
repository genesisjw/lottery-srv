const Sequelize = require('sequelize');

module.exports = (db) => {
    const category = db.define(
        'category',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
            },
            fileName: {
                type: Sequelize.STRING,
                field: 'file_name',
            },
            sort: {
                type: Sequelize.TINYINT,
            },
            showYn: {
                type: Sequelize.TINYINT,
                field: 'show_yn',
            },
            isCollection: {
                type: Sequelize.TINYINT,
                field: 'is_collection',
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
            },
        },
        {
            validations: {},
            methods: {},
            tableName: 'category',
            timestamps: false,
            underscored: false,
        }
    );

    category.associate = (models) => {
        category.hasOne(models.categoryCollection, { foreignKey: 'fkCategoryId' });
        category.hasMany(models.categoryProduct, { foreignKey: 'fkCategoryId' });
    };

    return category;
};