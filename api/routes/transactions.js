'use strict';

const express = require('express');
const router = express.Router();
const {getAll, commit, getById} = require('../controllers/transactionController');

// Endpoints
const BASE_PATH = "";

router.get(`${BASE_PATH}/`, getAll);
router.get(`${BASE_PATH}/:id`, getById);
router.post(`${BASE_PATH}/`, commit);

module.exports = router;
