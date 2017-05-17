"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
let screct = 'uguesswhatithink';
let iv = 'uneverknowthatit';
function responseDataEncode(data) {
    return CryptoJS.AES.encrypt(data, screct, {
        iv: iv
    }).toString();
}
exports.responseDataEncode = responseDataEncode;
function requestDataDecode(encodeData) {
    return CryptoJS.AES.decrypt(encodeData, screct, {
        iv: iv
    }).toString(CryptoJS.enc.Utf8);
}
exports.requestDataDecode = requestDataDecode;



let s = "40b4e3be620a7d1ea0bb0392a431a794e356cb56e141fd24d152542085eda68cc30da5d0d5929b523a8924297d522a15";
console.log(requestDataDecode(s))