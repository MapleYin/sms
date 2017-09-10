// check
"use strict";
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
exports.isMapObject = () => {
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
