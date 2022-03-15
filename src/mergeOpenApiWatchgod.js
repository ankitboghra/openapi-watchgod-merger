/*
DEPOSIT
=> priority of responses(highest to lowest)
- openapiDeposits
- watchgodDeposits
*/

/*
WITHDRAW

=> priority of responses(highest to lowest)
- openapiExits
- openapiBurns
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

import {
    convertOpenapiToInterface,
    convertWatchgodToInterface,
    convertInterfaceToWatchgod,
} from "./utils";
import { TX_TYPE } from './constants'


import mergeDeposits from './mergeDeposits'
import mergeWithdraws from './mergeWithdraws'

/**
 *
 * @param {*} openapiDepositResponse
 * @param {*} openapiWithdrawResponse
 * @param {*} openapiBurnResponse
 * @param {*} watchGodResponse
 */
export default function merger(
    openapiDepositResponse,
    openapiWithdrawResponse,
    openapiBurnResponse,
    watchGodResponse
) {
    const openapiDeposits = openapiDepositResponse.map((tx) =>
        convertOpenapiToInterface(tx)
    );

    const watchgodDeposits = watchGodResponse
        .filter((tx) => tx.txType === TX_TYPE.DEPOSIT)
        .map((tx) => convertWatchgodToInterface(tx));

    const openapiExits = openapiWithdrawResponse.map((tx) =>
        convertOpenapiToInterface(tx)
    );

    const openapiBurns = openapiBurnResponse.map((tx) =>
        convertOpenapiToInterface(tx)
    );

    const watchgodExits = watchGodResponse
        .filter((tx) => tx.txType === TX_TYPE.EXIT)
        .map((tx) => convertWatchgodToInterface(tx));

    const watchgodConfirmExits = watchGodResponse
        .filter((tx) => tx.txType === TX_TYPE.CONFIRM_EXIT)
        .map((tx) => convertWatchgodToInterface(tx));

    const watchgodBurns = watchGodResponse
        .filter((tx) => tx.txType === TX_TYPE.WITHDRAW)
        .map((tx) => convertWatchgodToInterface(tx));

    return [
        ...mergeDeposits(openapiDeposits, watchgodDeposits),
        ...mergeWithdraws(openapiExits, openapiBurns, watchgodExits, watchgodConfirmExits, watchgodBurns),
    ];
}
