"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
const where_1 = require("./where");
const limit_1 = require("./limit");
class From extends base_1.Base {
    constructor(params) {
        super('FROM');
        this.table(params);
    }
    table(tableName) {
        this.push(tableName);
    }
    where(condition) {
        let where = new where_1.Where(condition);
        this.push(where);
        return where;
    }
    limit() {
        var limitStatement;
        if (arguments.length == 1) {
            limitStatement = new limit_1.Limit(arguments[0]);
        }
        else if (arguments.length >= 2) {
            limitStatement = new limit_1.Limit(arguments[0], arguments[1]);
        }
        return this.push(limitStatement);
    }
}
exports.From = From;
