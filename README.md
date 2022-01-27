# openapi-watchgod-merger

Merge OpenAPI and Watchgod responses to track latest status of a deposit/withdraw transaction on Ethereum Chain and Polygon Chain.

## Usage

### Installation

```
npm i openapi-watchgod-merger
```

```js script
import openapiWatchgodMerge from openapi-watchgod-merger

// Folllowing variables represent data
// from OpenAPI and Watchgod API
const openApiDepositResponse = []
const openApiWithdrawResponse = []
const openApiBurnResponse = []
const watchGodResponse = []

// below given function expects all 4 arguments
// and in same order
const mergedData = openapiWatchgodMerge(
    openApiDepositResponse,
    openApiWithdrawResponse,
    openApiBurnResponse,
    watchGodResponse
);
```

## Detailed Explanation

For now, it is not giving out exact intelligent status of a transaction. It just merges all related transactions into one and appends some additional information based on below given priority.

A merged transaction will have all the undisturbed response with some additional fields added.

> NOTE: All fields added by this library starts with an underscore(e.g. `_latestStatus`)

## Deposits

Deposit transactions can be tracked via 2 places with below mentioned priorities

### Priority for Deposit Txs(Highest to Lowest)

- OpenAPI
- Watchgod

### Additional fields

- `_txType`
- `_txSource`
- `_openapiTxStatus`
- `_watchgodTxStatus`
- `_latestStatus`

## Withdraw

Withdraw transactions consists of 2 parts(i.e. withdraw init/burn and exit). Withdraw transactions can be tracked via 2 places with below mentioned priorities

### Priority for Withdraw+Exit Txs(Highest to Lowest)

- OpenAPI Exit
- Watchgod Exit
- OpenAPI Withdraw
- Watchgod Withdraw

### Additional fields

- `_txType`
- `_txSource`
- `_burnTxHash`
- `_exitTxHash`
- `_openapiExitTxStatus`
- `_watchgodExitTxStatus`
- `_openapiBurnTxStatus`
- `_watchgodBurnTxStatus`
- `_latestStatus`

## Interface

Since different APIs uses their own names for naming a variable(e.g. openapi:`transactionHash`, watchgod:`hash`), to avoid juggling between 2 naming conventions we will be parsing some common variable names.

### Interface

```
amount
blockNumber
data
from
network
rootToken
timestamp
to
txBurnHash
txHash
txStatus
txType
_txSource
_txType
_depositTxHash
_burnTxHash
_exitTxHash
_openapiExitTxStatus
_watchgodExitTxStatus
_openapiBurnTxStatus
_watchgodBurnTxStatus
_latestStatus
```

If required, to parse and unparse you can use the util methods provided by this library.

- `convertOpenapiToInterface(openapiTx)`
- `convertWatchgodToInterface(watchgodTx)`
- `(watchgodTx)`

### Usage

```js script
import {
  convertOpenapiToInterface,
  convertWatchgodToInterface,
  convertInterfaceToWatchgod,
} from "openapi-watchgod-merger";

const openapiTx = {
  /*...*/
};
const watchgodTx = {
  /*...*/
};

const parsedOpenapiTx = convertOpenapiToInterface(openapiTx);
const parsedWatchgodTx = convertWatchgodToInterface(openapiTx);

const unparsedWatchgodTx = convertInterfaceToWatchgod(parsedWatchgodTx);
```

> Note: `convertInterfaceToWatchgod` will still have the additional fields added by library

### OpenAPI mapping

| OpenAPI               | Interface    |
| --------------------- | ------------ |
| `transactionHash`     | `txHash`     |
| `transactionStatus`   | `txStatus`   |
| `depositor`           | `from`       |
| `isPos`               | `isPoS`      |
| `burnTransactionHash` | `txBurnHash` |

### Watchgod mapping

| Watchgod       | Interface    |
| -------------- | ------------ |
| `hash`         | `txHash`     |
| `status`       | `txStatus`   |
| `isPos`        | `isPoS`      |
| `prevBurnHash` | `txBurnHash` |

## Other helpful constants

Constants can also be imported for use

- `TX_SOURCE` can be used with `_txSource`
- `TX_TYPE` can be used with `_txType`

```js script
import { TX_SOURCE, TX_TYPE } from "openapi-watchgod-merger";

const depositTxs = (mergedTransactions) =>
  mergedTransactions.filter((tx) => TX_TYPE.DEPOSIT === tx._txType);
```
