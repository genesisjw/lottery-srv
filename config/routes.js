const apiVersion = `/v1`;

const controllers = require('../server/controllers');

module.exports = (app) => {
    console.log('Initializing routes.');

    console.log(`/health`);
    app.use(`/health`, controllers.health);

    console.log(`/auth`);
    app.use(`/auth`, controllers.auth);

    console.log('\r');
};
