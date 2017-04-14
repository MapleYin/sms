"use strict";
const base_1 = require("../base");
class Where extends base_1.Base {
    constructor(parent, params) {
        super(parent);
        this.expr(params);
    }
    expr(exprString) {
        this.push(exprString);
    }
}
exports.Where = Where;
