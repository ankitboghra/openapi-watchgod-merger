export function convertOpenapiToInterface(openapiTx) {
    const tx = {}; //: ITransaction = {}

    const mapping = {
        transactionHash: "txHash",
        transactionStatus: "txStatus",
        depositor: "from",
        isPos: "isPoS",
        burnTransactionHash: "txBurnHash",
    };

    Object.entries(openapiTx).map(([key, value]) => {
        if (key in mapping) {
            tx[mapping[key]] = value;
        } else {
            tx[key] = value;
        }
    });

    // convert timestamp to seconds
    if (tx["timestamp"]) {
        const dateInSeconds = new Date(tx["timestamp"]).getTime() / 1000;
        tx["timestamp"] = dateInSeconds;
    }

    // specifically for openapi exit endpoint
    if (tx["burnTxTimestamp"]) {
        const dateInSeconds = new Date(tx["burnTxTimestamp"]).getTime() / 1000;
        tx["burnTxTimestamp"] = dateInSeconds;
    }
    if (tx["exitStartedTimeStamp"]) {
        const dateInSeconds = new Date(tx["exitStartedTimeStamp"]).getTime() / 1000;
        tx["exitStartedTimeStamp"] = dateInSeconds;
    }

    return tx;
}

export function convertWatchgodToInterface(watchgodTx) {
    const tx = {}; //: ITransaction = {}

    const mapping = {
        hash: "txHash",
        status: "txStatus",
        isPos: "isPoS",
        prevBurnHash: "txBurnHash",
    };

    Object.entries(watchgodTx).map(([key, value]) => {
        if (key in mapping) {
            tx[mapping[key]] = value;
        } else {
            tx[key] = value;
        }
    });

    tx['timestamp'] = dateToTimestamp(watchgodTx.createdAt || 0)

    return tx;
}

export function convertInterfaceToWatchgod(watchgodTx) {
    const tx = {}; //: ITransaction = {}

    const mapping = {
        txHash: "hash",
        txStatus: "status",
        isPoS: "isPos",
        txBurnHash: "prevBurnHash",
    };

    Object.entries(watchgodTx).map(([key, value]) => {
        if (key in mapping) {
            tx[mapping[key]] = value;
        } else {
            tx[key] = value;
        }
    });

    return tx;
}

function dateToTimestamp(dateStr) {
    return Math.round(Date.parse(dateStr) / 1000)
}
