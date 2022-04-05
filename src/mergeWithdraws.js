import { TX_TYPE, TX_SOURCE } from './constants'

export default function mergeWithdraws(
    openapiExits,
    openapiBurns,
    watchgodExits,
    watchgodConfirmExits,
    watchgodBurns,
    watchgodOthers
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
    });

    openapiBurns.forEach((tx) => {
        const txHash = tx.txHash;
        const watchgodBurnTxStatus =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._watchgodBurnTxStatus
                ? mergedWithdraws[txHash]._watchgodBurnTxStatus
                : false;

        mergedWithdraws[txHash] = tx;
        mergedWithdraws[txHash]._txSource = TX_SOURCE.OPENAPI_BURNS;
        mergedWithdraws[txHash]._burnTxHash = tx.txHash;
        mergedWithdraws[txHash]._openapiBurnTxStatus = tx.txStatus;
        mergedWithdraws[txHash]._latestStatus = tx.txStatus;
        mergedWithdraws[txHash]._txType = TX_TYPE.WITHDRAW;

        if (watchgodBurnTxStatus) {
            mergedWithdraws[txHash]._watchgodBurnTxStatus = watchgodBurnTxStatus;
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

        mergedWithdraws[txHash] = tx;
        mergedWithdraws[txHash]._txSource = TX_SOURCE.WATCHGOD_CONFIRM_EXITS;
        mergedWithdraws[txHash]._burnTxHash = tx.txBurnHash;
        mergedWithdraws[txHash]._confirmExitTxHash = tx.txHash;
        mergedWithdraws[txHash]._watchgodConfirmExitTxStatus = tx.txStatus;
        mergedWithdraws[txHash]._latestStatus = tx.txStatus;
        mergedWithdraws[txHash]._txType = TX_TYPE.CONFIRM_EXIT;

        if (watchgodBurnTxStatus) {
            mergedWithdraws[txHash]._watchgodBurnTxStatus = watchgodBurnTxStatus;
        }

        if (openapiBurnTxStatus) {
            mergedWithdraws[txHash]._openapiBurnTxStatus = openapiBurnTxStatus;
        }

        // below logic is only for dropped/replaced txs
        if (tx.newHash && tx.txStatus === 'speedup') {
            const speedupTx = watchgodOthers.find((speedupTx) =>
                tx.newHash === speedupTx.txHash
            )

            if (speedupTx) {
                mergedWithdraws[txHash]._oldConfirmExitTxHash = tx.txHash
                mergedWithdraws[txHash]._confirmExitTxHash = tx.newHash
                mergedWithdraws[txHash]._watchgodConfirmExitTxStatus = speedupTx.txStatus;
                mergedWithdraws[txHash]._latestStatus = speedupTx.txStatus;
            }
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

        mergedWithdraws[txHash] = tx;
        mergedWithdraws[txHash]._txSource = TX_SOURCE.WATCHGOD_EXITS;
        mergedWithdraws[txHash]._burnTxHash = tx.txBurnHash;
        mergedWithdraws[txHash]._exitTxHash = tx.txHash;
        mergedWithdraws[txHash]._watchgodExitTxStatus = tx.txStatus;
        mergedWithdraws[txHash]._latestStatus = tx.txStatus;
        mergedWithdraws[txHash]._txType = TX_TYPE.EXIT;

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

        // below logic is only for dropped/replaced txs
        if (tx.newHash && tx.txStatus === 'speedup') {
            const speedupTx = watchgodOthers.find((speedupTx) =>
                tx.newHash === speedupTx.txHash
            )

            if (speedupTx) {
                mergedWithdraws[txHash]._oldExitTxHash = tx.txHash
                mergedWithdraws[txHash]._exitTxHash = speedupTx.txHash
                mergedWithdraws[txHash]._watchgodExitTxStatus = speedupTx.txStatus;
                mergedWithdraws[txHash]._latestStatus = speedupTx.txStatus;
            }
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

        /**
         * use this exit txhash from watchgod in case where
         * openapi has not set exit tx details yet
         */
        const exitTxHash =
            mergedWithdraws[txHash] && mergedWithdraws[txHash]._exitTxHash
                ? mergedWithdraws[txHash]._exitTxHash
                : false;

        mergedWithdraws[txHash] = tx;
        mergedWithdraws[txHash]._txSource = TX_SOURCE.OPENAPI_EXITS;
        mergedWithdraws[txHash]._burnTxHash = tx.txBurnHash;
        mergedWithdraws[txHash]._exitTxHash = tx.txHash;
        mergedWithdraws[txHash]._confirmExitTxHash = tx.exitStartedTxHash;
        mergedWithdraws[txHash]._openapiExitTxStatus = tx.txStatus;
        mergedWithdraws[txHash]._latestStatus = tx.txStatus;
        mergedWithdraws[txHash]._txType = TX_TYPE.EXIT;

        if (exitTxHash && !mergedWithdraws[txHash]._exitTxHash) {
            mergedWithdraws[txHash]._exitTxHash = exitTxHash
        }

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
    });

    return Object.values(mergedWithdraws);
}
