import { TX_TYPE, TX_SOURCE } from './constants'

/**
 * unlike withdraw transactions, we are not linking
 * a deposit transaction with an deposit approval tx
 * as there is no 1-1 mapping, instead it is n-m mapping
 */

export default function mergeDeposits(openapiDeposits, watchgodDeposits, watchgodDepositApprovals, watchgodOthers) {

    const mergedDeposits = {};
    watchgodDepositApprovals.forEach((tx) => {
        const txHash = tx.txHash;
        mergedDeposits[txHash] = tx;
        mergedDeposits[txHash]._approvalTxHash = tx.txHash;
        mergedDeposits[txHash]._latestStatus = tx.txStatus;
        mergedDeposits[txHash]._watchgodDepositApprovalTxStatus = tx.txStatus;

        mergedDeposits[txHash]._txSource = TX_SOURCE.WATCHGOD_DEPOSIT_APPROVALS;
        mergedDeposits[txHash]._txType = TX_TYPE.APPROVE_DEPOSIT;
    })

    watchgodDeposits.forEach((tx) => {
        const txHash = tx.txHash;
        mergedDeposits[txHash] = tx;
        mergedDeposits[txHash]._depositTxHash = tx.txHash;
        mergedDeposits[txHash]._latestStatus = tx.txStatus;
        mergedDeposits[txHash]._watchgodTxStatus = tx.txStatus;
        mergedDeposits[txHash]._txSource = TX_SOURCE.WATCHGOD_DEPOSITS;
        mergedDeposits[txHash]._txType = TX_TYPE.DEPOSIT;

        /**
         * for handling dropped replaced tx,
         * just append new status from replaced tx to old tx
         * so that UI can show latest status without refreshing/redirecting
         */
        if (tx.newHash && tx.txStatus === 'speedup') {
            mergedDeposits[txHash]._oldDepositTxHash = tx.txHash;
            mergedDeposits[txHash]._oldWatchgodTxStatus = tx.txStatus;
            mergedDeposits[txHash]._depositTxHash = tx.newHash;

            const speedupTx = watchgodOthers.find((speedupTx) =>
                tx.newHash === speedupTx.txHash
            )
            if (speedupTx) {
                mergedDeposits[txHash]._latestStatus = speedupTx.txStatus;
                mergedDeposits[txHash]._watchgodTxStatus = speedupTx.txStatus;
            }
        }
    });

    openapiDeposits.forEach((tx) => {
        const txHash = tx.txHash;
        const watchgodTxStatus = mergedDeposits[txHash]
            ? mergedDeposits[txHash].txStatus
            : false;

        mergedDeposits[txHash] = tx;
        mergedDeposits[txHash]._depositTxHash = tx.txHash;
        mergedDeposits[txHash]._latestStatus = tx.txStatus;
        mergedDeposits[txHash]._openapiTxStatus = tx.txStatus;

        if (watchgodTxStatus) {
            mergedDeposits[txHash]._watchgodTxStatus = watchgodTxStatus;
        }

        mergedDeposits[txHash]._txSource = TX_SOURCE.OPENAPI_DEPOSITS;
        mergedDeposits[txHash]._txType = TX_TYPE.DEPOSIT;

        /**
         * if any speed up tx exists for this openapi tx
         * remove the dropped tx with old hash, otherwise
         * UI will have 2 entries for one transaction,
         * also, openapi does not know anything about dropped replaced,
         * so instead of merging the transactions, delete the older
         * dropped tx
         */
        // 
        const speedupTx = watchgodOthers.find((speedupTx) => {
            return tx.txHash === speedupTx.txHash
        }
        )
        if (speedupTx) {
            delete mergedDeposits[speedupTx.oldHash]
        }
    });

    return Object.values(mergedDeposits);
}
