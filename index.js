const merger = require("./mergeOpenApiWatchgod");

const {
    openApiDepositResponse,
    openApiWithdrawResponse,
    openApiBurnResponse,
    watchGodResponse,
} = require("./responseData");

const mergedData = merger(
    openApiDepositResponse,
    openApiWithdrawResponse,
    openApiBurnResponse,
    watchGodResponse
);

console.log(mergedData);
