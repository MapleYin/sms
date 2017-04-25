"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseServer_1 = require("./baseServer");
const Helper = require("../util/helper");
class MessageServer extends baseServer_1.BaseServer {
    get() {
        return __awaiter(this, arguments, void 0, function* () {
            let selectMaker = this.SQLMaker.Select();
            let table = selectMaker.from('message');
            var condition = '1';
            switch (arguments.length) {
                case 0:
                    table.where('1');
                    break;
                case 1:
                    {
                        let params = arguments[0];
                        if (Helper.isNumber(params)) {
                            table.where('1').limit(params);
                        }
                        else if (Helper.isDate(params)) {
                            let startTime = params;
                            table.where(`${startTime.getTime()} > date`);
                        }
                    }
                    break;
                case 2:
                    {
                        let params1 = arguments[0];
                        let params2 = arguments[1];
                        if (Helper.isNumber(params1) && Helper.isNumber(params2)) {
                            table.where('1').limit(params1, params2);
                        }
                        else if (Helper.isDate(params1) && Helper.isNumber(params2)) {
                            let startTime = params1;
                            table.where(`${startTime.getTime()} > date`).limit(params2);
                        }
                    }
                    break;
                case 3:
                    {
                        let startTime = arguments[0];
                        if (Helper.isDate(arguments[1])) {
                            let endTime = arguments[1];
                            table.where(`${startTime.getTime()} > date AND ${endTime.getTime()} < date`).limit(arguments[2]);
                        }
                        else {
                            table.where(`${startTime.getTime()} > date`).limit(arguments[1], arguments[2]);
                        }
                    }
                    break;
                case 4: {
                    let startTime = arguments[0];
                    let endTime = arguments[1];
                    table.where(`${startTime.getTime()} > date AND ${endTime.getTime()} < date`).limit(arguments[2], arguments[3]);
                    break;
                }
            }
            let sqlString = selectMaker.toString();
            console.log(sqlString);
            let result = yield this.query(sqlString);
            return baseServer_1.CreateListResponse(result);
        });
    }
    post(content, date, fromAddress) {
        var sqlString = 'INSERT ';
    }
}
module.exports = new MessageServer();
