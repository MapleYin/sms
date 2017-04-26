"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
const in_1 = require("./in");
const limit_1 = require("./limit");
exports.ColumnExpr = (column) => {
    return new ColumnCompare(column);
};
class Relation extends base_1.Base {
    constructor() {
        super();
    }
    and(column) {
        return this.operation('AND', column);
    }
    or(column) {
        return this.operation('OR', column);
    }
    operation(operation, column) {
        let columnCompare = new ColumnCompare(column);
        this.push(operation);
        this.push(columnCompare);
        return columnCompare;
    }
}
class ColumnCompare extends base_1.Base {
    constructor(column) {
        super(column);
    }
    // compare
    greaterThen(value) {
        return this.opertion('>');
    }
    greaterThanOrEqualTo(value) {
        return this.opertion('>=');
    }
    lessThen(value) {
        return this.opertion('<');
    }
    lessThenOrEqualTo(value) {
        return this.opertion('<=');
    }
    equalTo(value) {
        return this.opertion('=');
    }
    opertion(operation) {
        let relation = new Relation();
        this.push(operation);
        this.push(relation);
        return relation;
    }
    // predicate
    in(params) {
        let inStatement = new in_1.In(params);
        return this.push(inStatement);
    }
}
class Where extends base_1.Base {
    constructor(params) {
        super('WHERE');
        this.expr(params);
    }
    expr(exprString) {
        this.push(exprString);
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
