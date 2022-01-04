/*
DEPOSIT
=> priority of responses(highest to lowest)
- openApiDeposits
- watchgodDeposits
*/

/*
WITHDRAW

=> priority of responses(highest to lowest)
- openApiExits
- openApiBurns
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
    convertOpenApiToInterface,
    convertWatchgodToInterface,
    convertInterfaceToWatchgod,
} = require("./utils");
/**
 *
 * @param {*} openApiDepositResponse
 * @param {*} openApiWithdrawResponse
 * @param {*} openApiBurnResponse
 * @param {*} watchGodResponse
 */
function merger(
    openApiDepositResponse,
    openApiWithdrawResponse,
    openApiBurnResponse,
    watchGodResponse
) {
    const mergedDeposits = {};

    const openApiDeposits = openApiDepositResponse.map((tx) =>
        convertOpenApiToInterface(tx)
    );
    const watchgodDeposits = watchGodResponse
        .filter((tx) => tx.txType === "deposit")
        .map((tx) => convertWatchgodToInterface(tx));

    watchgodDeposits.forEach((tx) => {
        const txHash = tx.txHash;
        mergedDeposits[txHash] = tx;
        mergedDeposits[txHash].latestStatus = tx.txStatus;
        mergedDeposits[txHash].txSource = "watchgod";
    });

    openApiDeposits.forEach((tx) => {
        const txHash = tx.txHash;
        const watchgodTxStatus = mergedDeposits[txHash]
            ? mergedDeposits[txHash].txStatus
            : false;

        mergedDeposits[txHash] = tx;
        mergedDeposits[txHash].latestStatus = tx.txStatus;
        mergedDeposits[txHash].openApiStatus = tx.txStatus;

        if (watchgodTxStatus) {
            mergedDeposits[txHash].watchgodTxStatus = watchgodTxStatus;
        }

        mergedDeposits[txHash].txSource = "openapi";
    });

    // const openApiExits=[]
    // const openApiBurns=[]
    // const watchgodExits=[]
    // const watchgodBurns=[]

    return [...Object.values(mergedDeposits)];
}

module.exports = merger;
