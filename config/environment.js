const _ = require('lodash');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const bearerToken = require('express-bearer-token');
const cors = require('cors');
const requestIp = require('request-ip');

const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

process.env.NODE_ENV = !!process.env.NODE_ENV ? process.env.NODE_ENV : 'myLocalhost';
global.config = require('config');

module.exports = async (app) => {
    if (!!process.env.NODE_ENV && 'myLocalhost' !== process.env.NODE_ENV) {
        const secret_name = `${process.env.NODE_ENV}/kracker/service-api`;

        const client = new SecretsManagerClient({
            region: 'ap-northeast-2',
        });

        try {
            const response = await client.send(
                new GetSecretValueCommand({
                    SecretId: secret_name,
                    VersionStage: 'AWSCURRENT',
                })
            );

            config = JSON.parse(response.SecretString);
        } catch (error) {
            throw error;
        }
    }

    app.use(bodyParser.json({ limit: '50mb' }));

    app.use(
        bodyParser.urlencoded({
            limit: '50mb',
            extended: true,
        })
    );

    app.set('jwt-secret', config.secret);

    app.use(requestIp.mw());

    // CORS 설정
    app.use(cors());
    // app.use(
    //     cors({
    //         origin: ['http://localhost:8080', 'http://localhost:3333'],
    //     })
    // );

    app.use(cookieParser());

    app.use(compression());
    app.use(bearerToken());

    app.disable('etag');
    app.disable('x-powered-by');

    console.log('---------------------------------------------------------------');
};
