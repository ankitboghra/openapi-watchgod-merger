const merger = require("./mergeOpenApiWatchgod");
const { TX_SOURCE, TX_TYPE } = require("./constants");

// const {
//     openApiDepositResponse,
//     openApiWithdrawResponse,
//     openApiBurnResponse,
//     watchGodResponse,
// } = require("../responseData");

// const mergedData = merger(
//     openApiDepositResponse,
//     openApiWithdrawResponse,
//     openApiBurnResponse,
//     watchGodResponse
// );

module.exports = {
    mergeOpenapiWatchgod: merger,
    TX_SOURCE,
    TX_TYPE,
}
