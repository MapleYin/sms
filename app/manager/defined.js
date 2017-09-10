"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["success"] = 0] = "success";
    // account error
    StatusCode[StatusCode["unauthorized"] = 100] = "unauthorized";
    StatusCode[StatusCode["accountError"] = 101] = "accountError";
    StatusCode[StatusCode["accountExisted"] = 102] = "accountExisted";
    // params error
    StatusCode[StatusCode["missParams"] = 200] = "missParams";
    StatusCode[StatusCode["invalidateParams"] = 201] = "invalidateParams";
    // unknown
    StatusCode[StatusCode["universal"] = 500] = "universal";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
let StatusMessage = {};
exports.StatusMessage = StatusMessage;
StatusMessage[StatusCode.success] = "ok";
StatusMessage[StatusCode.unauthorized] = "Unauthorized";
StatusMessage[StatusCode.accountError] = "Username or Password Error";
StatusMessage[StatusCode.accountExisted] = "UserName was existed";
StatusMessage[StatusCode.missParams] = "Miss Params";
StatusMessage[StatusCode.invalidateParams] = "Invalidate Params";
StatusMessage[StatusCode.universal] = "Undefined Error";
