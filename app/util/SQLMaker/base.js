"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Base {
    constructor(SQLStart) {
        this.SQLSplitArray = [];
        if (SQLStart) {
            this.push(SQLStart);
        }
    }
    push(statement) {
        this.SQLSplitArray.push(statement);
        return statement;
    }
    toString() {
        let sqlArray = [];
        this.SQLSplitArray.forEach((value) => {
            if (value instanceof Base) {
                sqlArray.push(value.toString());
            }
            else {
                sqlArray.push(value);
            }
        });
        return sqlArray.join(' ');
    }
}
exports.Base = Base;
