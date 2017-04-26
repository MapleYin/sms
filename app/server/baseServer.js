"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const defined_1 = require("./defined");
__export(require("./defined"));
function CreateBaseResponse(data) {
    return {
        code: defined_1.StatusCode.success,
        message: defined_1.StatusMessage[defined_1.StatusCode.success],
        data: data
    };
}
exports.CreateBaseResponse = CreateBaseResponse;
;
function CreateListResponse(data) {
    return {
        code: defined_1.StatusCode.success,
        message: defined_1.StatusMessage[defined_1.StatusCode.success],
        data: data
    };
}
exports.CreateListResponse = CreateListResponse;
;
function CreateErrorResponse(errorCode, message) {
    return {
        code: errorCode,
        message: message || defined_1.StatusMessage[errorCode],
        data: null
    };
}
exports.CreateErrorResponse = CreateErrorResponse;
class BaseServer {
    query(queryString, params) {
        return new Promise(function (resolve, reject) {
            db_1.DBPool.query(queryString, params, function (error, result, fields) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log(queryString);
                    console.log(error);
                    reject(error);
                }
            });
        });
    }
}
exports.BaseServer = BaseServer;
