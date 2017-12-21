"use strict";
// check
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = (maybeNumber) => {
    return typeof maybeNumber == 'number';
};
exports.isString = (maybeString) => {
    return typeof maybeString == 'string';
};
exports.isBool = (maybeBool) => {
    return typeof maybeBool == 'boolean';
};
exports.isFunction = (maybeFunction) => {
    return typeof maybeFunction == 'function';
};
exports.isArray = (maybeArray) => {
    return Array.isArray(maybeArray);
};
exports.isDate = (maybeDate) => {
    return exports.isClass(maybeDate, Date);
};
exports.isMapObject = (mayMapObject) => {
};
exports.isClass = (origin, target) => {
    return origin instanceof target;
};
// create
// 33 ~ 126
/**
 * Return A Random String of Specified Length
 * @param  {number} length length of string
 * @return {string}        Random String
 */
function RandomString(length) {
    let charArray = [];
    while (length > 0) {
        charArray.push(String.fromCharCode(Math.random() * 93 + 33));
        length--;
    }
    return charArray.join('');
}
exports.RandomString = RandomString;
var TimeNumberType;
(function (TimeNumberType) {
    TimeNumberType[TimeNumberType["second"] = 0] = "second";
    TimeNumberType[TimeNumberType["millisecond"] = 1] = "millisecond";
})(TimeNumberType || (TimeNumberType = {}));
class TimeMaker {
    constructor(date = new Date()) {
        this.originDate = date;
    }
    toTimeNumber(type) {
        // switch (type) {
        // 	case TimeNumberType.second:
        // 		return ~~(this.originDate.getTime()/1000);
        // 		break;
        // 	case TimeNumberType.millisecond:
        // 		return this.originDate.getTime();
        // 		break;
        // 	default:
        // 		// code...
        // 		break;
        // }
    }
}
