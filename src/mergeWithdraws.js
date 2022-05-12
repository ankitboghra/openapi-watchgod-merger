import { TX_TYPE, TX_SOURCE } from './constants'

export default function mergeWithdraws(
    openapiExits,
    openapiBurns,
    watchgodExits,
    watchgodConfirmExits,
    watchgodBurns
) {
    const mergedWithdraws = {};

    watchgodBurns.forEach((tx) => {
        const txHash = tx.txHash;

        mergedWithdraws[txHash] = tx;
        mergedWithdraws[txHash]._txSource = TX_SOURCE.WATCHGOD_BURNS;
        mergedWithdraws[txHash]._burnTxHash = tx.txHash;
        mergedWithdraws[txHash]._watchgodBurnTxStatus = tx.txStatus;
        mergedWithdraws[txHash]._latestStatus = tx.txStatus;
        mergedWithdraws[txHash]._txType = TX_TYPE.WITHDRAW;
        mergedWithdraws[txHash]._watchgodBurnTimestamp = tx.timestamp;
    });

    openapiBurns.forEach((tx) => {
        const txHash = tx.txHash;
        const watchgodBurnTxStatus =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._watchgodBurnTxStatus
                ? mergedWithdraws[txHash]._watchgodBurnTxStatus
                : false;

        const watchgodBurnTimestamp =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._watchgodBurnTimestamp
                ? mergedWithdraws[txHash]._watchgodBurnTimestamp
                : false;

        mergedWithdraws[txHash] = tx;
        mergedWithdraws[txHash]._txSource = TX_SOURCE.OPENAPI_BURNS;
        mergedWithdraws[txHash]._burnTxHash = tx.txHash;
        mergedWithdraws[txHash]._openapiBurnTxStatus = tx.txStatus;
        mergedWithdraws[txHash]._latestStatus = tx.txStatus;
        mergedWithdraws[txHash]._txType = TX_TYPE.WITHDRAW;
        mergedWithdraws[txHash]._openapiBurnTimestamp = tx.timestamp;

        if (watchgodBurnTxStatus) {
            mergedWithdraws[txHash]._watchgodBurnTxStatus = watchgodBurnTxStatus;
        }
        if (watchgodBurnTimestamp) {
            mergedWithdraws[txHash]._watchgodBurnTimestamp = watchgodBurnTimestamp;
        }
    });

    watchgodConfirmExits.forEach((tx) => {
        const txHash = tx.txBurnHash;

        const watchgodBurnTxStatus =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._watchgodBurnTxStatus
                ? mergedWithdraws[txHash]._watchgodBurnTxStatus
                : false;


        const openapiBurnTxStatus =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._openapiBurnTxStatus
                ? mergedWithdraws[txHash]._openapiBurnTxStatus
                : false;

        const watchgodBurnTimestamp =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._watchgodBurnTimestamp
                ? mergedWithdraws[txHash]._watchgodBurnTimestamp
                : false;

        const openapiBurnTimestamp =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._openapiBurnTimestamp
                ? mergedWithdraws[txHash]._openapiBurnTimestamp
                : false;

        mergedWithdraws[txHash] = tx;
        mergedWithdraws[txHash]._txSource = TX_SOURCE.WATCHGOD_CONFIRM_EXITS;
        mergedWithdraws[txHash]._burnTxHash = tx.txBurnHash;
        mergedWithdraws[txHash]._confirmExitTxHash = tx.txHash;
        mergedWithdraws[txHash]._watchgodConfirmExitTxStatus = tx.txStatus;
        mergedWithdraws[txHash]._latestStatus = tx.txStatus;
        mergedWithdraws[txHash]._txType = TX_TYPE.CONFIRM_EXIT;
        mergedWithdraws[txHash]._watchgodConfirmExitsTimestamp = tx.timestamp;

        if (watchgodBurnTxStatus) {
            mergedWithdraws[txHash]._watchgodBurnTxStatus = watchgodBurnTxStatus;
        }

        if (openapiBurnTxStatus) {
            mergedWithdraws[txHash]._openapiBurnTxStatus = openapiBurnTxStatus;
        }

        if (watchgodBurnTimestamp) {
            mergedWithdraws[txHash]._watchgodBurnTimestamp = watchgodBurnTimestamp;
        }
        if (openapiBurnTimestamp) {
            mergedWithdraws[txHash]._openapiBurnTimestamp = openapiBurnTimestamp;
        }
    })

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

        const watchgodConfirmExitTxStatus =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._watchgodConfirmExitTxStatus
                ? mergedWithdraws[txHash]._watchgodConfirmExitTxStatus
                : false;

        // relying on other confirmExitTxOnly,
        // since an exit tx will not have confirm exit tx details
        const confirmExitTxHash =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._confirmExitTxHash
                ? mergedWithdraws[txHash]._confirmExitTxHash
                : false;

        const watchgodBurnTimestamp =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._watchgodBurnTimestamp
                ? mergedWithdraws[txHash]._watchgodBurnTimestamp
                : false;

        const openapiBurnTimestamp =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._openapiBurnTimestamp
                ? mergedWithdraws[txHash]._openapiBurnTimestamp
                : false;

        const watchgodConfirmExitsTimestamp =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._watchgodConfirmExitsTimestamp
                ? mergedWithdraws[txHash]._watchgodConfirmExitsTimestamp
                : false;

        mergedWithdraws[txHash] = tx;
        mergedWithdraws[txHash]._txSource = TX_SOURCE.WATCHGOD_EXITS;
        mergedWithdraws[txHash]._burnTxHash = tx.txBurnHash;
        mergedWithdraws[txHash]._exitTxHash = tx.txHash;
        mergedWithdraws[txHash]._watchgodExitTxStatus = tx.txStatus;
        mergedWithdraws[txHash]._latestStatus = tx.txStatus;
        mergedWithdraws[txHash]._txType = TX_TYPE.EXIT;
        mergedWithdraws[txHash]._watchgodExitTimestamp = tx.timestamp;

        if (confirmExitTxHash) {
            mergedWithdraws[txHash]._confirmExitTxHash = confirmExitTxHash;
        }

        if (watchgodBurnTxStatus) {
            mergedWithdraws[txHash]._watchgodBurnTxStatus = watchgodBurnTxStatus;
        }

        if (openapiBurnTxStatus) {
            mergedWithdraws[txHash]._openapiBurnTxStatus = openapiBurnTxStatus;
        }

        if (watchgodConfirmExitTxStatus) {
            mergedWithdraws[txHash]._watchgodConfirmExitTxStatus = watchgodConfirmExitTxStatus;
        }

        if (watchgodBurnTimestamp) {
            mergedWithdraws[txHash]._watchgodBurnTimestamp = watchgodBurnTimestamp;
        }
        if (openapiBurnTimestamp) {
            mergedWithdraws[txHash]._openapiBurnTimestamp = openapiBurnTimestamp;
        }
        if (watchgodConfirmExitsTimestamp) {
            mergedWithdraws[txHash]._watchgodConfirmExitsTimestamp = watchgodConfirmExitsTimestamp;
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

        const watchgodConfirmExitTxStatus =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._watchgodConfirmExitTxStatus
                ? mergedWithdraws[txHash]._watchgodConfirmExitTxStatus
                : false;

        const watchgodExitTxStatus =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._watchgodExitTxStatus
                ? mergedWithdraws[txHash]._watchgodExitTxStatus
                : false;

        const confirmExitTxHash =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._confirmExitTxHash
                ? mergedWithdraws[txHash]._confirmExitTxHash
                : false;

        const watchgodBurnTimestamp =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._watchgodBurnTimestamp
                ? mergedWithdraws[txHash]._watchgodBurnTimestamp
                : false;

        // const openapiBurnTimestamp =
        //     mergedWithdraws[txHash] && mergedWithdraws[txHash]._openapiBurnTimestamp
        //         ? mergedWithdraws[txHash]._openapiBurnTimestamp
        //         : false;

        const watchgodConfirmExitsTimestamp =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._watchgodConfirmExitsTimestamp
                ? mergedWithdraws[txHash]._watchgodConfirmExitsTimestamp
                : false;

        const watchgodExitTimestamp =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._watchgodExitTimestamp
                ? mergedWithdraws[txHash]._watchgodExitTimestamp
                : false;

        mergedWithdraws[txHash] = tx;
        mergedWithdraws[txHash]._txSource = TX_SOURCE.OPENAPI_EXITS;
        mergedWithdraws[txHash]._burnTxHash = tx.txBurnHash;
        mergedWithdraws[txHash]._exitTxHash = tx.txHash;
        mergedWithdraws[txHash]._openapiExitTxStatus = tx.txStatus;
        mergedWithdraws[txHash]._latestStatus = tx.txStatus;
        mergedWithdraws[txHash]._txType = TX_TYPE.EXIT;
        mergedWithdraws[txHash]._openapiExitTimestamp = tx.timestamp;
        mergedWithdraws[txHash]._openapiBurnTimestamp = tx.burnTxTimestamp;
        mergedWithdraws[txHash]._openapiConfirmExitTimestamp = tx.exitStartedTimeStamp;

        if (confirmExitTxHash) {
            mergedWithdraws[txHash]._confirmExitTxHash = confirmExitTxHash;
        }

        if (watchgodBurnTxStatus) {
            mergedWithdraws[txHash]._watchgodBurnTxStatus = watchgodBurnTxStatus;
        }

        if (openapiBurnTxStatus) {
            mergedWithdraws[txHash]._openapiBurnTxStatus = openapiBurnTxStatus;
        }

        if (watchgodConfirmExitTxStatus) {
            mergedWithdraws[txHash]._watchgodConfirmExitTxStatus = watchgodConfirmExitTxStatus;
        }

        if (watchgodExitTxStatus) {
            mergedWithdraws[txHash]._watchgodExitTxStatus = watchgodExitTxStatus;
        }

        if (watchgodBurnTimestamp) {
            mergedWithdraws[txHash]._watchgodBurnTimestamp = watchgodBurnTimestamp;
        }
        // if (openapiBurnTimestamp) {
        //     mergedWithdraws[txHash]._openapiBurnTimestamp = openapiBurnTimestamp;
        // }
        if (watchgodConfirmExitsTimestamp) {
            mergedWithdraws[txHash]._watchgodConfirmExitsTimestamp = watchgodConfirmExitsTimestamp;
        }
        if (watchgodExitTimestamp) {
            mergedWithdraws[txHash]._watchgodExitTimestamp = watchgodExitTimestamp;
        }
    });

    return Object.values(mergedWithdraws);
}
