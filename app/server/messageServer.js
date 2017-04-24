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
            var sqlString = 'SELECT * FROM message WHERE ';
            if (arguments.length == 1) {
                let params = arguments[0];
                if (Helper.isDate(params)) {
                }
                else if (Helper.isNumber(params)) {
                }
                else if (Helper.isString(params)) {
                }
            }
            else if (arguments.length >= 2) {
                let params1 = arguments[0];
                let params2 = arguments[1];
                if (Helper.isDate(params1) && Helper.isDate(params2)) {
                    let startDate = params1;
                    let endDate = params2;
                    let condition = `${startDate.getTime()} > date AND ${startDate.getTime()} < date`;
                    sqlString += condition;
                }
                else if (Helper.isNumber(params1)) {
                    let condition = [];
                    let maybeIds = Array.prototype.slice.call(arguments, 0);
                    maybeIds.forEach((value) => {
                        if (Helper.isNumber(value)) {
                            condition.push(value);
                        }
                    });
                    sqlString += `id IN (${condition.join(',')})`;
                }
                else if (Helper.isString(params1)) {
                    let condition = [];
                    let maybeIds = Array.prototype.slice.call(arguments, 0);
                    maybeIds.forEach((value) => {
                        if (Helper.isString(value)) {
                            condition.push(value);
                        }
                    });
                    sqlString += `fromAddress IN (${condition.join(',')})`;
                }
                else {
                    throw baseServer_1.CreateErrorResponse(baseServer_1.StatusCode.invalidateParams);
                }
            }
            else {
                sqlString += '1';
            }
            let result = yield this.query(sqlString);
            return baseServer_1.CreateListResponse(result);
        });
    }
    post(content, date, fromAddress) {
        var sqlString = 'INSERT ';
    }
}
module.exports = new MessageServer();
