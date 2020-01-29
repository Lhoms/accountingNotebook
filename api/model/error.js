const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_NOT_ACCEPTABLE = 406;

class InsufficientBalanceError extends Error {
    constructor() {
        super();
        this.name = 'InsufficientBalanceError';
        this.message = 'Not enough to debit';
        this.code = HTTP_NOT_ACCEPTABLE;
    }
}

class TransactionNotFoundError extends Error {
    constructor() {
        super();
        this.name = 'TransactionNotFoundError';
        this.message = 'Not found transaction';
        this.code = HTTP_NOT_FOUND;
    }
}

class TransactionTypeNotValid extends Error {
    constructor() {
        super();
        this.name = 'TransactionTypeNotValid';
        this.message = 'Type not valid!';
        this.code = HTTP_BAD_REQUEST;
    }
}

class TransactionAmountNotValid extends Error {
    constructor() {
        super();
        this.name = 'TransactionAmountNotValid';
        this.message = 'Amount not valid!';
        this.code = HTTP_BAD_REQUEST;
    }
}

module.exports = {
    InsufficientBalanceError,
    TransactionNotFoundError,
    TransactionTypeNotValid,
    TransactionAmountNotValid
};