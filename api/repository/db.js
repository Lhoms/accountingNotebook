const uuidv4 = require('uuid/v4');
const Mutex = require('../service/mutex');
const {InsufficientBalanceError, TransactionNotFoundError} = require('../model/error');

let db = null;

class DB {
    constructor(quantity = 0, user = 'single user') {
        this.id = uuidv4();
        this.user = user;
        this.quantity = quantity;
        this.mutex = new Mutex();
        this.transactions = [];
    }
}

// Singleton
const getDB = () => {
    if (!db) {
        db = new DB();
    }
    return db;
};

module.exports.getBalance = async () => {
    await getDB().mutex.wait();
    const quantity = getDB().quantity;
    db.mutex.release();
    return quantity;
};

module.exports.getById = async (id) => {
    await getDB().mutex.wait();
    const transaction = getDB().transactions.find(tx => tx.id === id);
    db.mutex.release();
    if(!transaction) {
        throw new TransactionNotFoundError();
    }
    return transaction;
};

module.exports.getAllTransactions = async () => {
    await getDB().mutex.wait();
    const transactions = getDB().transactions;
    db.mutex.release();
    return transactions;
};

module.exports.commitTransaction = async (tx) => {
    const db = getDB();

    await db.mutex.lock();
    await validateAndCommit(db, tx);
    db.mutex.release();
};

async function validateAndCommit(db, tx) {
    const txqty = tx.type === 'credit' ? tx.amount : -tx.amount;

    if ((db.quantity + txqty) < 0) {
        throw new InsufficientBalanceError();
    } else {
        await updateTransactionsAndBalance(db, txqty, tx);
    }
}

async function updateTransactionsAndBalance(db, txqty, tx) {
    db.quantity = db.quantity + txqty;
    db.transactions.push(tx);
    await sleep(5000);
}

const sleep = m => new Promise(r => setTimeout(r, m));