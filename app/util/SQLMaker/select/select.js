"use strict";
const base_1 = require("../base");
const from_1 = require("./from");
const into_1 = require("./into");
exports.FileType = into_1.FileType;
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
    as(...aliasNames) {
        return this;
    }
    into() {
        let intoStatement = new into_1.Into(Array.prototype.slice.call(arguments, 0));
        return this.push(intoStatement);
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
        return from;
    }
}
