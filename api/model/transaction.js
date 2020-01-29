const {Type} = require('./typeMap');
const uuid = require('uuid/v4');
const {TransactionTypeNotValid, TransactionAmountNotValid} = require('../model/error');


class Transaction {
    constructor(req) {
        const type = Type.get(req.body.type);
        if(!type) {
            throw new TransactionTypeNotValid();
        } else if (typeof req.body.amount !== 'number' || req.body.amount < 0 ) {
            throw new TransactionAmountNotValid();
        }
        this.id = uuid();
        this.type = req.body.type;
        this.amount = req.body.amount;
        this.effectiveDate = new Date();
    }
}

module.exports = Transaction;
