const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { Sequelize, DataTypes } = require('sequelize');

const db = {};

const mysql = new Sequelize(config.database.mysql.dbname[0], null, null, {
    port: config.database.mysql.port,
    dialect: config.database.mysql.protocol,
    logging: !config.database.mysql.logging ? false : console.log,
    // timezone: '+09:00',
    define: {
        freezeTableName: true,
        timestamps: true,
    },
    replication: {
        read: [{ host: config.database.mysql.host[1], username: config.database.mysql.user, password: config.database.mysql.password }],
        write: { host: config.database.mysql.host[0], username: config.database.mysql.user, password: config.database.mysql.password },
    },
    pool: {
        max: 50,
        idle: 10000,
    },
});

fs.readdirSync(path.join(__dirname, 'mysql')).forEach(function (file) {
    const _mysql_ = require(path.join(__dirname, 'mysql', file))(mysql, DataTypes);
    db[_mysql_.name] = _mysql_;
});

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = mysql;

module.exports = db;
