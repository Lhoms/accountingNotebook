'use strict';

const express = require('express');
const router = express.Router();
const {getBalance} = require('../controllers/balanceController');

// Endpoints
const BASE_PATH = "";

router.get(`${BASE_PATH}/`, getBalance);

module.exports = router;
