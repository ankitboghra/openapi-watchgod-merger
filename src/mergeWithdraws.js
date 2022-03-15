import { TX_TYPE } from './constants'

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
        mergedWithdraws[txHash]._txSource = "watchgod_confirm_exits";
        mergedWithdraws[txHash]._burnTxHash = tx.txBurnHash;
        mergedWithdraws[txHash]._confirmExitTxHash = tx.txHash;
        mergedWithdraws[txHash]._watchgodConfirmExitTxStatus = tx.txStatus;
        mergedWithdraws[txHash]._latestStatus = tx.txStatus;
        mergedWithdraws[txHash]._txType = TX_TYPE.ConfirmExit;

        if (watchgodBurnTxStatus) {
            mergedWithdraws[txHash]._watchgodBurnTxStatus = watchgodBurnTxStatus;
        }

        if (openapiBurnTxStatus) {
            mergedWithdraws[txHash]._openapiBurnTxStatus = openapiBurnTxStatus;
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
        mergedWithdraws[txHash]._txSource = "watchgod_exits";
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

        mergedWithdraws[txHash] = tx;
        mergedWithdraws[txHash]._txSource = "openapi_exits";
        mergedWithdraws[txHash]._burnTxHash = tx.txBurnHash;
        mergedWithdraws[txHash]._exitTxHash = tx.txHash;
        mergedWithdraws[txHash]._openapiExitTxStatus = tx.txStatus;
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

        if (watchgodExitTxStatus) {
            mergedWithdraws[txHash]._watchgodExitTxStatus = watchgodExitTxStatus;
        }
    });

    return Object.values(mergedWithdraws);
}
