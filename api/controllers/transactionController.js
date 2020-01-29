'use strict';

const db = require('../repository/db');
const Transaction = require('../model/transaction');

module.exports.getById = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(`Transaction Required: ${id}`);

        const transaction = await db.getById(id);
        console.log(`Transaction found: ${JSON.stringify(transaction)}`);

        fillResponse(res, 200, transaction);
    } catch (err) {
        console.error(err);
        fillResponse(res, err.code || 500, {status: 'ERROR', message: err.message});
    }
};

module.exports.getAll = async (req, res) => {
    try {
        console.log('Get all transactions');
        const transactions = await db.getAllTransactions();
        console.log(`Sending all transactions, total count ${transactions.length}`);

        fillResponse(res, 200, transactions);
    } catch (err) {
        console.error(err);
        fillResponse(res, err.code || 500, {status: 'ERROR', message: err.message});
    }
};

module.exports.commit = async (req, res) => {
    try {
        const transactionRequest = new Transaction(req);
        console.log(`Transaction commit request: ${JSON.stringify(transactionRequest)}`);
        await db.commitTransaction(transactionRequest);

        console.log('ok request');
        fillResponse(res, 200, transactionRequest);
    } catch (err) {
        console.error(err);
        fillResponse(res, err.code || 500, {status: 'ERROR', message: err.message});
    }
};


const fillResponse = (res, statusCode, body) => res.status(statusCode).json(body);
