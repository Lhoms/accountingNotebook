'use strict';

const db = require('../repository/db');

module.exports.getBalance = async (req, res) => {
    try {
        console.log(`Getting balance of the current account`);

        const balance = await db.getBalance();
        console.log(`Total balance: ${balance}`);

        fillResponse(res, 200, {balance});
    } catch (err) {
        console.error(err);
        fillResponse(res, 500, {status: 'ERROR', message: err.message});
    }
};

const fillResponse = (res, statusCode, body) => res.status(statusCode).json(body);
