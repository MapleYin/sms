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
