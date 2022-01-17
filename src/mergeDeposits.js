export default function mergeDeposits(openapiDeposits, watchgodDeposits) {

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

        mergedDeposits[txHash].txSource = "openapi_deposits";
    });

    return Object.values(mergedDeposits);
}
