import mergeOpenApiWatchgod from '../src/index.js'

const watchgodBurn_1 = {
    hash: "0xburnTxHash_1",
    network: "matic-main",
    amount: "13000",
    prevBurnHash: null,
    rootToken: "0xrootToken",
    status: "confirmed",
    txType: "withdraw",
    blockNumber: 21817279,
    data: "0xdata",
    from: "0xfrom",
    timestamp: 1637919854103,
    to: "0xto_1",
}

const openapiExit_1 = {
    transactionStatus: "exited",
    transactionHash: "0xexitHash_1",
    burnTransactionHash: "0xburnTxHash_1",
    userAddress: "0xfrom",
    timestamp: "2022-01-04T05:45:12.000Z",
    rootToken: "0xrootToken",
    blockNumber: 13937154,
    counter: 185187,
    tokenType: "ERC20",
    isPos: true,
    amount: "9857406270252014820230",
    childToken: "0xchildToken",
    burnTxTimestamp: "2022-01-04T04:46:35.000Z",
}

const openapiBurn_1 = {
    transactionHash:
        "0xburnTxHash_1",
    userAddress: "0xfrom",
    childToken: "0xchildToken",
    amount: "13000",
    isPos: true,
    blockNumber: 21817279,
    timestamp: "2021-11-26T09:44:13.000Z",
    transactionStatus: "checkpointed",
    tokenType: "ERC20",
}

const watchgodExit_1 = {
    hash: "0xexitHash_1",
    network: "main",
    amount: "13000",
    prevBurnHash: "0xburnTxHash_1",
    rootToken: "0xrootToken",
    status: "confirmed",
    txType: "exit",
    blockNumber: 13689313,
    data: "0xdata",
    from: "0xfrom",
    timestamp: 1637924277824,
    to: "0xto_1",
}



test('watchgod burn only', () => {
    mergeOpenApiWatchgod([], [], [], [watchgodBurn_1]).forEach((tx) => {
        expect(tx).toMatchSnapshot()
    })
});

test('openapi burn only', () => {
    mergeOpenApiWatchgod([], [], [openapiBurn_1], []).forEach((tx) => {
        expect(tx).toMatchSnapshot()
        // expect(tx).toHaveProperty('_latestStatus', 'confirmed')
        // expect(tx).toHaveProperty('_watchgodTxStatus', 'confirmed')
        // expect(tx).toHaveProperty('_txSource', 'watchgod_deposits')
    })
});

test('watchgod exit only', () => {
    mergeOpenApiWatchgod([], [], [], [watchgodExit_1]).forEach((tx) => {
        expect(tx).toMatchSnapshot()
        // expect(tx).toHaveProperty('_latestStatus', 'confirmed')
        // expect(tx).toHaveProperty('_watchgodTxStatus', 'confirmed')
        // expect(tx).toHaveProperty('_txSource', 'watchgod_deposits')
    })
});

test('openapi exit only', () => {
    mergeOpenApiWatchgod([], [openapiExit_1], [], []).forEach((tx) => {
        expect(tx).toMatchSnapshot()
        // expect(tx).toHaveProperty('_latestStatus', 'confirmed')
        // expect(tx).toHaveProperty('_watchgodTxStatus', 'confirmed')
        // expect(tx).toHaveProperty('_txSource', 'watchgod_deposits')
    })
});

test('watchgod burn and openapi burn', () => {
    mergeOpenApiWatchgod([], [], [openapiBurn_1], [watchgodBurn_1]).forEach((tx) => {
        expect(tx).toMatchSnapshot()
        // expect(tx).toHaveProperty('_latestStatus', 'confirmed')
        // expect(tx).toHaveProperty('_watchgodTxStatus', 'confirmed')
        // expect(tx).toHaveProperty('_txSource', 'watchgod_deposits')
    })
});

test('watchgod burn, openapi burn, watchgod exit', () => {
    mergeOpenApiWatchgod([], [], [openapiBurn_1], [watchgodBurn_1, watchgodExit_1]).forEach((tx) => {
        expect(tx).toMatchSnapshot()
        // expect(tx).toHaveProperty('_latestStatus', 'confirmed')
        // expect(tx).toHaveProperty('_watchgodTxStatus', 'confirmed')
        // expect(tx).toHaveProperty('_txSource', 'watchgod_deposits')
    })
});

test('watchgod burn, openapi burn, watchgod exit, openapi exit', () => {
    mergeOpenApiWatchgod([], [openapiExit_1], [openapiBurn_1], [watchgodBurn_1, watchgodExit_1]).forEach((tx) => {
        expect(tx).toMatchSnapshot()
        // expect(tx).toHaveProperty('_latestStatus', 'confirmed')
        // expect(tx).toHaveProperty('_watchgodTxStatus', 'confirmed')
        // expect(tx).toHaveProperty('_txSource', 'watchgod_deposits')
    })
});

test('openapi burn, openapi exit', () => {
    mergeOpenApiWatchgod([], [openapiExit_1], [openapiBurn_1], []).forEach((tx) => {
        expect(tx).toMatchSnapshot()
        // expect(tx).toHaveProperty('_latestStatus', 'confirmed')
        // expect(tx).toHaveProperty('_watchgodTxStatus', 'confirmed')
        // expect(tx).toHaveProperty('_txSource', 'watchgod_deposits')
    })
});

test('watchgod burn, openapi exit', () => {
    mergeOpenApiWatchgod([], [openapiExit_1], [], [watchgodBurn_1]).forEach((tx) => {
        expect(tx).toMatchSnapshot()
        // expect(tx).toHaveProperty('_latestStatus', 'confirmed')
        // expect(tx).toHaveProperty('_watchgodTxStatus', 'confirmed')
        // expect(tx).toHaveProperty('_txSource', 'watchgod_deposits')
    })
});
