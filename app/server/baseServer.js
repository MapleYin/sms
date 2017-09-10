"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBPool = require("../db/db");
class BaseServer {
    query(queryString, params) {
        return new Promise(function (resolve, reject) {
            DBPool.query(queryString, params, function (error, result, fields) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log(queryString);
                    reject(error);
                }
            });
        });
    }
}
exports.BaseServer = BaseServer;
