"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBPool = require("../db/db");
class BaseServer {
    select() {
        return this.query("");
    }
    selectOne() {
        return this.query("").then((result) => {
            return result.shift();
        });
    }
    insert() {
        return this.query("");
    }
    update() {
        return this.query("");
    }
    query(queryString, params) {
        return new Promise(function (resolve, reject) {
            DBPool.query(queryString, params, function (error, result, fields) {
                if (!error) {
                    resolve(result);
                }
                else {
                    reject(error);
                }
            });
        });
    }
}
exports.BaseServer = BaseServer;
/*
error :
{
    "code": "ER_DUP_ENTRY",
    "errno": 1062,
    "sqlState": "23000",
    "index": 0
}

UPDATE
===========
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 34,
  warningCount: 0,
  message: '(Rows matched: 1  Changed: 1  Warnings: 0',
  protocol41: true,
  changedRows: 1 }


INSERT
===========
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 9,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }


DELETE
===========
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }

*/
