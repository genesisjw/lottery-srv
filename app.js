const express = require('express');

const environment = require('./config/environment');
const route = require('./config/routes');

(async () => {
    const server = express();

    await environment(server);
    route(server);

    server.use(function (req, res, next) {
        res.status(404).send('Sorry cant find that!');
    });

    server.listen(config.app.port, function () {
        console.log('[%s][%s] (http) listening on port [%s]', global.config.app.env, global.config.app.name, this.address().port);
        console.log('---------------------------------------------------------------');
    });
})();
