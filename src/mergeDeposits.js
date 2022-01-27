import { TX_TYPE } from './constants'

export default function mergeDeposits(openapiDeposits, watchgodDeposits) {

    const mergedDeposits = {};
    watchgodDeposits.forEach((tx) => {
        const txHash = tx.txHash;
        mergedDeposits[txHash] = tx;
        mergedDeposits[txHash]._latestStatus = tx.txStatus;
        mergedDeposits[txHash]._watchgodTxStatus = tx.txStatus;
        mergedDeposits[txHash]._txSource = "watchgod_deposits";
        mergedDeposits[txHash]._txType = TX_TYPE.DEPOSIT;
    });

    openapiDeposits.forEach((tx) => {
        const txHash = tx.txHash;
        const watchgodTxStatus = mergedDeposits[txHash]
            ? mergedDeposits[txHash].txStatus
            : false;

        mergedDeposits[txHash] = tx;
        mergedDeposits[txHash]._latestStatus = tx.txStatus;
        mergedDeposits[txHash]._openapiTxStatus = tx.txStatus;

        if (watchgodTxStatus) {
            mergedDeposits[txHash]._watchgodTxStatus = watchgodTxStatus;
        }

        mergedDeposits[txHash]._txSource = "openapi_deposits";
        mergedDeposits[txHash]._txType = TX_TYPE.DEPOSIT;
    });

    return Object.values(mergedDeposits);
}
