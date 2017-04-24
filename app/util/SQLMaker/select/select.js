"use strict";
const base_1 = require("../base");
const from_1 = require("./from");
const into_1 = require("./into");
exports.FileType = into_1.FileType;
exports.Select = (...selectExprs) => {
    return new (Function.prototype.call(SelectMaker, selectExprs));
};
exports.CONCAT = (...concatStrings) => {
    return 'CONCAT(' + concatStrings.join(',') + ')';
};
class SelectMaker extends base_1.Base {
    constructor(...selectExprs) {
        super('SELECT');
        this.select.call(this, selectExprs);
    }
    select(...selectExprs) {
        this.selectedColumn = selectExprs;
    }
    as(...aliasNames) {
        return this;
    }
    into() {
        return new into_1.Into(this, arguments);
    }
    from(params) {
        if (typeof params == 'string') {
            return new from_1.From(this, params);
        }
        else {
            let subQuery = params;
            let queryString = subQuery.currentSQL();
            return new from_1.From(this, '(' + queryString + ')');
        }
    }
}
