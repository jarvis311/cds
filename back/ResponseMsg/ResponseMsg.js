const CatchErrors = async function (message) {
   return ({ Status: false, Response_Code: 404, Response_Message: message })
}
const ResponseError = async function (message) {
   return ({ Status: false, Response_Code: 404, Response_Message: message })
}
const ResponseSuccess = async function (message, data) {
   return ({ Status: true, Response_Code: 200, Response_Message: message, Data: data })
}
const ResponseWithTokenSuccess = async function (message, data, token) {
   return ({ Status: true, Response_Code: 200, Response_Message: message, Data: data, token: token })
}
const ResponseSuccessmsg = async function (message) {
   return ({ Status: true, Response_Code: 200, Response_Message: message })
}
const ResponseErrormsg = async function (message) {
   return ({ Status: false, Response_Code: 404, Response_Message: message })
}
const ResponseApiPagination = (message, data, limit, Total_page, page) => {
   return ({ Status: true, Response_Code: 200, Response_Message: message, Data: data, page:page, limit: limit, total_page: Total_page})
}
export {
   CatchErrors, ResponseError, ResponseSuccess, ResponseWithTokenSuccess, ResponseSuccessmsg, ResponseErrormsg, ResponseApiPagination
}

