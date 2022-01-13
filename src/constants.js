const TX_SOURCE = Object.freeze({
    WATCHGOD_DEPOSITS: 'watchgod_deposits',
    WATCHGOD_BURNS: 'watchgod_burns',
    WATCHGOD_EXITS: 'watchgod_exits',
    OPENAPI_DEPOSITS: 'openapi_deposits',
    OPENAPI_BURNS: 'openapi_burns',
    OPENAPI_EXITS: 'openapi_exits',
})

const TX_TYPE = Object.freeze({
    DEPOSIT: 'deposit',
    WITHDRAW: 'withdraw',
    EXIT: 'exit',
})


module.exports = {
    TX_SOURCE,
    TX_TYPE,
};
