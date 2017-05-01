"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DateFormat {
    constructor(date = new Date()) {
    }
    toSmartString() {
    }
}
exports.DateFormat = DateFormat;
function convertAnyToDate(param) {
    let date = new Date(param);
    if (isNaN(date.getTime())) {
        return null;
    }
    return date;
}
exports.convertAnyToDate = convertAnyToDate;
