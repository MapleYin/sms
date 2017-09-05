"use strict";
const baseServer_1 = require("./baseServer");
// import SQLMaker = require('../util/SQLMaker/maker')
const Helper = require("../util/helper");
class MessageServer extends baseServer_1.BaseServer {
    async get() {
        var isValidParams = true;
        var SQLArray = [];
        SQLArray.push('SELECT * FROM message WHERE');
        switch (arguments.length) {
            case 0:
                SQLArray.push('1');
                break;
            case 1:
                {
                    let params = arguments[0];
                    if (Helper.isNumber(params)) {
                        SQLArray.push('1');
                        SQLArray.push(`LIMIT ${params}`);
                    }
                    else if (Helper.isDate(params)) {
                        let startTime = params;
                        SQLArray.push(`date > ${startTime.getTime()}`);
                    }
                    else {
                        isValidParams = false;
                    }
                }
                break;
            case 2:
                {
                    let params1 = arguments[0];
                    let params2 = arguments[1];
                    if (Helper.isNumber(params1) && Helper.isNumber(params2)) {
                        SQLArray.push('1');
                        SQLArray.push(`LIMIT ${params1 * params2},${params1}`);
                    }
                    else if (Helper.isDate(params1) && Helper.isNumber(params2)) {
                        let startTime = params1;
                        SQLArray.push(`date > ${startTime.getTime()}`);
                        SQLArray.push(`LIMIT ${params2}`);
                    }
                    else {
                        isValidParams = false;
                    }
                }
                break;
            case 3:
                {
                    let startTime = arguments[0];
                    if (Helper.isDate(startTime)) {
                        if (Helper.isDate(arguments[1])) {
                            let endTime = arguments[1];
                            SQLArray.push(`date > ${startTime.getTime()} AND`);
                            SQLArray.push(`date < ${endTime.getTime()}`);
                            SQLArray.push(`LIMIT ${arguments[2]}`);
                        }
                        else if (Helper.isNumber(arguments[1]) && Helper.isNumber(arguments[2])) {
                            SQLArray.push(`date > ${startTime.getTime()}`);
                            SQLArray.push(`LIMIT ${arguments[2] * arguments[1]},${arguments[1]}`);
                        }
                        else {
                            isValidParams = false;
                        }
                    }
                    else {
                        isValidParams = false;
                    }
                }
                break;
            case 4: {
                let startTime = arguments[0];
                let endTime = arguments[1];
                let offset = arguments[2];
                let page = arguments[3];
                if (Helper.isDate(startTime) &&
                    Helper.isDate(endTime) &&
                    Helper.isNumber(offset) &&
                    Helper.isNumber(page)) {
                    SQLArray.push(`date > ${startTime.getTime()} AND`);
                    SQLArray.push(`date < ${endTime.getTime()}`);
                    SQLArray.push(`LIMIT ${arguments[3] * arguments[2]},${arguments[2]}`);
                }
                else {
                    isValidParams = false;
                }
                break;
            }
        }
        if (!isValidParams) {
            throw baseServer_1.CreateErrorResponse(baseServer_1.StatusCode.invalidateParams);
        }
        let result = await this.query(SQLArray.join(' '));
        return baseServer_1.CreateListResponse(result);
    }
    async save(content, date, fromAddress) {
        let SQLString = `
		    INSERT 
		    INTO message (fromAddress,content,date) 
		    VALUES ('${fromAddress}','${content}','${date}')`;
        let result = await this.query(SQLString);
        if ("insertId" in result) {
            return baseServer_1.CreateBaseResponse(null);
        }
        else {
            return baseServer_1.CreateErrorResponse(baseServer_1.StatusCode.universal, result.ER_DUP_ENTRY);
        }
    }
}
module.exports = new MessageServer();
