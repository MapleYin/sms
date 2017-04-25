"use strict";
const base_1 = require("../base");
const in_1 = require("./in");
const limit_1 = require("./limit");
class Where extends base_1.Base {
    constructor(params) {
        super('WHERE');
        if (typeof params == 'string') {
            this.expr(params);
        }
        else {
            this.expr(params.toString());
        }
    }
    expr(exprString) {
        this.push(exprString);
    }
    in(params) {
        let inStatement = new in_1.In(params);
        return this.push(inStatement);
        ;
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
exports.Where = Where;
