"use strict";
const base_1 = require("../base");
const from_1 = require("./from");
exports.Select = (...selectExprs) => {
    return new (Function.prototype.call(SQLMaker.Select, selectExprs));
};
var SQLMaker;
(function (SQLMaker) {
    var File;
    (function (File) {
        File[File["OUT"] = 0] = "OUT";
        File[File["DUMP"] = 1] = "DUMP";
    })(File = SQLMaker.File || (SQLMaker.File = {}));
    SQLMaker.CONCAT = (...concatStrings) => {
        return 'CONCAT(' + concatStrings.join(',') + ')';
    };
    class Select extends base_1.Base {
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
        into(...params) {
            if (Array.isArray(params)) {
                let storedVariables = params;
                this.push('INTO');
                this.push(storedVariables.join(','));
            }
            else {
            }
            return this;
        }
        intoFile(fileName) {
            this.push('INTO OUTFILE');
            this.push(fileName);
            return this;
        }
        intoDumpFile(fileName) {
            this.push('INTO DUMPFILE');
            this.push(fileName);
            return this;
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
    SQLMaker.Select = Select;
})(SQLMaker || (SQLMaker = {}));
