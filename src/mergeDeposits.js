import { TX_TYPE, TX_SOURCE } from './constants'

export default function mergeDeposits(openapiDeposits, watchgodDeposits, watchgodDepositApprovals) {

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
        // const watchgodDepositApprovalTxStatus = mergedDeposits[txHash]
        //     ? mergedDeposits[txHash]._watchgodDepositApprovalTxStatus
        //     : false;

        mergedDeposits[txHash] = tx;
        mergedDeposits[txHash]._depositTxHash = tx.txHash;
        mergedDeposits[txHash]._latestStatus = tx.txStatus;
        mergedDeposits[txHash]._watchgodTxStatus = tx.txStatus;

        // if (watchgodDepositApprovalTxStatus) {
        //     mergedDeposits[txHash]._watchgodDepositApprovalTxStatus = watchgodDepositApprovalTxStatus;
        // }

        mergedDeposits[txHash]._txSource = TX_SOURCE.WATCHGOD_DEPOSITS;
        mergedDeposits[txHash]._txType = TX_TYPE.DEPOSIT;
    });

    openapiDeposits.forEach((tx) => {
        const txHash = tx.txHash;
        // const watchgodDepositApprovalTxStatus = mergedDeposits[txHash]
        //     ? mergedDeposits[txHash]._watchgodDepositApprovalTxStatus
        //     : false;
        const watchgodTxStatus = mergedDeposits[txHash]
            ? mergedDeposits[txHash].txStatus
            : false;

        mergedDeposits[txHash] = tx;
        mergedDeposits[txHash]._depositTxHash = tx.txHash;
        mergedDeposits[txHash]._latestStatus = tx.txStatus;
        mergedDeposits[txHash]._openapiTxStatus = tx.txStatus;

        // if (watchgodDepositApprovalTxStatus) {
        //     mergedDeposits[txHash]._watchgodDepositApprovalTxStatus = watchgodDepositApprovalTxStatus;
        // }

        if (watchgodTxStatus) {
            mergedDeposits[txHash]._watchgodTxStatus = watchgodTxStatus;
        }

        mergedDeposits[txHash]._txSource = TX_SOURCE.OPENAPI_DEPOSITS;
        mergedDeposits[txHash]._txType = TX_TYPE.DEPOSIT;
    });

    return Object.values(mergedDeposits);
}
