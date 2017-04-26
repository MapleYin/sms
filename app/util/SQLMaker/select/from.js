"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
const where_1 = require("./where");
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
}
exports.From = From;
