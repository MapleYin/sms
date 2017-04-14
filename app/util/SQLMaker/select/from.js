"use strict";
const base_1 = require("../base");
class From extends base_1.Base {
    constructor(parent, params) {
        super(parent);
        this.push('FROM');
        this.table(params);
    }
    table(tableName) {
        this.push(tableName);
    }
    where(condition) {
        // return new Where(this);
    }
}
exports.From = From;
