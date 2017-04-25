"use strict";
const base_1 = require("../base");
class Limit extends base_1.Base {
    constructor(rowCount, offset) {
        super('LIMIT');
        if (offset == undefined) {
            this.rowCount(rowCount);
        }
        else {
            this.rowCountWithOffset(rowCount, offset);
        }
    }
    rowCount(count) {
        this.push(count);
    }
    rowCountWithOffset(count, offset) {
        this.push(`${offset},${count}`);
    }
}
exports.Limit = Limit;
