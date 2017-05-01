"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
const from_1 = require("./from");
const into_1 = require("./into");
exports.FileType = into_1.FileType;
var where_1 = require("./where");
exports.ColumnExpr = where_1.ColumnExpr;
exports.Select = (...selectExprs) => {
    return new SelectMaker(selectExprs);
};
exports.CONCAT = (...concatStrings) => {
    return 'CONCAT(' + concatStrings.join(',') + ')';
};
class SelectMaker extends base_1.Base {
    constructor(params) {
        super('SELECT');
        this.select.apply(this, params);
    }
    select(...selectExprs) {
        let selectExpr = '*';
        if (selectExprs.length > 0) {
            selectExpr = selectExprs.join(',');
        }
        this.push(selectExpr);
    }
    // Form
    from(params) {
        var from;
        if (typeof params == 'string') {
            from = new from_1.From(params);
        }
        else {
            let subQuery = params;
            let queryString = subQuery.toString();
            from = new from_1.From('(' + queryString + ')');
        }
        this.push(from);
        return this;
    }
    // Where
    where(whereCondition) {
        return this;
    }
    groupBy() {
        return this;
    }
    having() {
        return this;
    }
    orderBy() {
        return this;
    }
    limit() {
        return this;
    }
}
