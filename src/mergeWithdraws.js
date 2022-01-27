import { TX_TYPE } from './constants'

export default function mergeWithdraws(
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
        mergedWithdraws[txHash]._txType = TX_TYPE.WITHDRAW;
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
        mergedWithdraws[txHash]._txType = TX_TYPE.WITHDRAW;

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
        mergedWithdraws[txHash]._txType = TX_TYPE.EXIT;

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
        mergedWithdraws[txHash]._txType = TX_TYPE.EXIT;

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
