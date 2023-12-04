exports.CatchErrors = async function (response_code, message) {
   return ({ Status: false, Response_Code: response_code, Response_Message: message })
}
exports.ResponseError = async function (response_code, message) {
   return ({ Status: false, Response_Code: response_code, Response_Message: message })
}
exports.ResponseSuccess = async function (response_code, message, data) {
   return ({ Status: true, Response_Code: response_code, Response_Message: message, Data: data })
}
exports.ResponseWithTokenSuccess = async function (response_code, message, data, token) {
   return ({ Status: true, Response_Code: response_code, Response_Message: message, Data: data, token: token })
}
exports.ResponseSuccessmsg = async function (response_code, message) {
   return ({ Status: true, Response_Code: response_code, Response_Message: message })
}
exports.ResponseErrormsg = async function (response_code, message) {
   return ({ Status: false, Response_Code: response_code, Response_Message: message })
}
exports.ResponseSuccesscountmsg = async function (response_code, message, Stamp, Question) {
   return ({ Status: true, Response_Code: response_code, Response_Message: message, Stamps: Stamp, Questions: Question })
}


/* Api Response Msg */

exports.ResponseErrorApi = async function (message) {
   return ({ ResponseCode: 0, ResponseMessage: message })
}

exports.ResponseErrorApiNew = async function (message) {
   return ({ status: false, response_code: 404, response_message: message })
}


exports.ResponseWithDataApi = async function (message, data = []) {
   return ({ status: true, response_code: 200, response_message: message, data: data })
}

exports.ResponseWithDataPagginationApi = async function (data = [], page = 0) {
   return ({ ResponseCode: 1, ResponseMessage: "success", data: data, total_page: page })
}

exports.ResponseWithTrueApi = async function () {
   return ({ ResponseCode: 1, ResponseMessage: "success", status: 'true' })
}

/* Convert Data Response */

exports.ResponseSuccessConvert = async function (message) {
   return ({ ResponseCode: 1, ResponseMessage: message })
}

/* End Change Data Response */


