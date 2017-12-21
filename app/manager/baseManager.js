"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const defined_1 = require("./defined");
__export(require("./defined"));
class BaseManager {
    baseResponse(data) {
        return {
            code: defined_1.StatusCode.success,
            message: defined_1.StatusMessage[defined_1.StatusCode.success],
            data: data
        };
    }
    listResponse(data) {
        return {
            code: defined_1.StatusCode.success,
            message: defined_1.StatusMessage[defined_1.StatusCode.success],
            data: data
        };
    }
    errorResponse(errorCode, message) {
        return {
            code: errorCode,
            message: message || defined_1.StatusMessage[errorCode],
            data: null
        };
    }
    send(sendBlock) {
        return (req, res, next) => {
            try {
                res.send(sendBlock(req));
            }
            catch (e) {
                res.json(e);
            }
        };
    }
}
exports.BaseManager = BaseManager;
