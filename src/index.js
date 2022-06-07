import mergeOpenApiWatchgod from "./mergeOpenApiWatchgod"

// import {
//     openApiDepositResponse,
//     openApiWithdrawResponse,
//     openApiBurnResponse,
//     watchGodResponse,
// } from "../responseData"

// const mergedData = mergeOpenApiWatchgod(
//     openApiDepositResponse,
//     openApiWithdrawResponse,
//     openApiBurnResponse,
//     watchGodResponse
// );
// console.clear()
// console.time('mergeOpenApiWatchgod')
// mergedData.forEach((tx) => console.table(tx));
// console.timeEnd('mergeOpenApiWatchgod')

export default mergeOpenApiWatchgod
export { TX_SOURCE, TX_TYPE } from "./constants"
