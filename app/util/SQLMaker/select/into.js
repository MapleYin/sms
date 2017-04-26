"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
var FileType;
(function (FileType) {
    FileType[FileType["OUT"] = 0] = "OUT";
    FileType[FileType["DUMP"] = 1] = "DUMP";
})(FileType = exports.FileType || (exports.FileType = {}));
class Into extends base_1.Base {
    constructor(params) {
        super('INTO');
        if (params.length > 0) {
            if (typeof params[0] == 'number') {
                let fileType = params[0];
                if (fileType == FileType.OUT) {
                    this.outFile(params[1]);
                }
                else if (fileType == FileType.DUMP) {
                    this.dumpFile(params[1]);
                }
                else {
                    throw "Undefined FileType:" + params[1];
                }
            }
            else {
                this.push(params.join(','));
            }
        }
        else {
            throw "Miss Params";
        }
    }
    outFile(filePath) {
        this.push('OUTFILE');
        this.push(filePath);
    }
    dumpFile(filePath) {
        this.push('DUMPFILE');
        this.push(filePath);
    }
}
exports.Into = Into;
