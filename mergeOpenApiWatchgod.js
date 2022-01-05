/*
DEPOSIT
=> priority of responses(highest to lowest)
- openapiDeposits
- watchgodDeposits
*/

/*
WITHDRAW

=> priority of responses(highest to lowest)
- openapiExits
- openapiBurns
- watchgodExits
- watchgodBurns
*/

// interface is just for reference
/*
interface ITransaction {
    from?: String
    to?: String
    amount?: String
    userAddress?: String

    txType?: String
    txStatus?: String
    contractAddress?: String
    rootToken?: String

    network?: String

    tokenId?: String
    tokenType: String
    isPoS?: Boolean

    txHash?: String
    prevBurnHash?: String
    oldHash?: String
    newHash?: String

    data?: String
    blockNumber?: Number

    timestamp?: Number // in seconds
}
*/

const {
    convertOpenapiToInterface,
    convertWatchgodToInterface,
    convertInterfaceToWatchgod,
} = require("./utils");
/**
 *
 * @param {*} openapiDepositResponse
 * @param {*} openapiWithdrawResponse
 * @param {*} openapiBurnResponse
 * @param {*} watchGodResponse
 */
function merger(
    openapiDepositResponse,
    openapiWithdrawResponse,
    openapiBurnResponse,
    watchGodResponse
) {
    const openapiDeposits = openapiDepositResponse.map((tx) =>
        convertOpenapiToInterface(tx)
    );

    const watchgodDeposits = watchGodResponse
        .filter((tx) => tx.txType === "deposit")
        .map((tx) => convertWatchgodToInterface(tx));

    const openapiExits = openapiWithdrawResponse.map((tx) =>
        convertOpenapiToInterface(tx)
    );

    const openapiBurns = openapiBurnResponse.map((tx) =>
        convertOpenapiToInterface(tx)
    );

    const watchgodExits = watchGodResponse
        .filter((tx) => tx.txType === "exit")
        .map((tx) => convertWatchgodToInterface(tx));

    const watchgodBurns = watchGodResponse
        .filter((tx) => tx.txType === "withdraw")
        .map((tx) => convertWatchgodToInterface(tx));

    return [
        ...mergeDeposits(openapiDeposits, watchgodDeposits),
        ...mergeWithdraws(openapiExits, openapiBurns, watchgodExits, watchgodBurns),
    ];
}

function mergeDeposits(openapiDeposits, watchgodDeposits) {
    const mergedDeposits = {};

    watchgodDeposits.forEach((tx) => {
        const txHash = tx.txHash;
        mergedDeposits[txHash] = tx;
        mergedDeposits[txHash].latestStatus = tx.txStatus;
        mergedDeposits[txHash].watchgodTxStatus = tx.txStatus;
        mergedDeposits[txHash].txSource = "watchgod_deposits";
    });

    openapiDeposits.forEach((tx) => {
        const txHash = tx.txHash;
        const watchgodTxStatus = mergedDeposits[txHash]
            ? mergedDeposits[txHash].txStatus
            : false;

        mergedDeposits[txHash] = tx;
        mergedDeposits[txHash].latestStatus = tx.txStatus;
        mergedDeposits[txHash].openapiTxStatus = tx.txStatus;

        if (watchgodTxStatus) {
            mergedDeposits[txHash].watchgodTxStatus = watchgodTxStatus;
        }

        mergedDeposits[txHash].txSource = "openapi";
    });

    return Object.values(mergedDeposits);
}

function mergeWithdraws(
    openapiExits,
    openapiBurns,
    watchgodExits,
    watchgodBurns
) {
    const mergedWithdraws = {};

    watchgodBurns.forEach((tx) => {
        const txHash = tx.txHash;

        mergedWithdraws[txHash] = tx;
        mergedWithdraws[txHash]._txSource = "watchgod_burns";
        mergedWithdraws[txHash]._burnTxHash = tx.txHash;
        mergedWithdraws[txHash]._watchgodBurnTxStatus = tx.txStatus;
        mergedWithdraws[txHash]._latestStatus = tx.txStatus;
    });

    openapiBurns.forEach((tx) => {
        const txHash = tx.txHash;
        const watchgodBurnTxStatus =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._watchgodBurnTxStatus
                ? mergedWithdraws[txHash]._watchgodBurnTxStatus
                : false;

        mergedWithdraws[txHash] = tx;
        mergedWithdraws[txHash]._txSource = "openapi_burns";
        mergedWithdraws[txHash]._burnTxHash = tx.txHash;
        mergedWithdraws[txHash]._openapiBurnTxStatus = tx.txStatus;
        mergedWithdraws[txHash]._latestStatus = tx.txStatus;

        if (watchgodBurnTxStatus) {
            mergedWithdraws[txHash]._watchgodBurnTxStatus = watchgodBurnTxStatus;
        }
    });

    watchgodExits.forEach((tx) => {
        const txHash = tx.txBurnHash;

        const watchgodBurnTxStatus =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._watchgodBurnTxStatus
                ? mergedWithdraws[txHash]._watchgodBurnTxStatus
                : false;

        const openapiBurnTxStatus =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._openapiBurnTxStatus
                ? mergedWithdraws[txHash]._openapiBurnTxStatus
                : false;

        mergedWithdraws[txHash] = tx;
        mergedWithdraws[txHash]._txSource = "watchgod_exits";
        mergedWithdraws[txHash]._burnTxHash = tx.txBurnHash;
        mergedWithdraws[txHash]._exitTxHash = tx.txHash;
        mergedWithdraws[txHash]._watchgodExitTxStatus = tx.txStatus;
        mergedWithdraws[txHash]._latestStatus = tx.txStatus;

        if (watchgodBurnTxStatus) {
            mergedWithdraws[txHash]._watchgodBurnTxStatus = watchgodBurnTxStatus;
        }

        if (openapiBurnTxStatus) {
            mergedWithdraws[txHash]._openapiBurnTxStatus = openapiBurnTxStatus;
        }
    });

    openapiExits.forEach((tx) => {
        const txHash = tx.txBurnHash;

        const watchgodBurnTxStatus =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._watchgodBurnTxStatus
                ? mergedWithdraws[txHash]._watchgodBurnTxStatus
                : false;

        const openapiBurnTxStatus =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._openapiBurnTxStatus
                ? mergedWithdraws[txHash]._openapiBurnTxStatus
                : false;

        const watchgodExitTxStatus =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._watchgodExitTxStatus
                ? mergedWithdraws[txHash]._watchgodExitTxStatus
                : false;

        mergedWithdraws[txHash] = tx;
        mergedWithdraws[txHash]._txSource = "openapi_exits";
        mergedWithdraws[txHash]._burnTxHash = tx.txBurnHash;
        mergedWithdraws[txHash]._exitTxHash = tx.txHash;
        mergedWithdraws[txHash]._openapiExitTxStatus = tx.txStatus;
        mergedWithdraws[txHash]._latestStatus = tx.txStatus;

        if (watchgodBurnTxStatus) {
            mergedWithdraws[txHash]._watchgodBurnTxStatus = watchgodBurnTxStatus;
        }

        if (openapiBurnTxStatus) {
            mergedWithdraws[txHash]._openapiBurnTxStatus = openapiBurnTxStatus;
        }

        if (watchgodExitTxStatus) {
            mergedWithdraws[txHash]._watchgodExitTxStatus = watchgodExitTxStatus;
        }
    });

    return Object.values(mergedWithdraws);
}

module.exports = merger;
