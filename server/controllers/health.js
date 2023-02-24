const express = require('express');
const util = require('util');
const moment = require('moment');

const router = express.Router();

const constants = require('../constants');
const redis = require('../lib/redis_client');

const {
  requestCombined,
  arrayToProductHash,
  productHashToArray,
} = require('../lib');

const redisClient = redis.getConnection();

router.get('/', async (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
