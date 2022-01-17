import mergeOpenApiWatchgod from '../src/index.js'

const watchgodDeposit_1 = {
    hash: "0xtxHash_1",
    network: "main",
    amount: "100000000000000000000",
    prevBurnHash: null,
    rootToken: "0xrootToken_1",
    status: "confirmed",
    txType: "deposit",
    blockNumber: 13816531,
    data:
        "0xdata_1",
    from: "0xfrom_1",
    timestamp: 1639662471018,
    to: "0xto_1",
}

const watchgodDeposit_2 = {
    hash: "0xtxHash_2",
    network: "main",
    amount: "100000000000000000000",
    prevBurnHash: null,
    rootToken: "0xrootToken_2",
    status: "confirmed",
    txType: "deposit",
    blockNumber: 13816531,
    data:
        "0xdata_2",
    from: "0xfrom_2",
    timestamp: 1639662471018,
    to: "0xto_2",
}

const openApiDeposit_1 = {
    transactionStatus: "deposited",
    id: "id_1",
    rootToken: "0xrootToken_1",
    tokenType: "tokenType_1",
    amount: "100000000000000000000",
    tokenId: null,
    depositor: "0xdepositer_1",
    userAddress: "0xuserAddress_1",
    transactionHash: "0xtxHash_1",
    timestamp: "2021-12-16T13:47:43.000Z",
    rootTunnelAddress: "0xrootTunnelAddress_1",
    amounts: null,
    blockNumber: null,
    isPos: null,
    tokenIds: null,
}

const openApiDeposit_2 = {
    transactionStatus: "deposited",
    id: "id_2",
    rootToken: "0xrootToken_2",
    tokenType: "tokenType_2",
    amount: "100000000000000000000",
    tokenId: null,
    depositor: "0xdepositer_2",
    userAddress: "0xuserAddress_2",
    transactionHash: "0xtxHash_2",
    timestamp: "2021-12-16T13:47:43.000Z",
    rootTunnelAddress: "0xrootTunnelAddress_2",
    amounts: null,
    blockNumber: null,
    isPos: null,
    tokenIds: null,
}


test('watchgod deposit only', () => {
    mergeOpenApiWatchgod([], [], [], [watchgodDeposit_1]).forEach((tx) => {
        expect(tx).toMatchSnapshot()
        expect(tx).toHaveProperty('_latestStatus', 'confirmed')
        expect(tx).toHaveProperty('_watchgodTxStatus', 'confirmed')
        expect(tx).toHaveProperty('_txSource', 'watchgod_deposits')
    })
});

test('watchgod deposits only', () => {
    mergeOpenApiWatchgod([], [], [], [watchgodDeposit_1, watchgodDeposit_2]).forEach((tx) => {
        expect(tx).toMatchSnapshot()
    })
});

test('openapi deposit only', () => {
    mergeOpenApiWatchgod([openApiDeposit_1], [], [], []).forEach((tx) => {
        expect(tx).toMatchSnapshot()
    })
});

test('openapi deposits only', () => {
    mergeOpenApiWatchgod([openApiDeposit_1, openApiDeposit_2], [], [], []).forEach((tx) => {
        expect(tx).toMatchSnapshot()
    })
});

test('openapi and watchgod', () => {
    mergeOpenApiWatchgod([openApiDeposit_1], [], [], [watchgodDeposit_1]).forEach((tx) => {
        expect(tx).toMatchSnapshot()
    })
});

test('openapi and watchgod', () => {
    mergeOpenApiWatchgod([openApiDeposit_1, openApiDeposit_2], [], [], [watchgodDeposit_1, watchgodDeposit_2]).forEach((tx) => {
        expect(tx).toMatchSnapshot()
    })
});


