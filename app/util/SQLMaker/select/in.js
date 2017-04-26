"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
class In extends base_1.Base {
    constructor(params) {
        super('IN');
        this.push('(');
        if (Array.isArray(params)) {
            this.collect(params);
        }
        else {
            this.subQuery(params);
        }
        this.push(')');
    }
    collect(params) {
        this.push(params.join(','));
    }
    subQuery(query) {
        this.push(query.toString());
    }
}
exports.In = In;
