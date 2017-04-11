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
}
exports.From = From;
